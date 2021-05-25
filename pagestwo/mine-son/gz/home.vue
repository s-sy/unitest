<template>
	<view class="gz-vips">
		
			<cu-custom bgColor="" :isBack="true">
				<block slot="backText"></block>
				<block slot="content" class="title-text">关注户型</block>
			</cu-custom>
			<kong v-if="followDatas.length==0" v-bind:content='contents' ></kong>
			<view v-else class="gz-has">
				 <!-- <follow></follow> -->
				 <uniSwipeAction  >
				 	<uniSwipeActionItem v-for="(item,index) in followDatas" :options="options" :key="item.id" @change="swipeChange" @click="swipeClick($event,index)">
				 		 <follow :followData="item.apartmentLayout">
							 
						 </follow>
				 	</uniSwipeActionItem>
				 </uniSwipeAction>
			</view>	
	</view>
	
</template>

<script>
	import api from '../../../pages/api/home.js'
	export default {
		name:'gz',
	
		data: function(){
			return {
				followDatas:[],
				options: [{
					text: '取消关注'
				}],
				swipeList: [
					{
					options: [{
						text: '取消关注',
						style: {
							backgroundColor: '#FFFFFF',
							colo:'#',
						}
					}],
					id: 0,
					content: 'item1'
				}, 
				{
					id: 1,
					options: [{
						text: '置顶'
					}, {
						text: '删除',
						style: {
							backgroundColor: 'rgb(255,58,49)'
						}
					}],
					content: 'item2'
				}, 
				{
					id: 2,
					options: [{
						text: '置顶'
					}, {
						text: '标记为已读',
						style: {
							backgroundColor: 'rgb(254,156,1)'
						}
					}, {
						text: '删除',
						style: {
							backgroundColor: 'rgb(255,58,49)'
						}
					}],
					content: 'item3'
				}],
				contents:{
					content:"暂时没有关注户型哦~",
					url:"https://img.0728jh.com/staticImg/konghu_gz.png",
					btn:"去关注",
					key:'gz',
				}
				
		   }
		},
		 methods:{
				toDetails:function(e){
					console.log(e)
				},
			 getApartmentConcern:function(){
				 let that=this;
			 	this.http(api.getApartmentConcern2,'GET',{
			 		attentionType:'6',
			 		userId:getApp().globalData.wxUser.id,
					affiliationId:getApp().globalData.projectItem.id
			 	},false).then(res=>{
			 		console.log("我的关注列表")
			 		console.log(res)
					that.followDatas=res.data
			 	})
			 },
			 goconcern:function(ids){
				 let that=this;
			 	this.http(api.ApartmentConcern,'POST',{
			 		id: ids,
			 		attentionType:'6',
			 		userId:getApp().globalData.wxUser.id
			 	},false).then(res=>{
			 		console.log("取消关注")
			 		console.log(res)
					that.getApartmentConcern()
			 	})
			 },
			 swipeChange:() =>{
				 console.log('index')
			 },
			 swipeClick:function(e,index){
				 console.log(e)
				 console.log(index)
				 let that=this;
				 console.log(this)
				 console.log(this.followDatas)
				 let ids = that.followDatas[index].apartmentLayout.id
				 that.goconcern(ids)
			 },
		    onClick(e){
		      console.log('当前点击的是第' + e.index + '个按钮，点击内容是'+e.content.text)
		    },
		    change(open){
		      console.log('当前开启状态:' + open)
		    }
			
		  },
		  
		onLoad: function(){
			console.log("11111")
			this.getApartmentConcern()
		}
	}
</script>

<style>
	.gz-has{
		padding: 0rpx 30rpx;
	}
	.gz-vips{
		height:100vh;
		background:rgba(255,255,255,1);
	}
	page{
		background-color: #FFFFFF;
	}
</style>
