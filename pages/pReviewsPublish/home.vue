<template>
	<view class="publish-pl">
		<cu-custom bgColor="bg-white" :isBack="true">
				 <block slot="backText"></block>
				 <block slot="content" class="title-text">发布点评</block>
		</cu-custom>
		<view class="publish-pl-top">
			<image class="publish-pl-icon" :src="logoImg?logoImg:'https://img.0728jh.com/staticImg/logo.png'" mode=""></image>
			<view class="publish-pl-top-right">
				<view class="publish-top-top">
					<view class="publish-top-name">
						{{ projectName }}
					</view>
					<view class="publish-top-pf">
						4.7
					</view>
				</view>
				<view class="publish-name-reate">
					<uni-rate size="13" value="5"></uni-rate>
				</view>
				
			</view>
		</view>
		<view class="publish-conter">
			<view class="publish-conter-one">
				<view class="publish-title">
					是否到访营销中心
				</view>
				<view class="publish-daofang" :class="visited=='y'?'publish-daofang-copy':''" @click="isVisited" data-key='y'>
					已经到访
				</view>
				<view class="publish-weidaofang" :class="visited=='n'?'publish-daofang-copy':''" @click="isVisited" data-key='n'>
					未到访
				</view>
			</view>
			<view class="publish-center-lp">
				<view class="publish-center-jiage">
					价格：
				</view>
				<view class="publish-center-rate">
					<uni-rate margin="15" size="18" :value="price" @change="getprice"></uni-rate>
				</view>
				<view class="publish-center-sum">
					{{price}}
				</view>
			</view>
			<view class="publish-center-lp">
				<view class="publish-center-jiage">
					地段：
				</view>
				<view class="publish-center-rate">
					<uni-rate margin="15" size="18" :value="location" @change="getlocation"></uni-rate>
				</view>
				<view class="publish-center-sum">
					{{location}}
				</view>
			</view>
			<view class="publish-center-lp">
				<view class="publish-center-jiage">
					交通：
				</view>
				<view class="publish-center-rate">
					<uni-rate margin="15" size="18" :value="environment" @change="getenvironment"></uni-rate>
				</view>
				<view class="publish-center-sum">
					{{environment}}
				</view>
			</view>
			<view class="publish-center-lp">
				<view class="publish-center-jiage">
					配套：
				</view>
				<view class="publish-center-rate">
					<uni-rate margin="15" size="18" :value="supporting" @change="getsupporting"></uni-rate>
				</view>
				<view class="publish-center-sum">
					{{supporting}}
				</view>
			</view>
			<view class="publish-center-lp">
				<view class="publish-center-jiage">
					环境：
				</view>
				<view class="publish-center-rate">
					<uni-rate margin="15" size="18" :value="transportation" @change="gettransportation"></uni-rate>
				</view>
				<view class="publish-center-sum">
					{{transportation}}
				</view>
			</view>
		</view>
		<view class="publish-buttom">
			<textarea class="publish-textares" :value="content" placeholder-class="publish-textare" :placeholder="'写下您对'+projectName+'的意见'" @input="textareaInput"></textarea>
			<view class="publish-buttom-lm">
				<view class="">
					匿名评价
				</view>
				<switch :checked="false" @change="openSwitch"></switch>
			</view>
		</view>
		<view class="publish-commit" @click="commit">
			提交评论
		</view>
	</view>
	
</template>

