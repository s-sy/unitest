<template>
	<view class="newsInformationDetails-vips">
		<cu-custom bgColor="bg-white" :isBack="true">
				 <block slot="backText"></block>
				 <block slot="content" class="title-text">动态详情</block>
		</cu-custom>
		<view class="newsInformationDetails-vips-title">
			<image :src="wxParseItem.thumbnail" mode="aspectFill" style="width: 100%;height: 486rpx;"></image>
			<view class="float-imge text-xl  text-center">
			        <text class="text-black text-bold">{{wxParseItem.title}}</text>
			 </view>
		</view>
		<view class="views">
			<view class="lookcopyview">
				
			</view>
			<view class="lookviews">
				<image class="lookImg" src="https://img.0728jh.com/staticImg/eye_icon.png" mode=""></image>
				<label> {{wxParseItem.views}}</label>
			</view>
			<button v-if="wxUser.nickName" class="layoutDetail-fadais" @click="getShareCode">
				<image class="layoutDetail-fx-icon" src="https://img.0728jh.com/staticImg/layout_wps.png"></image>
				<label>分享</label>
			</button>
			<button v-else class="layoutDetail-fadais" @click="getUserProfile">
				<image class="layoutDetail-fx-icon" src="https://img.0728jh.com/staticImg/layout_wps.png"></image>
				<label>分享</label>
			</button>
		</view>

		
		<view class="text-wxparse">
			<wxParse :content="article"></wxParse>
		</view>
		<view class="newsInformationDetails-bottom">
			<view class="newsInformationDetails-xgtj">
				相关推荐
			</view>
			<view  v-for="item in newList" @click="tonewsInformationDetails" :data-id="item.id">
				<news :newData="item"></news>
			</view>
		</view>
		
		
		<canvasdrawer :painting="painting" class="canvasdrawer" @getImage="eventGetImage"/>
		<!-- <button @tap="eventSave">保存到本地</button> -->
		<!-- <poster id="poster" :config="PosterConfig" :hide-loading="true" :preload="false" @success="onPosterSuccess" @fail="onPosterFail"></poster> -->
		
		
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
		  <view class="cu-dialog">
		    <view style="height: calc(100vh - 600rpx)">
		      <image :src="shareImage" style="height: 100%;" mode="aspectFit"></image>
		    </view>
		    <view class="cu-bar bg-white">
		      <view class="action margin-0 flex-sub" @tap="hideModal">取消</view>
		      <view class="action margin-0 flex-sub solid-left text-red text-bold" @tap="eventSave">保存到相册</view>
		    </view>
		  </view>
		</view>
		<popupads :popupadsData="popupadsData" :popupaShow="popupaShow"></popupads>
	</view>
</template>

