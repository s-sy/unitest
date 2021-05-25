<template>
	<view class="" >
		<view class="GFreply" v-if="user && user.replyClass=='2'">
			<view class="GFreply-name">
				楼盘回复：
			</view>
			<view class="GFreply-content">
				{{user.details}}
			</view>
		</view>
		<view class="reply" v-if="user.auditStatus=='1' &&(user.replyClass!='2')">
			<image class="reply-icon" :src="user.userInfo.headimgUrl?user.userInfo.headimgUrl:'https://img.0728jh.com/staticImg/logo.png'" mode=""></image>
			<view class="reply-ringht">
				<view class="reply-name">
					{{user.userInfo.nickName}}
				</view>
				<view class="reply-nei">
					{{user.details}}
				</view>
				<view class="reply-date">
				{{user | fifterTime}}
				</view>
				<view class="reply-xian">
					
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
		export default {
			props:{
				user:{
					type:Object,
					default:null,
				},
				wxUser:{
					type:Object,
					default:null,
				}
			},
			data:function(){
				return {
					
				}
			},
			computed:{
				y:function(){
					let user= this.user
					if(user){
						// console.log("官方回复++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
						// console.log(this.user)
						// console.log(this.wxUser)
						//user.replyClass=='2'
					}
					
				}
			},
			filters:{
				fifterTime:function(value){
					console.log(value)
					if(value && value.createTime){
						
					
					let date=(value.createTime ||'').split(' ')[0]
					// let time=(value ||'').split(' ')[1]
					// if(time){
					// 	tiem=time.substring(0,6)
					// }
					//console.log(date)
					let valueArray=(date ||'').split('-')
					//console.log(valueArray)
					let str1=valueArray[1].charAt(0)
					if(str1=='0'){
						valueArray[1]=(valueArray[1] || '').split('')[1]
					}
					let str2=valueArray[2].charAt(0)
					if(str2=='0'){
						valueArray[2]=(valueArray[2] ||'').split('')[1]
					}
					return valueArray[0]+'年'+valueArray[1]+'月'+valueArray[2]+'日'
					}
				}
			}
		}
</script>

<style>
	.GFreply{
		width: 100%;
		/* display: flex; */
		padding:0rpx 35rpx 20rpx 33rpx;
		
		background-color: #FFFFFF;
	}
	.GFreply-name{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:48rpx;
		/* padding-left: 27rpx; */
	}
	.GFreply-content{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(102,102,102,1);
		line-height:48rpx;
		text-indent:60rpx;
		/* padding:20rpx 31rpx 30rpx 28rpx; */
	}
	.reply-xian{
		width:556rpx;
		height: 1rpx;
		border: solid 1rpx #E5E5E5;
		margin-top:20rpx
	}
	.reply-date{
		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:48rpx;
	}
	.reply-nei{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:48rpx;
	}
	.reply-name{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(99,149,160,1);
		line-height:48rpx;
	}
	.reply-ringht{
		padding-left: 27rpx;	
		padding-top:40rpx;
		width:670rpx;
		}
	.reply-icon{
		width:60rpx;
		height: 60rpx;
		background:rgba(229,229,229,1);
		border-radius:50%;
		margin-top :55rpx;
	}
	.reply{
		width: 100%;
		display: flex;
		padding:0rpx 35rpx 0rpx 33rpx;
		background-color: #FFFFFF;
	}
</style>
