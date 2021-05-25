<template>

	
	
	<view class="estateDetails" v-else>
		<cu-custom bgColor="bg-white" :isBack="true">
				 <block slot="backText"></block>
				 <block slot="content" class="title-text">楼盘详情</block>
		</cu-custom>
		<view class="estate-top">
			<view class="estate-name">
				
				<view class="">
					{{baseBudding.projectName}}
				</view>
				<view class="">
					<button v-if="wxUser.nickName" class="layoutDetail-fadais" @click="getShareCode">
						<image class="layoutDetail-fx-icon" src="https://img.0728jh.com/staticImg/layout_wps.png"></image>
						<label>分享</label>
					</button>
					<button v-else class="layoutDetail-fadais"  @click="getUserProfile" >
						<image class="layoutDetail-fx-icon" src="https://img.0728jh.com/staticImg/layout_wps.png"></image>
						<label>分享</label>
					</button>
				</view>
			</view>
			<view class="estate-tag">
				<tag :tagData="tagData" :state="baseBudding.salesStatus"></tag>
			</view>
			
			
				<view class="estate-top-items">
					<view class="estate-top-title">
						销售状态:
					</view>
					<view class="estate-top-nei">
						{{shopState[index]}}
					</view>
				</view>
				<view class="estate-top-items">
					<view class="estate-top-title">
						所属区域:
					</view>
					<view class="estate-top-nei">
					{{baseBudding.region}}
					</view>
				</view>
				<view class="estate-top-items">
					<view class="estate-top-title">
							最新开盘：
					</view>
					<view class="estate-top-nei">
						{{baseBudding.openingDate}}
					</view>
				</view>
				<view class="estate-top-items">
					<view class="estate-top-title">
						交房时间：
					</view>
					<view class="estate-top-nei">
						{{buddingData.projectSchedule}}
					</view>
				</view>
				<view class="estate-top-items">
					<view class="estate-top-title">
						项目地址：
					</view>
					<view class="estate-top-nei">
						{{buddingData.salesAddress}}
					</view>
				</view>
				<view class="estate-top-items">
					<view class="estate-top-title">
						开发商：
					</view>
					<view class="estate-top-nei">
						{{buddingData.developers}}
					</view>
				</view>
			
		</view>
		<view class="estate-center">
			<view class="estate-center-name">
				建筑规划
			</view>
			<view class="estate-center-items">
				<view class="estate-center-item">
					<view class="estate-center-one-name">
						规划面积：
					</view>
					<view class="estate-center-one-nie">
						{{buddingData.coverArea | coverAreafiflter}}万㎡
					</view>
					<view class="estate-center-two-name">
						建筑面积：
					</view>
					<view class="estate-center-two-nie">
						{{buddingData.floorArea | coverAreafiflter}}万㎡
					</view>	
				</view>
				
				<view class="estate-center-item">
					<view class="estate-center-one-name">
						规划总户：
					</view>
					<view class="estate-center-one-nie">
						{{buddingData.planningUser}}户
					</view>
					<view class="estate-center-two-name">
						车位数：
					</view>
					<view class="estate-center-two-nie">
						{{buddingData.parkingNumber}}个
					</view>	
				</view>
				
				<view class="estate-center-item">
					<view class="estate-center-one-name">
						装修标准：
					</view>
					<view class="estate-center-one-nie">
						{{buddingData.decorationStandard}}
					</view>
					<view class="estate-center-two-name">
						绿化率：
					</view>
					<view class="estate-center-two-nie">
						{{buddingData.greeningRate}}%
					</view>	
				</view>
				
				<view class="estate-center-item">
					<view class="estate-center-one-name">
						建筑结构：
					</view>
					<view class="estate-center-one-nie">
						{{buddingData.architecturalTypes}}
					</view>
					<view class="estate-center-two-name">
						车位配比：
					</view>
					<view class="estate-center-two-nie">
						{{buddingData.parkingRatio}}
					</view>	
				</view>
			</view>
			
		</view>
		<view class="estate-zb">
			<view class="estate-zb-title">
				周边配套
			</view>
			<block v-for="item in buddingData.detailsInfoSurroundingList">
				<view class="estate-zb-tag">
					{{item.name}}：
				</view>
				<view class="estate-zb-nei">
					{{item.content}}
				</view>
			</block>

			
		</view>
		<view class="estate-jj">
			<view class="estate-jj-title">
				项目简介
			</view>
			<view class="estate-jj-text">
				<wxParse :content="article" @preview="preview" @navigate="navigate" />
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
		data () {
		  return {
			popupaShow:'',
			popupadsData:'',
			buddingData:'',
			tagData:'',
		    article: '<div>我是HTML代码</div>',
			baseBudding:'',
			shopState:['热销', '即开', '售罄'],
			index:0,
			wxUser:getApp().globalData.wxUser,
			painting: {},
			shareImage:'',
			modalName:'',
			imageWidth:0,
			imageHeight:0,
			Qcode:'',
			neiImgeHeighte:1,
			neiImgeWidth:1,
			affCode:"",
		  }
		},
		filters:{
			coverAreafiflter:function(value){
			//	console.log(value)
				return (value/10000).toFixed(2)
			}
		},
		methods: {
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
							//  
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
						  {
						    type: 'text',
						    content: '销售状态：'+this.shopState[this.index],
						    fontSize: 15,
						    color: '#563D20',
						    textAlign: 'left',
						    top: 150,
						    left: 50
						  },
						  {
						    type: 'text',
						    content: '所属区域：'+this.baseBudding.region,
						    fontSize: 15,
						    color: '#563D20',
						    textAlign: 'left',
						    top: 200,
						    left: 50
						  },
						  {
						    type: 'text',
						    content: '最新开盘：'+this.baseBudding.openingDate,
						    fontSize: 15,
						    color: '#563D20',
						    textAlign: 'left',
						    top: 250,
						    left: 50
						  },
						  {
						    type: 'text',
						    content: '交房时间：'+this.buddingData.projectSchedule,
						    fontSize: 15,
						    color: '#563D20',
						    textAlign: 'left',
						    top: 300,
						    left: 50
						  },
						  {
						    type: 'text',
						    content: '项目地址：'+this.buddingData.salesAddress,
						    fontSize: 15,
						    color: '#563D20',
						    textAlign: 'left',
						    top: 350,
						    left: 50,
						    lineHeight: 20,
						    MaxLineNumber: 2,
						    breakWord: true,
						    width: 270
						  },
						  {
						    type: 'text',
						    content: '开发商：'+this.buddingData.developers,
						    fontSize: 15,
						    color: '#563D20',
						    textAlign: 'left',
						    top: 400,
						    left: 50,
						    lineHeight: 20,
						    MaxLineNumber: 2,
						    breakWord: true,
						    width: 270
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
				            left: 75,
				            width: 80,
				            height: 80
				          },
				          // {
				          //   type: 'text',
				          //   content: this.recommendItem.name + ' '+ this.recommendItem.type,
				          //   fontSize: 16,
				          //   lineHeight: 21,
				          //   color: '#383549',
				          //   textAlign: 'left',
				          //   top: 336,
				          //   left: 44,
				          //   width: 287,
				          //   MaxLineNumber: 2,
				          //   breakWord: true,
				          //   bolder: true
				          // },
						  
				          // {
				          //   type: 'text',
				          //   content: '￥'+this.recommendItem.price+'/㎡',
				          //   fontSize: 19,
				          //   color: '#E62004',
				          //   textAlign: 'left',
				          //   top: 387,
				          //   left: 44.5,
				          //   bolder: true
				          // },
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
			userInfoGets:function(){
			 let that=this
			 this.http(api.userInfoGet,'GET',{},false)
			    .then(res => {
							//	console.log("userInfoGet")
							//	console.log(res)
			       // userInfo: res.data
			    that.wxUser=res.data
				console.log(res)
			    getApp().globalData.wxUser=res.data
			//	that.getUserinfo() 			//刷新置业顾问
			    })
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
			//	console.log(event)
				wx.hideLoading()
			//	console.log(event.detail.tempFilePath)
			//	console.log(this)
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
		
			getShareCode:function(){
							let that=this;
						//	return new Promise((resolve,reject)=>{
							
							let scene='';
							let wxUser=getApp().globalData.wxUser
							console.log(wxUser)
							let project=getApp().globalData.projectItem?(getApp().globalData.projectItem.affiliationCode?getApp().globalData.projectItem:getApp().globalData.BaseBudding):getApp().globalData.BaseBudding;
						
							// if(wxUser.userType=='1'){
							// 	scene=wxUser.id
							// }else{
							// 	scene=wxUser.invitee
							// }
							scene='age_'+project.affiliationCode+'_'+wxUser.userCode
							// if(wxUser.userType=='1'){
							// 	scene=getApp().globalData.wxUser.id
							// }else{
							// 	scene=getApp().globalData.wxUser.invitee
							// }
						
								//console.log("查看id")
								// console.log(that.recommendItem)
							//	let scenen='v='+scene+'&i='+that.recommendItem.ordinal
							//scenen=scene+'_'+that.dazzleBeatData.ordinal
							//	console.log("查看scene")
							//	console.log(scene)
							that.http(api.ShareCode,'POST',{
									scene:scene,
									page:'pagestwo/estateDetails/home'
								},false).then(res=>{
								
									console.log("ShareCode")
									console.log(res)
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
					
					that.userInfoGets()
				})
			},
			userInfoGets:function(){
				let that=this
				this.http(api.userInfoGet,'GET',{},false)
			    .then(res => {
						
			    that.wxUser=res.data
			    getApp().globalData.wxUser=res.data
							  
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
			
		  preview(src, e) {
		    // do something
		  },
		  navigate(href, e) {
		    // do something
		  },
		  getBaseBudding(){
		  	let that=this;
			let id = getApp().globalData.projectItem?getApp().globalData.projectItem.id:getApp().globalData.senen.affId;
		  	that.http(api.BaseBudiing+"/get/"+id,'GET',{},false).then(res=>{
		  		console.log("楼盘基本信息")
		  		console.log(res)
				let baseBudding=res.data
		  		this.baseBudding=res.data
				that.tagData=(this.baseBudding.keywords || '').split(' ')
				that.index=parseInt(this.baseBudding.salesStatus)
				that.getBuddingDetail()
				getApp().globalData.BaseBudding=res.data
		  		})
				
		  },
		  getBuddingDetail(){
			  let that=this;
			  let id =  getApp().globalData.projectItem?getApp().globalData.projectItem.id:getApp().globalData.senen.affId;
			  that.http(api.BuddingDetail+"/"+id,"GET",{
				 
			  },false).then(res=>{
			 	console.log("楼盘详情")
			 	console.log(res)
			  	that.buddingData=res.data
			  	if(res.data){
			  		
			  		that.article=res.data.description
			  	}
			  
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
		async onLoad(options) {
			
			// wx.showShareMenu({
			//   withShareTicket: true,
			//   menus: ['shareAppMessage', 'shareTimeline']
			// })
			// console.log("朋友圈")
			// console.log(options.query)
			// console.log("朋友圈")
			let that=this;
			if(options.scene){
				let scene=decodeURIComponent(options.scene) 
				let list=scene.split("_")
				console.log(list)
				let value=await that.Jiema(list[0],list[1],list[2])
				value.data['senen']=list[0]
				that.affCode=list[1];
				console.log("---------------------------------")
				console.log(that.affCode)
				console.log("---------------------------------")
				console.log(value)
				// projectItem
				getApp().globalData.projectItem={id:value.data.affId}
				getApp().globalData.senen=value.data
				// getApp().globalData.invit=scene
				getApp().globalData.invitee=value.data.userId;
				// getApp().globalData.invtUserId=value.data.userId
			}
			if(options.invitee){
				getApp().globalData.invit=options.invitee
			}
			
			
			init.initPage().then(res=>{ 
				that.wxUser=getApp().globalData.wxUser
				
				that.popupaShow = getApp().globalData.popupaShow==null?true:getApp().globalData.popupaShow 
				let wxUserInfo=getApp().globalData.wxUser
			//	console.log(wxUserInfo)
				that.getBaseBudding()
				that.getPopupads()
				
			})
		
		
			
		},
		onShareAppMessage: function() {
			
			console.log("分享给朋友")
			
					let BaseBudding=getApp().globalData.BaseBudding
					let invitee='';
					
						console.log("结果")
					let affCode =this.affCode;
						let wxUser=getApp().globalData.wxUser
						
						// if(wxUser.userType=='1'){
						 	invitee=wxUser.id
						// }
						// if(wxUser.userType=='0'){
						// 	invitee=wxUser.invitee
						// }
						// wxUser.id
					
					//})
					console.log(affCode);
					let project = getApp().globalData.projectItem;
					let code=project.affiliationCode || affCode
					console.log(invitee)
					let scene='age_'+code+'_'+wxUser.userCode
					
						return {
						  title:BaseBudding.projectName,
						  // imageUrl: 'https://img.0728jh.com/staticImg/banner_pic.png',
						  path: '/pagestwo/estateDetails/home?invitee='+invitee+"&scene="+scene
						}
					
					
					
					
					
		   
		 },
		 // onShareTimeline(res) {
			 
			// console.log("正在分享朋友圈")
			// console.log(res)
			//  return {
			// 	title:"我分享，我快乐",
			// 	query:"id=4"
				
			//  }
		 // },
		// onShareAppMessage(res) {
		//  let that =this;
		//   if (res.from === 'button') {// 来自页面内分享按钮
		//     console.log(res.target)
		// 		}
		// 			let BaseBudding=getApp().globalData.BaseBudding
		// 			let wxUser=getApp().globalData.wxUser
		// 			that.http(api.GetShareInfno,'GET',{
						
		// 			},false).then(ress=>{
						
		// 				getApp().globalData.wxUser=ress.data
		// 				let wxUser=ress.data
		// 				let invitee=wxUser.id
		// 				if(wxUser.userType!='1'){
		// 					invitee=wxUser.invitee
		// 				}
						
		// 				return {
		// 				  title: BaseBudding.projectName,
		// 				  path: '/pages/estateDetails/home?invitee='+invitee
		// 				}
		// 			})
				
		 
		// },
	}
	
</script>

<style>
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
	.estate-jj-text{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:48rpx;
		
		
	}
	.estate-jj-title{
		font-size:40rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin-bottom: 35rpx;
	}
	.estate-jj{
		padding:41rpx 31rpx 86rpx 27rpx;
		background-color: #FFFFFF;
		margin-top:20rpx;
	}
	/**
	 * 周边配套
	 */
	.estate-zb-nei{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:48rpx;
	}
	.estate-zb-tag{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin-bottom: 28rpx;
		margin-top:30rpx;
	}
	.estate-zb-title{
		font-size:40rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		
	}
	.estate-zb{
		background-color: #FFFFFF;
		padding:41rpx 31rpx 64rpx 27rpx;
		margin-top:20rpx;
	}
	/**
	 * 建筑规划
	 */
	page{
		background-color: #FFFFFF;
	}
	.estate-center-two-nie{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		position: absolute;
		margin-left: 574rpx;
	}
	.estate-center-two-name{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(153,153,153,1);
		position: absolute;
		margin-left: 416rpx;
	}
	.estate-center-one-nie{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin-left: 42rpx;
	}
	.estate-center-one-name{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(153,153,153,1);
		margin-left: 28rpx;
		
	}
	.estate-center-item{
		display: flex;
		align-items: center;
		margin-bottom: 37rpx;
	}
	.estate-center-items{
		
	}
	.estate-center-name{
		font-size:40rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin: 0rpx 0rpx 40rpx 32rpx;
		
	}
	.estate-center{
		padding-top:40rpx;
		padding-bottom: 26rpx;
		background-color: #FFFFFF;
	}
/**
 * 
	楼盘详情上面部分
 */
	.estate-top-nei{
		position: absolute;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin-left: 209rpx;
		/* border:solid 1rpx #333333; */
		width:480rpx;
		/* overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap; */
	}
	.estate-top-title{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		
	}
	.estate-top-items{
		display: flex;
		align-items: center;
		margin-left: 29rpx;
		margin-bottom: 28rpx;
	}
	.tag-one{
		margin-left:30rpx ;
		margin-right: 15rpx;
		border-radius: 8rpx;
		font-size: 23rpx;
		padding:9rpx 15rpx;
		background:rgba(249,74,71,1);
		border-radius:8rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		
	}
	.estate-tag{
		display: flex;
		align-items: center;
		padding: 37rpx 0rpx 52rpx 0rpx;
		flex-wrap:wrap;
	}
	.estate-name{
		font-size:40rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0rpx 30rpx;
	}
	.estate-top{
		background-color: #FFFFFF;
		padding-top:44rpx;
		padding-bottom: 22rpx;
		margin-bottom: 20rpx;
	}
	.estateDetails{
		
		height: 1334rpx;
	}
	
</style>
