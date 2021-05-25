<template>
	<view class="layoutPL">
		<view class="comment-top">
			<image class="comment-top-icon" :src="swiperItem.userInfo.headimgUrl?swiperItem.userInfo.headimgUrl:'https://img.0728jh.com/staticImg/logo.png'"></image>
			<view class="comment-top-y">
				<view class="comment-top-name">
				{{swiperItem.userInfo.realName?swiperItem.userInfo.realName:swiperItem.userInfo.nickName}}
				</view>
				<view class="comment-rate">
				<uni-rate size="13" value="5"></uni-rate>
				</view>
			</view>
		</view>
		
	
			<view class="comment-conter">
				{{swiperItem.details}}
			</view>
			<view class="comment-bottom">
				
					<view class="comment-bottom-date">
						{{swiperItem.createTime | dateFifter  }}
					</view>
					<view class="comment-bottom-right">
						<!-- <image class="comment-bottom-see-icon" src="../../static/eye_icon.png" mode=""></image>
						<label>{{swiperItem.views}}</label>@click="replyPL@click="replyPL"" -->
						<image class="comment-bottom-pl-icon" src="https://img.0728jh.com/staticImg/ping_icon.png" mode="" ></image>
						<label >{{swiperItem.listTopicReply.length}}</label>
						<view class="comment-bottom-z-icon-s" @click="dianzan">
							<image class="comment-bottom-z-icon" :src="IsZan?'https://img.0728jh.com/staticImg/zanwo.png':'https://img.0728jh.com/staticImg/zan_icon.png' " mode="" ></image>
							<label :class="IsZan?'iswozantext':'' ">{{swiperItem.upvote.length}}</label>
						</view>
						
					</view>
				
					
			</view>
			<!-- <view class="" v-for="item in swiperItem.listTopicReply"> -->
				<!-- <view class="reply-content">
					<view class="">
						{{item.userInfo.nickName}}:
					</view>
					<view class="reply-content-deatils">
						{{item.details}}
					</view>
				</view> -->
<!-- 				<replyDouble></replyDouble>
			</view> -->
			<view class="replylayout" v-if="replyPLValue">
				<input class="replyLayoutInput" value="" placeholder="回复" @input="getreplyValue"/>
				<view class="" @click="replycommit">
					发送
				</view>
			</view>
	</view>
</template>

<script>
	import api from '../../pages/api/home.js'
	export default {
		props:{
			swiperItem:{
				type:Object,
				default:null,
			},
		},
		data:function(){
			return {
				replyPLValue:false,
				inputValue:''
			}
		},
		computed:{
			IsZan:function(){
			//	console.log("看用户")
				//console.log(this.swiperItem)
				let list = this.swiperItem
				let upvote=list.upvote
				let iszan=false;
				if(list&&upvote){
					for(let i=0;i<upvote.length;i++){
						if(upvote[i].userId==getApp().globalData.wxUser.id){
							 iszan=true
						}
					}
					return iszan;
				}
				
				
				
				
			}
		},
		methods:{
			replyPL:function(){
				this.replyPLValue=!this.replyPLValue
			},
			getreplyValue:function(e){
				this.inputValue=e.detail.value
			},
			replycommit:function(){
				this.ReviewsCommit()
				this.replyPLValue=!this.replyPLValue
				
			},
			ReviewsCommit:function(){
				let that=this;
			//	console.log(that.layoutValue)
					that.http(api.Topicreply,'POST',{
						replyTypes: 5,
						typesId:that.swiperItem.id,
						details:that.inputValue,
						replyClass:that.swiperItem.createId==getApp().globalData.wxUser.id?'1':'0'
					},false).then(res=>{
					//	console.log("写pl")
						//console.log(res)
						//that.getrecommendItem(that.recommendItem.id)
					})
				},
			dianzan:function(){
				let that=this;
				
			//	console.log("我赞")
			//	console.log(that.swiperItem)
				that.http(api.Topicreplythumbup,'POST',{
					userId:getApp().globalData.wxUser.id,
					id:that.swiperItem.id
				},false).then(res=>{
				//	console.log(res)
					if(res.data==true){
					//that.$emit('getreadingReviews');
					 that.$parent.getrecommendItem();
					 
					}
				})
			},
		},
		filters:{
			dateFifter:function(value){
			//	return (value || '').split(' ')[0]
				if(value){
					return value.substring(0,16)
				}
				return (value || '').split(' ')[0]
			},
		},
	}
</script>

<style>
	.iswozantext{
		color:#E54D42;
	}
	.comment-bottom-z-icon-s{
		/* border:solid 1rpx #333333; */
	}
	.reply-content-deatils{
		margin-left: 20rpx;
	}
	.reply-content{
		display: flex;
		padding:0rpx 40rpx;
	}
	.layoutPL{
		padding-bottom: 40rpx;
	}
	.replyLayoutInput{
		width:560rpx;
		height:68rpx;
		background:rgba(243,247,251,1);
		border-radius:34rpx;
		padding: 0rpx 20rpx;
		margin-left:20rpx;
	}
	.replylayout{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right:30rpx;
		animation: mymoves 1s forwards;
	}
	@keyframes mymoves{
		from{
			height: 0;
		}
		to{
			height:70rpx;
		}
	}
	.comment-bottom-z-icon{
		width:39rpx;
		height: 31rpx;
		margin-left: 36rpx;
		margin-right: 10rpx;
	}
	.comment-bottom-pl-icon{
		width:31rpx;
		height: 29rpx;
		margin-left: 39rpx;
		margin-right: 10rpx;
	}
	.comment-bottom-see-icon{
		width:31rpx;
		height: 29rpx;
		margin-right: 10rpx;
	}
	.comment-bottom-right{
		display: flex;
		align-items: center;
	font-size:26rpx;
	font-family:PingFang SC;
	font-weight:500;
	color:rgba(153,153,153,1);
	}
	.reviews-netreply-content{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(102,102,102,1);
		line-height:48rpx;
		padding: 20rpx 31rpx 10rpx 28rpx;
	}
	.comment-bottom-date{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(153,153,153,1);
		line-height:48rpx;
	}
	
	.comment-bottom{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 46rpx 40rpx 30rpx;
		
	}
	.comment-conter{
		padding: 0rpx 32rpx;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:52rpx;
	}
	.comment-rate{
		margin-top:25rpx;
	}
	.comment-top-name{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
	}
	.comment-top-y{
		margin-left: 28rpx;
	}
	.comment-top-icon{
		width: 87.6rpx;
		height: 87.6rpx;
		border-radius:50%;
	}
	.comment-top{
		display: flex;
		align-items: center;
		padding:48rpx 0rpx 27rpx 29rpx;
	}
	.comment{
		width: 690rpx;
	}
</style>
