<template>
	<view class="flareUpsDetails">
		<cu-custom bgColor="bg-white" :isBack="true">
				 <block slot="backText"></block>
				 <block slot="content" class="title-text">炫拍详情</block>
		</cu-custom>
		<view class="questionsandanswers-bg">
			<image class="questionsandanswers-img" :src="logoImg?logoImg:'https://img.0728jh.com/staticImg/banner_pic.png'" mode=""></image>
			<view class="questionsandanswers-center">
				<view class="questionsandanswers-weizhi">
					{{baseBudding.projectName}}位于{{baseBudding.address}}
				</view>
				<view class="questionsandanswers-questions-totle">
					
					<view class="">
						
						共{{questionsListsum}}个炫拍
					</view>
					<view class="">
						<button v-if="wxUser.nickName " class="layoutDetail-fadais" @click="getShareCode">
							<image class="layoutDetail-fx-icon" src="https://img.0728jh.com/staticImg/layout_wps.png"></image>
							<label>分享</label>
						</button>
						<!--  && dazzleBeatData.auditStatus=='1'   && dazzleBeatData.auditStatus=='0'-->
						<button v-if="!wxUser.nickName  " class="layoutDetail-fadais" @click="getUserProfile">
							<image class="layoutDetail-fx-icon" src="https://img.0728jh.com/staticImg/layout_wps.png"></image>
							<label>分享</label>
						</button>
					</view>
				</view>
			</view>
		</view>
		<view class="">
			<dazzleBeat :dazzleBeatData="dazzleBeatData" :isScreenWidth="true"></dazzleBeat>
		</view>
		<view class="flare-dz-zan" v-if="zanText">
			<image v-if="tupianstate" class="flare-dz-img" src="https://img.0728jh.com/staticImg/zanwo.png" mode=""></image>
			<view class="flare-dz-text" @click="toWhoZan" :data-data="dazzleBeatData">
				{{zanText}}
			</view>
		</view>
		<view class="flare-reply">
			<view class="" v-for="item in replyList">
				<reply v-if="item" :user="item" :wxUser="wxUser"></reply>
			</view>
		</view>
		<view class="flare-bg-color">
			
		</view>
		<view v-if="isShowTX &&wxUser.userGrade=='1'" class="flareUpsDetail-bar cu-bar tabbar foot" >
			<input class="flareUpsDetail-input" type="text" :value="inputValue" placeholder-class="flareUpsDetail-input-placeholder" placeholder="写下你的想法" @input="getInputValue"/>
			<button v-if="!wxUser.nickName" class="flareUpsDetail-commit" @click="getUserProfile">
				发送
			</button>
			<button v-if="wxUser.nickName && wxUser.userGrade=='1'" :disabled="disabled" class="flareUpsDetail-commit" @click="AwesomeshootingCommit">
				发送
			</button>
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
				isShowTX:'',
				tupianstate:false,
				modalName:'',
				dazzIsZan:true,
				flareUpsData:[],
				dazzleBeatData:{id:''},
				inputValue:'',
				contentZan:'客1278美好ha托尼、挂机时、撒噶说不出、爱谁从v、TUEFR、公司加班的、要我去个、等58人觉得很赞',
				wxUser:'',
				baseBudding:'',
				logoImg:'',
				
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
			replyList:function(){
				let that=this;
				
				let replylist=[].concat(that.dazzleBeatData.listTopicReply)
				
				if(replylist){
					console.log("排序数组")
					console.log(replylist)
					// replylist.forEach(item=>{
					
					// })
					replylist.sort(function(obj1,obj2){
						let value1= parseInt(obj1.replyClass)
						let value2= parseInt(obj2.replyClass)
						if(value1>value2){
							return -1;
						}else if(value1<value2){
							return 1;
						}else {
							return 0;
						}
						
					})
					console.log(replylist)
				}
				
				return replylist;
			},
			questionsListsum:function(){
				let questList = [].concat(this.flareUpsData)
				if(questList){
					let sum=0
					
					console.log("几个意思")
					console.log(questList.length)
					
					for(let i =0;i<questList.length;i++){
						
						//( questList[i]? questList[i].auditStatus=='1' : false) ||
						if(questList[i].auditStatus=='1' || questList[i].createId== this.wxUser.id){
							++sum
						}
					}
					questList.forEach(item=>{
						if(item)
						if(item.auditStatus=='1'||item.createId== this.wxUser.id){
							++sum
						}
					})
					return sum;
				}
			},
			zanText:function(){   //没有赞，还没写好
			console.log("這個函數寫點讚的人數")
			  let value= this.dazzleBeatData
			if(value && value.upvote){
				console.log(value)
				let upvote = value.upvote
				let upvoteName=[]
				for(let j=0;j<upvote.length;j++){
					if(upvote[j].userInfo&&upvote[j].userInfo.nickName){
						upvoteName.push(upvote[j].userInfo.nickName)
					}
					
				}
			
				console.log(upvoteName)
				let str=''
				
				
				for(let i=0;i<upvoteName.length;i++){
					if(upvoteName[i] != null){
						if(str==''){
							str=str+upvoteName[i]
						}else{
							str=str+','+upvoteName[i]
						}
						if(str.length>30){
							this.tupianstate=true
							return str +'...'+'等'+upvoteName.length+'人觉得很赞';
						}
							
						
						
						
					}
				}
				
			
				if( !str ){
					this.tupianstate=false
					
				}else{
					this.tupianstate=true
				}
				return str;
			}
			
				
			}
		},
		methods:{
			getlogoImg(){
				let _self=this;
				let id = getApp().globalData.projectItem?getApp().globalData.projectItem.id: getApp().globalData.senen.affId
				_self.http(api.Notice,'GET',{ type: '1',  //swipelist 轮播图
				enable: '1',affiliation:'2',affiliationId:id},false).then(res=>{
					console.log("轮播图")
						console.log(res)
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
			getAwesomeshootingtotal:function(){ //楼盘炫拍
				let that=this;
				that.http(api.Awesomeshootingredding,'GET',{
					current: 1,
					size: 100,
					descs: 'create_time', //降序
					auditStatus:'1',
					createId:getApp().globalData.wxUser.id,
				},false).then(res=>{
					console.log("楼盘炫拍")
					console.log(res)
					that.flareUpsData=res.data.records
				})
			},
			toWhoZan:function(e){
			//	console.log(e)
				let data = this.dazzleBeatData
				console.log(data)
				uni.navigateTo({
					url:'/pages/whoZan/home?data='+encodeURIComponent(JSON.stringify(data))
				})
			},
			toMine:function(){
				uni.redirectTo({
					url:'/pages/index/index?PageCur=mine'
				})
			},
			
			getInputValue:function(e){
				//this.isAuth()
				this.inputValue=e.detail.value
			},
			
			getAwesomeshooting:function(value){   //單條查詢
				let that=this;
				let id =value || that.dazzleBeatData.id
				that.http(api.Awesomeshootingredding,'GET',{
					current: 1,
					size: 1,
					id:id
					
				},false).then(res=>{
					console.log("写完评论再次查询")
					console.log(res)
					
					that.dazzleBeatData = res.data.records[0] 
			
				})
			},
			getAwesomeshootingbyordinal:function(value){   //單條查詢
				let that=this;
				let id =value 
				that.http(api.Awesomeshootingredding,'GET',{
					current: 1,
					size: 1,
					ordinal:id
					
				},false).then(res=>{
					console.log("再次查询")
					console.log(res)
					that.disabled=false
					that.dazzleBeatData = res.data.records[0]
					
				})
			},
			getAwesomeshootingviews:function(value){   //l浏览量
			let that=this;
			let id= value ||that.dazzleBeatData.id
			console.log(id)
				that.http(api.Awesomeshootingviews,'POST',{
					id:id
				},false).then(res=>{
					console.log("回复")
					console.log(res)
					//that.dazzleBeatData=res.data.records
					if(res.data==true){
						//that.getAwesomeshooting()
					}
				})
				},
				getwxUser:function(value){
					let that=this;
					that.http(api.wxUserSave,"POST",value,false).then(res=>{
						console.log(res)
						
						that.userInfoGets()
					})
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
				userInfoGets:function(){
				 let that=this
				 this.http(api.userInfoGet,'GET',{},false)
				    .then(res => {
				    that.wxUser=res.data
					getApp().globalData.wxUser=res.data
					console.log(res)
				   
				    })
				},
				getBaseBudding(){
					let that=this;
					let id= getApp().globalData.projectItem?getApp().globalData.projectItem.id: getApp().globalData.senen.affId
					that.http(api.BaseBudiing+"/get/"+id,'GET',{},false).then(res=>{
						console.log("楼盘基本信息")
						console.log(res)
						let baseBudding=res.data
						this.baseBudding=res.data
						getApp().globalData.BaseBudding=res.data
							
						})
								
				},
				AwesomeshootingCommit:function(){   //写评论
				
				console.log("授权结束发起写评论")
				let that=this;
				
				if(!that.disabled){
					that.disabled=true
					let str = that.inputValue.replace(/\s*/g,"")
					if(!str){
						that.disabled=false
						return;
					}
						that.http(api.Topicreply,'POST',{
							replyTypes: 1,
							typesId:that.dazzleBeatData.id,
							details:that.inputValue,
							replyClass:that.dazzleBeatData.createId==getApp().globalData.wxUser.id?'1':'0',
							affiliationId:getApp().globalData.projectItem?getApp().globalData.projectItem.id: getApp().globalData.senen.affId
						},false).then(res=>{
							console.log("写回复")
							console.log(res)
							
							if(res.data==true){
								that.inputValue=''
								that.disabled=false
								that.getAwesomeshooting()
							}
								
							
							
						})
				}
				
				},	
				getwxUsersuan:function(value){
					let that=this;
					that.http(api.wxUserSave,"POST",value,false).then(res=>{
						console.log(res)
						// that.wxUser=res.data
						// getApp().globalData.wxUser=res.data
						that.userInfoGets()
						
					})
				},
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
					            top: 443,
					            left: 85,
					            width: 68,
					            height: 68
					          },
					          {
					            type: 'text',
					            content: this.dazzleBeatData.content,
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
							    content: '已经有'+this.dazzleBeatData.views+'人都看过了！就等你了',
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
			
				getShareCode:function(){
								let that=this;
							//	return new Promise((resolve,reject)=>{
								
								let scene='';
								let wxUser=getApp().globalData.wxUser
								let project=getApp().globalData.projectItem?getApp().globalData.projectItem:getApp().globalData.BaseBudding;
								scene='age_'+project.affiliationCode+'_'+wxUser.userCode
								
									
									let scenen=scene+'_'+that.dazzleBeatData.ordinal
									 console.log("查看scenen")
									 console.log(scenen)
								that.http(api.ShareCode,'POST',{
										scene:scenen,
										page:'pages/flareUps-details/home'
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
				loadData(){
					let that=this;
					
					
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
						let project= getApp().globalData.projectItem;
						let code=project.affiliationCode || this.affCode
						let scene=scene='age_'+code+'_'+wxUser.userCode
						scene=scene+'_'+this.dazzleBeatData.ordinal
						
						return {
						  title:BaseBudding.projectName,
						  path: '/pages/flareUps-details/home?invitee='+invitee+'&scene='+scene
						}	    
		 },
		async onLoad(options) {
			console.log("炫拍详情")
			let that=this;
		if(options.scene){
			let scene=decodeURIComponent(options.scene) 
			let list = scene.split("_")
			let values = await that.Jiema(list[0], list[1], list[2])
			console.log(list)
			console.log(values)
			values.data['senen'] = list[0]
				that.affCode=list[1]		
			console.log(values.data)
			getApp().globalData.senen = values.data
			getApp().globalData.invitee=values.data.userId
			that.ordinal=parseInt(list[3])
		}
			
			if(options.id){
				that.dazzleBeatData.id = options.id
			}
			if(options.invitee){
			    getApp().globalData.invitee=options.invitee
			   }
			
				that.isShowTx= getApp().globalData.interaction=="0"?true:false
			init.initPage().then(res=>{
				this.popupaShow = getApp().globalData.popupaShow==null?true:getApp().globalData.popupaShow 
				that.wxUser=getApp().globalData.wxUser
				
				if(that.ordinal!=null){
					that.getAwesomeshootingbyordinal(that.ordinal)
				}else{
					that.getAwesomeshooting(that.dazzleBeatData.id)
					that.getAwesomeshootingviews(that.dazzleBeatData.id)
				}
				that.getAwesomeshootingtotal()
				
				that.getBaseBudding()
				that.getlogoImg()
				that.getPopupads()
			})
			
			//init.initPage().then(res=>{ 
			
			//console.log(that.isShowTX)
				
				
		//	})
			
		},
		onShow() {
			
		},
		
		
	}
	
	
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
	.flare-bg-color{
		height: 100rpx;
		background-color: #FFFFFF;
		width: 100%;
	}
	.flareUpsDetail-input-placeholder{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		line-height:52rpx;
		opacity:0.71;
	}
	.flare-reply{
		margin-top:20rpx;
	}
	.flareUpsDetail-commit{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		width:120rpx;
		height: 55rpx;
		color:rgba(153,153,153,1);
		line-height:52rpx;
		margin-right: 30rpx;
	}
	.flareUpsDetail-input{
		width:550rpx;
		height:68rpx;
		background:rgba(243,247,251,1);
		border-radius:34rpx;
		padding: 0rpx 40rpx;
		margin-left:30rpx;
		
	}
	.flareUpsDetail-bar{
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		
	}
	.flare-dz-zan{
		display: flex;
		padding-left: 29rpx;
		width:100%;
		height:100rpx ;
	}
	.flare-dz-text{
		width: 690rpx;
	/* 	border:solid 1rpx #333333; */
		height:100rpx;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(82,103,150,1);
		line-height:48rpx;
		text-indent: 1.5em;
		
	}
	.flare-dz-img{
		width:27rpx;
		height: 27rpx;
		position: absolute;
		z-index: 99;
		margin-top:10rpx;
		
	}
	.flareUpsDetails{
		height: 100vh;
		background-color: #FFFFFF;
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
</style>
