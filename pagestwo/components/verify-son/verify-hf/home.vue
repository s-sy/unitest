<template>
	<view class="verify-hf" v-if="replyData.auditStatus =='0'">
		<view class="verify-hf-verify-user">
			<verifyUser :user="replyData.userInfo"></verifyUser>
		</view>
		
		<view class="verify-hf-details">
			{{replyData.details}}
		</view>
		<view class="flex padding-left-lg">
			<view class="flex align-center">
				<view class="">
					户型名称：
				</view>
				<view class="">
					{{replyData.apartmentLayout.name}}
				</view>
			</view>
			<view class="flex margin-left-lg align-center">
				<view class="">
					户型面积：
				</view>
				<view class="">
					{{replyData.apartmentLayout.floorage}}
				</view>
			</view>
		</view>
		<view class="">
			<verifyAction :disabled="replyData.auditStatus" @deleteItem="deleteItem" @ckeckdItem="ckeckdItem"></verifyAction>
		</view>
	</view>
</template>

<script>
	import verifyUser from '../verify-user/home.vue'
	import verifyAction from '../verify-action/home.vue'
	export default {
		props:{
			replyData:{
				type:Object,
				default:null,
			}
		},
		data:function(){
			return {
				
			}
		},
		components:{
			verifyUser,
			verifyAction
		},
		methods:{
			ckeckdItem:function(value){
				if(value){
					let ckeckdData={
						ckeckd:'',
						id:'',
						}
					let ckeckd=value
					if(ckeckd=='A'){
						ckeckdData.ckeckd='1'
					}
					if(ckeckd=='B'){
						ckeckdData.ckeckd='2'
					}
				ckeckdData.id=this.replyData.id
					// console.log("查看ckeckdData")
					// console.log(ckeckdData)
					this.$emit('ckeckdItemHf',ckeckdData)
				}
			},
			deleteItem:function(){
				this.$emit('deleteItemHf')
			}
		}
	}
</script>

<style>
	.verify-hf-details{
		padding:10rpx 40rpx;
	}
	.verify-hf{
		width:690rpx;
		box-shadow: 0rpx 0rpx 20rpx 4rpx #EEEEEE;
		margin:20rpx 30rpx 30rpx 30rpx;
		padding-bottom: 10rpx;
	}
</style>
