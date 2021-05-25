<template>
	<view class="xp-vips">
			
			<cu-custom bgColor="bg-white" :isBack="true">
				<block slot="backText"></block>
				<block slot="content" class="title-text">楼盘炫拍</block>
			</cu-custom>
			
			<kong v-if="xpData.length==0 &&answersList.length==0 " v-bind:content='contents' ></kong>
			<view v-else class="xp-lese">
				<view class="wd-conter">
					<view class="wd-conter-left">
						<view class="wd-conter-tw" :class="key=='tw'?'wd-conter-color':''" @click="changeTWorHD" data-key="tw">
							楼盘炫拍
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
					<block v-for="items in xpData">
						<view class="items-xpu" @tap.stop="todetails" :data-id="items.id">
							<dazzleBeat :dazzleBeatData="items" :deteleIcon="true"></dazzleBeat>
						</view>
					</block>
				</view>
				<view class="" v-if="key=='hd'">
					<view class="wd-total" v-for="item in answersList" @tap.stop="todetails" :data-id="item.awesomeShooting.id">
						
						
						
						
						<view class="" >
							<view class="wd-hd-textandimg">
								<!-- <image class="wd-hd-img" src="https://img.0728jh.com/staticImg/wen_.png" mode=""></image> -->
								<view class="wd-hd-text">
									 <view class="">
									 	{{item.awesomeShooting.content}}
									 </view>
									 <view class="daz-img">
									 	<block v-for="items in item.awesomeShooting.picUrls">
											<image class="dazzlebeat-top-img" :src="items"></image>
											
										</block>
									 </view>
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
		name:'xp',
		data: function(){
			return {
				key:'tw',
				xpData:[],
				contents:{
					content:"暂时没有炫拍哦~",
					url:"https://img.0728jh.com/staticImg/kong_xp.png",
					btn:"发布炫拍",
					key:'xp',
				},
				isShowTX:'',
				answersList:'',
				key:'tw',
				wxUser:getApp().globalData.wxUser
		   }
		},
		methods:{
			todetails:function(e){
				console.log(e)
				let id = e.currentTarget.dataset.id
				uni.navigateTo({
					url:'../../flareUps-details/home?id='+id
				})
			},
			getAwesomeshooting:function(){ //楼盘炫拍
				let that=this;
				console.log(getApp().globalData.wxUser)
				console.log(getApp().globalData.wxUser.id)
				let id = getApp().globalData.projectItem.id
				that.http(api.Awesomeshootingredding,'GET',{
					current: 1,
					size: 5,
					//descs: 'sort', //降序
					//auditStatus:1,
					userId: getApp().globalData.wxUser.id,
					affiliationId:id
				},false).then(res=>{
					console.log("我的楼盘炫拍")
					console.log(res)
					that.xpData=res.data.records
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
					replyTypes:'1' ,
					affiliationId:id
				},false).then(res=>{
					console.log("我的炫拍回答")
					console.log(res)
					that.answersList=res.data.records
				})
			},
			changeTWorHD:function(e){
				this.key =e.currentTarget.dataset.key
			},
		},
		onLoad: function(){
			this.getAwesomeshooting()
			this.isShowTX=getApp().globalData.interaction || '1'
			this.GetTopicreply()
		}
	}
</script>

<style>
	.daz-img{
		display: flex;
		flex-wrap: wrap;
		padding : 20rpx 0rpx;
	}
	.dazzlebeat-top-img{
		height: 200rpx;
		width: 200rpx;
		border-radius:10rpx;
		margin-right:15rpx;
		margin-bottom: 15rpx;
	}
	
	.wd-total{
		box-shadow:0rpx 0rpx 22rpx 5rpx rgba(198,198,198,0.13);
		margin:20rpx 30rpx;
		
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
		padding:30rpx 20rpx;
		/* margin:30rpx 30rpx 30rpx 30rpx; */
	}
	.items-xpu{
		margin-bottom: 30rpx;
		margin-left: 30rpx;
	}
	.xp-reply{
		width:750rpx;
	}
	.xp-vips-zan{
		display: flex;
		padding:20rpx 30rpx 20rpx 30rpx;
		margin-bottom: 30rpx;
	}
	.xp-vips-zan-icon{
		width:27rpx;
		height: 27rpx;
		position: absolute;
		z-index: 99;
	}
	.xp-vips-zan-text{
		width:690rpx;
		height:69rpx;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(82,103,150,1);
		line-height:48rpx;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.xp-lese{
	/* 	padding:20rpx 30rpx; */
	}
	.xp-vips{
		height:100vh;
		width: 100%;
		background:rgba(255,255,255,1);
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
	page{
		background-color: #FFFFFF;
	}
</style>

