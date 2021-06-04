<template>
<view class="">
	<view class="bgclass " v-if="isShowProject==true">
	
		
	<view class="bgclassImg"></view>
		
		<cu-custom  bgColor="bg-white" :isBack="true" :fanhui="false">
				 <block slot="backText" class="title-name"></block>
				 <block slot="content" class="title-text">首页</block>
		</cu-custom>
			
					
			
			<view class=" flex bg-white mytopclass margin-sm padding-sm radius  ">
			<!-- 	<view class="" @tap="goToSearch(false)"> -->
				<!-- <view class="">
					{{projectNames}} <text class="cuIcon-triangledownfill"></text>
				</view> -->
				<view class="classInput"  @click="useOutClickSide">
					<easySelect ref="easySelect" :options="selectList" size="ziji" :value="projectNames"
					 @selectOne="selectOne"></easySelect>
				</view>
				
				<!-- <dropdown :list="[]" :current="0"></dropdown> -->
				<view class="margin-lr-sm">
					|
				</view>
				<view class="" @tap="goToSearch(true)">
					<text class="cuIcon-search margin-lr-sm"></text>请输入您要搜索的项目名称
				</view>
				
			</view>
		<!-- <uniSearchBar @confirm="search" @input="input"></uniSearchBar> -->
		
		<view class="padding-lr-sm radius " style="margin-top:130rpx">
		<swiper class="screen-swiper swiper-sc square-dot" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" v-if="swiperList">
			<swiper-item v-for="(item,index) in swiperList" :key="index" >
				<image class="radius" :src="item.url" mode="aspectFill" v-if="item.type=='1'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		</view>
		
		
		<view class="noic align-center ">
			<view class="noicclass">
				公告
			</view>
			<view style="width: 88%;">
			<mySwiper :color="'#333333'"  :backgroundColor="'#FFFFFF'" :height="'50rpx'"  :list="noticeData"></mySwiper>
			</view>
			<!-- <view class="">
				武汉加油
			</view> -->
		</view>
		
		<!-- <view class="tabs" style="">
			
			<view class="tab_item" @tap="goToProjectDetail">
				<image class="tab_image" src="https://img.0728jh.com/staticImg/guanzhu_icon.png" mode=""></image>
				<view class="tab_text">
					项目详情
				</view>
			</view>
			<view class="" @tap="goToDynamic">
				<image class="tab_image" src="https://img.0728jh.com/staticImg/jiangjia_hei.png" mode=""></image>
				<view class="tab_text">
					企业动态
				</view>
				
			</view>
			<view class="" @tap="goTohotAction">
				<image class="tab_image" src="https://img.0728jh.com/staticImg/baobiao.png" mode=""></image>
				<view class="tab_text">
					热门活动
				</view>
				
			</view>
			
		</view> -->
		
		
		<view class="project_body">
			<view class="text-bold padding-sm bg-white radius">
				项目列表
			</view>
			<view class="" v-for="(item,index) in projectList" @tap="goTolistItem(item,index)">
				<view class="project_item" v-if="item.delFlag=='0'">
					<view class="item_Iamge_border">
						<!-- -->
						<image class="item_Image" :src="item.firstFigure?item.firstFigure:index%2==0?'https://img.0728jh.com/staticImg/t1.jpg':'https://img.0728jh.com/staticImg/t2.jpg' " mode=""></image>
						<view class="item_Image item-kuang">
							
						</view>
					</view>
			
					<view class="Item_body">
						
						<tag :salesStatus="item.salesStatus" :tagData="item.keywords"></tag>
						
						<view class="" style="width:670rpx;margin-top:190rpx;line-height: 40rpx;">
							<view class="text-xl text-white ">
								{{item.projectName}}
							</view>
							<view class=" text-red">
								{{item.price==""?"价格待定":item.price+"元/平方"}}
							</view>
							<view class="flex">
								<view class="text-white solid" style="width:450rpx; white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">
									{{item.address}}
								</view>
								<view class="flex justify-between">
									<image src="https://image.kehuoa.com/%E7%81%AB.png" style="width:30rpx;height: 30rpx;" mode=""></image>
									<view class="text-white">
										{{item.views+1000}}
									人想买
										<!-- {{random | getrandom}} -->
									</view>
								</view>
							</view>
						</view>
						
					</view>
				</view>
			</view>
			
		</view>
		<view class="" style="height:30rpx">
			
		</view>
		<!-- <view class="radius" style="margin:20rpx; padding:20rpx; background-color: #00BFFF; ">
			<view class="flex justify-between align-center">
				<view class="text-xl" >
					企业动态
				</view>
				<view class="" @tap="goToDynamic">
					查看跟多 <text class="cuIcon-right"></text>
				</view>
				
			</view> -->
			<!-- <view class="flex margin-top-sm ">
				<view class=""style="margin-right: 20rpx;" > --><!-- @tap="goToFind" -->
					<!-- <image src="https://img.0728jh.com/staticImg/huoqdong1.jpg" style="width:325rpx;height: 243rpx; border-radius: 10rpx;" mode=""></image>
					<view class="">
						企業文化
					</view>
				</view>
				<view class="">
					<image src="https://img.0728jh.com/staticImg/gongsi1.jpg" style="width:325rpx;height: 243rpx;border-radius: 10rpx;" mode=""></image>
					<view class="">
						兴邦网络应急啦啦队转成正式啦啦队
					</view>
				</view>
				
			</view> -->
		<!-- </view> -->
		
	</view>
	<view v-if="isShowProjectItem==true">
		
		<cu-custom  bgColor="bg-white" :isBack="true" :home="true" :fanhui="true"   v-if="PageCur=='basics'">
				
				 <block slot="backText" class="title-name">{{baseBuildingData.projectName}}</block>
				 <block slot="content" class="title-text"></block>
		</cu-custom>
		<basics ref="basics" @BaseBudding="BaseBudding" @cachwxUser="cachwxUser" v-if="PageCur=='basics'"></basics>
		<contactUs v-if="PageCur=='contactUs'"></contactUs>
		<recommend ref="recommend" v-if="PageCur=='recommend'"></recommend>
		<shares v-if="PageCur=='shares'"></shares>
		<mine ref="mine" v-if="PageCur=='mine'"></mine>
		
		
		
		<view class="cu-bar tabbar bg-white shadow foot">
		  <view class="action" @click="NavChange" data-cur="basics">
		     <view :class="PageCur=='basics'?'text-vitalityBlue':'text-black'">
		      <view class="cuIcon-homefill"></view> 首页
		    </view>
		  </view>
		  <view class="action" @click="NavChange" data-cur="contactUs">
		    <view :class="PageCur=='contactUs'?'text-vitalityBlue':'text-black'">
		      <view class="cuIcon-phone">
		      </view> 我要购房
		    </view>
		  </view>
		  <view class="action text-black add-action">
			  <!--  -->
		      <button v-if="!wxUser.nickName" class="cu-btn cuIcon-appreciate bg-vitalityBlue shadow" @click="getUserProfile" data-cur="recommend"></button>
			  <button v-else class="cu-btn cuIcon-appreciate bg-vitalityBlue shadow" @click="NavChange" data-cur="recommend"></button>
		     {{wxUser.userRole>0? "推荐购房":"注册经纪人"  }}
		  </view>
		  <!--  -->
			    <view v-if="!wxUser.nickName" class="action" @click="getUserProfile" data-cur="shares">
		    <view :class="PageCur=='shares'?'text-vitalityBlue':'text-black'" @click="toShare">
		      <view class="cuIcon-forward">
		      </view>
		      分享
		    </view>
		  </view>
		<view v-else class="action" @click="NavChange" data-cur="shares">
		    <view :class="PageCur=='shares'?'text-vitalityBlue':'text-black'" @click="toShare">
		      <view class="cuIcon-forward">
		      </view>
		      分享
		    </view>
		  </view>
		  
		  <view class="action" @click="NavChange" data-cur="mine">
		    <view :class="PageCur=='mine'?'text-vitalityBlue':'text-black'">
		      <view class="cuIcon-my">
		      </view>
		      我的
		    </view>
		  </view>
		</view>
		
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content"></view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl bg-white">
					您还未授权，请先授权
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="toMine">去授权</button>
		
					</view>
				</view>
			</view>
		</view>
		<!-- </view>
		<skeleton :show="showSkeleton" ref="skeleton" loading="chiaroscuro" selector="skeleton" bgcolor="#FFF"></skeleton> -->
		<!-- <view class=' margin-top margin-bottom-sm text-center text-xs line-gray'>天门新邦网络技术有限公司 提供技术支持</view>
		 <view class=' margin-top margin-bottom-sm text-center text-xs line-gray'>电话：17362951060</view> -->
	</view>
	</view>
