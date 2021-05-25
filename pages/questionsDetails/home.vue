<template>
	<view class="">
		<cu-custom bgColor="bg-white" :isBack="true">
				 <block slot="backText"></block>
				 <block slot="content" class="title-text">问答详情</block>
		</cu-custom>
		<view class="questionsDetails-top">
			<view class="questionsDetails-top-tou">
				<image class="questionsDetails-top-tou-img" :src="logoImg?logoImg:'https://img.0728jh.com/staticImg/logo.png'" mode=""></image>
				<view class="questionsDetails-top-right">
					<view class="questionsDetails-top-right-title">
						{{baseBudding.projectName}}位于{{baseBudding.address}}
					</view>
					<view class="questionsDetails-top-right-title-wd">
						<view class="">
								共{{questionsListsum}}个问题
						</view>
					
						<view class="">
							<button v-if="wxUser.nickName && questionsItem.auditStatus=='1'" class="layoutDetail-fadais" @click="getShareCode">
								<image class="layoutDetail-fx-icon" src="https://img.0728jh.com/staticImg/layout_wps.png"></image>
								<label>分享</label>
							</button>
							<button v-if="!wxUser.nickName && questionsItem.auditStatus=='1'" class="layoutDetail-fadais" @click="getUserProfile">
								<image class="layoutDetail-fx-icon" src="https://img.0728jh.com/staticImg/layout_wps.png"></image>
								<label>分享</label>
							</button>
						</view>
					</view>
					
				</view>
			</view>
			<view class="questionsDetails-xian">
				
			</view>
			<view class="">
				<view class="questionDetails-center-question">
					{{questionsItem.content}}
				</view>
				<view class="questionsDetails-bottom">
					<image class="questionsDetails-bottom-img" :src="questionsItem.userInfo.headimgUrl?questionsItem.userInfo.headimgUrl:'https://img.0728jh.com/staticImg/logo.png'" mode=""></image>
					<view class="questionsDetails-bottom-ringt">
						<view class="quest-name">
						 {{questionsItem.userInfo.nickName}}
						</view>
						<view class="">
							提问时间：{{questionsItem.createTime | datefiflter}}
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<view class="quest-cneter">
			<view class="quest-tatil">
				共{{questionsDatalength}}条回答
			</view>
			<view class="" v-for="item in questionsItem.listTopicReply">
				<view class="" v-if="item.auditStatus=='1'">
					<view class="quest-cneter-one">
						<image class="quest-img" :src="item.userInfo.headimgUrl?item.userInfo.headimgUrl:'https://img.0728jh.com/staticImg/logo.png'" mode=""></image>
						<view class="quest-center-one-text">
							{{item.userInfo.nickName}}
						</view>
				</view>
				<view class="quest-cneter-two">
					{{item.details}}
				</view>
				<view class="quest-cneter-shr">
					<view class="">
						{{item.createTime | datefiflter}}
					</view>
				<!-- 	<view class="quest-cneter-shr-b">
						<image class="quest-cneter-shr-icon" src="https://img.0728jh.com/staticImg/ping_icon.png" mode=""></image>
						<view class="">
							2
						</view>
					</view> -->
				</view>
				</view>
			</view>
		</view>
		<view class="questionsandanswers-foot cu-bar tabbar  foot" v-if="isShowTx && wxUser.userType=='1'">
			<input class="questions-input" :placeholder="placeholderComputer" type="text" :value="detailValue" @input="getquestionsDetailValue"/>
			<button v-if="!wxUser.nickName" class="questions-commit" @click="getUserProfile">
				回答
			</button>
			<button v-else :disabled="disabled" class="questions-commit" @click="questionscommit">
				回答
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
				detailValue:'',
				questionsItem:'',
				baseBudding:'',
				num:'',
				isShowTx:'',
				modalName:'',
				logoImg:'',
				questionsList:'',
				wxUser:getApp().globalData.wxUser,
				
				disabled:false,
				painting: {},
				shareImage:'',
				
				imageWidth:0,
				imageHeight:0,
				Qcode:'',
				neiImgeHeighte:1,
				neiImgeWidth:1,
				
				
				ordinal:null,
			}
		},
		computed:{
			placeholderComputer:function(){
				if(this.questionsItem){
					//console.log("看下回复的状态")
					//console.log(this.questionsItem)
					return '回复@'+ this.questionsItem.userInfo.nickName
				}
				return ;
			},
			
			questionsDatalength:function(){    //总回答数
				//	console.log('我想看哈问答状态')
					let list=this.questionsItem
					let num=0
					if(list){
						list.listTopicReply.forEach(item=>{
							if(item.auditStatus=='1'|| item.userInfo.id==this.wxUser.id){
								++num;
							}
						})
						return num;
					}
					// console.log(this.questionsData)
				},
			
				questionsListsum:function(){  //总条数
						let questList = this.questionsList
						if(questList){
							let sum=0
							questList.forEach(item=>{
								if(item.auditStatus=='1'||item.createId==this.wxUser.id){
									++sum
								}
							})
							return sum;
						}
					}
				
			
		},
		filters:{
			datefiflter:function(value){
				
				return (value || '').split(' ')[0]
			},
		},
		methods:{
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
			// 		this.modalName='Modal'
			// 		return false;
			// 	}
			// 	return true;
			// },
			getquestionsDetailValue:function(e){
				//this.isAuth()
				this.detailValue=e.detail.value
			},
			getwxUser:function(value){
				let that=this;
				that.http(api.wxUserSave,"POST",value,false).then(res=>{
					
					that.userInfoGets()
					
				})
			},
			getuserinfo:function(e){
				if(e.detail.errMsg=="getUserInfo:ok"){ 
					this.getwxUser(e.detail)
					//this.questionscommit()
				}
			},
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
				
				// let IsAuth=this.isAuth()
				// 	if(IsAuth){
					
						this.ReviewsCommit()
					//}
					
				
				
			},
			getQuestionsPages:function(){
				let that=this;
				let id = getApp().globalData.projectItem?getApp().globalData.projectItem.id:getApp().globalData.senen.affId
				that.http(api.QuestionsPage,'GET',{
					current: 1,
					size: 10,
					auditStatus:1,
					createId:getApp().globalData.wxUser.id,
					affiliationId:id
				},false).then(res=>{
					console.log("楼盘问答")
					console.log(res)
					that.questionsList=res.data.records
				})
			},
			getQuestionsPage:function(id){
				let that=this;
				let projectId = getApp().globalData.projectItem?getApp().globalData.projectItem.id:getApp().globalData.senen.affId
				//console.log(id)
				//console.log(projectId)
				that.http(api.QuestionsPage,'GET',{
					// current: 1,
					// size: 5,
					id:id,
					affiliationId:projectId
					// auditStatus:1,
					// createId:getApp().globalData.wxUser.id
				},false).then(res=>{
					//console.log("楼盘问答")
					//console.log(res)
					that.disabled=false
					that.questionsItem=res.data.records[0]
				})
			},
			getQuestionsPagebyordinal:function(ordinals){
				let that=this;
				let id = getApp().globalData.projectItem?getApp().globalData.projectItem.id : getApp().globalData.senen.affId
				that.http(api.QuestionsPage,'GET',{
					// current: 1,
					// size: 5,
					ordinal:ordinals,
					affiliationId:id
					// auditStatus:1,
					// createId:getApp().globalData.wxUser.id
				},false).then(res=>{
					//console.log("楼盘问答")
					//console.log(res)
					that.questionsItem=res.data.records[0]
				})
			},
			getlogoImg(){
				let _self=this;
				let id = getApp().globalData.projectItem?getApp().globalData.projectItem.id : getApp().globalData.senen.affId
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
					
					 console.log(this.swiperList)
				  })
			},
			ReviewsCommit:function(){
				let that=this;
				//console.log(that.details)
				if(!that.disabled){
					let id = getApp().globalData.projectItem.id
					that.disabled=true
					let str=that.detailValue.replace(/\s*/g,"")
					if(!str){
						that.disabled=false
						return;
					}
						that.http(api.Topicreply,'POST',{
							replyTypes: 4,
							typesId:that.questionsItem.id,
							details:that.detailValue,
							replyClass:that.questionsItem.createId==getApp().globalData.wxUser.id?'1':'0',
							affiliationId:id
						},false).then(res=>{
							console.log("写回复")
							console.log(res)
							that.disabled=false
							that.detailValue=''
							that.getQuestionsPage(that.questionsItem.id)
						})
				}
				
				},
				getBaseBudding(){
					let that=this;
					let id =getApp().globalData.projectItem?getApp().globalData.projectItem.id : getApp().globalData.senen.affId
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
				
				getwxUsersuan:function(value){
					let that=this;
					that.http(api.wxUserSave,"POST",value,false).then(res=>{
						
						that.userInfoGets()
						
					})
				},
				
				getuserinfohx:function(e){
					if(e.detail.errMsg=="getUserInfo:ok"){
								//TODO:e.detail 存起来
						this.getwxUsersuan(e.detail)
						//this.toflareUpsPush()
						
					}
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
					            content: '问：'+this.questionsItem.content,
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
							    content: '想知道？就来吧，看看别人怎么说',
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
				//	console.log(event)
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
			
				getShareCode:function(){
								let that=this;
							//	return new Promise((resolve,reject)=>{
								
								let scene='';
								let wxUser=getApp().globalData.wxUser
								
									let project=getApp().globalData.projectItem?(getApp().globalData.projectItem.affiliationCode?getApp().globalData.projectItem:getApp().globalData.BaseBudding):getApp().globalData.BaseBudding;
									scene='age_'+project.affiliationCode+'_'+wxUser.userCode
									let scenen=scene+'_'+that.questionsItem.ordinal
									//console.log("查看scenen")
									//console.log(scenen)
								that.http(api.ShareCode,'POST',{
										scene:scenen,
										page:'pages/questionsDetails/home'
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
									//	console.log("解码")
									//	console.log(res)
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
						let code = project.affiliationCode || this.affCode
						let	scene='age_'+code+'_'+wxUser.userCode
						 scene=scene+'_'+this.questionsItem.ordinal
						return {
						 title:BaseBudding.projectName,
						 path: '/pages/questionsDetails/home?invitee='+invitee+'&scene='+scene
						}	    
		 },
		async onLoad(options) {
			let that=this;
			//console.log("222222")
			let id=null;
			if(options.scene){
				// console.log("扫码")
				 let scene=decodeURIComponent(options.scene) 
				 
				 let list=scene.split("_");
				 let values= await that.Jiema(list[0],list[1],list[2]);
				// console.log(list);
				// console.log(values);
				 values.data['senen']=list[0]
				 this.affCode = list[1]
				 let obj={id:values.data.affId}
				 getApp().globalData.projectItem = obj
				 // console.log(values.data)
				 getApp().globalData.senen=values.data
				 getApp().globalData.invitee=values.data.userId
				 this.ordinal=parseInt(list[3])
				 
				 
				 // let invitee=(scene || '').split('_')[0]
				 // let ordinal = (scene || '').split('_')[1]
				 // console.log(invitee)
				 // console.log(ordinal)
				 // getApp().globalData.invit=invitee
				 // this.ordinal=parseInt(ordinal)
			 }
			if(options.id){
				id =options.id
			}
			if(options.num){
				this.num =options.num 
			 }
			
			if(options.invitee){
				getApp().globalData.invit=options.invitee
			}
			this.isShowTx= getApp().globalData.interaction=="0"?true:false
			init.initPage().then(res=>{
				this.popupaShow = getApp().globalData.popupaShow==null?true:getApp().globalData.popupaShow 
				this.wxUser=getApp().globalData.wxUser
			//	let invit=getApp().globalData.invit
				// if(invit&&(!this.wxUser.invitee)&&this.wxUser.userType=='0'){
				// 	this.chooseGWgu(invit)
				// }
				if(this.ordinal==null){
					//console.log("ordial---null")
					//console.log(id)
					this.getQuestionsPage(id)
				}else{
					//console.log("ordinal!=null")
					//console.log("this.ordinal")
					this.getQuestionsPagebyordinal(this.ordinal)
				}
				this.wxUser=getApp().globalData.wxUser
				this.getBaseBudding()
				
				this.getQuestionsPages()
				this.getlogoImg()
				this.getPopupads()
			})
			//this.baseBudding=getApp().globalData.BaseBudding
			//console.log(this.baseBudding)
			
			
			//this.logoImg = uni.getStorageSync('logoImg')
			
			
			// console.log("logoImg")
			// console.log(logoImg)
		}
	}
</script>

<style>
	/**
	 * 下面提问
	 */
	page{
		background-color: #FFFFFF;
	}
	.layoutDetail-fx-icon{
		height: 35rpx;
		width:35rpx;
		margin-right: 10rpx;
	}
	.quest-name{
		width:250rpx;
		/* border:solid 1rpx #000000; */
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
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
	/* 	padding:10rpx 30rpx;
		margin-right: 30rpx;
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
	/**
	 *  中间评论
	 */
	.quest-cneter-shr-icon{
		width:30rpx;
		height:27rpx;
		margin-right: 10rpx;
	}
	.quest-cneter-shr-b{
		display: flex;
		align-items: center;
	}
	.quest-cneter-shr{
		width:560rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:48rpx;
		margin-left: 61rpx;
	}
	.quest-cneter-two{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:48rpx;
		margin-left:61rpx;
	}
	.quest-center-one-text{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:48rpx;
		margin-left: 17rpx;
		
	}
	.quest-cneter-one{
		display: flex;
		align-items: center;
		margin-top:20rpx;
	}
	.quest-img{
		width:42rpx;
		height:42rpx;
		border-radius:50%;
	}
	.quest-tatil{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:48rpx;
	}
	.quest-cneter{
		padding:48rpx 32rpx 61rpx 31rpx;
		margin:0rpx 30rpx;
		background:rgba(255,255,255,1);
		border-radius:20rpx;
	}
	/**
	 * 	上面头部
	 */
	.questionsDetails-bottom-ringt{
		width: 566rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.questionsDetails-bottom-img{
		width: 45rpx;
		height: 45rpx;
		margin-right: 19rpx;
		border-radius: 50%;
	}
	.questionsDetails-bottom{
		display: flex;
		align-items: center;
		margin-top:27rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(153,153,153,1);
		line-height:48rpx;
	}
	.questionDetails-center-question{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:48rpx;
	}
	.questionsDetails-xian{
		width:630rpx;
		height:1rpx;
		background:rgba(242,242,242,1);
		margin: 37rpx 0rpx 34rpx 20rpx;
	}
	.questionsDetails-top-right-title-wd{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:48rpx;
		margin-top:29rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.questionsDetails-top-right-title{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
		width:450rpx;
		  white-space:nowrap;
		  overflow: hidden;
		  text-overflow: ellipsis;
	}
	.questionsDetails-top-right{
		margin-left: 32rpx;
	}
	.questionsDetails-top-tou-img{
		width:119rpx;
		height:119rpx;
		border-radius:12rpx;
	}
	.questionsDetails-top-tou{
		display: flex;
		align-items: center;
	}
	.questionsDetails-top{
		background:rgba(255,255,255,1);
		border-radius:20rpx;
		width:690rpx;
		padding:42rpx 33rpx 40rpx 29rpx;
		margin:19rpx 30rpx 20rpx 30rpx;
	}
</style>
