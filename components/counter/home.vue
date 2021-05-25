<template>
	<view class="counter"   @click="chooseGW" :data-data="userInfo">
		<image class="counter-img " :src="userInfo.headimgUrl" mode="" ></image>
		<view  class="counter-right">
			<view class="counter-text">
				<view :class="isShow=='index'?'counter-text-name':'copy-counter-text-name'">
					{{userInfo.realName?userInfo.realName:userInfo.nickName}}
				</view>
				<!-- <view class="counter-text-jp">
					级别：砖石{{}}
					
				</view> -->
			</view>
			<view class="counter-b">
				<!-- <image  class="counter-b-img-two" src="https://img.0728jh.com/staticImg/erma_icon.png" mode="" @click="lookma"></image> -->
			<!-- 	<image  class="counter-b-img-one" src="https://img.0728jh.com/staticImg/iphone_icon.png" mode="" @click="callPhone"></image> -->
				
				
				<image  class="counter-b-img-one" src="https://img.0728jh.com/staticImg/chat_icon.png" mode="" @click="chartTo"></image>
				<!-- <image v-if="isShow == 'index'" class="counter-b-img-two" src="https://img.0728jh.com/staticImg/iphone_icon.png" mode="" @click="callPhone"></image> -->
				<!-- <image v-if="isShow == 'consultant'" class="counter-b-img-one" src="https://img.0728jh.com/staticImg/iphone_icon.png" mode="" @click="callPhone"></image>
				<image v-if="isShow == 'consultant'" class="counter-b-img-two" src="https://img.0728jh.com/staticImg/erma_icon.png" mode="" @click="lookma"></image> -->
			<!-- 	<view v-if="isShow == 'consultant'" class="counter-b-zaixian">
					在线咨询
				</view> -->
			</view>
			
		</view>
		<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image v-if="poster" :src="poster.finalPath || 'https://img.0728jh.com/staticImg/ma_icon.png'" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
					
				</view>
			</view>
			
		</view>
		<view class="hideCanvasView">
			<canvas class="hideCanvas" :canvas-id="canvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>
		
		
		<!-- <view class="">
			<UniPopup ref="UniPopup" type="center">
				<view class="bg-white">
					<image class="popup-img" :src="poster.finalPath || ''" mode="aspectFill"></image> -->
					<!-- <view class="popup-content">
						<image class="popup-img-ma" :src="userInfo.userQrcode?userInfo.userQrcode:'https://img.0728jh.com/staticImg/pic-jia.png'" @click="previewImage"  mode="aspectFit"></image>
						<view class="popup-text">
							保存二维码，添加置业顾问
							
						</view>
					</view> -->
			<!-- 	</view>
			</UniPopup>
		</view> -->
		
	</view>
</template>

