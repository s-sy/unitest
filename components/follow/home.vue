<template>
	<view class="follow-yet" @click="toDetails" :data-id="followData.id">
		<view class="follow-yet-top">
			<view class="follow-title">
				{{BaseBudding.projectName}}{{followData.type}}
			</view>
		<!-- 	<image class="follow-title-img" src="https//img.kehuoa.com/staticImg/bianji_icon.png" mode=""></image> -->
		</view>
		
		<view class="follow-yet-bottom">
			<image class="follow-yet-bottom-img" :src="followData.src?followData.src:'https://img.0728jh.com/staticImg/banner_pic.png'" mode=""></image>
			<view class="follow-yet-bottom-right">
				<view class="follow-yet-bottom-right-top">
					<view class="">
						{{followData.floorage}}㎡
					</view>
					<view class="margin-lr-sm">
						{{followData.name}}
					</view>
				</view>
				<view class="follow-yet-bottom-right-center">
					{{BaseBudding.address}}
				</view>
				<view class="follow-yet-bottom-right-btm">
					<view class="ollow-yet-bottom-right-btm-text">
						{{jieke}}
					</view>
					<view class="ollow-yet-bottom-right-btm-btn" @tap.stop="callMe">
						联系我们
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>
<script>
	export default {
		
		props:{
			followData:{
				type:Object,
				default:null
			}
		},
		data(){
			return {
				BaseBudding:''
			}
		},
		computed:{
			jieke:function(){
				let followData=this.followData
				let BaseBudding=this.BaseBudding				
				if(BaseBudding&&followData){	
					let floorage=parseFloat(followData.floorage)
					let price=parseFloat(followData.price)
					let basePrice=parseFloat(BaseBudding.price);
					let total=((floorage*price)/10000).toFixed(2)
					//console.log('总价')
					//console.log(total)
					if(!total){
						total=((floorage*basePrice)/10000).toFixed(2)
					}
					if(!total){
						return "总价待定";
					}
					return '约'+total+'万/套';
				} 
			}
		},
		methods:{
			callMe:function(){
				//console.log("dianhua ")
				let BaseBudding =this.BaseBudding
				let callMePhone= getApp().globalData.callMePhone
				console.log(callMePhone)
				let phoneNum;
				if(callMePhone){
					phoneNum=callMePhone.phone ;
				}
				
				if(!callMePhone){
					phoneNum=BaseBudding.premisesMobile
				}
				uni.makePhoneCall({
				    phoneNumber: phoneNum
				});
			},
			toDetails:function(e){
			//	console.log(e)
				let id = e.currentTarget.dataset.id
				uni.navigateTo({
					url:'/pagestwo/layoutDetails/home?id='+id
				})
			},
		},
		mounted(){
			this.BaseBudding=getApp().globalData.BaseBudding
			//console.log(this.BaseBudding)
		}
		
	}
</script>

<style>
	.ollow-yet-bottom-right-btm-btn{
		width:150rpx;
		height:60rpx;
		background:rgba(0,202,232,1);
		border-radius:12rpx;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 60rpx;
	}
	.ollow-yet-bottom-right-btm-text{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(249,74,71,1);
	}
	.follow-yet-bottom-right-btm{
		
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.follow-yet-bottom-right-center{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		margin-top: 20rpx;
		line-height: 25rpx;
		height: 50rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.follow-yet-bottom-right-top{
		display: flex;
		align-items: center;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
	}
	.follow-yet-bottom-right{
		width:420rpx;
		padding:0rpx 39rpx 0rpx 32rpx;
	}
	.follow-yet-bottom-img{
		width:250rpx;
		height:190rpx;
		background:rgba(248,248,248,1);
		border-radius:20rpx;
	}
	.follow-yet-bottom{
		display: flex;
		padding-top:30rpx;
		width: 100%;
	}
	.follow-title-img{
		height: 28rpx;
		width: 28rpx;
	}
	.follow-yet-top{
		display: flex;
		justify-content: space-between;
		border-bottom: solid 1rpx #E5E5E5;
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		align-items: center;
		padding-bottom: 30rpx;
	}
	.follow-yet{
		padding:30rpx 30rpx 30rpx 20rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 5rpx 19rpx 2rpx rgba(213,213,213,0.22);
		border-radius:31rpx;
		width:100%;
	}
</style>
