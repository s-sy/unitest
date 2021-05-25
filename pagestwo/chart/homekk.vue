<template>
	<view class="">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="title-text">Chart</block>
		</cu-custom>
		<scroll-view upper-threshold="100" :scroll-into-view="toView" :scroll-top="scrollTop" scroll-y="true" :focus="mode"
		 enable-back-to-top="true" :style="'height:'+ (scroll_height-85)+'px;'" class="message-list">

			<view class="row" v-for="(item,index) in message_list" :key="" :id="'row_'+index">
				<!-- 日期 -->
				<view class="datetime" v-if="item.create_time != ''">{{item.createTime}}</view>
				<!-- 头像与内容文本 -->
				<view class="body" :style="item.senderId!=wxUser.id ? 'flex-flow: row' : 'flex-flow: row-reverse' ">
					<view class="avatar-container">
						<image class="avatar" :src="item.userAvatar" />
					</view>
					<!-- 画三角箭头 -->
					<view class="triangle" :style="item.senderId==wxUser.id ? 'right: 140rpx; background: #7ECB4B' : 'left: 140rpx;' ">
					</view>
					<view class="content" :style="item.senderId==wxUser.id ? 'background: #7ECB4B' : ''">
						<image class="picture" v-if="item.type == '1'" :src="item.message" mode="widthFix" @tap="preview" :data-src="item.message" />
						<view v-else="item.type =='0'">{{item.message}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- <view style="height:100rpx;"></view> -->
		<view class="hud-container" v-if="status != state.normal">
			<view class="hud-background"></view>
			<view class="hud-body">
				<image src="https://img.0728jh.com/staticImg/mic.png" />
				<view :class="'tip'+ status == state.cancel ? 'warning' : ''">{{tips[status]}}</view>
			</view>
		</view>
		<view class="reply">
			<image :src=" mode ? 'https://img.0728jh.com/staticImg/voice.png' : 'https://img.0728jh.com/staticImg/text.png'"
			 class="voice-image" @tap="switchMode" />
			<view class="opration-area">
				<input v-if="mode" type="text" confirm-type="send" @confirm="reply" :value="content" />
				<button v-else class="voice-button" @longtap="record" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">{{tips[status]}}</button>
			</view>

			<image src="https://img.0728jh.com/staticImg/image.png" class="choose-image" @tap="chooseImage" />
		</view>

	</view>
</template>

<script>
	import api from '../../pages/api/home.js'
	import ws from '../../utils/websocket/ws.js'
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	
	innerAudioContext.autoplay = true;
	export default {

		data: function() {
			return {
				msg: '',
				dataList: [],
				InputBottom: 0,
				wxUser: getApp().globalData.wxUser,
				tempImage: [],

				content: '',
				message_list: [],
				scroll_height: uni.getSystemInfoSync().windowHeight - 54,
				page_index: 0,
				mode: true,
				cancel: false,
				status: 0,
				tips: ['按住 说话', '松开 结束', '取消 发送'],
				state: {
					'normal': 0,
					'pressed': 1,
					'cancel': 2
				},
				toView: ''
			};
		},
		onLoad() {
			this.connect()
			this.subscribe()
			this.PostPage()
			recorderManager.onStop(function (res) {
			            console.log('recorder stop' + JSON.stringify(res));
			            self.voicePath = res.tempFilePath;
			        });
		},
		onShow() {

		},
		onHide() {
			//this.disconnect()
		},

		methods: {

			chooseImage: function() {

				// 选择图片供上传
				let that = this;
				wx.chooseImage({
					count: 9,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: res => {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						var tempFilePaths = res.tempFilePaths;
						// console.log(tempFilePaths);
						// 遍历多图
						console.log(tempFilePaths)
						tempFilePaths.forEach((tempFilePath) => {
							that.upload(tempFilePath, '1');
						});

					}
				})
			},





			preview: function(e) {
				// 当前点击图片的地址
				var src = e.currentTarget.dataset.src;
				// 遍历出使用images
				var images = [];
				this.message_list.forEach(function(messasge) {
					if (messasge != null && messasge.type == '1') {
						images.push(messasge.messageblob);
					}
				});
				// 预览图片
				uni.previewImage({
					urls: images,
					current: src
				});
			},
			switchMode: function() {
				// 切换语音与文本模式
				this.mode = !this.mode

			},
			record: function() {
				// 录音事件
				recorderManager.start();
				// let that = this;
				// uni.startRecord({
				// 	success: function(res) {
				// 		console.log("录音开始了吗")
				// 		console.log(res)
				// 		if (!that.cancel) {
				// 			that.upload(res.tempFilePath, '2');
				// 		}
				// 	},
				// 	fail: function(res) {
				// 		console.log(res);
				// 		//录音失败

				// 	},
				// 	complete: function(res) {
				// 		console.log(res);

				// 	}
				// })
			},
			stop: function() {
				recorderManager.stop();
				//uni.stopRecord();
			},
			touchStart: function(e) {
				// 触摸开始
				var startY = e.touches[0].clientY;
				// 记录初始Y值
				this.startY = startY
				this.status = this.state.pressed

			},
			touchMove: function(e) {
				// 触摸移动
				var movedY = e.touches[0].clientY;
				var distance = this.data.startY - movedY;
				// console.log(distance);
				// 距离超过50，取消发送
				this.status = distance > 50 ? this.state.cancel : this.state.pressed

			},
			touchEnd: function(e) {
				// 触摸结束
				var endY = e.changedTouches[0].clientY;
				var distance = this.startY - endY;
				// console.log(distance);
				// 距离超过50，取消发送
				this.cancel = distance > 50 ? true : false
				this.status = this.state.normal

				// 不论如何，都结束录音
				this.stop();
			},

			upload: function(tempFilePath, type) {
				// 开始上传
				let that = this;
				wx.showLoading({
					title: '发送中'
				});
				let project = getApp().globalData.projectItem
				let user = getApp().globalData.wxUser
				if (type == '1') { //如果是图片上传七牛
					uni.uploadFile({
						url: api.UpLoad,
						files: tempFilePath,
						filePath: tempFilePath,
						name: 'file',
						fileType: 'image',
						header: {
							'app-id': wx.getAccountInfoSync().miniProgram.appId,
							'third-session': getApp().globalData.thirdSession
						},
						formData: {
							dir: 'material',
							fileType: 'image',
						},
						success: (res) => {
							console.log("上传图片结果")
							console.log(res)
							//this.tempImage.push(JSON.parse(res.data).link)
							console.log(JSON.parse(res.data).link);
							//conosle.log(this.tempImage)

							let message = {
								message: JSON.parse(res.data).link,
								type: '1',
								senderId: user.id,
								receiverId: "", //接受者Id
								userAvatar: user.headimgUrl,
								userName: user.nickName,
								createTime: new Date(),
								status: '0',
							
							}
							uni.hideLoading()
							that.message_list.push(message)
							that.PostSend(message);
							that.send(message)
						},

					})
					
					

				}
				if(type=='2'){
				 //这里写录音上传七牛
				 
				 uni.showToast({
				 	title:"目前还不支持语音",
					icon:"none",
					duration:2000
				 })
				 
				// uni.uploadFile({
				// 	url: api.UpLoad,
				// 	files: tempFilePath,
				// 	filePath: tempFilePath,
				// 	name: 'file',
				// 	fileType: 'webm',
				// 	header: {
				// 		'app-id': wx.getAccountInfoSync().miniProgram.appId,
				// 		'third-session': getApp().globalData.thirdSession
				// 	},
					
				// 	formData: {
				// 		dir: 'material',
				// 		fileType: 'webm',
				// 	},
				// 	success: (res) => {
				// 		console.log("上音频片结果")
				// 		console.log(res)
				// 		//this.tempImage.push(JSON.parse(res.data).link)
				
				// 		console.log(JSON.parse(res.data).link);
				// 		//conosle.log(this.tempImage)
				
				// 		let message = {
				// 			message: JSON.parse(res.data).link,
				// 			type: '2',
				// 			senderId: user.id,
				// 			receiverId: "", //接受者Id
				// 			userAvatar: user.headimgUrl,
				// 			userName: user.nickName,
				// 			createTime: new Date(),
				// 			status: '0',
						
				// 		}
				// 		uni.hideLoading()
				// 		that.message_list.push(message)
				// 		that.PostSend(message);
				// 		that.send(message)
				// 	},
				
				// })
				}

				// 语音与图片通用上传方法
				// var formData = {
				// 	third_session: uni.getStorageSync('third_session'),
				// 	mpid: that.mpid,
				// 	fans_id: that.to_uid,
				// 	msg_type: type,
				// };
				// console.log(tempFilePath);
				// var message_list = that.message_list;
				// var message = {
				// 	myself: 1,
				// 	head_img_url: 'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqSucF9v6bKPfUPSTuQjpqmr8jAZEOgsFjFCHc73UIlUAgnI2nz6aFdnkRWAxxy1uZGfC82Yp7fMg/0',
				// 	'msg_type': type,
				// 	'content': tempFilePath,
				// 	create_time: '2018-07-31 17:20:39'
				// };
				// message_list.push(message);
				// that.message_list = message_list

				that.scrollToBottom()
				setTimeout(() => {
					wx.hideLoading();
				}, 500)
			},
			scrollToBottom: function() {
				this.toView = 'row_' + (this.message_list.length - 1)

			},
			PostUnreadCount() {
				let that = this;
				let project = getApp().globalData.projectItem
				let user = getApp().globalData.wxUser
				that.http(api.ChattingRecords + "/unreadcount", 'POST', {
					affiliationId: "",
					tenantId: '',
					userId: user.id,
					salesmanId: user.invteen,
				}, false).then(res => {
					console.log(res);
				})
			},
			reply: function(e) {
				let that = this;
				console.log(getApp().globalData)

				var content = e.detail.value;
				if (content == '') {
					uni.showToast({
						title: '总要写点什么吧'
					});
					return;
				}
				let project = getApp().globalData.projectItem;
				let user = getApp().globalData.wxUser
				that.content = content
				var message_list = that.message_list;
				var obj = {
					message: content,
					type: '0',
					senderId: user.id,
					receiverId: "", //接受者Id
					userAvatar: user.headimgUrl,
					userName: user.nickName,
					createTime: new Date(),
					status: '0'
				}

				message_list.push(obj); //2吧输入的显示在页面上
				that.message_list = message_list
				that.content = '';
				that.send(obj);


				this.scrollToBottom();

				//3.把输入的写如数据库
				that.PostSend(obj)
			},
			PostSend(message) {
				let that = this;

				let msg = message
				let project = getApp().globalData.projectItem
				let user = getApp().globalData.wxUser
				console.log(user)

				let salessId = "1301357596194103298"
				let messagess = {
					affiliationId: project.id,
					tenantId: project.tenantId,
					senderId: user.id,
					userId: user.id,
					salesmanId: salessId,
					createTime: new Date(),
					messageblob: message.message,
					type: message.type, //0 表示消息，1表示图片


				}
				that.http(api.ChattingRecords + "/send", 'POST', messagess

					, false).then(res => {
					console.log(res);
				})

				//that.send(messagess);
				//that.message_list.push(messagess)
			},
			PostReceived() {
				let that = this;
				that.http(api.ChattingRecords + "/received", 'POST', {
					affiliationId: "",
					tenantId: '',
					userId: user.id,
					salesmanId: user.invteen,
				}, false).then(res => {
					console.log(res);
				})
			},
			PostPage() {
				let that = this;
				let project = getApp().globalData.projectItem
				let user = getApp().globalData.wxUser
				that.http(api.ChattingRecords + "/page", 'POST', {
					currentPage: 1,
					pageSize: 20,
					affiliationId: project.id,
					tenantId: project.tenantId,
					userId: user.id,
				}, false).then(res => {
					console.log("获取历史聊天信息")
					console.log(res);
					console.log("获取历史聊天信息")
					let messaageList = res.data.chattingRecordsVOList;
					let messageTList = []
					console.log(messaageList)
					for (let i = 0; i < messaageList.length; i++) {
						var obj = {
							message: messaageList[i].messageblob,
							type: messaageList[i].type,
							senderId: messaageList[i].senderId,
							receiverId: messaageList[i].receiverId,
							userAvatar: messaageList[i].senderId ? user.headimgUrl : "",
							userName: messaageList[i].senderId == user.id ? user.nickName : "",
							createTime: messaageList[i].createTime,
							status: messaageList[i].status
						}
						messageTList.push(obj);
					}
					console.log(messageTList)
					that.message_list = messageTList;
				})
			},
			deleteMessage(iid) {
				let that = this;
				let id = iid;
				that.http(api.ChattingRecords + "/" + id, 'DELETE', {}, false).then(res => {
					console.log(res);
				})
			},

			/**
			 * 创建连接
			 */
			connect() {
				ws.connect()
			},
			/**
			 * 断开连接
			 */
			disconnect(aa) {
				ws.disconnect()
			},
			/**
			 * 订阅
			 */
			subscribe() {
				ws.subscribe("/topic/chat.typing", this.typing)
				ws.subscribe("/topic/chat.message", this.message)
				ws.subscribe("/user/exchange/amq.direct/chat.message", this.chatMessage)
				ws.subscribe("/app/chat.participants", this.participants)
				ws.subscribe("/topic/chat.login", this.login)
				ws.subscribe("/topic/chat.logout", this.logout)

			},
			/**
			 * 取消订阅
			 */
			unsubscribe() {
				ws.unsubscribe("/user/topic/message")
			},
			participants(data) {
				console.log("---获取在线列表--")
				console.log(data)
				console.log("-----")
				
				//	this.dataList.push(data.body)

			},
			typing(data) {
				console.log("打字")
				console.log(data)

				//	this.dataList.push(data.body)
			},
			login(data) {
				console.log("登录")
				console.log(data)
				//	this.dataList.push(data.body)
			},
			logout(data) {
				console.log("登出");
				console.log(data)
				//	this.dataList.push(data.body)
			},
			chatMessage(data) {
				console.log("dddddd")
				console.log(data)
				console.log("--------------------------------------")
				let JSONMage = JSON.parse(data.body)
				console.log(JSONMage)
				console.log("--------------------------------------")
				let message = {
					senderId: JSONMage.id,
					messageblob: JSONMage.message,
					createTime: new Date()
				}
				console.log(message)
				this.message_list.push(message)
			},
			/**
			 * 接收消息
			 * @param {Object} data
			 */
			message(data) {
				console.log("小明")
				console.log(data.body)



				//this.dataList.push(meassage)
			},

			/**
			 * 向服务端发送消息
			 */
			send(message) {
				console.log(message);

				//let userId = message.salesmanId;


				//client.send('/app/chat.message', {}, JSON.stringify({ message: 'newMessage' }));
				//  1301357596194103298
				//  1313016136671330306
				let wxUser = getApp().globalData.wxUser
				ws.send("/app/chat.private/1303221590009737217", JSON.stringify({
					message: message.message,
					type: message.type,
					userAvatar: message.userAvatar,
					userName: message.userName,
					id: wxUser.id
				}))
			},


			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
				console.log("++++++++++++++++++++++++++++++++++")
				console.log(e)
				this.msg = e.detail.value;

			},
			sendMessage() {
				this.send()
			}

		}
	}
