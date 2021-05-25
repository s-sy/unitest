<template>
	<view class="bludding">
		<view class="bludding-onerow">
			<view class="bludding-name">
				{{baseBudding.projectName}}
			</view>
			<view class="bludding-pf">
				5.0
			</view>
		</view>
		<view class="bludding-tworow">
			<view class="bludding-rate">
				<uni-rate size="13" value="5"></uni-rate>
			</view>
			<view class="bludding-pl">
				{{len}}条评论
			</view>
			<view class="fenxiangk">
				<button v-if=" wxUser.nickName && dataItem.auditStatus == '1' " class="layoutDetail-fadais" @click="eventDraw">
					<image class="layoutDetail-fx-icon" src="https://img.0728jh.com/staticImg/layout_wps.png"></image>
					<label>分享</label>
				</button>
				<button  v-if=" !wxUser.nickName && dataItem.auditStatus == '1' " class="layoutDetail-fadais" @click="getUserProfile" >
					<image class="layoutDetail-fx-icon" src="https://img.0728jh.com/staticImg/layout_wps.png"></image>
					<label>分享</label>
				</button>
			</view>
			
		</view>
		<view class="bludding-shrrow">
			<view class="bludding-shrrow-items">
				<view class="">
					价格
				</view>
				<view class="bludding-shrrow-items-mun">
					5.0
				</view>
			</view>
			<view class="bludding-shrrow-items">
				<view class="">
					地段
				</view>
				<view class="bludding-shrrow-items-mun">
					5.0
				</view>
			</view>
			<view class="bludding-shrrow-items">
				<view class="">
					交通
				</view>
				<view class="bludding-shrrow-items-mun">
					5.0
				</view>
			</view>
			<view class="bludding-shrrow-items">
				<view class="">
					配套
				</view>
				<view class="bludding-shrrow-items-mun">
					5.0
				</view>
			</view>
			<view class="bludding-shrrow-items">
				<view class="">					
                   环境
				</view>
				<view class="bludding-shrrow-items-mun">
					5.0
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../pages/api/home.js'
	export default {
		props:{
			wxUser:{
				type:Object,
				default:null,
			},
			len:{
				type:Number,
				default:0,
			},
			dataItem:{
				type:Object,
				default:null,
			}
			// baseBudding:{
			// 	type:Object,
			// 	default:null
			// }
		},
		data:function(){
			return {
				baseBudding:'',
				swiperList:'',
			}
		},
		methods:{
			getreadingReviews:function(){  //楼盘点评
				let that=this;
				that.http(api.ReadingReviews,'GET',{
					current: 1,
					size: 2,
					auditStatus:1,
					createId:getApp().globalData.wxUser.id,
					//userId:getApp().globalData.wxUser.id
				},false).then(res=>{
				//	console.log("楼盘点评")
				//	console.log(res)
					that.swiperList=res.data.records
				})
			},
			eventDraw(){
				this.$emit('eventDraw')
			},
			getwxUser:function(value){
				let that=this;
				that.http(api.wxUserSave,"POST",value,false).then(res=>{
				//	console.log(res)
					that.wxUser=res.data
					getApp().globalData.wxUser=res.data
					that.eventDraw()
				})
			},
			
			getuserinfohx:function(e){
				if(e.detail.errMsg=="getUserInfo:ok"){
							//TODO:e.detail 存起来
					this.getwxUser(e.detail)
					//this.toflareUpsPush()
					
				}
			},
			getUserProfile(e) {
					    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
					    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
					let that=this;
					    wx.getUserProfile({
					      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					      success: (res) => {
							  this.getwxUser(res)
					      }
					    })
					  },
			
			
		},
		mounted() {
			this.baseBudding=getApp().globalData.BaseBudding
		}
	}
</script>

<style>
	.fenxiangk{
		/* border:solid 1rpx #000000; */
		margin-left:250rpx ;
	}
	.layoutDetail-fx-icon{
		height: 35rpx;
		width:35rpx;
		margin-right: 10rpx;
	}
	.layoutDetail-fadais{
		display: flex;
		align-items: center;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		background-color: transparent;
		border: none;	
	}
	.layoutDetail-fadais::after{
		border:none;
	}
	.layout-center-on-tag-two{
		background:rgba(225,242,251,1);
		color:rgba(90,161,251,1);
		padding:4rpx 10rpx;
		font-size: 20rpx;
		margin-left: 10rpx;
		border-radius: 8rpx;
	}
	.layout-center-on-tag-one{
		color:rgba(252,168,47,1);
		background:rgba(252,241,217,1);
		padding:4rpx 10rpx;
		font-size: 20rpx;
		margin-left: 10rpx;
		border-radius: 8rpx;
	}
	.layout-center-on-tag-zreo{
		background:rgba(255,230,230,1);
		color:rgba(255,89,89,1);
		padding:4rpx 10rpx;
		font-size: 20rpx;
		margin-left: 10rpx;
		border-radius: 8rpx;
	}
	.bludding-shrrow-items-mun{
		margin-left:10rpx
	}
	.bludding-shrrow-items{
		display: flex;
		align-items: center;
		
	}
	.bludding-shrrow{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		padding: 0rpx 36rpx;
		margin-top:20rpx;
	}
	.bludding-pl{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin-left: 24rpx;
		
	}
	.bludding-rate{
		margin-left: 31rpx;
		
	}
	.bludding-tworow{
		display: flex;
		align-items: center;
		padding-top: 27rpx;
		
	}
	.bludding-pf{
		font-size:40rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(251,69,14,1);
		margin-left: 12rpx;
		
	}
	.bludding-name{
		font-size:40rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin-left:31rpx
	}
	.bludding-onerow{
		display: flex;
		align-items: center;
		
	}
	.bludding{
		
	}
</style>
