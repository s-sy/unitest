<template>
	<view class="verify-wd" v-if="(questionsData.auditStatus =='0') || isShow ">
		<view class="verify-wd-verify-user" >
			<verifyUser :user="questionsData.userInfo"></verifyUser>
		</view>
		<view class="verify-wd-content">
			{{questionsData.content}}
		</view>
		<view>
			<verifyAction :disabled="questionsData.auditStatus" @deleteItem="deleteItem" @ckeckdItem="ckeckdItem"></verifyAction>
		</view>
		
		<view class="">
			<view class="" v-for="items in questionsData.listTopicReply">
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
			questionsData:{
				type:Object,
				default:null,
			}
		},
		data:function(){
			return {
				
			}
		},
		computed:{
			isShow:function(){
				let list=this.questionsData
				
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
						type:'wd',
						ckeckd:'',
						id:'',
						prentId:this.questionsData.id
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
						}
					let ckeckd=value
					if(ckeckd=='A'){
						ckeckdData.ckeckd='1'
					}
					if(ckeckd=='B'){
						ckeckdData.ckeckd='2'
					}
				ckeckdData.id=this.questionsData.id
					// console.log("查看ckeckdData")
					// console.log(ckeckdData)
					this.$emit('ckeckdItemWd',ckeckdData)
				}
				
			},
			deleteItem:function(){
				this.$emit('deleteItemWd')
			}
		}
	}
</script>

<style>
	.verify-wd-content{
		padding:10rpx 30rpx;
	}
	.verify-wd{
		width:690rpx;
		box-shadow: 0rpx 0rpx 20rpx 4rpx #EEEEEE;
		margin:20rpx 30rpx 30rpx 30rpx;
		padding-bottom: 10rpx;
	}
</style>