</script>

<style>
	/*聊天记录*/
	.message-list {
		/*margin-bottom: 54px;*/
		background: rgb(235, 235, 235);
	}

	/*单元行*/
	.row {
		display: flex;
		flex-direction: column;
		margin: 0 30rpx;
	}

	/*日期*/
	.datetime {
		font-size: 10px;
		padding: 10px 0;
		color: #999;
		text-align: center;
	}

	/*主体*/
	.body {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
		width: 100%;
		margin-top: 10px;
	}


	/*头像容器*/
	.body.avatar-container {
		width: 20%;
	}

	/*头像*/
	.body .avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin: 0 20rpx;
	}

	/*文本消息*/
	.body .content {
		font-size: 16px;
		background: #fff;
		border-radius: 5px;
		padding: 10px;
		line-height: 22px;
		margin-bottom: 10px;
	}

	/* 三角箭头 */
	.body .triangle {
		background: white;
		width: 20rpx;
		height: 20rpx;
		margin-top: 26rpx;
		transform: rotate(45deg);
		position: absolute;
	}

	/*图片消息*/
	.picture {
		width: 160px;
	}

	/*回复框*/
	.reply {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 54px;
		border-top: 1px solid rgb(215, 215, 215);
		background: rgb(245, 245, 245);
	}

	.reply .voice-image {
		width: 25px;
		height: 25px;
		margin-left: 3%;
	}

	/*文本输入或语音录入*/
	.reply .opration-area {
		flex: 1;
		padding: 8px;
	}

	/*回复文本框*/
	.reply input {
		background: rgb(252, 252, 252);
		height: 36px;
		border: 1px solid rgb(221, 221, 221);
		border-radius: 6px;
		padding-left: 3px;
	}

	/*选取图片*/
	.reply .choose-image {
		width: 25px;
		height: 25px;
		margin-right: 3%;
	}

	/*按住说话button*/
	.voice-button {
		height: 36px;
		color: #818181;
		font-size: 14px;
		line-height: 36px;
	}

	/*悬浮提示框*/
	.hud-container {
		position: fixed;
		width: 150px;
		height: 150px;
		left: 50%;
		top: 50%;
		margin-left: -75px;
		margin-top: -75px;
	}

	/*背景层*/
	.hud-background {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #999;
		opacity: .8;
		z-index: 11;
		border-radius: 10px;
	}

	/*悬浮框主体*/
	.hud-body {
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 19;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	/*图标*/
	.hud-body image {
		margin-top: 20px;
		width: 80px;
		height: 80px;
	}

	/*文字*/
	.hud-body .tip {
		color: #fff;
		text-align: center;
		width: 90%;
		line-height: 34px;
		margin: 0 auto;
		margin-bottom: 10px;
		width: 90%;
	}

	.hud-body .warning {
		background: #cc3333;
		border-radius: 5px;
	}
</style>
