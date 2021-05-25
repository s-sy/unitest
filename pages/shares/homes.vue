<template>
	<view class="shares-vips">
		<cu-custom bgColor="bg-white" :isBack="false">
			<block slot="backText"></block>
			<block slot="content" class="title-text">分享</block>
		</cu-custom>


		<view class="content">
			<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
				<view class="flex_column">
					<view class="backgroundColor-white padding1vh border_radius_10px">
						<image :src="poster.finalPath || ''" mode="widthFix" class="posterImage"></image>
					</view>
					<view class="flex_row marginTop2vh">
						<button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
						<!-- 	<button type="primary" size="mini" @tap.prevent.stop="share()">分享图片</button> -->
					</view>
				</view>
			</view>
			<view class="img-default-class">
				<image src="https://img.0728jh.com/staticImg/authandphone.png"></image>
			</view>
			<button v-if="wxUser.nickName" class="haibao" :disabled="disabled" type="primary" @tap="shareFc()">生成海报</button>
			<button v-else class="haibao" type="primary" :disabled="disabled" @click="getUserProfile">生成海报</button>
			<view class="hideCanvasView">
				<canvas class="hideCanvas" :canvas-id="canvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
			</view>
		</view>




	</view>
</template>

<script>
	import api from '../api/home.js'
	import _app from '../../utils/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '../../utils/QS-SharePoster/QS-SharePoster.js';
	export default {
		data() {
			return {
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				wxUser: getApp().globalData.wxUser,
				baseBudding: {},
				Qcode: '',
				shareInfo: {},
				pconsultantList: [],
				disabled: true,
				nickName: '',
				projectItem: getApp().globalData.projectItem,
			}
		},
		created() {
			this.wxUser = getApp().globalData.wxUser
			this.baseBudding = getApp().globalData.BaseBudding
			let that = this

			that.getShareInfo()

			that.getShareCode()
		},

		methods: {

			getShareInfo: function() {
				let that = this;
				let id = getApp().globalData.projectItem.id
				that.http(api.ShareInfo + "/" + id, 'GET', {

				}, false).then(res => {
					console.log("分享")
					console.log(res)
					that.shareInfo = res.data
				})
			},

			userInfoGet: function() {
				let that = this
				this.http(api.userInfoGet, 'GET', {}, false)
					.then(res => {
						//	console.log("userInfoGet")
						//	console.log(res)
						// userInfo: res.data
						that.wxUser = res.data
						getApp().globalData.wxUser = res.data
						//that.getUserinfo() 			//刷新置业顾问
					})
			},

			//  async getuserinfo(e){
			// //		console.log(e)
			// 		if(e.detail.errMsg=="getUserInfo:ok"){ 
			// 			//TODO:跟新缓存
			// 		await this.getwxUserss(e.detail)
			// 		//this.PageCur = e.currentTarget.dataset.cur
			// 		this.shareFc()
			// 		}
			// 	},	
			getUserProfile(e) {
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				let that = this;
				wx.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						that.getwxUserss(res).then((reslut) => {
							that.shareFc()
						})

					}
				})
			},
			getwxUserss: function(value) {
				let that = this;
				return new Promise((r, l) => {
					that.http(api.wxUserSave, "POST", value, false).then(res => {
						console.log(res)
						that.wxUser = res.data
						getApp().globalData.wxUser = res.data
						r("success")
					})



				})
			},
			getwxUser: function(value) {
				let that = this;
				that.http(api.wxUserSave, "POST", value, false).then(res => {
					//			console.log(res)
					that.wxUser = res.data
					getApp().globalData.wxUser = res.data


				})
			},

			async getShareCode() {
				let that = this;


				let scene = '';
				let wxUser = getApp().globalData.wxUser
				console.log(wxUser)
				let project = getApp().globalData.projectItem
				//console.log(getApp().globalData.projectItem)
				// if(wxUser.userType=='1'){
				// 	scene=wxUser.id
				// }else{
				// 	scene=wxUser.invitee
				// }
				scene = 'age_' + project.affiliationCode + '_' + wxUser.userCode
				console.log(scene)
				let nickName = that.wxUser.realName ? that.wxUser.realName : that.wxUser.nickName
				if (nickName) {
					if (nickName.length > 4) {
						nickName = nickName.substring(0, 5)
					}
				} else {
					nickName = ""
				}



				//console.log(nickName)
				that.nickName = nickName + '向你推荐'
				console.log(scene)
				that.http(api.ShareCode, 'POST', {
					scene: scene,
					page: 'pages/index/index'
				}, false).then(res => {
					console.log("ShareCode")
					console.log(res)
					if (res.code == 0) {
						const fsm = wx.getFileSystemManager();
						const FILE_BASE_NAME = 'tmp_img_src';
						let filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.jpg`;
						//console.log(res.data)
						// that.baseqred=res.data;
						fsm.writeFile({
							filePath,
							data: res.data,
							encoding: 'base64',
							success(ress) {
								console.log("dizhi")
								console.log(filePath)
								that.Qcode = filePath
								//that.shareFc()
								//resolve(filePath)
								that.disabled = false
							},
							fail() {
								// this.canvasFlag=true;
								// uni.showToast({title:'海报生成失败',duration:2000,icon:'none'});
							},
						});
					}
				})
				//})

			},

			async shareFc() {
				let that = this;
				console.log("------------------------------查看分享数据列表---------------------------------------------")
				console.log(that.wxUser)
				console.log(that.projectItem)
				console.log(that.shareInfo)
				console.log(that.Qcode)
				console.log("------------------------------查看分享数据列表---------------------------------------------")
				try {
					//console.log('准备生成:' + new Date())
					console.log(that.Qcode);
					let fontColor = that.shareInfo.fontColor || 'black'

					const d = await getSharePoster({
						_this: that, //若在组件中使用 必传
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据
						},
						posterCanvasId: that.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						//backgroundImage:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589767098&di=5ef3ed2943a6b6f968657922a55e936c&imgtype=jpg&er=1&src=http%3A%2F%2Fattach.bbs.letv.com%2Fforum%2F201512%2F06%2F093810sxjxayyhtetxnhpn.jpg',
						drawDelayTime:200,
						backgroundImage: that.shareInfo.background,
						// background: {
						// 	width: 1080,
						// 	height: 1920,
						// 	backgroundColor: '#FFFFFF'
						// },
						// drawArray: ({}),
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							const dx = bgObj.width * 0.3;
							const fontSize = bgObj.width * 0.045;
							const lineHeight = bgObj.height * 0.04;

							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
							return new Promise((rs, rj) => {
								rs([
									// {
									// 	type: 'custom',

									// 	setDraw(Context) {
									// 		Context.setFillStyle('#FFFFFF');
									// 		Context.setGlobalAlpha(0.6);
									// 		Context.fillRect(0, bgObj.height - bgObj.height * 0.2, bgObj.width, bgObj.height * 0.2);
									// 		Context.setGlobalAlpha(1);
									// 	}
									// },
									// {
									// 	type: 'image',
									// 	url: this.Qcode,
									// 	alpha: 1,
									// 	dx:bgObj.width-bgObj.width*0.3,
									// 	serialNum:2,
									// 	dy: bgObj.height - bgObj.width * 0.3,
									// 	infoCallBack(imageInfo) {
									// 		let scale = bgObj.width * 0.2 / imageInfo.height;
									// 		return {

									// 			// circleSet: {
									// 			// 	x: imageInfo.width * scale / 2,
									// 			// 	y: bgObj.width * 0.2 / 2,
									// 			// 	r: bgObj.width * 0.2 / 2
									// 		//	}, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
									// 			dWidth: 200, // 因为设置了圆形图片 所以要乘以2
									// 			dHeight: 200,
									// 			/* roundRectSet: { // 圆角矩形
									// 				r: imageInfo.width * .1
									// 			} */
									// 		}
									// 	}
									// },

									{
										type: 'text',
										text: that.shareInfo.content,

										size: 40,
										color: fontColor,
										alpha: .8,
										textAlign: 'left',
										textBaseline: 'middle',
										lineFeed: {
											maxWidth: bgObj.width - 40,
											//maxWidth: 100,
											lineHeight: 50,
											lineNum: 1,
											dx: -1
										},
										infoCallBack(textLength) {

											return {
												dx: 20,
												dy: bgObj.height - bgObj.height * 0.18
											}
										}
									},
									{
										type: 'image',
										url: that.wxUser.headimgUrl,
										alpha: 1,
										dx: 20,
										serialNum: 2,
										dy: bgObj.height - (bgObj.width * 0.2) - 18,
										infoCallBack(imageInfo) {
											let scale = bgObj.width * 0.2 / imageInfo.height;
											return {
												circleSet: {
													x: imageInfo.width * scale / 2,
													y: bgObj.width * 0.2 / 2,
													r: bgObj.width * 0.2 / 2
												}, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
												dWidth: imageInfo.width * scale, // 因为设置了圆形图片 所以要乘以2
												dHeight: bgObj.width * 0.2,
												/* roundRectSet: { // 圆角矩形
													r: imageInfo.width * .1
												} */
											}
										}
									},
									{
										type: 'text',
										fontStyle: 'italic',
										text: that.projectItem.projectName,
										size: fontSize + 2,
										fontWeight: 'bold',
										color: fontColor,
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										lineFeed: {
											//  maxWidth: bgObj.width-100,
											maxWidth: 300,
											lineHeight: 50,
											lineNum: 1,
											dx: -1
										},
										infoCallBack(textLength) {
											_app.log('index页面的text的infocallback ，textlength:' + textLength);
											return {
												dx: bgObj.width * 0.25,
												dy: bgObj.height - lineHeight * 2.5
											}
										},
										serialNum: 0,
										id: 'tag1' //自定义标识
									},

									{
										type: 'text',
										text: that.wxUser.nickName,

										size: fontSize,
										color: fontColor,
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										serialNum: 1,
										lineFeed: {
											//  maxWidth: bgObj.width-100,
											maxWidth: 350,
											lineHeight: 50,
											lineNum: 1,
											dx: -1
										},
										allInfoCallback({ //v3.0.1 更新 可以获取drawArray中全部数据
											drawArray
										} = {}) {
											const obj = drawArray.find(item => item.id === 'tag1');
											/* return {
												dx: obj.dx,
												dy: obj.dy + lineHeight
											} */
											//也可以return promise对象
											return new Promise((rs, rj) => {
												setTimeout(() => {
													rs({
														dx: obj.dx,
														dy: obj.dy + lineHeight
													});
												}, 1);
											});
										}
									},
									{
										type: 'text',
										text: '向你推荐',

										size: fontSize,
										color: fontColor,
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										serialNum: 1,
										lineFeed: {
											//  maxWidth: bgObj.width-100,
											maxWidth: 350,
											lineHeight: 50,
											lineNum: 1,
											dx: -1
										},
										allInfoCallback({ //v3.0.1 更新 可以获取drawArray中全部数据
											drawArray
										} = {}) {
											const obj = drawArray.find(item => item.id === 'tag1');
											/* return {
												dx: obj.dx,
												dy: obj.dy + lineHeight
											} */
											//也可以return promise对象
											return new Promise((rs, rj) => {
												setTimeout(() => {
													rs({
														dx: obj.dx,
														dy: obj.dy + lineHeight + 55
													});
												}, 1);
											});
										}
									},
									// {
									// 	type: 'image',
									// 	url: that.Qcode,
									// 	alpha: 1,
									// 	dx:20,
									// 	serialNum:2,
									// 	dy: bgObj.height - bgObj.width * 0.3,
									// 	infoCallBack(imageInfo) {
									// 		let scale = bgObj.width * 0.2 / imageInfo.height;
									// 		return {
									// 			circleSet: {
									// 				x: imageInfo.width * scale / 2,
									// 				y: bgObj.width * 0.2 / 2,
									// 				r: bgObj.width * 0.2 / 2
									// 			}, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
									// 			dWidth: imageInfo.width * scale, // 因为设置了圆形图片 所以要乘以2
									// 			dHeight: bgObj.width * 0.2,
									// 			/* roundRectSet: { // 圆角矩形
									// 				r: imageInfo.width * .1
									// 			} */
									// 		}
									// 	}
									// },
								]);
							})
						},
						// textArray: ({

						// })=>{

						// },
						setDraw: ({
							Context,
							bgObj,
							type,
							bgScale
						}) => {
							// Context.setFillStyle('black');
							// Context.setGlobalAlpha(0.3);
							// Context.fillRect(0, bgObj.height - 400, bgObj.width, 400);
							Context.setGlobalAlpha(1);

							//Context.setFillStyle('white');
							// Context.setFontSize(50);
							// let text = '取舍'bgObj.width-bgObj.width*0.3,bgObj.height - bgObj.width * 0.3Qcode
							Context.drawImage(that.Qcode, bgObj.width - bgObj.width * 0.3, bgObj.height - bgObj.width * 0.268, 200, 200)
							//  Context.fillText(text, bgObj.width - text.length * 50 - 50, bgObj.height - 185);
						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
							that.poster = bgObj;
						}
					});
					//	console.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					that.poster.finalPath = d.poster.tempFilePath;
					that.qrShow = true;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					//console.log(JSON.stringify(e));
				}
			},
			toJSON() {

				return this;
			},
			saveImage() {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');

					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif


			},
			share() {
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
				// #endif

				// #ifndef APP-PLUS
				_app.showToast('分享了');
				// #endif
			},
			hideQr() {
				this.qrShow = false;

			}
		}
	}
</script>

<style>
	.img-default-class {
		padding: 100rpx 0rpx 0rpx 0rpx;
	}

	.haibao {
		margin-top: 150rpx;
	}

	.button-wrapper {
		width: 320rpx;
		height: 72rpx;
		position: absolute;
		bottom: 190rpx;
		left: 215rpx;
		z-index: 16;
		/* 	border:solid 1rpx #000000; */
	}

	.save_btn {
		/* border:solid 1rpx #000000; */
		font-size: 30rpx;
		line-height: 72rpx;
		color: #fff;
		width: 100%;
		height: 100%;
		text-align: center;
		border-radius: 45rpx;
		border-radius: 36rpx;
		z-index: 10;
	}

	.canvas {
		position: fixed !important;
		top: 0 !important;
		left: 0 !important;
		display: block !important;
		width: 100% !important;
		height: 100% !important;
		z-index: 10;
	}

	/* .view-canvas{
		width: 100%;
		height: 500rpx;
	} */
	.shares-vips {
		height: 100vh;
		background-color: #FFFFFF;
	}


	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 70vw;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
