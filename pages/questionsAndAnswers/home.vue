<template>
	<view class="questionsandanswers">
		<cu-custom bgColor="bg-white" :isBack="true">
				 <block slot="backText"></block>
				 <block slot="content" class="title-text">{{isShowTx ?'问大家':'热点'}}</block>
		</cu-custom>
		<scroll-view scroll-y="true" class="scroll-views" @scrolltolower="scrolltolower">
		<view class="questionsandanswers-bg">
			<image class="questionsandanswers-img" :src="logoImg?logoImg:'https://img.0728jh.com/staticImg/banner_pic.png'" mode=""></image>
			<view class="questionsandanswers-center">
				<view class="questionsandanswers-weizhi">
					{{baseBudding.projectName}}位于{{baseBudding.address}}
				</view>
				<view class="questionsandanswers-questions-totle">
					
					<view class="">
						共{{questionsListsum}}个问题
					</view>
					<view class="">
						<button v-if="wxUser.nickName" class="layoutDetail-fadais" @click="getShareCode">
							<image class="layoutDetail-fx-icon" src="https://img.0728jh.com/staticImg/layout_wps.png"></image>
							<label>分享</label>
						</button>
						<button v-else class="layoutDetail-fadais" @click="getUserProfile">
							<image class="layoutDetail-fx-icon" src="https://img.0728jh.com/staticImg/layout_wps.png"></image>
							<label>分享</label>
						</button>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-for="item in questionsList">
			<view class="questionsandanswers-questions" @click="toQuestionsDetails" :data-id="item.id">
				<questions :questionsData="item"></questions>
			</view>
		</view>
		</scroll-view>
		<view class="questionsandanswers-foot cu-bar tabbar  foot" v-if="isShowTx && wxUser.userType=='1'">
			<input class="questions-input" placeholder="向买过的人提问" type="text" :value="questionsValue" @input="getquestioninput" />
			<button v-if="!wxUser.nickName"  class="questions-commit" :disabled="disabled"  @click="getUserProfile">
				提问
			</button>
			<button v-if="wxUser.nickName" class="questions-commit" :disabled="disabled" @tap="questionscommit">
				提问
			</button>
		</view>
		<!-- <view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content"></view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						您还未授权，请先授权！
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="hideModal">再看看</button>
							<button class="cu-btn bg-green margin-left" @tap="toMine">去授权</button>
			
						</view>
					</view>
				</view>
			</view>
		</view> -->
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
				popupadsData:'',
				popupaShow:'',
				questionsValue:'',
				questionsList:[],
				baseBudding:'',
				isShowTx:'',
				logoImg:'',
				modalName:'',
				wxUser:getApp().globalData.wxUser,
				
				
				painting: {},
				shareImage:'',
				
				imageWidth:0,
				imageHeight:0,
				Qcode:'',
				neiImgeHeighte:1,
				neiImgeWidth:1,
				disabled:false,
				wdcurrent:1,
				ordinal:null,
				listMap:'',
			}
		},
		computed:{
			questionsListsum:function(){
				let questList = this.questionsList
				if(questList){
					let sum=0
					questList.forEach(item=>{
						if(item.auditStatus=='1'||item.createId== this.wxUser.id){
							++sum
						}
					})
					return sum;
				}
			}
		},
		methods:{
			
			scrolltolower:function(){
				this.wdcurrent=this.wdcurrent+1
				//console.log("触底加载数据")
				this.getQuestionsPage()
			},
			
			
			toMine:function(){
				uni.redirectTo({
					url:'/pages/index/index?PageCur=mine'
				})
			},
			// hideModal:function(){
			// 	this.modalName=null
			// },
			// isAuth(){
			// 	if(!getApp().globalData.wxUser.nickName){
			// 			this.modalName='Modal'
			// 		return false;
			// 	}
			// 	return true;
			// },
			getwxUser:function(value){
				let that=this;
				that.http(api.wxUserSave,"POST",value,false).then(res=>{
					// console.log(res)
					// that.wxUser=res.data
					// getApp().globalData.wxUser=res.data
					this.userInfoGets()
				//	this.questionscommit()
					
				})
			},
			toQuestionsDetails:function(e){
				let id=e.currentTarget.dataset.id
				uni.navigateTo({
					url:'../questionsDetails/home?id='+id
				})
			},
			getquestioninput:function(e){
				//this.isAuth()
				this.questionsValue=e.detail.value
			},
			// getuserinfo:function(e){
			// 	if(e.detail.errMsg=="getUserInfo:ok"){ 
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
			questionscommit:function(){
				//let IsAuth=this.isAuth()
				
				if(!this.disabled){
					this.disabled=true
					let str = this.questionsValue.replace(/\s*/g,"");
					if(!str){
						
						return;
					}
					
					// if(IsAuth){
					 	this.getAskquestions();
				}
				
				// }
				
				
				
			},
			getQuestionsPage:function(){
				let that=this;
				let id =getApp().globalData.projectItem?getApp().globalData.projectItem.id : getApp().globalData.senen.affId
				that.http(api.QuestionsPage,'GET',{
					current: that.wdcurrent,
					size: 5,
					auditStatus:1,
					descs: 'create_time', 
					createId:getApp().globalData.wxUser.id,
					affiliationId:id
				},false).then(res=>{
					//console.log("楼盘问答")
					//console.log(res)
					//that.questionsList=res.data.records
					let listMap=this.listMap
					for(let item of res.data.records){
						listMap.set(item.id,item)
					//	that.questionsList.push(item)
					}
					let listquestions=[]
					listMap.forEach(function(key){
						console.log("key",key)
						listquestions.push(key)
					})
					that.questionsList=listquestions
					//console.log(listMap)
					that.disabled=false
				})
			},
			
			getAskquestions:function(){
				let that=this;
				let id = getApp().globalData.projectItem.id
				that.http(api.Questions,'POST',{
					content:that.questionsValue,
					affiliationId:id
				},false).then(res=>{
					that.questionsValue=''
					//console.log("提问成功")
					//console.log(res)
					
					if(res.data==true){
						that.wdcurrent=1
						
						this.getQuestionsPage()
					}
					
				})
			},
			getBaseBudding(){
				let that=this;
				let id = getApp().globalData.projectItem?getApp().globalData.projectItem.id : getApp().globalData.senen.affId
				that.http(api.BaseBudiing+"/get/"+id,'GET',{},false).then(res=>{
					//console.log("楼盘基本信息")
					// console.log(res)
					// let baseBudding=res.data
					this.baseBudding= res.data
					getApp().globalData.BaseBudding=res.data
							that.tagData=this.baseBudding.keywords
							that.index=parseInt(this.baseBudding.salesStatus)
							//that.getBuddingDetail()
					})
							
			},
			getlogoImg(){
				let _self=this;
				let id = getApp().globalData.projectItem?getApp().globalData.projectItem.id: getApp().globalData.senen.affId
				_self.http(api.Notice,'GET',{ type: '1',  //swipelist 轮播图
				enable: '1',affiliationId:id,affiliation:'2'},false).then(res=>{
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
			getwxUsersuan:function(value){
				let that=this;
				that.http(api.wxUserSave,"POST",value,false).then(res=>{
					//console.log(res)
					that.userInfoGets();
					
				})
			},
			
			// getuserinfohx:function(e){
			// 	if(e.detail.errMsg=="getUserInfo:ok"){
			// 				//TODO:e.detail 存起来
			// 		this.getwxUsersuan(e.detail)
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
							that.getwxUsersuan(res)
					      }
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
				            content: '问大家',
				            fontSize: 18,
				            lineHeight: 21,
				            color: '#383549',
				            textAlign: 'left',
				            top: 336,
				            left: 55,
				            width: 287,
				            MaxLineNumber: 2,
				            breakWord: true,
				            bolder: true
				          },
						  {
						    type: 'text',
						    content: '不知道的都在这里哦~快来提问吧',
						    fontSize: 16,
						    lineHeight: 21,
						    color: '#383549',
						    textAlign: 'left',
						    top: 380,
						    left: 55,
						    width: 287,
						    MaxLineNumber: 2,
						    breakWord: true,
						    bolder: true
						  },
						  
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
			
			eventSave:function(){
				this.hideModal();
				//console.log(this.shareImage)
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
						console.log("图片宽高获取失败")
					}
				})
				that.shareImage=event.detail.tempFilePath
				that.modalName='Image'
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
			getShareCode:function(){
							let that=this;
						//	return new Promise((resolve,reject)=>{
							
							let scene='';
							let wxUser=getApp().globalData.wxUser
							// if(wxUser.userType=='1'){
							// 	scene=getApp().globalData.wxUser.id
							// }else{
							// 	scene=getApp().globalData.wxUser.invitee
							// }
							let project=getApp().globalData.projectItem?(getApp().globalData.projectItem.affiliationCode?getApp().globalData.projectItem:getApp().globalData.BaseBudding):getApp().globalData.BaseBudding;
							scene='age_'+project.affiliationCode+'_'+wxUser.userCode
							//	console.log("查看id")
								// console.log(that.recommendItem)
								// let scenen=scene+'_'+that.recommendItem.ordinal
								// console.log("查看scenen")
								// console.log(scenen)
							that.http(api.ShareCode,'POST',{
									scene:scene,
									page:'pages/questionsAndAnswers/home'
								},false).then(res=>{
									
									//console.log("ShareCode")
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
														//console.log(filePath)
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
						  path: '/pages/questionsAndAnswers/home?invitee='+invitee +'&scene='+scene
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
				that.affCode=list[1]
				let obj = {id:values.data.affId}
				getApp().globalData.projectItem= obj
				// console.log(values.data)
				 getApp().globalData.senen=values.data
				 getApp().globalData.invitee=values.data.userId
			}
			if(options.invitee){
				getApp().globalData.invit=options.invitee
			}
			this.isShowTx= getApp().globalData.interaction=="0"?true:false
			init.initPage().then(res=>{
				this.popupaShow = getApp().globalData.popupaShow==null?true:getApp().globalData.popupaShow 
				this.wxUser=getApp().globalData.wxUser
				
				
				this.listMap= new Map()
				this.getBaseBudding()
				this.getQuestionsPage()
				this.getlogoImg()
				this.getPopupads()
			})
			//this.baseBudding=getApp().globalData.BaseBudding
			
			
		//	this.logoImg = uni.getStorageSync('logoImg')
		}
	}
