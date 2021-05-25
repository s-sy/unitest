<template>
	<view class="contactUs-push" v-if="isShowTX">
		<cu-custom bgColor="" :isBack="true">
				 <block slot="backText"></block>
				 <block slot="content" class="title-text">发布炫拍</block>
		</cu-custom>
		<view class="">
				<textarea class="contactUs-push-textares" placeholder-class="contactUs-push-textare" value="" placeholder="请输入说明文字..." @input="flareUpPushTexttarea"></textarea>
		</view>
			<view class="">
				<movable-area class="contactUs-push-movable-area">
				<block v-for="(item,index) in tempImage">
					<view class="" v-if="tempImage.length>0" v-on:longpress="longtap" :data-index='index' @click="previewImg">
						<text class="cuIcon-roundclosefill contactUs-push-icon" @click="deteleImg" :data-idx="index"></text>
						<image class="contactUs-push-imgs" :src="item" mode="aspectFill" ></image>
						
					</view>
				</block>
					<movable-view >
						<image v-if="movableImg" class="contactUs-push-imgs" :src="movableImg" mode=""></image>
					</movable-view>
					<view class="" v-if="tempImage.length<9">
						<image class=".contactUs-push-img" src="https://img.0728jh.com/staticImg/pic-jia.png" mode="" @click="uploadimg"></image>
					</view>
				</movable-area>
			</view>
			<view class="contactUs-push-warring">
				一次最多上传9张图片哦
			</view>
			<view  class="contactUs-push-commit" hover-class="contactUs-push-dian-commit" @click="upload">确认发布</view>
	</view>
	<!-- <view class="">
		
	</view> -->
</template>

<script>

import api from '../../pages/api/home.js'
	export default {
		data:function(){
			return {
				tempImage:[],
				movableImg:'',
				textareaValue:'',
				isShowTX:false,
			}
		},
		methods:{
			deteleImg:function(e){
				let index=e.currentTarget.dataset.idx
				this.tempImage.splice(index,1)
			},
			previewImg:function(e){
				let index=e.currentTarget.dataset.index
				uni.previewImage({
					current:index,
					urls:this.tempImage
				})
				
			},
			flareUpPushTexttarea:function(e){
				console.log(e)
				this.textareaValue= e.detail.value
				
			},
			longtap:function(e){
				let that=this;
				let index = e.currentTarget.dataset.index
				that.movableImg=that.tempImage[index]
				console.log(index)
				
			},
			isAuth(){
				if(!getApp().globalData.wxUser.nickName){
					uni.showToast({
					    title: '请先授权',
						icon:'none',
					    duration: 3000
					});
					return;
				}
			},
			uploadimg:function(){
				
				let that=this;
				that.isAuth()
				uni.chooseImage({
					count:9 - that.tempImage.length,
					sizeType:['compressed'],
					sourceType:['album','camera'],
					
					success:(res)=>{
						console.log(res)
						let tempFilePaths=res.tempFilePaths
						
						that.qiniuupload(0,tempFilePaths,tempFilePaths.length)
					
						console.log(that.tempImage)
						
	
					
					}
				})
			},
			upload:function(){
				let that=this;
				// that.tempImage
				let str=that.textareaValue.replace(/\s*/g,"")
				// if(!str || that.tempImage.length==0){
				// 	uni.showToast({
				// 		title:'请填写完整信息',
				// 		icon:'none',
				// 		duration:2000
				// 	})
				// 	return;
				// }
				let id = getApp().globalData.projectItem.id
				that.http(api.Awesomeshooting,'POST',{
					picUrls:that.tempImage,
					content:that.textareaValue,
					affiliationId:id
				},false).then(res=>{
					console.log(res)
					if(res.data==true){
						uni.showToast({
							title:'发布成功',
							icon:'none',
							duration:2000
						})
						setTimeout(()=>{
							
								uni.navigateBack({
									delta:2
								})
							
						},1000)
					}
				})
				
				
			},
			qiniuupload:function(i,data,length){
				let that=this;
				console.log("qiniuupload")
				console.log(wx.getAccountInfoSync().miniProgram.appId)
				console.log()
				uni.uploadFile({
					url:api.UpLoad,
					files:data,
					filePath: data[i],
					name: 'file',
					fileType:'image',
					header:{
						'app-id': wx.getAccountInfoSync().miniProgram.appId,
						'third-session': getApp().globalData.thirdSession
					},
					formData:{
						dir:'material',
						fileType:'image',
						},
					success:(res)=>{
						console.log(res)
						this.tempImage.push(JSON.parse(res.data).link)
						i=i+1
						if(i<length){
							that.qiniuupload(i,data,length)
						}
					}
				})
			}
		},
		onLoad() {
			console.log(getApp().globalData.interaction)
			this.isShowTX= getApp().globalData.interaction=="0"?true:false
		}
	}
</script>
<style>
	.contactUs-push-dian-commit{
		box-shadow: 0rpx 0rpx 2rpx 1rpx rgba(22,204,246,1);
	}
	.contactUs-push-commit{
		width:690rpx;
		height:88rpx;
		background-color: rgba(22,204,246,1);
	
		border-radius:10rpx;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 88rpx;
		margin-left: 30rpx;
	}
	.contactUs-push-warring{
		margin-top:40rpx;
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		margin-left: 67rpx;
		margin-top:40rpx;
		margin-bottom: 151rpx;
	}
	
	.contactUs-push-imgs{
		width:211.8rpx;
		height: 209rpx;
		margin:15rpx;
	}
	.contactUs-push-icon{
		position: absolute;
		z-index: 99;
		margin-top:20rpx;
		margin-left:190rpx;
	}
	.contactUs-push-img{
		width: 212rpx;
		height: 212rpx;
		margin:15rpx;
	}
	.contactUs-push-movable-area{
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		padding-left: 15rpx;
	}
	.img-item{
		margin-left: 15rpx;
	}
	.push-home{
		
	}
	.contactUs-push-textares{
		height: 300rpx;
		width:100%;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:#333333;
		padding:20rpx 29rpx 30rpx 31rpx;
	}
	.contactUs-push-textare{
		height: 300rpx;
		width:100%;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		padding:20rpx 29rpx 30rpx 31rpx;
	}
	.contactUs-push{
		height: 100vh;
		background-color: #FFFFFF;
	}
	
</style>
