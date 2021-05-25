<template>
	<view class="user-vips" >
		<image class="user-img" :src="user.headimgUrl"></image>
		<view class="user-name-text">{{user.realName?user.realName:user.nickName}}</view>
	</view>
</template>

<script>
	export default {
		props:{
			user:{
				type:Object,
				default:null,
			}
			
			
		},
		data:function(){
			return {
				
			}
		},
		computed:{
			Y:function(){
			//	console.log("查看user")
			//	console.log(this.user)
			}
		},
		methods:{
			
		},
	}
</script>

<style>
	.border-vips{
		border:solid 1rpx #000000;
	}
	.user-name-text{
		margin-left:30rpx
	}
	.user-img{
		width:75rpx;
		height:75rpx;
		border-radius: 50%;
		
	}
	.user-vips{
		display: flex;
		align-items: center;
		
		width: 690rpx;
		
	}
</style>
