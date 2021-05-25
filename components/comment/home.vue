<template>
	<view class="comment" v-if="swiperItem.auditStatus=='1'">
		<view class="comment-top">
			<image v-if="swiperItem.isAnonymous=='1'" class="comment-top-icon" :src="swiperItem.createId==wxUser.id?swiperItem.userInfo.headimgUrl:logoImg"></image>
			<image v-else class="comment-top-icon" :src="swiperItem.userInfo.headimgUrl?swiperItem.userInfo.headimgUrl:'https://img.0728jh.com/staticImg/logo.png'"></image>
			<view class="comment-top-y">
			
				<view class="comment-top-name" v-if="swiperItem.isAnonymous=='1'">
				<!-- {{swiperItem.userInfo.realName?swiperItem.userInfo.realName:(swiperItem.createId==wxUser.id?)}} -->
				{{swiperItem.createId==wxUser.id?(swiperItem.userInfo.nickName?swiperItem.userInfo.nickName:'匿名用户'):'匿名用户'}}<text v-if="swiperItem.createId==wxUser.id">(已匿名)</text>
				</view>
				<view v-else class="comment-top-name">
				{{swiperItem.userInfo.realName?swiperItem.userInfo.realName:swiperItem.userInfo.nickName}}
				</view>
				<view class="comment-rate">
				<uni-rate size="13" value="5"></uni-rate>
				</view>
			</view>
			<view class="comment-bottom-date">
				{{swiperItem.createTime | dateFifter}}
			</view>
		</view>
		
			<view class="comment-conter " :class="page=='index'?'comment-conters':''">
				{{swiperItem.content}}
			</view>
			<view class="comment-bottom">
					<view class="comment-bottom-right">
						<image class="comment-bottom-see-icon" src="https://img.0728jh.com/staticImg/eye_icon.png" mode=""></image>
						<label>{{swiperItem.views}}</label>
						<image class="comment-bottom-pl-icon" src="https://img.0728jh.com/staticImg/ping_icon.png" mode=""></image>
						<label>{{listTopicReplysum}}</label>
						<view class="" @tap.stop="dianzan">
					
						<image class="comment-bottom-z-icon" :src="IsZan?'https://img.0728jh.com/staticImg/zanwo.png':'https://img.0728jh.com/staticImg/zan_icon.png'" mode="" ></image>
						<label :class="IsZan?'Iswozan':''">{{swiperItem.upvote.length}}</label>
						</view>
						
					</view>
				
			</view>
			<view class="comment-reply" v-if="page!='index'">
				
				
			<view class="reviews-loppanreply">
				<view class="reviews-loppanreply-title" v-if="GFreply===true">
					楼盘回复：
				</view>
				<view class="" v-for="item in swiperItem.listTopicReply">
					<view class="reviews-loppanreply-content" v-if="item.replyClass=='2'">
						{{item.details }}
					</view>
				</view>
				
			</view>
			<view class="" v-if="page=='detail'">
				<view class="reviews-loppanreply-title" v-if="WYreply===true">
					网友回复：
				</view>
				<block v-for="items in swiperItem.listTopicReply">
				<view class="" v-if="items.replyClass=='1' || items.replyClass=='0'">
					<netReply :user="items"></netReply>
				</view>
				</block>
			</view>
			<view class="reviews-loppanreply" v-if="page=='singleton'">
				<view class="reviews-loppanreply-title" v-if="WYreply===true">
					网友回复：
				</view>
				<block v-for="items in swiperItem.listTopicReply">
				<view class="reviews-netreply-content" v-if="(items.replyClass!='2'&&(items.auditStatus=='1'||items.createId==wxUser.id))">
					<text class="items-name-changl">{{items.userInfo.nickName}}：</text> <text>{{items.details}}</text>
				</view>
				</block>
			</view>
			
			</view>
	
	</view>
</template>
<script>
	import api from '../../pages/api/home.js'
	// import { VueScene, VueSceneItem } from 'vue-scenejs'