</template>

<script>
	import api from '../api/home.js'
	import init from '../../utils/initPage.js'
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import tag from '@/components/project_tag/tag.vue'
	import mySwiper from '@/components/beckhayu-swiper/my-swiper.vue'
	import easySelect from '@/components/easy-select/easy-select.vue'
	// import skeleton from '../../components/quick-skeleton/quick-skeleton.vue'

	export default {
		data() {
		return {
				PageCur: 'basics',
				baseBuildingData:'',
				modalName:'',
				wxUser:getApp().globalData.wxUser,
				PageCurs:'',
				projectNames:'',
				selectList:[{id:0,name:"ddd"},{id:1,name:"ccd"}],
				isShowProject:false,
				isShowProjectItem:false,
				swiperList:[],
				//showSkeleton:true,
				projectList:[],
				projectCopyList:[],
				noticeData:[],
				random:0,
				sene:'',
			}
		},
		components:{
			uniSearchBar,tag,mySwiper,easySelect
		},
		filters:{
			getrandom:function(value){
				let ma=Math.floor((Math.random()*10000)+1000)
				return ma+value;
			}
		},
		methods: {
			useOutClickSide() {
			            this.$refs.easySelect.hideOptions && this.$refs.easySelect.hideOptions()
			        },
			selectOne(options) {
				// console.log(options.name)
				this.projectNames = options.name
				
				let list=[].concat(this.projectCopyList)
				if(options.id==100){
					this.projectList=list
					return;
				}
				let listc=[]
				for(let i=0;i<list.length;i++){
					if(list[i].region==options.name){
						listc.push(list[i])
					}
				}
				this.projectList=listc
			},
			goToFind(){
				uni.navigateTo({
					url:"../../pagestwo/find/home"
				})
			},
			goTolistItem(item,value){
				// console.log(item)
				// console.log(value)
				
				getApp().globalData.projectItem=item
				
				
				
				let that = this;
				that.isShowProject=false
				that.isShowProjectItem=true
				// if(that.PageCur== 'basics'&&that.isShowProject==false){
				
					
				// 	that.$refs.basics.initpage()
				
				// 	that.wxUser=getApp().globalData.wxUser
					
				
				// 	}
			},
			goTohotAction(){
				console.log("热门活动")
			},
			goToProjectDetail(){
				 console.log("项目详情")
			},
			goToSearch(value){
				// console.log("123")
				uni.navigateTo({
					url:"../../pagestwo/indexSearch/search?projectNames="+this.projectNames+"&zhaikai="+value
				})
			},
			goToDynamic(){
				uni.navigateTo({
					url:"../../pagestwo/indexDynamic/index"
				})
			},
			
			
			cachwxUser:function(e){
			//	console.log("查看收取")
				this.wxUser=e
			},
			toMine:function(){
				this.modalName=null
				this.PageCur='mine'
			},
			BaseBudding(data){
				this.baseBuildingData=data
			},
			toShare:function(){
				
				this.getShareInfo()
			},
			hideModal:function(){
				this.modalName=null
			},
			getwxUser:function(value){
				let that=this;
				that.http(api.wxUserSave,"POST",value,false).then(res=>{
					// console.log(res)
					that.wxUser=res.data
					getApp().globalData.wxUser=res.data
					this.PageCur =this.PageCurs
					
				})
			},
			// getuserinfo:function(e){
			// 	// console.log(e)
			// 	if(e.detail.errMsg=="getUserInfo:ok"){ 
			// 		//TODO:跟新缓存
			// 	this.PageCurs = e.currentTarget.dataset.cur
			// 	this.getwxUser(e.detail)
				
			// 	}
			// },
			getUserProfile(e) {
					    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
					    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
					let that=this;
					    wx.getUserProfile({
					      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					      success: (res) => {
							that.PageCurs = e.currentTarget.dataset.cur
								that.getwxUser(res)
					      }
					    })
					  },
			
			NavChange: function(e) {
				
				// console.log(e.currentTarget.dataset.cur)
				this.PageCur = e.currentTarget.dataset.cur
				//}
			},
			getSystemInfo:function(){
				let that=this;
				uni.getSystemInfo({
					success: (res) => {
						// console.log("手机系统信息")
						// console.log(res)
						let ScreenWidth=res.screenHeight/res.screenWidth*750
						// console.log(ScreenWidth+'rpx')
					}
				})
			},
			getShareInfo:function(){
				// let that=this;
				// let id = getApp().globalData.projectItem.id
				// that.http(api.ShareInfo+"/"+id,'GET',{},false).then(res=>{
				// 	console.log("分享")
				// 	console.log(res)
				// })
			},
		
			initpage:function(){
				let that=this;
				
				init.initPage().then(res=>{  //登录之后再请求其他内容，不然会超时
					//that.loadData()
					console.log('………………………BasicsinitPage…………………………………………………')
					that.getplatforminfo()
					that.wxUser=getApp().globalData.wxUser
					// console.log("index.vue-initpage")
					// console.log(getApp().globalData.wxUser)
					
					that.getNotice()
				})
			},
			unique(arr){
			        var tmp = new Array();
			  
			        for(var m in arr){
			            tmp[arr[m]]=1;
			        }
			       //再把键和值的位置再次调换
			       var tmparr = new Array();
			  
			       for(var n in tmp){
			            tmparr.push(n);
			        }
			        return tmparr;
			} ,
			getplatforminfo:function(){  //查询平台信息 有多个显示平台页面isShowProject为true 只有一个显示楼盘页 为false
			    let that=this
					console.log("getplatforminfo-信息")
				that.http(api.platforminfo,"GET",{},false).then(res=>{
					console.log("getplatforminfo-信息")
					console.log(res)
					if(res.data.basicInfoList.length>1){
						let arrays = [].concat(res.data.basicInfoList)
						let newArrays=[];
						let len = arrays.length;
						for(let i =0;i<len;i++){
							 let index = Math.floor(Math.random()*arrays.length);
							 newArrays.push(arrays[index])
							 arrays.splice(index,1);
						}
						res.data.basicInfoList=[...newArrays,...arrays]
					}
					
					that.projectList=res.data.basicInfoList
					that.projectCopyList=res.data.basicInfoList
					getApp().globalData.platforminfo=res.data
					that.projectNames=res.data.platformName
					let regionList=[]
					for(let n=0;n<res.data.basicInfoList.length;n++){
						regionList.push(res.data.basicInfoList[n].region)
					}
					
					let lists =that.unique(regionList)
					let lisst=[]
					for(let b = 0; b<lists.length;b++){
						let obj ={id:b,name:lists[b]}
						lisst.push(obj)
					}
					lisst.push({id:100,name:res.data.platformName})
					this.selectList=lisst
					// console.log(regionList)
					// console.log(lists)
					
					
					let sene=that.sene
					console.log(sene)
					getApp().globalData.interaction=res.data.interaction
					let projectItem=getApp().globalData.projectItem
					console.log("查看projectItem")
					console.log(projectItem)
					if(that.projectList.length==1 || sene || projectItem!=null){
						for(let i= 0; i<that.projectList.length;i++){
							that.projectList[i].keywords=(that.projectList[i].keywords || '').split(' ')
						}
						if(sene){
							for(let i =0;i<that.projectList.length;i++){
								if(that.projectList[i].id==sene.affId){
									getApp().globalData.projectItem=that.projectList[i]
									console.log(getApp().globalData.projectItem)
									that.isShowProject=false
									that.isShowProjectItem=true
									return;
								}
							}
							
						}
						console.log()
						if(projectItem){
							
								for(let i =0;i<that.projectList.length;i++){
									if(that.projectList[i].id==projectItem.id){
										getApp().globalData.projectItem=that.projectList[i]
										that.isShowProject=false
										that.isShowProjectItem=true
										return;
									}
								}
							
						
							
						}
						if(that.projectList.length==1){
							 getApp().globalData.projectItem=that.projectList[0]
							 that.isShowProject=false
							 that.isShowProjectItem=true
							
						}
						
						
						

					}else{
						that.isShowProject=true
						that.isShowProjectItem=false
						for(let i= 0; i<that.projectList.length;i++){
							that.projectList[i].keywords=(that.projectList[i].keywords || '').split(' ')
						}
					}
					
					//that.tagData=(res.data..keywords || '').split(' ')
					
					
				})
				if(getApp().globalData.websene){
					getApp().globalData.websene=false
					uni.navigateTo({
						url:'../../pagestwo/chart/home',
					})
					
				}
			},
			getNotice:function(){
				let _self=this;
					
				_self.http(api.Notice,'GET',{ type: '1',  //swipelist 轮播图
				enable: '1',affiliation:'1'},false).then(res=>{
					// console.log("轮播图")
					// console.log(res)
				//	console.log("轮播图")
				//		console.log(res)
						// if(res.data.listAdvertisementItem){
						 	 _self.swiperList=res.data.listAdvertisementItem
						// 	 _self.logoImg=res.data.listAdvertisementItem[0].url
							
						// 	 try {
						// 	     uni.setStorageSync('logoImg', res.data.listAdvertisementItem[0].url);
						// 	 } catch (e) {
						// 	     // error
								 
						// 	 }
						// }
					
					
			})
				  _self.http(api.Notice,'GET',{ type: '2',  // notice 公告
				  enable: '1',affiliation:'1'},false).then(res=>{
				  				// console.log("公告")
				  		  //  console.log(res)
							// noticeData=res.data.listAdvertisementItem.content
							let notice=[];
							if(res.data&&res.data.listAdvertisementItem){
								res.data.listAdvertisementItem.forEach(item=>{
									notice.push(item.content) 
								})
								_self.noticeData=notice
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
	async onLoad(options) {
			let that=this;
			console.log("Onload___________________")
			console.log(options)
			if(options.wxgzh){
				getApp().globalData.senen={
					affId:'',
					senen:'meu',
					distribution:[],
					userId:null
				}
			}
			if(options.aff && options.sce){
				that.sene={
					affId:options.aff
				}
				
				getApp().globalData.senen={
					affId:options.aff,
					senen:options.sce,
					distribution:[],
					userId:null
				}
			}
			that.random=Math.floor((Math.random()*10000)+1000)
			if(options.scene){
				console.log("扫码进入")
				console.log(options.scene)
				
				let scene=decodeURIComponent(options.scene) 
				console.log(scene)
				
				let list=scene.split("_")
				console.log(list)
				let value=await that.Jiema(list[0],list[1],list[2])
				console.log("查看解码")
				if(list[0]=="pla"){
					getApp().globalData.senen={
						affId:'',
						senen:list[0],
						distribution:[],
						userId:null
					}
				}
				if(value.data){
					console.log(value)
					 switch(list[0]){
						case 'non' : //未知	
						break;
						case 'mc' : //营销中心
						that.sene={
							affId:value.data
						}
						getApp().globalData.senen={
							affId:value.data,
							senen:"mc",
							distribution:[],
							userId:null
						}
						getApp().globalData.projectItem={id:value.data}
						uni.navigateTo({
							url:"../../pagestwo/marketingCenter/home"
						})
						return;
						break;
						case 'web' : //网站
						
					//	console.log("查看value")
						value.data['senen']=list[0]
						that.sene=value.data 
						getApp().globalData.senen=value.data
						getApp().globalData.websene=true
						getApp().globalData.projectItem={id:value.data.affId}
						break;
						case 'age' :  //经纪人
							console.log("查看value")
							value.data['senen']=list[0]
							that.sene=value.data.affId==null?null:value.data
							console.log(value)
							if(value.data.affId){
								getApp().globalData.projectItem={id:value.data.affId}
							}
							getApp().globalData.senen=value.data
							getApp().globalData.invitee=value.data.userId
							
						break;
						case 'cle' :  //业务员
					    //  console.log("查看value")
					      value.data['senen']=list[0]
					 	  that.sene=value.data 
					      getApp().globalData.senen=value.data
						break;
						
						default :
						value.data['senen']=list[0]
						that.sene={
							affId:value.data
						}
						getApp().globalData.senen={
							affId:value.data,
							senen:list[0],
							distribution:[],
							userId:null
						}
					}
				}
					
					
					// uni.navigateTo({
					// 	url:'../../pagestwo/chart/home',
						
					// })
				
			
				
			//	getApp().globalData.invitee=scene
			}
			if(options.PageCur){
				this.PageCur=options.PageCur
			}
			if(options.invitee){
				getApp().globalData.invitee=options.invitee
			}
		
			this.initpage();
			
		},
		 onShareAppMessage: function() {
				// console.log(getApp().globalData)
				let BaseBudding = getApp().globalData.BaseBudding
				let invitee='';
				let wxUser=getApp().globalData.wxUser
				invitee = wxUser.id
				console.log(wxUser);
				let project= getApp().globalData.projectItem ;
				console.log(project);
				if(project){
					let scene='age_'+project.affiliationCode+'_'+wxUser.userCode;
					return {
					title:project.projectName,
					  path: '/pages/index/index?invitee='+invitee+'&scene='+scene
					}
				}else{
					let scene='age_'+'_'+wxUser.userCode;
					return {
						 
						 path: '/pages/index/index?invitee='+invitee+'&scene='+scene
					}
				}
					    
		  },
		onShow() {
			let that=this;
			
			
			// console.log("onShow")
			// console.log(that.PageCur)
			// if(that.PageCur== 'recommend' && that.wxUser.phone){
			// 	console.log(that.$refs)
			// 	that.$refs.recommend.userInfoGets()
			// }	
			// 	that.$refs.basics.initpage()
			
			// 	that.wxUser=getApp().globalData.wxUser
			// 	}
			},
		onPullDownRefresh:function(){
		//	console.log("刷新")
		if(this.PageCur== 'basics'&&this.isShowProject==false){
			uni.showToast({
				title:'加载中...',
				icon:'loading',
			})
				//init.initPage().then(res=>{
				this.wxUser=getApp().globalData.wxUser
				this.$refs.basics.loadData()
				uni.hideToast()
				uni.stopPullDownRefresh();
			//})
				
			
		}else{
			uni.showToast({
				title:'加载中...',
				icon:'loading',
			})
			
			uni.hideToast()
			uni.stopPullDownRefresh()
		}
		}
	}
</script>

<style>
	.mytopclass{
		border:solid 1rpx #E5E5E5;
		position: absolute;
		z-index: 99;
		
		
	}
	page{
		background-color: #EEEEEE;
	}
	.noicclass{
		padding:5rpx 10rpx;
		border-radius: 10rpx;
		
		background-color: #00CAE8;
	}
	.classInput{
		width:210rpx;
	}
	.bgclassImg{
		
		position: absolute;
		width: 100%;
		height: 500rpx;
		
		border-radius: 50rpx;
	
		background: url(https://img.0728jh.com/staticImg/bannerbg.png) repeat fixed center;
	}
	.bgclass{
		background-color: #CCCCFF;
	}
	.noic{
		background-color: #FFFFFF;
		display: flex;
		margin: 20rpx 20rpx;
		padding:20rpx ;
		border-radius: 10rpx;
	}
	.tabs{
		display: flex;
		background-color: #00BFFF;
		justify-content: space-around;
		border-radius: 10rpx;
		margin:10rpx 20rpx 10rpx 20rpx;
		padding:20rpx 0rpx;
	}
	/* .tab_item{
		
	} */
	.tab_image{
		width:95rpx;
		height: 95rpx;
		/* border: solid 1rpx #000000; */
		margin:auto;
		
	}
	/* .tab_text{
		
	} */
	
	.project_body{
		/* background-color: #FFFFFF; */
		border-radius: 10rpx;
		margin:20rpx;
		background-color: white;
		position: relative;
		box-shadow: 0rpx 0rpx 5rpx 4rpx pink;
		
	}
	
	.item_Iamge_border{
		padding:20rpx;
		/* background-color: #FFFFFF; */
		display: flex;
		/* border:solid 1rpx #000000; */
		/* //position: absolute; */
	}
	.item_Image{
		width:670rpx;
		height: 414rpx;
		border-radius: 15rpx;
		
	
	}
	.item-kuang{
		z-index: 10;
		position: absolute;
		background-color: #000000;
		opacity: 0.38;
	}
	
	/* .project_item{
		position: relative;
		border:solid 1rpx #000000;
		border-radius: 10rpx;
	} */
	
	.Item_body{
		position: absolute;
		z-index: 10;
		padding:20rpx;
		margin-top:-424rpx;
		/* background-color: #000000;
		opacity: 0.2; */
		margin-left: 20rpx;
	}
	/* .cu-bar.tabbar{
		 position: fixed;
		 bottom: 0;
		 left: 0;
		 width:100%;
	} */
	.title-name{
		font-size: 36rpx;
		z-index: 99;
		font-family:PingFang SC;
		font-weight:bold;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	.text-area {
		display: flex;
		justify-content: center;
	}
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
