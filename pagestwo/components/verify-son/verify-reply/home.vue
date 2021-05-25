<template>
	<view class="verifyreply" v-if="replyData.auditStatus=='0'">
		<view class="top">
			
		
		<image class="verigyreply-imgs" :src="replyData.userInfo.headimgUrl?replyData.userInfo.headimgUrl:''" mode=""></image>
		<view class="verifyreply-right">
			<view class="verifyreply-name">
			{{replyData.userInfo.nickName}}
			</view>
			<view class="verifyreply-content">
				{{replyData.details}}
			</view>
		<!-- 	<view class="">
				{{replyData.createTime}}
			</view> -->
		</view>
		</view>
		<verifyAction :disabled="replyData.auditStatus" @ckeckdItem="ckeckdItem" ></verifyAction>
	</view>
</template>

<script>
	import verifyAction from '../verify-action/home.vue'
	export default {
		props:{
			replyData:{
				type:Object,
				default:null,
			}
		},
		components:{
			verifyAction
		},
		data:function(){
			return {
				
			}
		},
		methods:{
			ckeckdItem:function(value){
				console.log(value)
				let items={
					ckeckd:value,
					id:this.replyData.id
				}
				this.$emit('replycheck',items)
			}
		}
	}
</script>

<style>
	.verigyreply-imgs{
		width:60rpx;
		height: 60rpx;
		background:rgba(229,229,229,1);
		border-radius:50%;
		/* margin-top :55rpx; */
	}
	.verifyreply{
		padding:10rpx 30rpx;
	}
	.verifyreply-name{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(99,149,160,1);
		line-height:48rpx;
	}
	.verifyreply-content{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:48rpx;
	}
	.verifyreply-right{
		padding-left: 27rpx;
		width:550rpx;
	}
	
	.verifyreply .top {
		display: flex;
		
	}
</style>