<script>
	import _app from '../../utils/QS-SharePoster/app.js';
	import {getSharePoster} from '../../utils/QS-SharePoster/QS-SharePoster.js';
	import api from '../../pages/api/home.js'
	export default {
		props:{
			isShow:{
				type:String,
				default:'',
			},
			userInfo:{
				type:Object,
				default:null,
			},
		},
		computed:{
			y:function(){
				// console.log("查看渲染置业顾问列表")
				// console.log(this.userInfo)
			}
		},
		data:function(){
			return {
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				userQrcode:'',
			}
		},
		methods:{
			previewImage:function(){
			//	console.log("看二维码")
			//	console.log(this.userInfo.userQrcode)
				
					
				let userQrcode=[].push(this.userInfo.userQrcode)
			//	console.log(userQrcode)
			uni.previewImage({
					urls: userQrcode,
			})
				
			},
			chartTo(){
				uni.navigateTo({
					url:'/pagestwo/chart/home'
				})
			},
			chooseGW:function(e){
			//	console.log("选择置业")
				let that=this;
				let data=e.currentTarget.dataset.data
			//	console.log(data)
			//	console.log("开始发起")
			let id =getApp().globalData.projectItem.id
				that.http(api.GetShareInfno+'/distribution/'+data.id,'GET',{
					affId:id
				},false).then(res=>{
				//	console.log("结果")
				//	console.log(res)
					that.$parent.userInfoGet()
				})	
			},
			callPhone:function(){
				getApp().globalData.callMePhone=this.userInfo
				
				uni.makePhoneCall({
				    phoneNumber: this.userInfo.phone //仅为示例
				});
			},
			lookma:function(){
				this.poster={};
			//	console.log("看码")
				let userInfo=this.userInfo
				if(userInfo.userQrcode){
					this.userQrcode=userInfo.userQrcode.replace('http://','https://')
				}
				
			//	console.log(this.userInfo)
				
				if(!userInfo.userQrcode){
					uni.showToast({
						title:'该置业顾问还未上传二维码~',
						icon:'none',
						duration:3000,
					})
					return;
				}
				this.shareFc()
			// 	console.log(this.$refs.UniPopup)
				//this.$refs.UniPopup.open()
				
			},
			async shareFc() {
						try {
							console.log('准备生成:' + new Date())
							const d = await getSharePoster({
								_this: this, //若在组件中使用 必传
								type: 'testShareType',
								formData: {
									//访问接口获取背景图携带自定义数据
			
								},
								posterCanvasId: this.canvasId,	//canvasId
								delayTimeScale: 20, //延时系数
								//backgroundImage:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589767098&di=5ef3ed2943a6b6f968657922a55e936c&imgtype=jpg&er=1&src=http%3A%2F%2Fattach.bbs.letv.com%2Fforum%2F201512%2F06%2F093810sxjxayyhtetxnhpn.jpg',
								backgroundImage: 'https://img.0728jh.com/staticImg/ma_icon.png',
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
											// 		type:'text',
											// 	    text: this.shareInfo.content,
												   
											// 	    size: 40,
											// 	    color: 'black',
											// 	    alpha: .8,
											// 	    textAlign: 'left',
											// 	    textBaseline: 'middle',
											// 	    lineFeed: {
											// 	         maxWidth: bgObj.width-40,
											// 			//maxWidth: 100,
											// 	        lineHeight: 50,
											// 	        lineNum: 1,
											// 	        dx: -1
											// 	    },
											// 		infoCallBack(textLength) {
														
											// 		        return {
											// 		            dx: 20,
											// 		            dy: bgObj.height - bgObj.height * 0.22
											// 		        }
											// 		    }
											// },
											{
												type: 'image',
												url: this.userQrcode,
												alpha: 1,
												dx:bgObj.width*0.25,
												serialNum:2,
												dy: bgObj.height *0.5,
												infoCallBack(imageInfo) {
													console.log(bgObj)
													let scale = bgObj.width * 0.2 / imageInfo.height;
													return {
														// circleSet: {
														// 	x: imageInfo.width * scale / 2,
														// 	y: bgObj.width * 0.2 / 2,
														// 	r: bgObj.width * 0.2 / 2
														// }, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
														dWidth:bgObj.width*0.5, // 因为设置了圆形图片 所以要乘以2
														dHeight:bgObj.width * 0.5,
														/* roundRectSet: { // 圆角矩形
															r: imageInfo.width * .1
														} */
													}
												}
											},
											{
												type: 'text',
												//fontStyle: 'italic',
												text: '保存二维码，添加置业顾问',
												size: fontSize,
												color: 'black',
												alpha: 1,
												textAlign: 'left',
												textBaseline: 'middle',
												infoCallBack(textLength) {
													_app.log('index页面的text的infocallback ，textlength:' + textLength);
													return {
														dx: (bgObj.width - textLength)*0.5,
														dy: bgObj.height - lineHeight * 2
													}
												},
												serialNum: 0,
												id: 'tag1'	//自定义标识
											 },
											// {
											// 	type: 'text',
											// 	text: 'lk;lk;l',
											// 	fontWeight: 'bold',
											// 	size: fontSize,
											// 	color: 'black',
											// 	alpha: 1,
											// 	textAlign: 'left',
											// 	textBaseline: 'middle',
											// 	serialNum: 1,
											// 	allInfoCallback({	//v3.0.1 更新 可以获取drawArray中全部数据
											// 		drawArray
											// 	} = {}) {
											// 		const obj = drawArray.find(item => item.id === 'tag1');
											// 		/* return {
											// 			dx: obj.dx,
											// 			dy: obj.dy + lineHeight
											// 		} */
											// 		//也可以return promise对象
											// 		return new Promise((rs, rj) => {
											// 			setTimeout(() => {
											// 				rs({
											// 					dx: obj.dx,
											// 					dy: obj.dy + lineHeight+5
											// 				});
											// 			}, 1);
											// 		});
											// 	}
											// },
										
										]);
									})
								},
								setCanvasWH: ({
									bgObj,
									type,
									bgScale
								}) => { // 为动态设置画布宽高的方法，
									this.poster = bgObj;
								}
							});
							console.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
							this.poster.finalPath = d.poster.tempFilePath;
							this.qrShow = true;
							// let posterData={finalPath:d.poster.tempFilePath,qrShow:true}
							// this.$emit('posterData',posterData)
						} catch (e) {
							_app.hideLoading();
							_app.showToast(JSON.stringify(e));
							console.log(JSON.stringify(e));
						}
					},
					saveImage() {
						let that=this;
					//	console.log("点击保存")
						// #ifndef H5
						uni.saveImageToPhotosAlbum({
							filePath: this.poster.finalPath,
							success(res) {
								_app.showToast('保存成功');
								that.qrShow=false
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
						
					},
				
			
		}
		
	}
</script>

<style>
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
	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}
	.hideCanvasView {
		position: relative;
	}
	.popup-text{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
	.popup-content{
		margin-top:-399rpx;
		align-items: center;
		text-align: center;
		position: absolute;
		z-index: 99;
		padding-left: 85rpx;
	}
	.popup-img-ma{
		height: 240rpx;
		width: 285rpx;
		margin-bottom: 44rpx;
	}
	.popup-img{
		width:50vw;
	}
	.counter-b-zaixian{
		width: 124rpx;
		height: 55rpx;
		background:rgba(22,204,246,1);
		border-radius:6rpx;
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 55rpx;
	}
	.counter-b-img-two{
		width: 74rpx;
		height: 74rpx;
		margin:0rpx 25rpx 0rpx 37rpx;
	}
	.counter-b-img-one{
		width: 74rpx;
		height: 74rpx;
		
	}
	.counter-b{
		display: flex;
		align-items: center;
	}
	.counter-text-jp{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		margin-top:10rpx;
	}
	.counter-text{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.copy-counter-text-name{
		/* border:solid 1rpx #333333; */
		width:200rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.counter-text-name{
		/* border:solid 1rpx #333333; */
		width:300rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.counter-right{
		display: flex;
		width:554rpx;
		align-items: center;
		justify-content: space-between;
		margin-left: 20rpx;
	}
	.counter-img{
		width:85rpx;
		height: 85rpx;
		border-radius: 50%;
	}
	.counter{
		width:690rpx;
		display: flex;
		align-items: center;
		padding:41rpx 20rpx 43rpx 31rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 0rpx 22rpx 5rpx rgba(198,198,198,0.14);
		}
</style>
