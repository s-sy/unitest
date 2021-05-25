<template>
	<view class="verify-dp" v-if="(reviewsData.auditStatus =='0') || isShow ">
		
		<view class="verify-dp-verify-user">
			<verifyUser :user="reviewsData.userInfo" :isAnonymous="reviewsData.isAnonymous"></verifyUser>
		</view>
		
		<view class="verify-dp-content">
			{{reviewsData.content}}
		</view>
		<view class="">
			<verifyAction :disabled="reviewsData.auditStatus" @deleteItem="deleteItem" @ckeckdItem="ckeckdItem"></verifyAction>
		</view>
		
		<view class="">
			<view class="" v-for="items in reviewsData.listTopicReply">
				<verifyReply :replyData="items" @replycheck="replycheck" v-if="items.auditStatus=='0'"></verifyReply>
			</view>
		</view>
	</view>
</template>

<script>
	import verifyUser from '../verify-user/home.vue'
	import verifyAction from '../verify-action/home.vue'
	import verifyReply from '../verify-reply/home.vue'
		export default {
			props:{
				reviewsData:{
					type:Object,
					default:null,
				},
				index:{
					type:Number,
					default:0,
				}
				
			},
			data:function(){
				return {
					
				}
			},
			computed:{
				isShow:function(){
					let list=this.reviewsData
					
					if(list&&list.listTopicReply){
						let isshow = false
						let listReply=list.listTopicReply
						for(let item of listReply){
							if(item.auditStatus=='0'){
								isshow=true
							}
						}
						return isshow;
					}
						
				}
			},
			components:{
				verifyUser,
				verifyAction,
				verifyReply
			},
			methods:{
				replycheck:function(value){
					if(value){
						let ckeckdData={
							type:'dp',
							ckeckd:'',
							id:'',
							prentId:this.reviewsData.id
							}
						let ckeckd=value.ckeckd
						if(ckeckd=='A'){
							ckeckdData.ckeckd='1'
						}
						if(ckeckd=='B'){
							ckeckdData.ckeckd='2'
						}
					ckeckdData.id=value.id
						// console.log("查看ckeckdData")
						// console.log(ckeckdData)
						this.$emit('replyckeckdItem',ckeckdData)
					}
				},
				ckeckdItem(value){
					if(value){
						let ckeckdData={
							ckeckd:'',
							id:'',
							index:this.index
							}
						let ckeckd=value
						if(ckeckd=='A'){
							ckeckdData.ckeckd='1'
						}
						if(ckeckd=='B'){
							ckeckdData.ckeckd='2'
						}
					ckeckdData.id=this.reviewsData.id
						// console.log("查看ckeckdData")
						// console.log(ckeckdData)
						this.$emit('ckeckdItemDp',ckeckdData)
					}
					
				},
				deleteItem:function(){
					this.$emit('deleteItemDp')
				},
			}
	}
</script>

<style>
	.verify-dp{
		width:690rpx;
		box-shadow: 0rpx 0rpx 20rpx 4rpx #EEEEEE;
		margin:20rpx 30rpx 30rpx 30rpx;
		padding-bottom: 10rpx;
	}
	.verify-dp-content{
		padding:0rpx 20rpx 0rpx 110rpx;
	}
	.verify-dp-verify-user{
		
		
	}
/* 	.verify-dp-button{
		display: flex;
		padding:0rpx 30rpx;
		justify-content: flex-end;
	} */
</style>