</script>

<style>
	.scroll-views{
		height: calc(100vh - 160rpx);
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
	.questions-commit{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:#FFFFFF;
		line-height:52rpx;
		margin-right: 30rpx;
		padding:0rpx 20rpx;
		/* background-color: orange; */
		box-shadow: 0rpx 0rpx 5rpx 5rpx #E9711F;
		background:rgba(233,113,31,1);
		border-radius:31px;
		/* padding:10rpx 30rpx;
		margin-right: 50rpx;
		font-size: 32rpx;
		font-family:PingFang SC;
		color: #FFFFFF;
		background-color: orange;
		border-radius: 30rpx;
		box-shadow: 0rpx 0rpx 5rpx 5rpx #E9711F; */
	}
	
	.questions-input{	
		width:540rpx;
		height:68rpx;
		background:rgba(243,247,251,1);
		border-radius:34rpx;
		padding: 0rpx 40rpx;
		margin-left:30rpx;
		/* background-color: #EEEEEE;
		width:547rpx;
		height: 60rpx;
		margin-left: 30rpx;
		border-radius: 30rpx;
		padding:10rpx 20rpx; */
	}
	.questionsandanswers-foot{
		background-color: #FFFFFF;
		display: flex;
	}
	.questionsandanswers-questions-totle{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:48rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.questionsandanswers-weizhi{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
		max-width: 531rpx;
		margin-bottom: 10rpx;
		white-space:nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width:450rpx
	}
	.questionsandanswers-bg{
		display: flex;
		background-color: #FFFFFF;
		align-items: center;
	}
	.questionsandanswers-center{
		margin-left: 30rpx;
	}
	.questionsandanswers-img{
		width: 121rpx;
		height: 120rpx;
		border-radius: 12rpx;
		margin-left: 29rpx ;
		margin-bottom: 38rpx;
		margin-top:40rpx;
	}
	.questionsandanswers-questions{
		padding:20rpx 0rpx;
		margin:20rpx 30rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 20rpx 5rpx #EEEEEE;
	}
	.questionsandanswers{
		
		height: 100vh;
	}
	page{
		background-color: #FFFFFF;
	}
</style>
