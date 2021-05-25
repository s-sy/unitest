<template>
	<view class="">
		<view class="reply-xian">
			
		</view>
		<view class="reply-total">
			
			<image class="reply-reply-img" src="https://img.0728jh.com/staticImg/logo.png"></image>
			<view class="reply-reply-text">
				<view class="reply-reply-text-one">
					TJJ金币V
				</view>
				<view class="reply-reply-text-two">
					2020-03-05
				</view>
				<view class="reply-reply-text-shr">
					工作人员会说清楚吧
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data:function(){
			return {
				
			}
		},
		methods:{
			
		},
		filters:{
			dateFilter:function(value){
				return (value || '').split(' ')[0]
			}
		}
	}
</script>

<style>
	.reply-xian{
		width:630rpx;
		height:1rpx;
		background:rgba(242,242,242,1);
		margin: 37rpx 30rpx 34rpx 30rpx;
	}
	.reply-reply-text-shr{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:48rpx;
	}
	.reply-reply-text-two{
		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:48rpx;
	}
	.reply-reply-text-one{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
		line-height:48rpx;
	}
	.reply-reply-text{
		margin-left: 25rpx;
	}
	.reply-reply-img{
		width:75rpx;
		height:75rpx;
		border-radius:50%;
	}
	.reply-total{
		display: flex;
		padding:27rpx 30rpx 33rpx 30rpx;
	}
</style>
