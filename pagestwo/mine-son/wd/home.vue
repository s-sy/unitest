<template>
	<view class="wd">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="title-text">{{isShowTX=='0'?'我的问答':'楼盘热点'}}</block>
		</cu-custom>
		<view class="wd-conter">
			<view class="wd-conter-left">
				<view class="wd-conter-tw" :class="key=='tw'?'wd-conter-color':''" @click="changeTWorHD" data-key="tw">
					{{isShowTX=='0'?'我提的问':'内热点'}}
				</view>
				<view class="wd-xian" :class="key=='tw'?'wd-xian-copy':''">
					
				</view>
			</view>
			<view class="wd-conter-right">
				<view class="wd-conter-hd" :class="key=='hd'?'wd-conter-color':''" @click="changeTWorHD" data-key="hd">
					{{isShowTX=='0'?'我回答的':'外热点'}}
				</view>
				<view class="wd-xian" :class="key=='hd'?'wd-xian-copy':''">
					
				</view>
			</view>
		</view>
		
		<view class="" v-for="item in questionsItem" >
			<view class="wd-tw" v-if="key=='tw'" @click="toQuestionsDetail" :data-id="item.id">
				<view class="wd-tw-items">
					<image class="wd-tw-img"  :src="item.userInfo.headimgUrl?item.userInfo.headimgUrl:'https://img.0728jh.com/staticImg/logo.png'" mode=""></image>
					<view class="wd-tw-right">
						<view class="wd-tw-title">
							{{item.content}}
						</view>
						<view class="wd-tw-buttom">
							<view class="">
							{{item.createTime | timefiflter}}
							</view>
							<view class="">
							已有{{item.listTopicReply.length}}个回答
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-if="key=='hd'">
		<view class="wd-total" v-for="item in answersList" @click="toQuestionsDetail" :data-id="item.askQuestions.id">
			
	
			
			
			<view class="">
				<view class="wd-hd-textandimg">
					<image class="wd-hd-img" src="https://img.0728jh.com/staticImg/wen_.png" mode=""></image>
					<view class="wd-hd-text">
						   {{item.askQuestions.content}}
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
	
</template>

<script>
	import api from '../../../pages/api/home.js'
	export default {
		data:function(){
			return {
				key:'tw',
				questionsItem:'',
				isShowTX:'',
				answersList:'',
				wxUser:getApp().globalData.wxUser,
			}
		},
		filters:{
			timefiflter:function(value){
				if(value){
					return value.substring(0,16)
				}
				return (value || '').split(' ')[0]
			}
		},
		methods:{
			toQuestionsDetail(e){
				let id =e.currentTarget.dataset.id
				uni.navigateTo({
					url:'../../questionsDetails/home?id='+id
				})
			},
			changeTWorHD:function(e){
				this.key =e.currentTarget.dataset.key
			},
			GetTopicreply:function(){
				let that=this;
				let id = getApp().globalData.projectItem.id
				that.http(api.GetTopicreply,'GET',{  
					current: 1,
					size: 5,
					replyTypes:'4', 
					affiliationId:id
				},false).then(res=>{
					console.log("我的回答")
					console.log(res)
					that.answersList=res.data.records
				})
			},
			getQuestionsPage:function(){
				let that=this;
				let id = getApp().globalData.projectItem.id
				that.http(api.QuestionsPage,'GET',{
					// current: 1,
					// size: 5,
					//id:id
					// auditStatus:1,
					 userId:getApp().globalData.wxUser.id,
					 affiliationId:id
				},false).then(res=>{
					console.log("我的楼盘问答")
					console.log(res)
					that.questionsItem=res.data.records
				})
			},
		},
		onLoad() {
			this.getQuestionsPage()
			this.GetTopicreply()
			this.isShowTX=getApp().globalData.interaction || '1'
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
	.wd-hd-item{
		display: flex;
		align-items: center;
	}
	.wd-hd-text{
		  width: 580rpx;
		  white-space:nowrap;
		  overflow: hidden;
		  text-overflow: ellipsis;
	}
	.wd-hd-img{
		height: 38rpx;
		width: 38rpx;
		margin-top:10rpx;
		margin-right: 20rpx;
	}
	
	.wd-tw-items{
		padding:39rpx 30rpx 39rpx 29rpx;
		display: flex;
	}
	.wd-tw-buttom{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:48rpx;
	}
	.wd-tw-title{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
		margin-bottom: 35rpx;
	}
	.wd-tw-right{
		width:480rpx;
		margin-left: 30rpx;
	}
	.wd-tw-img{
		width:121rpx;
		height: 120rpx;
	}
	.wd-tw{
		width:690rpx;
		margin-top:20rpx;
		margin-left: 30rpx;
		padding: 30rpx 0rpx;
		background-color: #FFFFFF;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 0rpx 22rpx 5rpx rgba(198,198,198,0.13);
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
	.wd{
		background-color: #FFFFFF;
		height: 100vh;
	}
	page{
		background-color: #FFFFFF;
	}
</style>
