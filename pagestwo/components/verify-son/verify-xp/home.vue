<template>
	<view class="verify-xp" v-if="(flareUpsData.auditStatus =='0') || isShow ">
		<view class="verify-xp-verify-user">
			<verifyUser :user="flareUpsData.userInfo"></verifyUser>
		</view>
		<view class="verify-xp-content-text">
			{{flareUpsData.content}}
		</view>
		<view class="verify-xp-content-img">
			<block v-for="item in flareUpsData.picUrls">
			<image :src="item" mode="aspectFill"></image>
			</block>
		</view>
		
		<view class="">
			<verifyAction :disabled="flareUpsData.auditStatus"  @deleteItem="deleteItem" @ckeckdItem="ckeckdItem"></verifyAction>
		</view>
		<view class="">
			<view class="" v-for="items in flareUpsData.listTopicReply">
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
			flareUpsData:{
				type:Object,
				default:null,
			}
		},
		computed:{
			isShow:function(){
				let list=this.flareUpsData
				
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
		data:function(){
			return {
				
			}
		},
		components:{
			verifyUser,
			verifyAction,
			verifyReply
		},
		methods:{
			replycheck(value){
				if(value){
					let ckeckdData={
						type:'xp',
						ckeckd:'',
						id:'',
						prentId:this.flareUpsData.id
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
				ckeckdData.id=this.flareUpsData.id
					// console.log("查看ckeckdData")
					// console.log(ckeckdData)
					this.$emit('ckeckdItemXp',ckeckdData)
				}
				
			},
			deleteItem(){
				
				console.log('xp组件')
				this.$emit('deleteItemXp')
			}
		}
	}
</script>

<style>
	.verify-xp{
		width:690rpx;
		box-shadow: 0rpx 0rpx 20rpx 4rpx #EEEEEE;
		margin:20rpx 30rpx 30rpx 30rpx;
		padding-bottom: 10rpx;
	}
	.verify-xp-content-text{
		padding:10rpx 30rpx;
	}
	.verify-xp-content-img{
		padding-left: 30rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.verify-xp-content-img image{
		
	/* 	border:solid 1rpx #000000; */
		height: 200rpx;
		width: 200rpx;
		border-radius:10rpx;
		margin-right:15rpx;
		margin-bottom: 15rpx;
	}
</style>
