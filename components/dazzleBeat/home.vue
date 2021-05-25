<template>
	<view :class="isScreenWidth?'dazzlebeat-copy':'dazzlebeat'" v-if="dazzleBeatData.auditStatus=='1' || dazzleBeatData.createId == wxUser.id">
		<view class="dazzlebeat-top">
			<image class="dazzlebeat-top-img" :src="dazzleBeatData.userInfo.headimgUrl?dazzleBeatData.userInfo.headimgUrl:'https://img.kehuoa.com/staticImg/logo.png'"></image>
			<view class="dazzlebeat-top-n">
				<view class="dazzlebeat-top-name">
					 {{dazzleBeatData.userInfo.nickName}}
				</view>
				
				<view  class="dazzlebeat-bottom-date">
					{{dazzleBeatData | dateFifter}}
				</view>
				<view v-if="deteleIcon" class="dazz-top-shanchu" @tap.stop="deteledazzle">
					
				
				<image v-if="deteleIcon"  class="dazzlebeat-top-shanchu" src="https://img.kehuoa.com/staticImg/shanchu.png"></image>
				</view>	
			</view>
			
		</view>
		<view class="dazzlebeat-center">
			{{dazzleBeatData.content}}
		</view>
		<view class="dazzlebeat-img">
			<block v-for="(item,index) in dazzleBeatData.picUrls">
				<image mode="aspectFill" :class="isScreenWidth?'dazzlebeat-img-item-copy':'dazzlebeat-img-item'" :src="item?item:'https://img.kehuoa.com/staticImg/banner_pic.png'" @click="previewImg" :data-index="index"></image>
				
			</block>
			
		</view>
		<view class="dazzlebeat-bottom">
			<!-- <view class="dazzlebeat-bottom-date">
				{{dazzleBeatData.createTime | dateFifter}}
			</view> -->
			<view class="dazzlebeat-bottom-contant">
				
				    <image class="dazzlebeat-bottom-icon-t"  src="https://img.kehuoa.com/staticImg/eye_icon.png" mode=""></image>
			    	<label>{{dazzleBeatData.views}}</label>
					
					<image class="dazzlebeat-bottom-icon"  src="https://img.kehuoa.com/staticImg/ping_icon.png" mode=""></image>
					<label>{{listTopicReplysum}}</label>
					<view class="" @tap.stop="dianzai">
						<image class="dazzlebeat-bottom-icon-t" :src="IsZan?'https://img.kehuoa.com/staticImg/zanwo.png':'https://img.kehuoa.com/staticImg/zan_icon.png'" mode="" ></image>
						<text :class="IsZan?'iswozantext':''">{{dazzleBeatData.upvote.length}}</text>
					</view>
					
					
				
				
			</view>
				
				
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../pages/api/home.js'
	export default{
		props:{
			isScreenWidth:{
				type:Boolean,
				default:false,
			},
			dazzleBeatData:{
				type:Object,
				default:false,
			},
			deteleIcon:{
				type:Boolean,
				default: false,
				
			}
		},
		data:function(){
			return {
				wxUser: getApp().globalData.wxUser
			}
		},
		computed:{
			IsZan:function(){
				let upvote = this.dazzleBeatData.upvote
				let iszan=false;
				if(this.dazzleBeatData.upvote){
				//	console.log("我就是想看下炫拍的状态")
				//	console.log(this.dazzleBeatData)
					for(let i=0;i<upvote.length;i++){
						if(upvote[i].userId==getApp().globalData.wxUser.id){
							 iszan=true
						}
					}
					
				}
				
				
				return iszan;
			},
			listTopicReplysum:function(){
				let list= this.dazzleBeatData
				let sum=0
				if(list&&list.listTopicReply){
					list.listTopicReply.forEach(item=>{
						if(item.createId==getApp().globalData.wxUser.id || item.auditStatus=='1'){
							++sum
						}
					})
					
					return sum;
				}
				return sum;
			}
		},
		filters:{
			dateFifter:function(value){
				//
				let values=value
				if(values && values.createTime){
				//	console.log("日期")
				//	console.log(values)
					return values.createTime.substring(0,16)
				}
				return (values.createTime || '').split(' ')[0]
			}
		},
		methods:{
			deteledazzle:function(){
				let that=this
				console.log("删除这条数据")
				uni.showModal({
				    title: '提示',
				    content: '确定要删除吗？',
					cancelText:'取消',
					confirmText:'删除',
				    success: function (res) {
				        if (res.confirm) {
				         //   console.log('用户点击确定');
						//	console.log(that.dazzleBeatData)
								let id= that.dazzleBeatData.id
								
							//	console.log(id)
								
							that.http(api.AwesomeshootingDelete+id,'delete',{},false).then(res=>{
							//	console.log("删除了")
							//	console.log(res)
								if(res.data==true){
									 that.$parent.getAwesomeshooting()
								}
								
							})
				        } else if (res.cancel) {
				          console.log('用户点击取消');
				        }
				    }
				});
				
			},
			previewImg:function(e){
				if(!this.isScreenWidth){
					return;
				}
				let index = e.currentTarget.dataset.index
				uni.previewImage({
					current:index,
					urls:this.dazzleBeatData.picUrls
				})
			},
			dianzai:function(){
				let that=this;
				// if(!getApp().globalData.wxUser.nickName){
				// 	uni.showToast({
				// 		title:'请先授权',
				// 		icon:'loading',
				// 		duration:2000
				// 	})
				// 	return;
				// }else{
			//	console.log("我赞")
			//	console.log(this.dazzleBeatData)
				that.http(api.AwesomeshootingZan,'POST',{
					userId:getApp().globalData.wxUser.id,
					id:that.dazzleBeatData.id
				},false).then(res=>{
			//		console.log(res)
					if(res.data==true){
					//that.$emit('getreadingReviews');
					 that.$parent.getAwesomeshooting();
					}
				})	
				//}
				
			},
			// Iszan:function(){
			// 	console.log("點讚")
			// 	console.log(this.dazzleBeatData)
			// 	console.log("點讚了嗎")
			// 	this.IsZan=false
			// 	for(let i=0;i<this.dazzleBeatData.upvote.length;i++){
			// 		console.log(item)
						
						
			// 			if(this.dazzleBeatData.upvote[i].userId==getApp().globalData.wxUser.id){
			// 				this.IsZan=true
			// 	}
			// 	}
			// 	// this.dazzleBeatData.vpvote.forEach(item =>{
			// 	// 	this.IsZan=false
			// 	// 	if(item.userId==getApp().globalData.wxUser.id){
			// 	// 		this.IsZan=true
			// 	// 	}
					
			// 	// })
			// }
		},
		onReady() {
			// console.log(this.isScreenWidth)
			// console.log(this.dazzleBeatData)
			// console.log(getApp().globalData.wxUser)
			//this.Iszan()
		}
	}
