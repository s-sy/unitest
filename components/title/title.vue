<template>
	
	
		<view class="flex align-center justify-between dakuang">
			<view class=" margin-xs  text-dax">{{content}}</view>
			<button v-if="userInfo.nickName" class=" padding-sm margin-xs  text-colo"   @click="toDetil">{{title.type=='aroundp'?'全屏地图':'查看全部'}} ></button>
			<button v-else class=" padding-sm margin-xs  text-colo"  @click="getUserProfile"  >{{title.type=='aroundp'?'全屏地图':'查看全部'}} ></button>
	</view>
</template>

<script>
	import init from '../../utils/initPage.js'
	import api from '../../pages/api/home.js'
	export default{
		props: {
			title:{
				type:Object,
				default:null,
				},
				// wxUsers:{
				// 	type:Object,
				// 	default:null,
				// }
				userInfo:{
					type:Object,
					default:null,
				}
			},
		
		data: function() {
			return {
				content: this.title.name,
				wxUser:getApp().globalData.wxUser,
			}
		},
		
		mounted() {
			// this.wxUser=this.userInfo
			 // this.$nextTick(function () {
				//  this.userInfoGet()
			 // })
			// init.initPage().then(res=>{ 
				//this.userInfoGet()
			// })
		},
		methods:{
			userInfoGet:function(){
			 let that=this
			 this.http(api.userInfoGet,'GET',{},false)
			    .then(res => {
							//	console.log("userInfoGet")
							//	console.log(res)
			       // userInfo: res.data
			    that.wxUser=res.data
			    getApp().globalData.wxUser=res.data
				//that.getUserinfo() 			//刷新置业顾问
			    })
			},
			getwxUser:function(value){
				let that=this;
				that.http(api.wxUserSave,"POST",value,false).then(res=>{
				//	console.log(res)
					that.wxUser=res.data
					getApp().globalData.wxUser=res.data
					this.toDetil()	
				})
			},
			// getuserinfo:function(e){
			// 	if(e.detail.errMsg == "getUserInfo:ok"){ 
			// 		this.getwxUser(e.detail)
					
			// 	}
			// },
			getUserProfile(e) {
					    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
					    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
					let that=this;
					    wx.getUserProfile({
					      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					      success: (res) => {
						that.getwxUser(res)
					      }
					    })
					  },
			toDetil:function(){
			switch(this.title.type){
				case 'aparment' :
					uni.navigateTo({
					    url: '../../pagestwo/apartementLayout/home'
					});
				/**
				 * ../../pages/apartementLayout/home
				 * */
				break;
				case 'initialCounter' :
					uni.navigateTo({
					    url: '../../pages/propertyConsultant/home'
					});
				break;
				case 'news' :
				uni.navigateTo({
				    url: '../../pages/newsInformation/home'
				});
				break;
				case 'loyal' :
				uni.navigateTo({
				    url: '../../pages/propertyReviews/home'
				});
				break;
				case 'xup' :
				uni.navigateTo({
				    url: '../../pages/flareUps/home'
				});
				break;
				case 'aroundp' :
				uni.navigateTo({
				    url: '../../pages/peripheralMatching/home'
				});
				break;
				case 'questions' :
				uni.navigateTo({
				    url: '../../pages/questionsAndAnswers/home'
				});
				break;
				
			}
		}
	},
	}
</script>

<style>
	.dakuang{
		/* border:solid 1rpx #000000; */
	}
	.text-dax{
		font-size:40rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		/* border:solid 1rpx #000000; */
		margin-left: 30rpx;
	/* 	width:520rpx; */
	}
	.text-colo{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(250,94,50,1);
		align-self:flex-end;
		background-color: transparent;
		border: none;	
		margin-top:25rpx;
	}
	.text-colo::after{
		border:none;
	}
</style>
