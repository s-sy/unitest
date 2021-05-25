<template>
	<view class="ap-layout">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="title-text">户型列表</block>
		</cu-custom>
			
			<scroll-view scroll-x="true" scroll-with-animation>
			<view class="ap-layout-top-y">
				<view class="ap-layout-top-name" :class="chanNames=='quanbu'?'ap-layout-top-name-change':''" @click="chanName" data-name="quanbu">
				全部
				</view>
				<view class="ap-layout-top-name" v-for="item in nameList" :class="chanNames==item.name?'ap-layout-top-name-change':''" @click="chanName" :data-name="item.name">
					{{item.name+'('+item.num+')'}}
				</view>
				
				<!-- <view class="ap-layout-top-name" v-for="item in nameList" :class="chanNames==item?'ap-layout-top-name-change':''" @click="chanName" :data-name="item">
					{{item}}
				</view>
				<view class="ap-layout-top-name" v-for="item in nameList" :class="chanNames==item?'ap-layout-top-name-change':''" @click="chanName" :data-name="item">
					{{item}}
				</view>
				<view class="ap-layout-top-name" v-for="item in nameList" :class="chanNames==item?'ap-layout-top-name-change':''" @click="chanName" :data-name="item">
					{{item}}
				</view>
				<view class="ap-layout-top-name" v-for="item in nameList" :class="chanNames==item?'ap-layout-top-name-change':''" @click="chanName" :data-name="item">
					{{item}}
				</view> -->
			</view>
			</scroll-view>
			<view class="ap-layout-top">
		<block v-for="item in recomendListone">
			<view class="ap-layout-bottom">
				<layout  :layoutData="item"></layout>
			</view>
		</block>
			
		</view>
		
		<view class="layoutDetail-tab cu-bar tabbar  foot">
			<view class="layoutDetail-tab-left">
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
				chanNames:'quanbu',
				recommendList:'',
				recomendListone:'',
				recomendListtwo:[],
				recomendListshr:[],
				recomendListfou:[],
				nameList:[],
				painting: {},
				shareImage:'',
				modalName:'',
				imageWidth:0,
				imageHeight:0,
				Qcode:'',
				neiImgeHeighte:1,
				neiImgeWidth:1,
				wxUser:'',
				baseBudding:'',
			}
		},
		methods:{
			
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
			chanName:function(e){
				let that=this;
				console.log(e)
				that.chanNames = e.currentTarget.dataset.name
				console.log(that.chanNames)
				
				if(that.chanNames=='quanbu'){
					that.recomendListone=that.recommendList
				}else{
					that.recomendListone=that.shaxuan(that.chanNames,that.recommendList)
				}
				// switch(that.chanNames){
				// 	case 'quanbu':
				// 	that.recomendListone=that.recommendList
				// 	break;
				// 	case 'siju':
				// 	that.recomendListone=that.recomendListfou
				// 	break;
				// 	case 'shanju':
				// 	that.recomendListone=that.recomendListshr
				// 	break;
				// 	case 'erju':
				// 	that.recomendListone=that.recomendListtwo
				// 	break;
				// }
			},
			shaxuan:function(item,List){
				let DataList=[].concat(List)
				let recomendListone=[]
				console.log("筛选数据")
				console.log(item)
				console.log(DataList)
				for(let items of DataList){
					if(items.category){
						if(item==items.category.substring(0,2))	{
						recomendListone.push(items)
						}
					}
				}
				return recomendListone;
			},
			getapartmentlayout:function(){    //户型
				let _self=this;
				let id = getApp().globalData.projectItem?getApp().globalData.projectItem.id : getApp().globalData.senen.affId
				_self.http(api.ApartmentLayout,'GET',{
					current: 1,
					size: 50,
					descs: 'sort',
					affiliation:'2',
					affiliationId:id
				},false).then(res=>{
					console.log("ApartmentLayout")
					console.log(res)
					_self.recommendList=res.data.records
					_self.recomendListone=res.data.records
					_self.getClassificationName(res.data.records)
					_self.classification()
				})
			},
			getBaseBudding(){
				let that=this;
				let  id = getApp().globalData.projectItem?getApp().globalData.projectItem.id : getApp().globalData.senen.affId
				that.http(api.BaseBudiing+"/get/"+id ,'GET',{},false).then(res=>{
					console.log("楼盘基本信息")
					console.log(res)
					console.log("楼盘基本信息")
				//	let baseBudding=res.data
					//this.baseBudding=res.data
					
					
					that.baseBudding=res.data
					getApp().globalData.BaseBudding=res.data
							//that.tagData=(this.baseBudding.keywords || '').split(' ')
							//that.index=parseInt(this.baseBudding.salesStatus)
							//that.getBuddingDetail()
					})
							
			},
			unique:function(array){
			        var temp = [];//临时数组
			        var json = {};//创建一个空对象
			        //将当前数组的元素值当作对象的属性，遍历数组，比对对象，如果对象的这个属性不存在则将当前数组元素复制到临时数组，并添加该属性且将属性值赋值为1
			        for(var i = 0; i<array.length; i++){
			            if(!json[array[i]]){//如果对象没有该属性
			                temp.push(array[i]);
			                json[array[i]] = 1;//添加属性，将属性值赋值为1
			            }
			        }
			        return temp;
			},
			getClassificationName(value){
				console.log("获取分类")
				console.log(value)
				let nameList=[]
				for(let item of value){
					let nameItem={name:'',num:1}
					
					if(item.category){
						nameItem.name=item.category.substring(0,2)
					}
					if(nameItem.name!=''){
						//nameItem.num=nameItem.num+1
						nameList.push(nameItem)
					}
					
				}
				let listObj={}
				nameList.forEach((item,index)=>{
				  if (!listObj[item.name]) {//利用对象key索引，判断是否已有该标签分类字段
				    listObj[item.name] = {//没有则创建key索引
				      'name': item.name,
				      'count': 1 //初始统计1
				      }
				  } else {//有则增加该重复次数统计
				      ++listObj[item.name]['count']
				  }
				  
				  
				  })
				//  console.log(listObj)
				//nameList=this.unique(nameList)
				  let newList = []
				    for (var k in listObj) {
				        newList.push({
				           'name': listObj[k]['name'],
				          'num': listObj[k]['count']
				       })
				    }
				console.log(newList)
				
				//console.log(nameList)
				this.nameList=newList
				//console.log(nameList)
			},
			classification(){
				let that=this;
				let loyoutList=[].concat(this.recommendList)
				
				loyoutList.forEach(item =>{
					let sort= parseInt((item.type || '').split('')[0])
					switch(sort){
						// case 1:
						// that.recomendListone.push(item)
						// break;
						case 2:
						that.recomendListtwo.push(item)
						break;
						case 3:
						that.recomendListshr.push(item)
						break;
						case 4:
						that.recomendListfou.push(item)
						break;
					}
				})
				
				
			},
			getwxUser:function(value){
				let that=this;
				that.http(api.wxUserSave,"POST",value,false).then(res=>{
					console.log(res)
					// that.wxUser=res.data
					// getApp().globalData.wxUser=res.data
				//	that.chooseGW()
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
				            url: this.recommendList[0].src,
				            top: 136,
				            left:  (357/2)-(((this.neiImgeWidth*230)/this.neiImgeHeighte)/2),
				            width: (this.neiImgeWidth*230)/this.neiImgeHeighte,
				            height: 230,
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
				            content: this.baseBudding.projectName+'户型大全' ,
				            fontSize: 16,
				            lineHeight: 21,
				            color: '#402D16',
				            textAlign: 'left',
				            top: 390,
				            left: 66,
				            width: 287,
				            MaxLineNumber: 1,
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
						
							that.http(api.ShareCode,'POST',{
									scene:scene,
									page:'pagestwo/apartementLayout/home'
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
						},
						Jiema(web,aff,user){
							let that=this;
							return new Promise((resolve,reject)=>{
								that.http(api.Jiema,'GET',{
									aff:aff,
									user:user,
									scene:web,
								},false).then(res=>{
									// console.log("解码")
									// console.log(res)
									resolve(res)
								})
							})
						},
		},
		onShareAppMessage: function() {
						let BaseBudding=getApp().globalData.BaseBudding
						let invitee='';
						let wxUser=getApp().globalData.wxUser
						if(wxUser.userType=='1'){
							invitee=wxUser.id
						}
						if(wxUser.userType=='0'){
							invitee=wxUser.invitee
						}
						return {
						  title:BaseBudding.projectName,
						 path: '/pages/questionsAndAnswers/home?invitee='+invitee
						}	    
		 },
		async onLoad(options) {
			let that=this;
			if(options.scene){
			 let scene=decodeURIComponent(options.scene) 	
			 let list=scene.split("_")
			 let values= await that.Jiema(list[0],list[1],list[2])
			 console.log("++++homecopy+++")
		console.log(list)
		console.log(values)
			 values.data['senen']=list[0]
		console.log(values.data)
			 getApp().globalData.senen=values.data
			 getApp().globalData.invitee=values.data.userId
			}
			init.initPage().then(res=>{
				this.wxUser=getApp().globalData.wxUser
			//	let invit= getApp().globalData.invit
				this.popupaShow = getApp().globalData.popupaShow==null?true:getApp().globalData.popupaShow 
				// if(invit&& (!this.wxUser.invitee) && this.wxUser.userType=='0'){
				// 	this.chooseGWgu(invit)
				// }
				
				this.getapartmentlayout()
				this.getBaseBudding()
				this.getPopupads()
			})
			
		}
	}
	
</script>

<style>
	
	.layoutDetail-tab-icon{
		width: 34rpx;
		height: 36rpx;
		
	}
	.layoutDetail-tab-left{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		margin-left: 300rpx;
		
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
	
	.ap-layout-top-name-change{
		background:rgba(22,204,246,1);
		color:rgba(255,255,255,1);
		
	}
	.ap-layout-top-name{
		width:137rpx;
		line-height:60rpx;
		text-align: center;
		margin:15rpx ;
		/* border:solid 1rpx; */
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
		box-shadow: 0rpx 0rpx 5rpx 2rpx #EEEEEE;
		/* margin-right: 20rpx; */
		
	}
	.ap-layout-top-y{
		display:flex;
		/* align-items: center; */
		width:100%;
		/* padding:5rpx 30rpx; */
		white-space:nowrap;
		
	}
	.ap-layout-top{
		margin-left: 30rpx;
		margin-right: 29rpx;
		
		padding-bottom:50rpx;
	}
	.ap-layout{
		background-color: #FFFFFF;
		height: 1334rpx;
		width: 100%;
	}
</style>
