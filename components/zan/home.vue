<template>
	<view class="zan" v-if="zandata.userInfo.headimgUrl&&zandata.userInfo.nickName">
		<image class="zan-icon" :src="zandata.userInfo.headimgUrl?zandata.userInfo.headimgUrl:'https://img.0728jh.com/staticImg/logo.png'" mode=""></image>
		<view class="zan-right">
			<view class="">
				<view class="">
					{{zandata.userInfo.nickName}}
				</view>
				<view class="">
					赞了你炫拍
				</view>
			</view>
			<view class="">
				{{zandata.userInfo.createTime | timeflfter}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			zandata:{
				type:Object,
				default:null,
			}
		},
		data:function(){
			return{
				
			}
		},
		filters:{
			timeflfter:function(value){
				if(value){
					return value.substring(14,20)
				}
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	.zan-right{
		width: 562rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 41rpx;
		padding-right: 30rpx;
	}
	.zan-icon{
		width:98rpx;
		height:99rpx;
		border-radius: 50%;
	}
	.zan{
		width:690rpx;
		display: flex;
		align-items: center;
		padding:34rpx 0rpx 33rpx 30rpx;
	}
	page{
		background-color: #FFFFFF;
	}
</style>
