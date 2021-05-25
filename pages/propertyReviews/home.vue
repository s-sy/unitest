<template>
	<view class="reviews">
		
		<cu-custom bgColor="bg-white" :isBack="true">
				 <block slot="backText"></block>
				 <block slot="content" class="title-text">楼盘点评</block>
		</cu-custom>
		<scroll-view scroll-y="true" class="scroll-view-y" @scrolltolower="scrolltolower">
			
			<view class="reviews-bludding">
			<bludding :wxUser="wxUser" :len="swiperList.length" :dataItem="dataItem" @eventDraw="getShareCode" ></bludding>
			</view>
			<block v-for="item in swiperList">
			<view class="reviews-comment" @click="topReviewsDetail" :data-id="item.id" v-if="item.auditStatus=='1' ">
				<comment :wxUser="wxUser" :swiperItem="item" :logoImg="logoImg" :page="'singleton'"></comment>
				<!-- <view class="reviews-loppanreply">
					<view class="reviews-loppanreply-title">
						楼盘回复：
					</view>
					<view class="reviews-loppanreply-content">
						感谢您对项目的关注，为保证建筑质量，工程上我们是在保质保量的前提下进行施工，也并不存在工程太慢的情况，一切都是在操作。
					</view>
				</view>
				<view class="reviews-loppanreply">
					<view class="reviews-loppanreply-title">
						网友回复：
					</view>
					<view class="reviews-netreply-content">
						<text>冬天的熊：</text> <text>感谢您对项目的关注，为保证建住...</text>
					</view>
				</view> -->
				<view class="reviews-gdpl">
					查看更多评论 >
				</view>
			</view>
			</block>
		</scroll-view>
		
		
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
	import api from '../../pages/api/home.js'
	export default {
		data:function(){
			return {
				dataItem:{
					auditStatus:'1'
				},
				popupadsData:'',
				popupaShow:'',
				swiperList:[],
				wxUser:getApp().globalData.wxUser,
				baseBudding:'',
				logoImg:'',
				painting: {},
				shareImage:'',
				modalName:'',
				imageWidth:0,
				imageHeight:0,
				Qcode:'',
				neiImgeHeighte:1,
				neiImgeWidth:1,
				dpcurrent:1,
				// wxUser:'',
				ordinal:null,
			}
		},
		methods:{
			scrolltolower:function(){
				//console.log("触底加载")
				this.dpcurrent=this.dpcurrent+1
				this.getreadingReviews()
			},
			getlogoImg(){
				let _self=this;
				let id =getApp().globalData.projectItem?getApp().globalData.projectItem.id:getApp().globalData.senen.affId
				_self.http(api.Notice,'GET',{ type: '1',  //swipelist 轮播图
				enable: '1',affiliation:'2',affiliationId:id},false).then(res=>{
					//console.log("轮播图")
					//	console.log(res)
						if(res.data.listAdvertisementItem){
							// _self.swiperList=res.data.listAdvertisementItem
							 _self.logoImg=res.data.listAdvertisementItem[0].url
							 try {
							     uni.setStorageSync('logoImg', res.data.listAdvertisementItem[0].url);
							 } catch (e) {
							     // error
								 
							 }
						}
					
					// console.log(this.swiperList)
				  })
			},
			topReviewsDetail:function(e){
				let id = e.currentTarget.dataset.id
				//console.log(item)
				uni.navigateTo({
					url:'../pReviewsDetails/home?id='+ id
				})
			},
			getreadingReviews:function(){  //楼盘点评
				let that=this;
				that.http(api.ReadingReviews,'GET',{
					current: that.dpcurrent,
					size: 5,
					auditStatus:1,
					descs: 'create_time', 
					createId:getApp().globalData.wxUser.id,
					affiliationId:getApp().globalData.projectItem?getApp().globalData.projectItem.id:getApp().globalData.senen.affId
					//userId:getApp().globalData.wxUser.id
				},false).then(res=>{
					//console.log("楼盘点评")
					//console.log(res)
					// that.swiperList=res.data.records
					for(let item of res.data.records){
						that.swiperList.push(item)
					}
					
				})
			},
			getBaseBudding(){
				let that=this;
				let id = getApp().globalData.projectItem ? getApp().globalData.projectItem.id: getApp().globalData.senen.affId
				that.http(api.BaseBudiing+"/get/"+id,'GET',{},false).then(res=>{
				//	console.log("楼盘基本信息")
				//	console.log(res)
					let baseBudding=res.data
					this.baseBudding=res.data
					getApp().globalData.BaseBudding=res.data
							//that.tagData=(this.baseBudding.keywords || '').split(' ')
							//that.index=parseInt(this.baseBudding.salesStatus)
							//that.getBuddingDetail()
					})
							
			},
			hideModal(){
				this.modalName='';
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
					this.painting= {
				        width: 375,
				        height: 555,
				        clear: true,
				        views: [
							// 背景图片
				          {
				            type: 'image',
				            url: 'https://img.0728jh.com/staticImg/haibaobao'+index+'.png',
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
				            url: 'https://img.0728jh.com/staticImg/huangtukuang'+index+'.png',
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
				          	url: this.logoImg,
				          	top: 136,
				          	left:42.5,
				          	width:290,
				          	// left:  (357/2)-(((this.neiImgeWidth*186)/this.neiImgeHeighte)/2),
				          	// width: (this.neiImgeWidth*186)/this.neiImgeHeighte,
				          	height: 186,
				          },
						  //二维码
				          {
				            type: 'image',
				            url: this.Qcode,
				            top: 435,
				            left: 80,
				            width: 80,
				            height: 80
				          },
				         {
				            type: 'text',
				            content: '楼盘点评',
				            fontSize: 20,
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
						     content: '看看别人怎么说~',
						     fontSize: 16,
						     lineHeight: 21,
						     color: '#383549',
						     textAlign: 'left',
						     top: 380,
						     left: 44,
						     width: 287,
						     MaxLineNumber: 2,
						     breakWord: true,
						     bolder: true
						   },
						  
				    //       {
				    //         type: 'text',
				    //         content: '￥'+this.recommendItem.price+'/㎡',
				    //         fontSize: 19,
				    //         color: '#E62004',
				    //         textAlign: 'left',
				    //         top: 387,
				    //         left: 44.5,
				    //         bolder: true
				    //       },
				          // {
				          //   type: 'text',
				          //   content: '面积:'+this.recommendItem.floorage+'㎡',
				          //   fontSize: 14,
				          //   color: '#383549',
				          //   textAlign: 'left',
				          //   top: 391,
				          //   left: 180,
				          //   // textDecoration: 'line-through'
				          // },
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
			//	console.log(this.shareImage)
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
				//console.log(event)
				wx.hideLoading()
			//	console.log(event.detail.tempFilePath)
			//	console.log(this)
				uni.getImageInfo({
					src:event.detail.tempFilePath,
					success(e) {
					//	console.log("图片宽高")
					//	console.log(e)
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
			
			getShareCode:function(){
							let that=this;
						//	return new Promise((resolve,reject)=>{
							
							let scene='';
							let wxUser=getApp().globalData.wxUser
								let project=getApp().globalData.projectItem?(getApp().globalData.projectItem.affiliationCode?getApp().globalData.projectItem:getApp().globalData.BaseBudding):getApp().globalData.BaseBudding;
							scene='age_'+project.affiliationCode+'_'+wxUser.userCode
								//console.log("查看id")

							that.http(api.ShareCode,'POST',{
									scene:scene,
									page:'pages/propertyReviews/home'
								},false).then(res=>{	
								//	console.log("ShareCode")
									//console.log(res)
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
													//console.log("dizhi")
													//	console.log(filePath)
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
						
						userInfoGets:function(){
						 let that=this
						 this.http(api.userInfoGet,'GET',{},false)
						    .then(res => {
										//	console.log("userInfoGet")
										//	console.log(res)
						       // userInfo: res.data
						    that.wxUser=res.data
							//console.log(res)
						    getApp().globalData.wxUser=res.data
						//	that.getUserinfo() 			//刷新置业顾问
						    })
						},
			getPopupads:function(){
				let that=this;
				that.http(api.Popupads,'GET',{},false).then(res=>{
					//console.log("弹框")
					//console.log(res)
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
						//console.log("解码")
						//console.log(res)
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
						let project = getApp().globalData.projectItem
						let code =project.affiliationCode || this.affCode
						let scene='age_'+code+'_'+wxUser.userCode
						
						return {
						  title:BaseBudding.projectName,
						  path: '/pages/propertyReviews/home?invitee='+invitee+'&scene='+scene
						}	    
		 },
		async onLoad(options) {
			let that=this;
			if(options.scene){
				let scene=decodeURIComponent(options.scene) 
				let list=scene.split("_")
				let values= await that.Jiema(list[0],list[1],list[2])
				// console.log(list)
				// console.log(values)
				 values.data['senen']=list[0]
				 let obj ={id:values.data.affId}
				 that.affCode=list[1]
				getApp().globalData.projectItem=obj
				// console.log(values.data)
				 getApp().globalData.senen=values.data
				 getApp().globalData.invitee=values.data.userId
			//	getApp().globalData.invit=scene
			}
			if(options.invitee){
				getApp().globalData.invit=options.invitee
			}
			init.initPage().then(res=>{
				this.popupaShow = getApp().globalData.popupaShow==null?true:getApp().globalData.popupaShow 
				this.wxUser=getApp().globalData.wxUser
				//let invit=getApp().globalData.invit
				// if(!this.wxUser.invitee && invit && this.wxUser.userType=='0'){
				// 	this.chooseGWgu(invit)
				// }
				this.dpcurrent=1
				this.getlogoImg()
				this.getreadingReviews()
				this.getBaseBudding()
				this.getPopupads()
			})
			
		}
	}
</script>

<style>
	.scroll-view-y{
		background-color: #FFFFFF;
		padding-bottom: 30rpx;
		height: calc(100vh - 160rpx);
	}
	.reviews-gdpl{
		margin-top:30rpx;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:50rpx;
		margin-left: 30rpx;
		
	}
	page{
		background-color: #FFFFFF;
	}
	/* .reviews-netreply-content{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(102,102,102,1);
		line-height:48rpx;
		padding: 20rpx 31rpx 10rpx 28rpx;
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
	} */
	.reviews-loppanreply{
		
	}
	.reviews-comment{
		/* margin-right: 30rpx;
		margin-top: 30rpx;
		margin-left: 30rpx; */
		margin:30rpx 30rpx 30rpx 30rpx;
		box-shadow:0rpx 0rpx 22rpx 5rpx rgba(198,198,198,0.2);
		padding-bottom: 20rpx;
	
	}
.reviews-bludding{
	margin:8rpx 30rpx 20rpx 30rpx;
}

	.reviews{
		height: 100vh;
		background-color: #FFFFFF;
	}
</style>
