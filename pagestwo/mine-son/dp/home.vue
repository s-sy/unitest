<template>
	<view class="dp-vips">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="title-text">我的点评</block>
		</cu-custom>
			
			<kong v-if="dpData.length==0 && answersList.length==0" v-bind:content='contents' ></kong>
			<view v-else>
				<view class="wd-conter">
					<view class="wd-conter-left">
						<view class="wd-conter-tw" :class="key=='tw'?'wd-conter-color':''" @click="changeTWorHD" data-key="tw">
							我提的问
						</view>
						<view class="wd-xian" :class="key=='tw'?'wd-xian-copy':''">
							
						</view>
					</view>
					<view class="wd-conter-right">
						<view class="wd-conter-hd" :class="key=='hd'?'wd-conter-color':''" @click="changeTWorHD" data-key="hd">
							我回答的
						</view>
						<view class="wd-xian" :class="key=='hd'?'wd-xian-copy':''">
							
						</view>
					</view>
				</view>
				<view class="" v-if="key=='tw'">
					
				
					<view class="" v-for="item in dpData">
						<view class="dp-vips-item" @click="topReviewsDetails" :data-item="item">
							<comment :wxUser="wxUser" :swiperItem="item"></comment>
						</view>
					
					</view>
				</view>
				
				
				<view class="" v-if="key=='hd'">
					<view class="wd-total" v-for="item in answersList" @click="topReviewsDetails" :data-item="item.reviews">
						
						
						
						
						<view class="">
							<view class="wd-hd-textandimg">
								<!-- <image class="wd-hd-img" src="https://img.0728jh.com/staticImg/wen_.png" mode=""></image> -->
								<view class="wd-hd-text">
									   {{item.reviews.content}}
								</view>
							
							</view>
						</view>
						<view class="" >
							<view class="wd-hd-item">
								<image class="wd-hd-item-img" :src="wxUser.headimgUrl?wxUser.headimgUrl:'https://img.0728jh.com/staticImg/logo.png'" mode=""></image>
								<view class="wd-hd-item-name">
									{{wxUser.nickName}}
								</view>
							</view>
							<view class="wd-hd-item-content">
								{{item.details}}
							</view>
							<view class="wd-hd-item-dateAndpl">
								<view class="">
									{{item.createTime}}
								</view>
								<!-- <view class="wd-hd-bottom">
									<image class="wd-hd-pl" src="https://img.0728jh.com/staticImg/ping_icon.png" mode=""></image>
									<view class="">
										2
									</view>
								</view> -->
							</view>
						</view>
					  </view>
				</view>
			</view>
		
	</view>
	
</template>

<script>
	import api from '../../../pages/api/home.js'
	export default {
		name:'dp',
		data: function(){
			return {
				dpData:[],
				contents:{
					content:"暂时没有点评哦，快去点评吧",
					url:"https://img.0728jh.com/staticImg/kong_dp.png",
					btn:"去点评",
					key:'dp',
				},
				isShowTX:'',
				key:'tw',
				answersList:'',
				wxUser:getApp().globalData.wxUser
		   }
		},
		methods:{
			changeTWorHD:function(e){
				this.key =e.currentTarget.dataset.key
			},
			GetTopicreply:function(){
				let that=this;
				let id = getApp().globalData.projectItem.id
				that.http(api.GetTopicreply,'GET',{  
					current: 1,
					size: 5,
					replyTypes:'2' ,
					affiliationId:id
				},false).then(res=>{
					console.log("我的点评回答")
					console.log(res)
					that.answersList=res.data.records
				})
			},
			getreadingReviews:function(){  //楼盘点评
					let that=this;
					let id = getApp().globalData.projectItem.id
					that.http(api.ReadingReviews,'GET',{
						current: 1,
						size: 2,
						auditStatus:1,
						userId:getApp().globalData.wxUser.id,
						//userId:getApp().globalData.wxUser.id
						affiliationId:id
					},false).then(res=>{
						console.log("楼盘点评")
						console.log(res)
						that.dpData=res.data.records
					})
				},
			topReviewsDetails:function(e){
				console.log(e)
				let id = e.currentTarget.dataset.item.id
				uni.navigateTo({
					url:'../../pReviewsDetails/home?id='+id
				})
			}
		},
		
		
		onLoad: function(){
			console.log("11111")
			this.getreadingReviews()
			this.isShowTX=getApp().globalData.interaction || '1'
			this.GetTopicreply()
		}
	}
</script>

<style>
	.wd-total{
		box-shadow:0rpx 0rpx 22rpx 5rpx rgba(198,198,198,0.13);
		margin:20rpx 30rpx 20rpx 30rpx;
		padding:20rpx 0rpx;
	}
	.wd-hd-bottom{
		display: flex;
		align-items: center;
		
	}
	.wd-hd-pl{
		width:30rpx;
		height:27rpx;
		margin-right: 10rpx;
	}
	.wd-hd-item{
		display: flex;
		align-items: center;
	}
	.wd-hd-item-dateAndpl{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width:690rpx;
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:48rpx;
		margin-left: 30rpx;
	}
	.wd-hd-item-content{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:48rpx;
		margin-left:30rpx;
		padding:20rpx 0rpx;
	}
	.wd-hd-item-name{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
		line-height:48rpx;
		margin-left: 20rpx;
	}
	.wd-hd-item-img{
		width:64rpx;
		height: 64rpx;
		border-radius:50%;
		margin-left: 30rpx;
	}
	.wd-hd-textandimg{
		display: flex;
		
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
		line-height:54rpx;
		
		margin:30rpx 30rpx 30rpx 35rpx;
	}
	.awanter{
		border:solid 1rpx #333333;
	}
	.wd-conter-right{
		margin-left: 64rpx;
	}
	.wd-conter-hd{
		margin-bottom: 20rpx;
	}
	.wd-conter-tw{
		margin-bottom: 20rpx;
	}
	.wd-conter-color{
		color:rgba(255,89,2,1);
	}
	.wd-xian-copy{
		background:rgba(255,89,2,1);
	}
	.wd-xian{
		height: 4rpx;
		width: 100rpx;
		border-radius:2px;
		margin:auto;
		
	}
	.wd-conter{
		display: flex;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(153,153,153,1);
		padding:34rpx 0rpx 25rpx 32rpx;
	}
	.dp-vips-item{
		background:rgba(255,255,255,1);
		box-shadow:0rpx 0rpx 22rpx 5rpx rgba(198,198,198,0.2);
		margin:20rpx 30rpx;
		padding:60rpx 0rpx;
	}
	.dp-vips{
		height:100vh;
		background:rgba(255,255,255,1);
	}
	page{
		background-color: #FFFFFF;
	}
</style>