<script>
	import api from '../../pages/api/home.js'
	export default {
		data:function(){
			return {
				content:'', //评论内容
				price:5.0,
				location:5.0,
				environment:5.0,
				supporting:5.0,
				transportation:5.0,
				is_visited:0,
				is_anonymous:0,
				visited:'y',
				projectName: '',
				logoImg:''
			}
		},
		onLoad() {
			this.projectName=getApp().globalData.BaseBudding.projectName
			this.logoImg = uni.getStorageSync('logoImg')
			//console.log(uni.getStorageSync('logoImg'))
			//console.log("什麼歌情況")
		},
		methods:{
			textareaInput:function(e){
				//console.log(e.detail)
				this.content=e.detail.value
			},
			openSwitch:function(e){
				//console.log(e)
				let that=this;
				if(e.detail.value){
					that.is_anonymous=1
				}else{
					that.is_anonymous=0
				}
				//console.log(that.is_anonymous)
			},
			isVisited:function(e){
				let that=this;
				let key=e.currentTarget.dataset.key
				//console.log(this.visited)
				that.visited=key
				if(key=='y'){
					that.is_visited=0
				}else{
					that.is_visited=1
				}
			},
			getprice:function(e){
				this.price=e.value
			},
			getlocation:function(e){
				this.location=e.value
			},
			getenvironment:function(e){
				this.environment=e.value
			},
			getsupporting:function(e){
				this.supporting=e.value
			},
			gettransportation:function(e){
				this.transportation=e.value
			},
			isAuth(){
				if(!getApp().globalData.wxUser.nickName){
					uni.showToast({
					    title: '请先授权',
						icon:'none',
					    duration: 3000
					});
					return false;
				}
				return true;
			},
			commit:function(){
				let that=this;
				let IsAuth=that.isAuth()
				if(!IsAuth){
					return;
				}
			//	console.log(that.content)
				let str = that.content.replace(/\s*/g,"")
				if(!str){
					uni.showToast({
						title:'您还没写内容呢！',
						icon:'none',
						duration:2000,
					})
					return;
				}
				//console.log(that.is_anonymous)
				let id = getApp().globalData.projectItem.id
				that.http(api.Reviews,'POST',{
					content:that.content, //评论内容
					price:that.price,
					location:that.location,
					environment:that.environment,
					supporting:that.supporting,
					transportation:that.transportation,
					isVisited:that.is_visited,
					isAnonymous:that.is_anonymous,
					affiliationId: id
				},false).then(res=>{
				//	console.log("楼盘点评")
					//console.log(res)
					if(res.data==true){
						uni.navigateBack({
							delta:2
						})
					}
				})
			}
		}
	}
</script>

<style>
	.publish-commit{
		width:690rpx;
		height: 88rpx;
		background:rgba(22,204,246,1);
		border-radius:10rpx;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 88rpx;
		margin-left: 31rpx;
		margin-bottom: 68rpx;
	}
	.publish-buttom-lm{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
		padding: 40rpx 44rpx 60rpx 40rpx;
	}
	.publish-buttom{
		background-color: #FFFFFF;
		margin-top:20rpx;
		padding-top: 20rpx;
	}
	.publish-textare{
		width:690rpx;
		
		opacity: 0.8;
		padding:10rpx 20rpx;
		margin-left:30rpx;
	}
	.publish-textares{
		width:690rpx;
		
		/* opacity: 0.8; */
		padding:10rpx 20rpx;
		margin-left:30rpx;
	}
	.publish-center-sum{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		margin-left: 43rpx;
	
	}
	.publish-center-rate{
		padding-top:10rpx;
	}
	.publish-center-jiage{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(102,102,102,1);
	}
	.publish-center-lp{
		display: flex;
		align-items: center;
		padding: 20rpx 0rpx;
		margin-left: 28rpx;
	}
	.publish-weidaofang{
		width:184rpx;
		height:60rpx;
		background:rgba(248,248,248,1);
		border-radius:30rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		opacity:0.9;
		text-align: center;
		line-height: 60rpx;
	}
	.publish-daofang-copy{
		color:rgba(22,204,246,1);
	}
	.publish-daofang{
		width:184rpx;
		height:60rpx;
		background:rgba(248,248,248,1);
		opacity:0.9;
		border-radius:30rpx;
	    font-size:28rpx;
	    font-family:PingFang SC;
	    font-weight:500;
	    
	    text-align: center;
	    line-height: 60rpx;
	    margin-left: 64rpx;
	    margin-right: 20rpx;
	}
	.publish-title{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	
	.publish-conter-one{
		display: flex;
		align-items: center;
		padding:60rpx 29rpx 30rpx 30rpx;
		color:rgba(153,153,153,1);
	}
	.publish-conter{
		background-color: #FFFFFF;
	}
/**
 * 	头
 */
	.publish-name-reate{
		margin-top:38rpx;
	}
	.publish-top-pf{
		font-size:46rpx;
		font-family:DIN;
		font-weight:bold;
		color:rgba(251,69,14,1);
		margin-left: 15rpx;
	}
	.publish-top-name{
		font-size:40rpx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
	
	}
	.publish-top-top{
		display: flex;
		align-items: center;
		
	}
	.publish-pl-icon{
		width:119rpx;
		height:119rpx;
		border-radius:12rpx;
		margin:40rpx 40rpx 43rpx 30rpx;
	}
	.publish-pl-top{
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
	}
	.publish-pl{
		height: 100vh;
		
	}
</style>