<script>
	
	import init from '../../utils/initPage.js'
	import api from '../api/home.js'
	export default {
		data:function(){
			return {
				popupadsData:'',
				popupaShow:'',
				article:'',
				wxParseItem:'',
				newList:[],
				BaseBudding:'',
				wxUser:'',
				Qcode:'',
				shareImage:'',
				modalName:'',
				
				wxParseItemQrcode:'',
				painting: {},
				
				ordinal:null,
				imageWidth:0,
				imageHeight:0,
				
				neiImgeHeighte:1,
				neiImgeWidth:1,
			}
		},
		methods:{
			hideModal(){
				this.modalName='';
			},
			tonewsInformationDetails(e){
				let id = e.currentTarget.dataset.id
				uni.redirectTo({
					url:'/pages/newsInformationDetails/home?id='+id
				})
			},
			getNewsInformation:function(ids){
				let that=this;
				let id =ids
				that.http(api.NewsInformation,'GET',{
						id:id
				},false).then(res=>{
				//	console.log("单挑news")
				//	console.log(res)
					that.wxParseItem=res.data.records[0]
					if(that.wxParseItem.thumbnail){
						this.wxParseItemQrcode=that.wxParseItem.thumbnail.replace('http://','https://')
					}
					that.article=res.data.records[0].details
					let category=res.data.records[0].category
					that.getNewsinformation(category)
				})
			},
			getNewsInformationbyordinal:function(ordinals){
				let that=this;
				let ordinal = ordinals;
				that.http(api.NewsInformation,'GET',{
						ordinal:ordinal
				},false).then(res=>{
					//console.log("单挑news")
				//	console.log(res)
					that.wxParseItem=res.data.records[0]
					if(that.wxParseItem.thumbnail){
						this.wxParseItemQrcode=that.wxParseItem.thumbnail.replace('http://','https://')
					}
					that.article=res.data.records[0].details
					let category=res.data.records[0].category
					that.getNewsinformation(category)
				})
			},
			getNewsinformation:function(value){  //新闻动态
				let _self=this;
				_self.http(api.NewsInformation,'GET',{
					      current: 1,
					      size:10,
					      descs: 'sort', //降序
						  //asc 升序
				},false).then(res=>{
				//	console.log("所有")
				//	console.log(res)
					res.data.records.forEach(item => {
						 if(item.category == value){
							_self.newList.push(item)
						}
					})
					})
			},
			getBaseBudding(){
				let that=this;
				//console.log("楼盘基本信息")
				//console.log(getApp().globalData.senen.affId)
				let id = getApp().globalData.projectItem ? getApp().globalData.projectItem.id: getApp().globalData.senen.affId
				that.http(api.BaseBudiing+"/get/"+id,'GET',{},false).then(res=>{
				//	console.log("楼盘基本信息")
				//	console.log(res)
					let baseBudding=res.data
					this.baseBudding=res.data
					getApp().globalData.BaseBudding=res.data
						
					})
							
			},
			
			getShareCode:function(){
							let that=this;
						
							
							let scene='';
							let wxUser=getApp().globalData.wxUser
								let project=getApp().globalData.projectItem?(getApp().globalData.projectItem.affiliationCode?getApp().globalData.projectItem:getApp().globalData.BaseBudding):getApp().globalData.BaseBudding;
						
							scene='age_'+project.affiliationCode+'_'+wxUser.userCode
								console.log("查看id")
								console.log(that.recommendItem)
								
								let shishi=scene+'_'+that.wxParseItem.ordinal
							
							that.http(api.ShareCode,'POST',{
									scene:shishi,
									page:'pages/newsInformationDetails/home'
								},false).then(res=>{
								//	console.log("ShareCode")
								//	console.log(res)
									if (res.code==0) {
											const fsm = wx.getFileSystemManager();
											const FILE_BASE_NAME = 'tmp_img_src';
											let filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.jpg`;
											//console.log(res.data)
											fsm.writeFile({
												filePath,
												data: res.data,
												encoding: 'base64',
												success(ress) {
													console.log("dizhi")
														console.log(filePath)
														that.Qcode=filePath
														//that.shareFc()
													//resolve(filePath)
													that.eventDraw()
													},
												fail() {
													//this.canvasFlag=true;
													//uni.showToast({title:'海报生成失败',duration:2000,icon:'none'});
													},
												});
									}
								})
							//})
							
						},
			getwxUser:function(value){
				let that=this;
				that.http(api.wxUserSave,"POST",value,false).then(res=>{
				//	console.log(res)
					// that.wxUser=res.data
					// getApp().globalData.wxUser=res.data
						that.userInfoGets();
				})
			},
			
			// getuserinfohx:function(e){
			// 	if(e.detail.errMsg=="getUserInfo:ok"){
			// 				//TODO:e.detail 存起来
			// 		this.getwxUser(e.detail)
			// 		//this.toflareUpsPush()
					
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
			eventDraw(){
				  wx.showLoading({
				      title: '分享图片生成中',
				      mask: true
				    })
					if(this.shareImage){
						wx.hideLoading()
						this.modalName='Image'
						return;
					}
					let index=Math.floor(Math.random()*10)
					let wxUser= getApp().globalData.wxUser
					let junjia;
					if(!this.baseBudding.price){
						junjia='均价：待定'
					}else{
					junjia	='均价：'+this.baseBudding.price+'/㎡'
					}
					
					this.painting= {
				        width: 375,
				        height: 555,
				        clear: true,
				        views: [
							// 背景图片
				          {
				            type: 'image',
				            url: 'https://img.0728jh.com/staticImg/lanhaibaobao'+index+'.png',
				            top: 0,
				            left: 0,
				            width: 375,
				            height: 555
				          },
				          {
				            type: 'image',
				            url: wxUser.headimgUrl,
				            top: 27.5,
				            left: 29,
				            width: 55,
				            height: 55
				          },
						  //分享图片的人物圆框
				          {
				            type: 'image',
				            url: 'https://img.0728jh.com/staticImg/lantukuang'+index+'.png',
				            top: 27.5,
				            left: 29,
				            width: 55,
				            height: 55
				          },
				          {
				            type: 'text',
				            content: '您的好友【'+ wxUser.nickName +'】',
				            fontSize: 16,
				            color: '#402D16',
				            textAlign: 'left',
				            top: 33,
				            left: 96,
				            bolder: true,
							MaxLineNumber: 1,
							breakWord: true,
							width: 250
				          },
				          {
				            type: 'text',
				            content: '向您推荐'+this.baseBudding.projectName,
				            fontSize: 15,
				            color: '#563D20',
				            textAlign: 'left',
				            top: 59.5,
				            left: 96
				          },
						  //内容this.recommendItem.src
				          {
							  
				            type: 'image',
				            url: this.wxParseItemQrcode,
				            top: 136,
							left:42.5,
							width:290,
							// left:(357/2)-(((this.neiImgeWidth*186)/this.neiImgeHeighte)/2),
							// width: (this.neiImgeWidth*186)/this.neiImgeHeighte,
				            height: 186,
				          },
						  //二维码
				          {
				            type: 'image',
				            url: this.Qcode,
				            top: 435,
				            left: 78,
				            width: 80,
				            height: 80
				          },
				          {
				            type: 'text',
				            content: this.wxParseItem.title,
				            fontSize: 16,
				            lineHeight: 21,
				            color: '#383549',
				            textAlign: 'left',
				            top: 336,
				            left: 44,
				            width: 287,
				            MaxLineNumber: 2,
				            breakWord: true,
				            bolder: true
				          },
						  
				          {
				            type: 'text',
				            content: junjia,
				            fontSize: 19,
				            color: '#E62004',
				            textAlign: 'left',
				            top: 387,
				            left: 150,
				            bolder: true
				          },
				        
				          {
				            type: 'text',
				            content: '长按识别图中二维码了解'+this.baseBudding.projectName,
				            fontSize: 14,
				            color: '#383549',
				            textAlign: 'left',
				            top: 460,
				            left: 165.5,
				            lineHeight: 20,
				            MaxLineNumber: 2,
				            breakWord: true,
				            width: 125
				          }
				        ]
				      }
			},
			
			eventSave:function(){
				this.hideModal();
				console.log(this.shareImage)
				  wx.saveImageToPhotosAlbum({
				      filePath: this.shareImage,
				      success (res) {
				        wx.showToast({
				          title: '保存图片成功',
				          icon: 'success',
				          duration: 2000
				        })
				      }
				  })
			},
			eventGetImage:function(event) {
				let that=this;
				console.log(event)
				wx.hideLoading()
				console.log(event.detail.tempFilePath)
				console.log(this)
				uni.getImageInfo({
					src:event.detail.tempFilePath,
					success(e) {
						console.log("图片宽高")
						console.log(e)
						that.imageWidth=e.width
						that.imageHeight=e.height
					},
					fail() {
						console.log("图片宽高获取失败")
					}
				})
				that.shareImage=event.detail.tempFilePath
				that.modalName='Image'
			},
			
			userInfoGets:function(){
			 let that=this
			 this.http(api.userInfoGet,'GET',{},false)
			    .then(res => {
					
			    that.wxUser=res.data
				console.log(res)
			    getApp().globalData.wxUser=res.data
			
			    })
			},
			getPopupads:function(){
				let that=this;
				that.http(api.Popupads,'GET',{},false).then(res=>{
					console.log("弹框")
					console.log(res)
					if(res){
						that.popupadsData=res.data
					}
				})
			},
			
			Jiema(web,aff,user){
				let that=this;
				return new Promise((resolve,reject)=>{
					that.http(api.Jiema,'GET',{
						aff:aff,
						user:user,
						scene:web,
					},false).then(res=>{
						console.log("解码")
						console.log(res)
						resolve(res)
					})
				})
			},
		},

		onShareAppMessage: function() {
						let BaseBudding=getApp().globalData.BaseBudding
						let invitee='';
						let wxUser=getApp().globalData.wxUser
						// if(wxUser.userType=='1'){
							invitee=wxUser.id
						// }
						// if(wxUser.userType=='0'){
						// 	invitee=wxUser.invitee
						// }
						let project=getApp().globalData.projectItem;
						let code =project.affiliationCode || this.affCode
						let scene='age_'+code+'_'+wxUser.userCode
						scene=scene+'_'+this.wxParseItem.ordinal
						return {
						  title:BaseBudding.projectName,
						 path: '/pages/newsInformationDetails/home?invitee='+invitee+'&scene='+scene
						}	    
		 },
		async onLoad(options) {
			let that=this;
			if(options.scene){
				 let scene=decodeURIComponent(options.scene) 
				 
				 let list=scene.split("_")
				 let values=await that.Jiema(list[0],list[1],list[2])
				 console.log(list)
				 console.log(values)
				 values.data['senen']=list[0]
				 let obj= {id:values.data.affId}
				 getApp().globalData.projectItem=obj
				 console.log(values.data)
				 getApp().globalData.senen=values.data
				 getApp().globalData.invitee=values.data.userId
				 
				//let invitee=(scene || '').split('_')[0]
				let ordinal = list[3]
				this.affCode=list[1]
			//	console.log(invitee)
				console.log(ordinal)
				//getApp().globalData.invit=invitee
				this.ordinal=parseInt(ordinal)
			}
			if(options.invitee){
				getApp().globalData.invit=options.invitee
			}
			init.initPage().then(res=>{
				this.popupaShow = getApp().globalData.popupaShow==null?true:getApp().globalData.popupaShow 
				this.wxUser=getApp().globalData.wxUser
				
				if(this.ordinal==null){
					this.getNewsInformation(options.id)
				}else{
					this.getNewsInformationbyordinal(this.ordinal)
				}
				this.getPopupads()
				this.getBaseBudding()
				
			})
			
		}
	}
</script>
<style>
@import url("@/components/u-parse/u-parse.css");
</style>
<style>
	page{
		background-color: #FFFFFF;
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
	.views{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0rpx 10rpx;
	}
	.lookcopyview{
		width: 430rpx;
	}
	.lookImg{
		width:30rpx;
		height:28rpx;
		margin-right: 20rpx;
	}
	.lookviews{
		
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		
	}
	.newsInformationDetails-vips-title{
		margin-bottom: 10rpx;
	}
	.float-imge{
		padding:0rpx 20rpx;
		
	}
	.newsInformationDetails-bottom{
		padding:20rpx 30rpx;
	}
	.newsInformationDetails-xgtj{
		font-size:40rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:60rpx;
		margin-bottom: 30rpx;
	}
	.text-wxparse{
		text-align: center;
		padding:10rpx 20rpx;
		
	}
	.newsInformationDetails-vips{
		background-color: #FFFFFF;
	}
</style>
