<template>
	<view class="" style="width:100%">
		<cu-custom bgColor="bg-white" :isBack="false">
			<block slot="backText"></block>
			<block slot="content" class="title-text">分享</block>
		</cu-custom>
		<view class="top-one">
			<view class="huatu">
				<image class="huatu"  :src="shareInfoList[checkIndex].background" mode="aspectFit"></image>
			</view>
			<view class="fc" :style="{'color':shareInfo.fontColor}">
				<view class="projectName font-overflow" >
					{{shareInfo.content}}
				</view>
				
				<view class="buttom-content">
					<image class="userImage" :src="wxUser.headimgUrl"></image>
					<view class="center-dstr" :style="{'color':shareInfo.fontColor}">
						<view class="text-title font-overflow" >
							{{projectItem.projectName}}
						</view>
						<view class="font-overflow">
							{{wxUser.realName?wxUser.realName: wxUser.nickName}}
						</view>
						<view class="font-overflow">
						向你推荐
						</view>
						
					</view>
					
						<image class="erweima" :src="Qcode" mode="aspectFill"></image>
						<view class="chang font-overflow">
							长按识别小程序码
						</view>
					
				
				</view>
				
				
			</view>
		</view>
		
		<view class="button-m">
			<button class="button-class" type="default" @tap="shareFc()">生成海报</button>
		</view>
		<view class="" style="width:710rpx;padding:0rpx 20rpx;">
			<scroll-view scroll-x="true" >
			
				<view class="view-class" >
				<block  v-for="(item,index) in shareInfoList">
					<view :class="index==checkIndex?'item-one':'item-two'" @click="onClick" :data-item="index">
						<view class="view-item">
							<image class="img-class" :src="item.background?item.background:'https://img.0728jh.com/1332139872148000768/material/b0911111-12b9-4255-a6b9-f16c3c90c3df.png'" mode="aspectFill" ></image>
						</view>
						<image v-if="index==checkIndex" class="check-is" src="https://img.0728jh.com/1332139872148000768/material/b0911111-12b9-4255-a6b9-f16c3c90c3df.png"></image>
					</view>
				</block>
				</view>
			</block>
			</scroll-view>	
		</view>
		
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
			<!-- <view class="img-default-class">
				<image src="https://img.0728jh.com/staticImg/authandphone.png"></image>
			</view> -->
		<!-- 	<button v-if="wxUser.nickName" class="haibao" :disabled="disabled" type="primary" @tap="shareFc()">生成海报</button>
			<button v-else class="haibao" type="primary" :disabled="disabled" @click="getUserProfile">生成海报</button> -->
			<view class="hideCanvasView">
				<canvas class="hideCanvas" id="default_PosterCanvasId" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
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
		data:function(){
			return {
				shareInfo:{},
				shareInfoList:[],
				checkIndex:0,
				poster: {},
				posterImage: '',
				canvasId: 'default_PosterCanvasId',
				qrShow: false,
				wxUser: getApp().globalData.wxUser,
				baseBudding: {},
				Qcode: '',
				pconsultantList: [],
				disabled: true,
				nickName: '',
				projectItem: getApp().globalData.projectItem,
				
			};
		},
		methods:{
			async getShareInfo() {
				let that = this;
				let id = getApp().globalData.projectItem.id
				return new Promise((res,rej)=>{
					that.http(api.ShareInfo + "/" + id, 'GET', {}, false).then((reslut)=>{
						// console.log("___________________________________")
						// console.log(reslut)
						// console.log()
						// console.log(Object.prototype.toString.call(reslut.data) == "[object Object]")
						
						
						
						
						if(Object.prototype.toString.call(reslut.data) == "[object Array]"){
							that.shareInfoList = reslut.data;
							that.shareInfo=reslut.data[0];
							res("success");
						}else{
								let sharelistcopy= [];
								sharelistcopy.push(reslut.data);
								that.shareInfoList=sharelistcopy;
								that.shareInfo=reslut.data;
							res("success");
						}
						
					})
				});
			},
			async getShareCode() {
				let that = this;
				let scene = '';
				let wxUser = getApp().globalData.wxUser
				console.log(wxUser)
				let project = getApp().globalData.projectItem
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
				that.nickName = nickName + '向你推荐'
				console.log(scene)
				
				
				return new Promise((l,r)=>{
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
									l(filePath);
								},
								fail() {
									// this.canvasFlag=true;
									// uni.showToast({title:'海报生成失败',duration:2000,icon:'none'});
								},
							});
						}
					})
				});
				
				//})
			
			},
			onClick(e){
				console.log(e);
				let iss=e.currentTarget.dataset.item
				console.log(iss)
				this.checkIndex=iss
				this.shareInfo=this.shareInfoList[iss];
			},
	async shareFc() {
				let that = this;
				// console.log("------------------------------查看分享数据列表---------------------------------------------")
				// console.log(that.wxUser)
				// console.log(that.projectItem)
				// console.log(that.shareInfo)
				// console.log(that.Qcode)
				// console.log("------------------------------查看分享数据列表---------------------------------------------")
				try {
					//console.log('准备生成:' + new Date())
					// console.log(that.Qcode);
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
									{
										// 
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
										dy: bgObj.height - (bgObj.width * 0.27) ,
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
									// that.projectItem.projectName
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
											maxWidth: 450,
											lineHeight: 50,
											lineNum: 1,
											dx: -1
										},
										infoCallBack(textLength) {
											_app.log('index页面的text的infocallback ，textlength:' + textLength);
											return {
												dx: bgObj.width * 0.27,
												dy: bgObj.height - lineHeight * 3.0
											}
										},
										serialNum: 0,
										id: 'tag1' //自定义标识
									},
// 
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
											maxWidth: 450,
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
											maxWidth: 370,
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
									{
										type: 'text',
										text: '长按识别小程序码',
										size: 40,
										color: fontColor,
										alpha: 1,
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
												dx: bgObj.width-bgObj.width*0.35,
												dy: bgObj.height - lineHeight * 0.6
											}
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
		},
		async created(){
			let that=this;
			that.projectItem= getApp().globalData.projectItem;
			that.wxUser=getApp().globalData.wxUser;
			
			let res =await that.getShareInfo()
			let shareCode = await that.getShareCode()
			console.log(shareCode)
			console.log(that.wxUser)
			console.log(that.projectItem);
			console.log(that.shareInfoList)
			console.log(res)
		}

	}
