<template>
	<view class="questions" v-if="questionsData.auditStatus=='1'">
	
			
		
		<view class="question-question">
			
			<image class="question-wen-icon" src="https://img.0728jh.com/staticImg/wen_.png" mode=""></image>
			<view class="question-question-question">
				<view class="">
						{{questionsData.content | fontFifter}}
				</view>
				<view :class="fontIsDown?'question-tw-date':'question-tw-date-copy'">
					{{questionsData.createTime | datefiflter}}
				</view>
				<!-- <view :class="fontIsDown?'question-tw-date':'question-tw-date-copy'">
					{{questionsData.createTime | datefiflter}}
				</view> -->
			</view>
		</view>
		<!-- <view class="questionsDetails-bottom">
			<image class="questionsDetails-bottom-img" :src="questionsData.userInfo.headimgUrl?questionsData.userInfo.headimgUrl:'https://img.0728jh.com/staticImg/logo.png'" mode=""></image>
			<view class="questionsDetails-bottom-ringt">
				<view class="">
				{{questionsData.userInfo.nickName}}
				</view>
				<view class="question-tw-date">
					{{questionsData.createTime | datefiflter}}
				</view>
			</view>
			
		</view> -->
		<view class="question-margin">
			<block v-for="(item,index) in questionsData.listTopicReply">
				<view class="" v-if="item.auditStatus=='1' ">
					
				
				<view class="question-question" v-if="index<2" >
					<image class="question-da-icon" src="https://img.0728jh.com/staticImg/da_icon.png" mode=""></image>
					
					<view class="question-question-answer">
						<view class="question-da-name">
							{{item.userInfo.nickName}} :
						</view>
						<view class="question-answer-content">
							{{item.details}}
						</view>
					</view>
				</view>
				</view>
			<!-- 	<view class="question-question">
					<view class="question-da-icon">
						答
					</view>
					<view class="question-question-answer">
						<view class="question-da-name">
							Andy 宋：
						</view>
						<view class="question-answer-content">
							商家违约
						</view>
					</view>
					
				</view> -->
			</block>
		</view>
		
		<view class="question-gd" v-if="questionsData.listTopicReply.length>0">
			全部{{questionsDatalength}}个回答 >
		</view>
		
	</view>
	
</template>

<script>
	export default {
		props:{
			questionsData:{
				type:Object,
				default:null,
			},
		},
		data:function(){
			return {
				
				wxUser:getApp().globalData.wxUser
			}
		},
		computed:{
			questionsDatalength:function(){
			// 	console.log('我想看哈问答状态')
			// console.log("+++++++++++++++++++++++++++")
				let list=this.questionsData
				// console.log(list);
				let num=0
				if(list&&list.listTopicReply){
					
					list.listTopicReply.forEach(item=>{
						// console.log(this.wxUser.id)
						// console.log(item)
						if(item && item.userInfo){
							if(item.auditStatus=='1'|| item.userInfo.id==this.wxUser.id){
								// console.log("____________+++++++++++++_________")
								++num;
							}
						}
						
					})
					return num;
				}
				// console.log("+++++++++++++++++++++++++++")
				// console.log(this.questionsData)
			},
			fontIsDown:function(){
				// console.log("--------------------------------")
				let questionsData=this.questionsData
				if(questionsData && questionsData.content){
					let length = questionsData.content.length
					if(length>23){
						return true;
					}else
					if(length<=11){
						return true;
					}else
					if(length<=23&&length>11){
						return false;
					}
				}else{
					return false;
				}
				// console.log("--------------------------------")
			},
			
		},
		filters:{
			datefiflter:function(value){
				//return (value || '').split(' ')[0]
				
				if(value){
					return  value.substring(0,16)
				}
				
			},
			fontFifter:function(value){
				let that=this
				let length = value.length
			//	console.log(value)
			//	console.log(length)
			
				if(length>=25){
				return	value.substring(0,25)+'...'
				
				}else{
					return value
				}
				
				//return '上来看房经历深刻的减肥了时间的分类考试的法律是宽带缴费宽带缴'
			}
		},
		methods:{
			
		},
		mounted() {
		
			// let length=this.questionsData.content.length
			// console.log(this.questionsData.content.length)
			// console.log('length')
			// console.log(length)
			// if(length<=18 && length>=11){
			// 	this.fontIsDown=true
			// }else{
			// 	this.fontIsDown=false
			// }
			// console.log(this.fontIsDown)
		}
	}
</script>

<style>
	.question-tw-date-copy{
		position: absolute;
		z-index: 99;
		margin:-10rpx 30rpx 0rpx 360rpx;
		font-size: 21rpx;
		font-weight:10;
		/* border:solid 1rpx #000000; */
	}
	.question-tw-date{
		position: absolute;
		z-index: 99;
		margin:-45rpx 30rpx 0rpx 360rpx;
		font-size: 21rpx;
		font-weight:10;
		/* border:solid 1rpx #000000; */
	}
	.questionsDetails-bottom-ringt{
		width: 566rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: rgba(153,153,153,1);
		font-size: 24rpx;
	}
	.questionsDetails-bottom-img{
		width: 45rpx;
		height: 45rpx;
		margin-right: 19rpx;
		border-radius: 50%;
	}
	.questionsDetails-bottom{
		display: flex;
		align-items: center;
	
		font-size:28rpx;
		font-family:PingFang SC;
		
		color:rgba(153,153,153,1);
		line-height:48rpx;
		margin-left: 60rpx;
	}
	.question-gd{
	font-size:24rpx;
	font-family:PingFang SC;
	font-weight:bold;
	color:rgba(237,96,19,1);
	line-height:48rpx;
	margin-left: 87rpx;
	
	}
	.question-margin{
	margin-top:20rpx;
	}
	.question-answer-content{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:48rpx;
		/* border:solid 1rpx #333333; */
		width:480rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.question-da-name{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:48rpx;
	}
	.question-question-answer{
		display: flex;
		flex-wrap: wrap;
		margin-left: 20rpx;
		line-height: 48rpx;
		max-width: 563rpx;
	}
	.question-question-question{
	
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:48rpx;
		height:92rpx;
		max-width: 563rpx;
		margin-left:20rpx;
		margin-top:50rpx;
		
	}
	.question-da-icon{
		width: 38rpx;
		height: 38rpx;
		margin-left:30rpx;
		margin-top:7rpx;
	}
	.question-wen-icon{
	width: 38rpx;
	height: 38rpx;
	margin-left:30rpx;
	margin-top: 55rpx;
	}
	.question-question{
		display: flex;
		
		
		
	}
	.questions{
	
		width:690rpx;
		padding: 26rpx 0rpx;
	}
</style>