export default {
	props:{
		swiperItem:{
			type:Object,
			default:null,
		},
		page:{
			type:String,
			default:'',
		},
		logoImg:{
			type:String,
			default:'',
		},
		wxUser:{
			type:Object,
			default:'',
		}
	},
	
	// components:{
	// 	 VueScene,
	// 	 VueSceneItem,
	// },
	data:function(){
		return {
			//wxUser:getApp().globalData.wxUser,
			  // keyframes: {
     //      ".circles .circle": i => ({
     //        0: {
     //          "border-width": "150px",
     //          "opacity": 1,
     //          "transform": "translate(-50%, -50%) scale(0)",
     //        },
     //        1.5: {
     //          "border-width": "0px",
     //          "opacity": 0.3,
     //          "transform": "scale(0.7)",
     //        },
     //        options: {
     //          delay: i * 0.4,
     //        },
     //      }),
     //    },
		}
	},
	
	
	methods:{
		dianzan:function(){
			let that=this;
			
		//	console.log("我赞")
		//	console.log(this.swiperItem)
			that.http(api.TextZan,'POST',{
				userId:getApp().globalData.wxUser.id,
				id:that.swiperItem.id
			},false).then(res=>{
			//	console.log(res)
				if(res.data==true){
				//that.$emit('getRefreshData');
				that.$parent.getreadingReviews();
				 
				}
			})
		},
	},
	computed:{
		WYreply:function(){
			let wy=false;
			
			let WYreplylist=[].concat(this.swiperItem.listTopicReply)
			
				for(var j=0;j<WYreplylist.length;j++){
				//	console.log("WYreply")
					//console.log(WYreplylist)
					if(WYreplylist[j]){
					   if((WYreplylist[j].replyClass=='0'&& WYreplylist[j].auditStatus=='1')|| (WYreplylist[j].replyClass=='1')){
						 wy=true
					   }	
					}
					
				}
			
			
			//console.log(wy)
			return wy
		},
		GFreply:function(){
			let gf=false;
			let GFreplylist=[].concat(this.swiperItem.listTopicReply)
			if(GFreplylist){
			//	console.log("GFreply")
			//	console.log(this.swiperItem.listTopicReply)
				for(var i=0;i<GFreplylist.length;i++){
					if(GFreplylist[i]){
						if(GFreplylist[i].replyClass=='2'){
							gf=true
						}
					}
					
				}
			}
			
			//console.log(gf)
			return gf
		},
		IsZan:function(){
			let upvote = this.swiperItem.upvote
			
			let iszan=false;
			if(this.swiperItem && this.swiperItem.upvote){
			//	console.log("赞的图标")
			//	console.log(this.swiperItem)
				for(let i=0;i<upvote.length;i++){
					if(upvote[i].userId==getApp().globalData.wxUser.id){
						 iszan=true
					}
				}
				
			}
			
			
			return iszan;
		},
		listTopicReplysum:function(){
			let list= this.swiperItem
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
			//return (value || '').split(' ')[0]
			if(value){
				return value.substring(0,16)
			}
			return (value || '').split(' ')[0]
		},
	},
		// WYreply:function(value){
		// 	console.log('2222222222222')
		// 	console.log(value)
		// 	let wy=false;
		// 	for(item in value){
		// 		if(item.replyClass=='1'){
		// 			wy=true
		// 		}
		// 	}
		// 	return wy
		// }
	
	
}	
</script>

<style>
	.items-name-changl{
	/* 	border:solid 1rpx #000000; */
		max-width:200rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.Iswozan{
		color:#E54D42;
	}
	.comment-reply{
		margin-top:60rpx;
	}
	.comment-gaicheng{
		border:solid 1rpx #333333;
		height: 30rpx;
		width:60rpx;
		position: absolute;
		z-index: 99;
	}
	.reviews-loppanreply-content{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(102,102,102,1);
		line-height:48rpx;
		padding:20rpx 31rpx 30rpx 28rpx;
	}
	.reviews-loppanreply-title{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:48rpx;
		padding-left: 27rpx;
	}
	.pReviewsDetails{
		min-height: 1334rpx;
		background-color: #FFFFFF;
	}
	.comment-bottom-z-icon{
		width:31rpx;
		height: 29rpx;
		margin:0rpx 15rpx 0rpx 40rpx;
	}
	.comment-bottom-pl-icon{
		width:30rpx;
		height: 27rpx;
		margin: 0rpx 15rpx 0rpx 40rpx;
	}
	.comment-bottom-see-icon{
		width:31rpx;
		height: 29rpx;
		margin:0rpx 15rpx 0rpx 40rpx;
	}
	.comment-bottom-right{
		display: flex;
		align-items: center;
		color:rgba(153,153,153,1);
		font-size:26rpx;
		float: right;
		margin-right: 30rpx;
		margin-bottom:60rpx;
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
		margin-left: 20rpx;
	}
	
	.comment-bottom{
		/* display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 46rpx 40rpx 30rpx; */
		
	}
	.comment-conter{
		padding: 0rpx 32rpx;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:52rpx;
		
		width:100%;
	
	}
	.comment-conters{
	  text-overflow:ellipsis;
	  overflow:hidden;
	  display:-webkit-box;
	  -webkit-line-clamp:2; /*这个数字是设置要显示省略号的行数*/
	  -webkit-box-orient:vertical;
	}
	.comment-rate{
		margin-top:20rpx;
	}
	.comment-top-name{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
		width:300rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.comment-top-y{
		margin-left: 28rpx;
		/* border: solid 1rpx #333333; */
		width:300rpx;
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
