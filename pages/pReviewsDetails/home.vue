<template>
	<view class="pReviewsDetails">
		<cu-custom bgColor="" :isBack="true">
				 <block slot="backText"></block>
				 <block slot="content" class="title-text">点评详情</block>
		</cu-custom>
		<bludding :len="swiperList.length" :wxUser="wxUser" :dataItem="swiperItem" @eventDraw="getShareCode"></bludding>
		<view class="">
			<comment :wxUser="wxUser" :swiperItem="swiperItem" :logoImg="logoImg" :page="'detail'" @getRefreshData="getRefreshData" v-if="swiperItem"></comment>
			<!-- <view class="reviews-loppanreply">
				<view class="reviews-loppanreply-title">
					楼盘回复：
				</view>
				<view class="reviews-loppanreply-content">
					感谢您对项目的关注，为保证建筑质量，工程上我们是在保质保量的前提下进行施工，也并不存在工程太慢的情况，一切都是在操作。
				</view>
			</view>
			<view class="">
				<view class="reviews-loppanreply-title">
					网友回复：
				</view>
				<view class="">
					<netReply></netReply>
				</view>
			</view> -->
			<view class="" v-if="isShowTx && wxUser.userType=='1'">
				<textarea class="reviews-textarea" :value="details" placeholder="请输入您点评的内容" placeholder-class="textarea-p" @input="getTextareaValue"></textarea>
				<button v-if="!wxUser.nickName" class="reviews-commit" @click="getUserProfile" >
					提交评论
				</button>
				<button v-else :disabled="disabled" class="reviews-commit" @click="ReviewsCommit">
					提交评论
				</button>
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
	import api from '../../pages/api/home.js'
	export default {
		data:function(){
			return {
				swiperItem:{id:''},
				details:'',
				wxUser:getApp().globalData.wxUser,
				isShowTx:'',
				swiperList:'',
				painting: {},
				shareImage:'',
				modalName:'',
				imageWidth:0,
				imageHeight:0,
				Qcode:'',
				neiImgeHeighte:1,
				neiImgeWidth:1,
				baseBudding:'',
				ordinal:null,
				logoImg:'',
				disabled:false,
			}
		},
		methods:{
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
			getlogoImg(){
				let _self=this;
				let id = getApp().globalData.projectItem.id
				_self.http(api.Notice,'GET',{ type: '1',  //swipelist 轮播图
				enable: '1',affiliation:'2',affiliationId:id},false).then(res=>{
					//console.log("轮播图")
						//console.log(res)
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
			getTextareaValue:function(e){
				let IsAuth=this.isAuth()
				this.details=e.detail.value
				
				//console.log(this.details)
			},
			getreadingReviewstotal:function(){  //楼盘点评
				let that=this;
				that.http(api.ReadingReviews,'GET',{
					current: 1,
					size: 100,
					auditStatus:1,
					createId:getApp().globalData.wxUser.id,
					//userId:getApp().globalData.wxUser.id
				},false).then(res=>{
				//	console.log("楼盘点评")
				//	console.log(res)
					that.swiperList=res.data.records
				})
			},
			getreadingReviews:function(ids){  //楼盘点评
				let that=this;
				let id = ids || that.swiperItem.id
				//console.log(id)
				that.http(api.ReadingReviews,'GET',{
					current: 1,
					size: 1,
					id:id
					//auditStatus:1,
					
					//createId:getApp().globalData.wxUser.id,
					// userId:getApp().globalData.wxUser.id
				},false).then(res=>{
				//	console.log("1请求点评详情，2刷新数据")
				//	console.log(res)
					that.disabled=false
					that.swiperItem = res.data.records[0]
				})
			},
			getreadingReviewsbyordinal:function(ordinal){  //楼盘点评
				let that=this;
			//	let id = ids || that.swiperItem.id
				//console.log(id)
				that.http(api.ReadingReviews,'GET',{
					// current: 1,
					// size: 1,
					ordinal:ordinal
					//auditStatus:1,
					
					//createId:getApp().globalData.wxUser.id,
					// userId:getApp().globalData.wxUser.id
				},false).then(res=>{
				//	console.log("1请求点评详情，2刷新数据")
				//	console.log(res)
					that.disabled=false
					that.swiperItem = res.data.records[0]
				})
			},
			getRefreshData:function(){
				this.getreadingReviews()
			},
			getwxUser:function(value){
				let that=this;
				that.http(api.wxUserSave,"POST",value,false).then(res=>{
					// console.log(res)
					// that.wxUser=res.data
					// getApp().globalData.wxUser=res.data
					that.userInfoGets()
					
				})
			},
			// getuserinfo:function(e){
			// 	if(e.detail.errMsg=="getUserInfo:ok"){
			// 		this.getwxUser(e.detail)
			// 		//this.ReviewsCommit()
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
			ReviewsCommit:function(){
				let that=this;
				//let IsAuth=that.isAuth()
				// if(!IsAuth){
				// 	return;
				// }
				if(!that.disabled){
					that.disabled=true
					let str = that.details.replace(/\s*/g,"")
					if(!str){
						that.disabled=false
						return;
					}
				//	console.log(that.details)
						that.http(api.Topicreply,'POST',{
							replyTypes: 2,
							typesId:that.swiperItem.id,
							details:that.details,
							replyClass:that.swiperItem.createId==getApp().globalData.wxUser.id?'1':'0',
							affiliationId:getApp().globalData.projectItem.id,
						},false).then(res=>{
						//	console.log("写回复")
						//	console.log(res)	
							that.details=''
							that.getreadingReviews(that.swiperItem.id)
						})
				}
				
				},
			
			getTestReviews:function(ids){   //l浏览量
			let that=this;
			let id = ids || that.swiperItem.id;
			//console.log(id)
				that.http(api.TestReviews,'POST',{
					id:id
				},false).then(res=>{
				//	console.log("浏览+1")
				//	console.log(res)
					//this.swiperItem=res.data.records[0]
					if(res.data==true){
						that.getreadingReviews(id)
					}
				})
				},
				getBaseBudding(){
					let that=this;
					let id = getApp().globalData.projectItem.id
					that.http(api.BaseBudiing+"/get/"+id,'GET',{},false).then(res=>{
						//console.log("楼盘基本信息")
						//console.log(res)
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
						let wxUser= getApp().globalData.wxUser
						this.painting= {
					        width: 375,
					        height: 555,
					        clear: true,
					        views: [
								// 背景图片
					          {
					            type: 'image',
					            url: 'https://img.0728jh.com/staticImg/haibaobao.png',
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
					            url: 'https://img.0728jh.com/staticImg/tukuang.png',
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
					     //      {
								  
					     //        type: 'image',
					     //        url: this.recommendItem.src,
					     //        top: 136,
					     //        left:  (357/2)-(((this.neiImgeWidth*186)/this.neiImgeHeighte)/2),
					     //        width: (this.neiImgeWidth*186)/this.neiImgeHeighte,
					     //        height: 186,
					     //      },
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
					            top: 150,
					            left: 44,
					            width: 287,
					            MaxLineNumber: 2,
					            breakWord: true,
					            bolder: true
					          },
							  {
							    type: 'text',
							    content: '网友 ：',
							    fontSize: 16,
							    lineHeight: 21,
							    color: '#383549',
							    textAlign: 'left',
							    top: 200,
							    left: 44,
							    width: 287,
							    MaxLineNumber: 2,
							    breakWord: true,
							    bolder: true
							  },
							  {
							    type: 'text',
							    content:this.swiperItem.content,
							    fontSize: 16,
							    lineHeight: 21,
							    color: '#383549',
							    textAlign: 'left',
							    top: 250,
							    left: 44,
							    width: 287,
							    MaxLineNumber: 4,
							    breakWord: true,
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
					console.log(event)
					wx.hideLoading()
					//console.log(event.detail.tempFilePath)
					//console.log(this)
					uni.getImageInfo({
						src:event.detail.tempFilePath,
						success(e) {
							//console.log("图片宽高")
							//console.log(e)
							that.imageWidth=e.width
							that.imageHeight=e.height
						},
						fail() {
							//console.log("图片宽高获取失败")
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
								let scenen=scene+'_'+that.swiperItem.ordinal
								//	console.log("查看scenen")
								//	console.log(scenen)
								that.http(api.ShareCode,'POST',{
										scene:scenen,
										page:'pages/pReviewsDetails/home'
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
													//	console.log("dizhi")
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
								
								
							},
				
		
				userInfoGets:function(){
				 let that=this
				 this.http(api.userInfoGet,'GET',{},false)
				    .then(res => {
				    that.wxUser=res.data
				//	console.log(res)
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
						let project= getApp().globalData.projectItem;
						let code=project.affiliationCode || this.affCode
						let scene=scene='age_'+code+'_'+wxUser.userCode
						scene=scene+'_'+this.swiperItem.ordinal
						return {
						  title:BaseBudding.projectName,
						  path: '/pages/pReviewsDetails/home?invitee='+invitee+'&scene='+scene
						}	    
		 },
		async onLoad(options) {
			let that=this;
			if(options.scene){
				 let scene=decodeURIComponent(options.scene) 
				
				let list=scene.split("_")
				let values= await that.Jiema(list[0],list[1],list[2])
				//console.log(list)
				//console.log(values)
				values.data['senen']=list[0]
				let obj={id:values.data.affId}
				 getApp().globalData.projectItem= obj
				// console.log(values.data)
				 getApp().globalData.senen=values.data
			    getApp().globalData.invitee=values.data.userId
				this.ordinal=parseInt(list[3])
				this.affCode = list[1]
			}
			
			// this.swiperItem = JSON.parse(decodeURIComponent(option.item));
			if(options.invitee){
				getApp().globalData.invit=options.invitee
			}
			if(options.id){
				let id=options.id
				this.swiperItem.id=id
			}
			this.isShowTx= getApp().globalData.interaction=="0"?true:false
			// this.isShowTx=getApp().globalData.interaction || '1'
			init.initPage().then(res=>{ 
				this.popupaShow = getApp().globalData.popupaShow==null?true:getApp().globalData.popupaShow 
				that.wxUser=getApp().globalData.wxUser
				//let invit=getApp().globalData.invit
				
				// if(!that.wxUser.invitee && invit && that.wxUser.userType=='0'){
				// 	that.chooseGWgu(invit)
				// }
				if(this.ordinal!=null){
					this.getreadingReviewsbyordinal(this.ordinal)
				}else{
					that.getTestReviews(that.swiperItem.id)
					that.getreadingReviews(that.swiperItem.id)
				}
				
				that.getBaseBudding()
				that.getreadingReviewstotal()
				that.getlogoImg()
				that.getPopupads()
			})
			//console.log(this.swiperItem)
			
			
			
			
		},
		onShow() {
			
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
	.reviews-commit{
		width:690rpx;
		height:88rpx;
		background:rgba(22,204,246,1);
		border-radius:10rpx;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 88rpx;
		margin:70rpx 30rpx 55rpx 30rpx;
	}
	.textarea-p{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		
	}
.reviews-textarea{
	width:687rpx;
	height:303rpx;
	background:rgba(246,246,246,1);
	opacity:0.7;
	margin-left: 31rpx;
	padding: 31rpx 28rpx;
	font-size:24rpx;
	
}
	
/* 	.reviews-loppanreply-content{
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
	.pReviewsDetails{
		min-height: 100vh;
		background-color: #FFFFFF;
	}
</style>
