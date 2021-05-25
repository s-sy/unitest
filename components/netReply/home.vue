<template>
	<view class="netReply" v-if="user.auditStatus=='1' ">
		<view class="netReply-top">
			<image class="netReply-img" :src="user.userInfo.headimgUrl?user.userInfo.headimgUrl:'https://img.0728jh.com/staticImg/logo.png'" mode=""></image>
			<view class="netReply-top-right">
				<view class="netReply-name">
				 {{user.userInfo.nickName}}
				</view>
				<view class="netReply-date">
				 {{user.createTime | dateFifter}}
				</view>
			</view>
		</view>
		<view class="netReply-content">
			{{user.details}}
		</view>
		<view class="netReply-xian">
			
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			user:{
				type:Object,
				default:null,
			},
		},
		data:function(){
			return{
				wxUser:getApp().globalData.wxUser
			}
		},
		filters:{
			dateFifter:function(value){
				if(value){
					return value.substring(0,16)
				}
				return (value ||'').split(' ')[0]
			}
			
		},
		computed:{
			Iszan:function(){
				//console.log("看看用户")
				//console.log(this.user)
			}
		}
		
		
	}
</script>

<style>
	.netReply-xian{
		width:690rpx;
		height:1rpx;
		background:rgba(238,238,238,1);
		margin-left: 30rpx;
		margin-top:40rpx;
	}
	.netReply-content{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(102,102,102,1);
		line-height:48rpx;
		margin-left:32rpx ;
		margin-right: 29rpx;
	}
	.netReply-date{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(153,153,153,1);
		line-height:48rpx;
	}
	.netReply-name{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
		margin-top:47rpx;
		/* border:solid 1rpx #000000; */
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		max-width: 400rpx;
	}
	.netReply-top-right{
		padding-left: 22rpx;
		width:80%;
	}
	.netReply-img{
		width:88rpx;
		height:89rpx;
		margin-top:41rpx;
		margin-left:31rpx;
		border-radius: 50%;
		
	}
	.netReply-top{
		display: flex;
		width:100%;
	}
	.netReply{
		width:100%;
	}
</style>