</script>

<style>
	.dazz-top-shanchu{
		/* border:solid 1rpx #333333; */
		width:60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.iswozantext{
		color:#E54D42;
	}
	.gaibutton{
		display: flex;
		align-items: center;
		position: absolute;
		border:solid 1rpx #333333;
		width:100rpx;
		height: 60rpx;
		background-color: #FFFFFF;
		z-index:99;
	}
	.dazzlebeat-bottom-icon-t{
		width:31rpx;
		height: 29rpx;
		margin:0rpx 15rpx 0rpx 40rpx;
	}
	.dazzlebeat-bottom-icon{
		width:30rpx;
		height: 27rpx;
		margin: 0rpx 15rpx 0rpx 40rpx;
	}
	.dazzlebeat-bottom-contant{
		display: flex;
		align-items: center;
		color:rgba(153,153,153,1);
		font-size:26rpx;
		float: right;
		margin-right: 30rpx;
		margin-bottom:30rpx;
	}
	.dazzlebeat-bottom-date{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(153,153,153,1);
		line-height:48rpx;
	}
	.dazzlebeat-bottom{
		/* display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 20rpx; */
	}
	.dazzlebeat-img-item{
		height: 200rpx;
		width: 200rpx;
		border-radius:10rpx;
		margin-right:15rpx;
		margin-bottom: 15rpx;
	}
	.dazzlebeat-img-item-copy{
		height: 168rpx;
		width: 220rpx;
		border-radius:10rpx;
		margin-right:15rpx;
		margin-bottom: 15rpx;
	/* 	margin-bottom: 15rpx; */
	}
	.dazzlebeat-img{
		display: flex;
		flex-wrap: wrap;
		padding : 20rpx 0rpx;
	}
	.dazzlebeat-center{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:48rpx;
		margin-top: 20rpx;
	}
	.dazzlebeat-top-shanchu{
		width: 28rpx;
		height: 30rpx;
	}
	.dazzlebeat-top-name{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
		margin-left: 28rpx ;
		width:300rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.dazzlebeat-top-n{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width:554rpx;
	}
	.dazzlebeat-top-img{
		width:68rpx;
		height:70rpx;
		border-radius:50%;
	}
	.dazzlebeat-top{
		width: 100%;
		display: flex;
		align-items: center;
		
		
	}
	.dazzlebeat{
		width:690rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 0rpx 22rpx 5rpx rgba(198,198,198,0.2);
		padding: 30rpx 10rpx 60rpx 30rpx;
		
	}
	.dazzlebeat-copy{
		width:750rpx;
		background:rgba(255,255,255,1);
		
		padding: 30rpx 10rpx 60rpx 30rpx;
	}
</style>
