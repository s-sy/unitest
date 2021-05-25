<template>
	
	<view class="">
		<view class="gz-vip">
			<image class="gz-img"  :src="content.url" > </image>
			<view class="gz-text"> {{content.content}} </view>
		</view>
		<view class="" v-if="isShowTX=='0'">
			<view class="gz-gz" v-if="content.btn" @click="toDetails" >
				{{content.btn}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'gz',
		props:{
			content: {
				content: String,
				url: String,
				btn: String,
				key: String,
			}
				},
			data:function(){
				return {
					isShowTX:getApp().globalData.interaction || '1'
				}
			},	
		methods:{
			toDetails: function() {
				console.log(this.content)
					// let toName= this.content.key='xp'?'flareUps-push':'';
					// console.log(toName)
					// uni.navigateTo({
						
					//     url: '../../pages/'+toName +'/home'
					// });
					switch(this.content.key){
					case 'gz' :
					//console.log('gz')
					// uni.redirectTo({
					//   url: '../../pages/apartementLayout/home'
					// });
					uni.navigateTo({
					    url: '../../../pagestwo/apartementLayout/home',
						success:function(){
							console.log("成功")
						},
						fail:function(){
							console.log('失败')
						}
					});
					break;
					case 'pl' :
					console.log('pl')
					uni.navigateTo({
					    url: '../../../pages/newsInformation/home'
					});
					break;
					case 'tx' :
					//console.log('tx')
					uni.navigateTo({
					    url: '../../../pages/newsInformation/home'
					});
					break;
					case 'dp' :
					//console.log('dp')
					uni.navigateTo({
					    url: '../../../pages/pReviewsPublish/home'
					});
					break;
					case 'xp' :
					//console.log('xp')
					uni.navigateTo({
					    url: '../../../pages/flareUps-push/home'
					});
					break;
				}
			}
		}		
	}
</script>


<style>
	.gz-img{
		width: 555rpx;
		height: 372rpx;
	}
	.gz-text{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:50rpx;
		text-align: center;
	}
	.gz-gz{
		width:268rpx;
		height:78rpx;
		background:rgba(22,204,246,1);
		border-radius:10rpx;
		font-size:32rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(255,255,255,1);
		text-align:center;
		line-height: 78rpx;
		margin-left: 241rpx;
	}
	.gz-vip{
		margin:147rpx 88rpx 54rpx 107rpx;
		border: dashed 1rpx #999999;
	}
</style>
