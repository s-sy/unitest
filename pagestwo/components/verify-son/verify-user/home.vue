<template>
	<view class="verify-user">
		<view class="image" v-if="isAnonymous=='1'">
			匿
		</view>
		<image v-if="isAnonymous!='1'" mode="" :src="user.headimgUrl?user.headimgUrl:''"></image>
		<view class="name">
			{{isAnonymous=='1'?'匿名用户':user.nickName}}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			user:{
				type:Object,
				default:null
			},
			isAnonymous:{
				type:String,
				default:'',
			}
		}
	}
</script>

<style>
	.verify-user{
		display: flex;
		align-items: center;
		padding:20rpx;
	}
	.verify-user image {
		width:70rpx;
		height: 70rpx;
		border-radius: 50%;
		/* border:solid 1rpx #000000; */
		
	}
	.image{
		width:70rpx;
		height: 70rpx;
		border-radius: 50%;
		background-color: #EEEEEE;
		line-height: 70rpx;
		align-items: center;
		text-align: center;
	}
    .name {
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
		padding:0rpx 20rpx;
		width:560rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		/* border:solid 1rpx #000000; */
	}
</style>
