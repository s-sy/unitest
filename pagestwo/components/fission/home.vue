<template>
	<view class="fission-vips">
		<image v-if="fissionItem.headimgUrl" class="fission-imgs" :src="fissionItem.headimgUrl"></image>
		<view v-else class="fission-imgs fission-text">
			匿
		</view>
		<view class="fission-right">
			<view class="fission-right-name">
				{{fissionItem.nickName?fissionItem.nickName:'匿名'}}
			</view>
			<view class="fission-right-phone">
				{{fissionItem.phone}}
			</view>
			<view class="fission-right-time">
				{{fissionItem.createTime}}
			</view>
		</view>
		<image class="img-call" src="https://img.0728jh.com/staticImg/iphone_icon.png" @click="collMe"></image>
	</view>
</template>

<script>
	export default {
		props:{
			fissionItem:{
				type:Object,
				default: null,
			}
		},
		methods:{
			collMe:function(){
				
				
				uni.makePhoneCall({
				    phoneNumber: this.fissionItem.phone //仅为示例
				});
			}
		}
	}
</script>

<style>
	.fission-text{
		background-color: #EEEEEE;
		text-align: center;
		line-height: 80rpx;
	}
	.img-call{
		width:74rpx;
		height: 74rpx;
	}
	.fission-vips{
		display: flex;
		padding:20rpx 30rpx;
		width:690rpx;
		align-items: center;
	}
	.fission-right-name{
		font-size: 28rpx;
		line-height: 32rpx;
	}
	.fission-right-phone{
		font-size: 20rpx;
		line-height: 32rpx;
	}
	.fission-right-time{
		font-size: 18rpx;
		line-height: 32rpx;
	}
	.fission-imgs{
		height: 80rpx;
		width:80rpx;
		border-radius: 50%;
		
	}
	.fission-right{
		width:430rpx;
		padding-left: 20rpx;
	}
</style>
