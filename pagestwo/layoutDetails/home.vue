<template>
	<view class="layoutDetail">
		<cu-custom bgColor="bg-white" :isBack="true">
				 <block slot="backText"></block>
				 <block slot="content" class="title-text">户型详情</block>
		</cu-custom>
		
				<view class="layoutDetail-imgs">
					<image class="layoutDetail-img" :src="recommendItem.src?recommendItem.src:'https://img.0728jh.com/staticImg/banner_pic.png'" mode="aspectFit" @click="previewImage"></image>
				
                </view>
			
			
			
				<view class="layoutDetail-center">
                    <view class="vrs" @tap="navigateToVR" v-if="recommendItem.srcTd">
                        <image src="https://img.kehuoa.com/staticImg/vrlook.png" mode="aspectFit"></image>
                        <view class="vrs-text">看房</view>
                    </view>
					<view class="layoutDetail-center-name">
						<view class="layoutDetail-name">
							 {{recommendItem.name}}
						</view>
						<view class="layoutDetail-fadai">
							
							<image class="layoutDetail-guan-icon" :src="guanZ?'https://img.0728jh.com/staticImg/yijingguanzhu.png':'https://img.0728jh.com/staticImg/focus_icon.png'" @click="goconcern"></image>
							<!-- https://img.0728jh.com/staticImg/zanwo.png -->
							<!-- https://img.0728jh.com/staticImg/yijingguanzhu.png -->
							<label @click="goconcern">关注</label>
							<image class="layoutDetail-jsq-icon" src="https://img.0728jh.com/staticImg/house_icon.png" mode=""></image>
							<label @click="tofangdai">房贷计算器</label>
						</view>
						
					</view>
					<view class="layoutDetail-tag">
						<view class="tag-wid">
							
						
						<tag :tagData="tagData" :hxindex="recommendItem.salesStatus"></tag>
						</view>
						<button v-if="wxUser.nickName" class="layoutDetail-fadais" @click="getShareCode">
							<image class="layoutDetail-fx-icon" src="https://img.0728jh.com/staticImg/layout_wps.png"></image>
							<label>分享</label>
						</button>
						<button v-else class="layoutDetail-fadais" @click="getUserProfile" >
							<image class="layoutDetail-fx-icon" src="https://img.0728jh.com/staticImg/layout_wps.png"></image>
							<label>分享</label>
						</button>
					</view>
				
					<view class="layoutDetail-bottom">
						<view class="layoutDetail-one">
							<view class="layoutDetail-bottom-left">
								 {{recommendItem.type}}
							</view>
							<view class="layoutDetail-bottom-left-l">
								户型类型
							</view>
						</view>
						<view class="layoutDetail-bottom-xian">
							
						</view>
						<view class="layoutDetail-one">
							<view class="layoutDetail-bottom-left">
								{{recommendItem.floorage}}㎡
							</view>
							<view class="layoutDetail-bottom-left-l">
								面积
							</view>
						</view>
						<view class="layoutDetail-bottom-xian">
							
						</view>
						<view class="layoutDetail-one">
							<view class="layoutDetail-bottom-left">
								{{recommendItem | pricetatilfilter}}
								<!-- {{itemPrice}} -->
							</view>
							<view class="layoutDetail-bottom-left-l">
								预估总价
							</view>
						</view>
					</view>
					
				</view>
				<view class="layoutDetail-pl">
					<view class="layoutDetail-pl-tiao">
						用户点评({{recommendItem.listTopicReply.length}}条)
					</view>
					<view class="layoutDetail-ss"  @click="topl" v-if="isShowTX && wxUser.nickName && wxUser.userType=='1' ">
						<image class="layoutDetail-pl-icon" src="https://img.0728jh.com/staticImg/ping_icon.png" mode=""></image>
						<view  class="woyaotext">
							我要评论
						</view>
					</view>
					<view class="layoutDetail-ss"  v-if="isShowTX && (!wxUser.nickName) && wxUser.userType=='1' ">
						<image class="layoutDetail-pl-icon" src="https://img.0728jh.com/staticImg/ping_icon.png" mode=""></image>
						
						<button  class="woyaotexts text-colo" @click="getUserProfile">
							我要评论
						</button>
					</view>
					
				</view>
				<view class="layoutDetail-pl-riwte" v-if="plState">
					<textarea class="layoutDtail-ttare" placeholder-class="texttareas" value=""  placeholder="请输入您点评的内容" @input="getlayoutValue"></textarea>
					<view class="layoutDetail-pl-riwte-dd">
						
						<view class="layoutDetail-btn-queding" @click="commit">
							确定
						</view>
						<view class="layoutDetail-btn-quxiao" @click="cancel">
							取消
						</view>
					</view>
				</view>
				<view class="layoutDetail-tab cu-bar tabbar  foot">
					<view class="layoutDetail-tab-left">
						<image class="layoutDetail-tab-icon" src="https://img.0728jh.com/staticImg/iphone-layout_icon.png" mode="" @click="callphone"></image>
						<view class="" @click="callphone">
							电话
						</view>
					</view>
					<view class="layoutDetail-tab-mai" v-if="wxUser.nickName" @click="togofang">
						我要购买
					</view>
					<button v-else class="layoutDetail-tab-mai" @click="getUserProfile" >
						我要购买
					</button>
					
					<view class="layoutDetail-tab-tui" v-if="wxUser.nickName" @click="toRecommend">
						立即推荐
					</view>
					<button v-else class="layoutDetail-tab-tui"  @click="getUserProfile" >
						立即推荐
					</button>
				</view>
				<view class="layoutDetail-comment-pad">
					<block v-for="item in recommendItem.listTopicReply">
					<view class="layoutDetail-comment">
						
						<layoutPL :swiperItem="item" v-if="item.createId==wxUser.id || item.auditStatus=='1'"></layoutPL>
						
					</view>
					</block>
				</view>
				<!-- <img :src="shareImage?shareImage:''" class="share-image" /> -->
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
				
				
				
				
				
				
				<!-- <view class="cu-modal" :class="modalName=='Image'?'show':''">
					<view class="cu-dialog">
						<view class="bg-img" :style="'background-image: url('+shareImage+')'">
							<view class="cu-bar justify-end text-white">
								<view class="action" @tap="hideModal">
									<text class="cuIcon-close"></text>
								</view>
							</view>
						</view>
						
							<image class=" bg-img img-share" :src="shareImage" mode="aspectFit"></image>
							
						
						<view class="cu-bar justify-end text-white">
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close"></text>
							</view>
						</view>
						<view class="cu-bar bg-white">
							<view class="action margin-0 flex-sub  solid-left" @tap="eventSave">保存到本地</view>
						</view>
					</view>
				</view> -->
				<view class="layoutDetail-to">
					
				</view>
			
	
		
	
		
		
		
		
	<!-- 	<view class="layoutDetail-comment-quanbu" @click="getmorepl">
			查看全部评论 >
		</view> -->
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
				followDatas:'',
				plState:false,
				layoutValue:'',
				recommendItem:{id:''},
				isShowTX:'',
				painting: {},
				shareImage:'',
				modalName:'',
				imageWidth:0,
				imageHeight:0,
				Qcode:'',
				neiImgeHeighte:1,
				neiImgeWidth:1,
				baseBudding:'',
				wxUser:'',
				ordinal:null,
				userList:'',
				
				
				projectItem:{id:''},
			}	
		},
		computed:{
			tagData:function(){
				let recommendItem=this.recommendItem
				if(recommendItem&&recommendItem.keywords){
					return (recommendItem.keywords || '').split(' ')
				}
				
				
			},
			// itemPrice:function(){
			// 	let recommendItem=this.recommendItem
			// 	let BaseBudding=getApp().globalData.BaseBudding
			// 	if(recommendItem&&BaseBudding&&BaseBudding.price&&recommendItem.price&&recommendItem.floorage){
			// 		let BaseBuddingprice=parseInt(BaseBudding.price)
			// 		let floorage=parseInt(value.floorage)
			// 		let price = parseInt(value.price) 
			// 		if(!total){
			// 			total=(floorage*BaseBuddingprice)/10000
			// 		}
			// 		if(!total){
			// 			return '总价待定';
			// 		}
					
			// 		return '约'+total+'万/套';
			// 	}
			// },
			
			guanZ:function(){
				var fd =this.followDatas
				var re=this.recommendItem
				
				if(re && fd && fd.length > 0 ){
					console.log("------------")
					console.log(fd)
					console.log(re)
					console.log("------------")
					let guanz=false;
					for(let i =0,len=fd.length;i<len;i++){
						if(fd[i].apartmentLayout){
							if(fd[i].apartmentLayout.id===re.id){
								guanz= true;
							}
						}
						
					}
					return guanz;
					// for(let item of followDatas){
					// 	console.log(item)
					// 	if(item.apartmentLayout['id']===recommendItem.id){
					// 		return true;
					// 	}
					// }
				}
				return false;
			},
			
		},
		filters:{
			pricetatilfilter:function(value){
				let BaseBudding=getApp().globalData.BaseBudding
				if(value&&BaseBudding&&BaseBudding.price){
					
					let BaseBuddingprice=parseFloat(BaseBudding.price)
					let floorage=parseFloat(value.floorage)
					let price = parseFloat(value.price) 
					// || parseInt(getApp().globalData.BaseBudding.price)
					let total =((floorage*price)/10000).toFixed(2)
					if(!total || total=="NaN"){
						total=((floorage*BaseBuddingprice)/10000).toFixed(2)
					}
					if(!total || total=="NaN"){
						return '总价待定';
					}
					
					return '约'+total+'万/套';
					
				}
				
			}
			
		},
		methods:{
            navigateToVR:function(){
                let that = this;
               console.log(that.recommendItem);
              
                uni.navigateTo({
                    url:"../vR/home?srcTd="+that.recommendItem.srcTd,
                    
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
			// getuserinfo:function(e){
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
			hideModal(){
				this.modalName='';
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
					let BaseBuddingprice=parseInt(getApp().globalData.BaseBudding.price)
					let index=Math.floor(Math.random()*10)
					let wxUser= getApp().globalData.wxUser
					let jujia='均价：'+this.recommendItem.price+'/㎡'
					let Isjage=parseInt(this.recommendItem.price)*10
					if(Isjage){
						jujia='均价：'+this.recommendItem.price+'/㎡'
					}else if(BaseBuddingprice){
						jujia='均价：'+BaseBuddingprice+'/㎡'
					}else{
						jujia='均价：待定'
					}
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
				            content: '向您推荐'+this.baseBudding.projectName+ this.recommendItem.name,
				            fontSize: 15,
				            color: '#563D20',
				            textAlign: 'left',
				            top: 59.5,
				            left: 96
				          },
						  //内容this.recommendItem.src
				          {
							  
				            type: 'image',
				            url: this.recommendItem.src,
				            top: 136,
				            left:  (357/2)-(((this.neiImgeWidth*186)/this.neiImgeHeighte)/2),
				            width: (this.neiImgeWidth*186)/this.neiImgeHeighte,
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
				            content: this.recommendItem.name + ' '+ this.recommendItem.type,
				            fontSize: 16,
				            lineHeight: 21,
				            color: '#383549',
				            textAlign: 'left',
				            top: 336,
				            left:(357/2)-(((this.neiImgeWidth*186)/this.neiImgeHeighte)/2),
				            width: 287,
				            MaxLineNumber: 2,
				            breakWord: true,
				            bolder: true
				          },
				          {
				            type: 'text',
				            content: jujia,
				            fontSize: 19,
				            color: '#E62004',
				            textAlign: 'left',
				            top: 387,
				            left: 66,
				            bolder: true
				          },
				          {
				            type: 'text',
				            content: '面积:'+this.recommendItem.floorage+'㎡',
				            fontSize: 14,
				            color: '#383549',
				            textAlign: 'left',
				            top: 391,
				            left: 250,
				            // textDecoration: 'line-through'
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
			// getmorepl:fun(){}
			
			callphone:function(){
				let that=this;
				let baseBudding= getApp().globalData.BaseBudding
				let wxUser=getApp().globalData.wxUser
				let userList=that.userList
				let phoneNumber=''
				console.log(baseBudding)
				console.log(wxUser)
				console.log(userList)
				if(wxUser.userType=='1'){
					phoneNumber=wxUser.phone
				}else{
					if(wxUser.userType=='0'){
						let invitee=wxUser.invitee
						if(invitee){
							for(let item of userList){
								if(item.id==invitee){
									phoneNumber=item.phone
								}
							}
						}
					}else{
						phoneNumber=baseBudding.premisesMobile
					}
				}
				
				uni.makePhoneCall({
				    phoneNumber: phoneNumber //仅为示例
				});
			},
			getUserList:function(){
				let that=this;
				that.http(api.UserInfo,'GET',{
					current: 1,
					size: 50,
					userType:'1'
					// descs: 'sort',
				},false).then(res=>{
					console.log("置业顾问")
					console.log(res)
					that.userList=res.data.records
				})
			},
			togofang:function(){
				uni.redirectTo({
					url:'../../pages/index/index?PageCur=contactUs'
				})
			},
			toRecommend:function(){
				uni.redirectTo({
					url:'../../pages/index/index?PageCur=recommend'
				})
			},
			
			previewImage(){
				console.log("预览")
				let imgList = (this.recommendItem.src || '').split(' ')
				uni.previewImage({
					current:0,
					urls:imgList
				})
			},
			isAuth(){
				if(!getApp().globalData.wxUser.nickName){
					uni.showToast({
					    title: '请先授权',
						icon:'none',
					    duration: 3000
					});
					return;
				}
			},
			getwxUser:function(value){
				let that=this;
				that.http(api.wxUserSave,"POST",value,false).then(res=>{
					console.log(res)
					that.userInfoGets()
					
					
				})
			},
			
			// getuserinfohx:function(e){
			// 	if(e.detail.errMsg=="getUserInfo:ok"){
			// 				//TODO:e.detail 存起来
			// 		this.getwxUser(e.detail)
			// 		//this.toflareUpsPush()
					
			// 	}
			// },
			goconcern:function(){
				let that=this;
				that.http(api.ApartmentConcern,'POST',{
					id: that.recommendItem.id,
					attentionType:'6',
					userId:getApp().globalData.wxUser.id,
					affiliationId:getApp().globalData.projectItem.id
				},false).then(res=>{
					console.log("关注")
					console.log(res)
					that.getApartmentConcern()
				})
			},
			getlayoutValue:function(e){
				this.layoutValue=e.detail.value
			},
			tofangdai:function(){
				uni.navigateTo({
					url:'../../pages/house_loan_calculator/house_loan_calculator'
				})
			},
			topl:function(){
				this.isAuth()
				this.plState=!this.plState;
			},
			commit:function(){
				this.isAuth()
				
				this.plState=false
					this.ReviewsCommit()
			},
			cancel:function(){
				this.plState=false
				
			},
			getrecommendItem:function(sid) {    //户型
				let _self=this;
				let id = sid || _self.recommendItem.id
				_self.http(api.ApartmentLayout,'GET',{
					// current: 1,
					// size: 10,
					//descs: 'sort',
					id:id,
					// affiliationId:getApp().globalData.projectItem.id
				},false).then(res=>{
					console.log("户型详情")
					console.log(res)
					_self.recommendItem=res.data.records[0]
					uni.getImageInfo({
						src:res.data.records[0].src,
						success(e) {
							console.log("户型图大小")
							console.log(e)
							_self.neiImgeHeighte=e.height
							_self.neiImgeWidth=e.width
							
						}
					})
				})
			},
			
			getrecommendItembyordinal:function(ordinal) {    //户型
				let _self=this;
			//	let id =  || _self.recommendItem.id
			//let ordinal=this.ordinal
				_self.http(api.ApartmentLayout,'GET',{
					// current: 1,
					// size: 10,
					//descs: 'sort',
					
					ordinal:ordinal
				},false).then(res=>{
					console.log("户型详情")
					console.log(res)
					_self.recommendItem=res.data.records[0]
					uni.getImageInfo({
						src:res.data.records[0].src,
						success(e) {
							console.log("户型图大小")
							console.log(e)
							_self.neiImgeHeighte=e.height
							_self.neiImgeWidth=e.width
							//console.log(minbi)
							//_self.chooseGW()
						}
					})
				})
			},
			getApartmentConcern:function(){
							 let that=this;
							 console.log()
				this.http(api.getApartmentConcern2,'GET',{
					attentionType:'6',
					userId:getApp().globalData.wxUser.id,
					affiliationId:getApp().globalData.projectItem.id
				},false).then(res=>{
					console.log("我的关注列表")
					console.log(res)
					that.followDatas=res.data
					// for(let i=0;i<res.data.length;i++){
					// 	if(res.data.apartmentLayout.id==recommendItem.id)
					// }
				})
			},
			getBaseBudding:function(){
				let that=this;
				let id = that.projectItem.id || getApp().globalData.projectItem.id
				that.http(api.BaseBudiing+"/get/"+id,'GET',{},false).then(res=>{
					console.log("楼盘基本信息")
					console.log(res)
					this.baseBudding=res.data
					getApp().globalData.BaseBudding=res.data
					})
			},
			ReviewsCommit:function(){
				let that=this;
				let str = that.layoutValue.replace(/\s*/g,"")
				if(!str){
					return;
				}
				console.log(that.layoutValue)
					that.http(api.Topicreply,'POST',{
						replyTypes: 3,
						typesId:that.recommendItem.id,
						details:that.layoutValue,
						replyClass:that.recommendItem.createId==getApp().globalData.wxUser.id?'1':'0'
					},false).then(res=>{
						console.log("写回复")
						console.log(res)
						that.getrecommendItem()
					})
				},
		
			
			getShareCode:function(){
							let that=this;
						//	return new Promise((resolve,reject)=>{
							
							let scene='';
							let wxUser=getApp().globalData.wxUser
						    let project=getApp().globalData.projectItem?(getApp().globalData.projectItem.affiliationCode?getApp().globalData.projectItem:getApp().globalData.BaseBudding):getApp().globalData.BaseBudding;
					     	scene='age_'+project.affiliationCode+'_'+wxUser.userCode
						
								let scenen=scene+'_'+that.recommendItem.ordinal
								console.log("查看scenen")
								console.log(scenen)
							that.http(api.ShareCode,'POST',{
									scene:scenen,
									page:'pagestwo/layoutDetails/home'
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
						let project =getApp().globalData.projectItem;
						let code = project.affiliationCode || this.affCode
						let scene='age_'+code+'_'+wxUser.userCode
						scene=scene+'_'+this.recommendItem.ordinal
						return {
						  title:BaseBudding.projectName,
						 // path: '/pagestwo/layoutDetails/home?invitee='+invitee+'&id='+this.recommendItem.id 
						 path: '/pagestwo/layoutDetails/home?invitee='+invitee+'&scene='+scene
						}	    
		 },
		async onLoad(options) {
			let that=this;
			console.log("户型详情options")
			console.log(options)
			
			if(options.scene){
				// console.log("扫码")
				 let scene=decodeURIComponent(options.scene) 
				
				
			let list=scene.split("_");
			let values= await that.Jiema(list[0],list[1],list[2]);
			console.log(list);
			console.log("++++++++++++++++++++++++")
			console.log(values);
			values.data['senen']=list[0]
			that.affCode = list[1];
			 let obj={id:values.data.affId};
			 getApp().globalData.projectItem=obj
			 console.log(values.data)
			 getApp().globalData.senen=values.data
			 // getApp().globalData.invtUserId=value.data.userId
			 getApp().globalData.invitee=values.data.userId
			this.ordinal=parseInt(list[3])
				
			}
			if(options.id){
				// var id =
				//  id=parseInt(id)
				this.recommendItem.id= options.id
			}
			
			if(options.invitee){
				getApp().globalData.invitee=options.invitee
			}
			this.isShowTx= getApp().globalData.interaction=="0"?true:false
			init.initPage().then(res=>{
				console.log("查看缓存")
				this.popupaShow = getApp().globalData.popupaShow==null?true:getApp().globalData.popupaShow 
				this.wxUser=getApp().globalData.wxUser
			
				this.getApartmentConcern()
				if(this.ordinal!=null){
					 console.log("走ordinal")
					this.getrecommendItembyordinal(this.ordinal)
				}else{
					console.log("走sid")
				this.getrecommendItem(options.id)	
				}
				this.getPopupads()
				this.getBaseBudding()
				this.getUserList()
				//this.getApartmentConcern()
				
				
			
				
			})
			
			
		// 	this.http(api.ApartmentLayout,'GET',{
		// 			// current: 1,
		// 			// size: 10,
		// 			//descs: 'sort',
		// 			id:id
		// 		},false).then(res=>{
		// 			console.log("户型详情")
		// 			console.log(res)
		// 			this.recommendItem=res.data.records[0]
		// })
		}
	}
</script>

<style>
    .vrs{
        border: dashed  1rpx  #2C405A; 
        width:160rpx;
        height: 60rpx;
        border-radius: 10rpx;
        position: absolute;
        top:5rpx;
        right: 30rpx;
        overflow: hidden;
        display: flex;
        
    }
    .vrs-text {
       line-height: 60rpx;
    }
    .vrs image {
        width:80rpx;
        height: 60rpx;
    }
	.text-colo{
		font-size: 28rpx;
		background-color: transparent;
		border: none;	
		
	}
	.text-colo::after{
		border:none;
	}
	.img-share{
		width: 375px;
		height: 555px;
	}
	.share-image {
  width: 600rpx;
  height: 888rpx;
  margin: 0 75rpx;
  border: 1px solid black;
}
.woyaotexts{
		font-size: 28rpx;
		color:#16CCF6;
	}
	.woyaotext{
		font-size: 28rpx;
		color:#16CCF6;
	}
	.layoutDetail-comment-quanbu{
		width:400rpx;
		height:60rpx;
		border:1rpx solid rgba(229,229,229,1);
		border-radius:30rpx;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		text-align: center;
		line-height: 60rpx;
		margin-left: 174rpx;
		margin-bottom: 46rpx;
	}
	.layoutDetail-comment-pad{
		padding: 59rpx 30rpx 0rpx 29rpx;
	}
	.layoutDetail-comment{
		margin-bottom: 38rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 0rpx 22rpx 5rpx rgba(198,198,198,0.2);
	}
	.layoutDetail-to{
		width: 750rpx;
		height:105rpx;
	}
	.layoutDetail-tab-tui{
		width:278rpx;
		height:84rpx;
		background:linear-gradient(-90deg,rgba(22,204,246,1),rgba(22,204,246,1));
		border-radius:9rpx;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 84rpx;
		position: absolute;
		margin-left: 440rpx;
	}
	.layoutDetail-tab-mai{
	width:278rpx;
	height:84rpx;
	background:rgba(252,122,86,1);
	border-radius:9rpx;
	font-size:32rpx;
	font-family:PingFang SC;
	font-weight:500;
	color:rgba(255,255,255,1);
	text-align: center;
	line-height: 84rpx;
	position: absolute;
	margin-left:142rpx ;
	}
	.layoutDetail-tab-icon{
		width: 34rpx;
		height: 36rpx;
		
	}
	.layoutDetail-tab-left{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		margin-left: 42rpx;
	}
	.layoutDetail-tab{
		display: flex;
		position: absolute;
		align-items: center;
		width: 749rpx;
		height:104rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 16rpx 31rpx 9rpx rgba(198,198,198,0.41);
	}
	/* .texttareas{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	} */
	.layoutDetail-btn-quxiao{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.layoutDetail-btn-queding{
		width:140rpx;
		height:54rpx;
		background:rgba(22,204,246,1);
		border-radius:7rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 54rpx;
	}
	.layoutDetail-pl-riwte-dd{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.layoutDtail-ttare{
		width:693rpx;
		height:220rpx;
		background:rgba(246,246,246,1);
		/* opacity:0.59; */
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		
		margin-bottom: 34rpx;
		padding:31rpx 0rpx 0rpx 29rpx;
	}
	.layoutDetail-pl-riwte{
		padding:43rpx 29rpx 0rpx 29rpx;
		animation: mymove 1s forwards;
	}
	.layoutDetail-pl-icon{
		width:30rpx;
		height: 26rpx;
		margin-right: 10rpx;
	}
	.layoutDetail-ss{
		display: flex;
		align-items: center;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.layoutDetail-pl-tiao{
		font-size:40rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.layoutDetail-pl{
		margin:420rpx 32rpx 0rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* border:solid 1rpx #000000; */
	}
	.layoutDetail-fx-icon{
		height: 35rpx;
		width:35rpx;
		margin-right: 10rpx;
	}
	.tag-wid{
		width:550rpx;
		/* border:solid 1rpx #333333; */
		margin-right: 10rpx;
		overflow: hidden;
		white-space:nowrap;
	}
	.layoutDetail-tag{
		margin-left: 15rpx;
		margin-bottom: 50rpx;
		/* border:solid 1rpx #333333; */
		display: flex;
	}
	.layoutDetail-bottom-xian{
		height: 69rpx;
		width: 1rpx;
		border:solid 1rpx #EEEEEE;
	}
	.layoutDetail-bottom-left-l{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		margin-top:10rpx
	}
	.layoutDetail-bottom-left{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(255,56,0,1);
		height: 50rpx;
		/* border:solid 1rpx #333333; */
	}
	.layoutDetail-bottom{
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: space-between;
		padding:0rpx 32rpx 77rpx 32rpx;
	}
	.layoutDetail-jsq-icon{
		width:20rpx;
		height:20rpx;
		margin-left: 25rpx;
		margin-right: 5rpx;
	}
	
	.layoutDetail-guan-icon{
		width:23rpx;
		height: 21rpx;
		margin-right: 5rpx;
	}
	.layoutDetail-fadai{
		display: flex;
		align-items: center;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		/* background-color: transparent;
		border: solid 1rpx #333333;	 */
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
	.layoutDetail-name{
		font-size:40rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.layoutDetail-center-name{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0rpx 28rpx 34rpx 31rpx
		
	}
    .layoutDetail-center{
		background:rgba(255,255,255,1);
		opacity:0.99;
		border-radius:40rpx;
		padding-top:70rpx;
		margin-top:-21rpx;
		position: absolute;
		z-index: 99;
		width:100%;
		/* border:solid 1rpx #000000; */
	}
	.layoutDetail-imgs{
		height: 420rpx;
		background-color: #FFF4D8;
		text-align: center;
	}
	.layoutDetail-img{
		/* width:515rpx; */
		/* height: 416rpx; */
		/* margin-top:4rpx;
		margin-left: 117rpx; */
	}
	.layoutDetail{
		
		background-color: #FFFFFF;
	}
	@keyframes mymove{
		from{opacity:0.0;
			height: 0rpx;}
		to{opacity:1.0;
			height:370rpx;}
	}
</style>