</script>
<style>
	.font-overflow{
		  white-space:nowrap;
		  overflow: hidden;
		  text-overflow: ellipsis;
		  font-size: 18rpx;
	}
	.center-dstr{
		width: 210rpx;
		margin-left: 10rpx;
		margin-top: 30rpx;
	}
	.chang{
		position: absolute;
		font-size: 18rpx;
		z-index: 9;
		left: 325rpx;
		bottom: 30rpx;
		
	}
	.text-title{
		font-weight: 500;
	}
	.projectName{
		margin-top: 640rpx;
	}
	.buttom-content{
		display: flex;
		
		
	}
	.erweima{
		margin-left: 20rpx;
		margin-top: 20rpx;
		height: 100rpx;
		width: 100rpx;
	}
	.userImage{
		margin-top: 20rpx;
		border-radius: 50%;
		width: 100rpx;
		height: 100rpx;
	}
	.button-m{
		margin:80rpx 0rpx;
	}
	.button-class{
		width: 50%;
		border-radius: 50rpx;
		border:solid #007AFF 1rpx;
		
	}
		.huatu{
			/* border:#007AFF solid 1rpx; */
			width: 487rpx;
			height: 850rpx;
		}
	.top-one{
		width: 487rpx;
		height: 850rpx;
		/* border:solid #000000 1rpx; */
		margin-top: 30rpx;
		display: flex;
		margin:auto;
	}
	.fc{
		width: 487rpx;
		height: 850rpx;
		position: absolute;
		padding-left: 10rpx;
		border:solid #4CD964 1rpx;
		
	}
	.item-one{
		display: flex;
		margin-right: 30rpx;
		border-radius: 10rpx;
		border: solid #007AFF 1rpx;
		box-shadow:  5px 10px 5px #888888;
	}
	.item-two{
		display: flex;
		margin-right: 30rpx;
		border-radius: 10rpx;
	}
	.img-class{
		width:140rpx;
		height: 180rpx;
	
	}
	.view-item{
		
	}
	.view-class{
		display: flex;
		
	}
	.kkk{
	/* 	height: 200rpx;
		width: 300rpx;
		border: #007AFF; */
	}
	.check-is{
		
		/* margin-top:-100rpx; */
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		z-index: 99;
		top:165rpx;
		margin-left: 118rpx;
	
		background: url('https://img.0728jh.com/1332139872148000768/material/b0911111-12b9-4255-a6b9-f16c3c90c3df.png') no-repeat;
		background-size: 100% 100%;
	}	
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
