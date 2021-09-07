<template name="basics">
	<view class="vip">
		<!-- <mSkeleton selector="skeleton" loading :show="showSkeleton"></mSkeleton> -->
		<!-- <view class="skeleton"> -->

		<!-- 	<view class="name-top">
			{{baseBuildingData.projectName}}
		</view> -->
		<swiper class="screen-swiper swiper-sc square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500" v-if="swiperList">
			<swiper-item v-for="(item,index) in swiperList" :key="index" @tap="navigateToVR(item)">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='1'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>



		<view class="notice" v-if="noticeData">
			<uniNoticeBar showGetMore="true" speed="60" showIcon="true" color="#33333" scrollable="true" single="true" :text="noticeData"></uniNoticeBar>
		</view>

		<view class="basics-b ">
			<skeleton :loading="loading" :row="1" :showAvatar="false" :showTitle="false">
				<view class="basics-b-flex">
					<view class="basics-name">
						{{baseBuildingData.projectName}}
					</view>
					<view class="rate-style">
						<uni-rate size="18" value="5"></uni-rate>
					</view>
					<!-- <view class="basics-img skeleton-rect" @click="toTrend"> -->
					<view class="basics-img ">
						<image class="img-fang" src="https://img.0728jh.com/staticImg/fangjia_icon.png"></image>
					</view>

				</view>
			</skeleton>
			<skeleton :loading="viewsloading" :row="1" :showAvatar="false" :showTitle="false">

				<view class="text-a">
					<view class="text-items">
						<view class="text-item-one">
							浏览量：{{totalViews.viewsCount}}
						</view>
						<view class="text-item-one margin-left-sm">
							评论：{{totalViews.topicReplyCount}}
						</view>

						<!-- 	<view class="" >
				 			咨询量：{{totalViews.smsRecordsCount}}
				 		</view> -->
					</view>
				</view>
			</skeleton>

			<skeleton :loading="loading" :row="1" :showAvatar="false" :showTitle="false">
				<view class="">
					<!-- v-if="tagData" -->
					<tag :tagData="tagData" :state="baseBuildingData.salesStatus"></tag>
				</view>
			</skeleton>
		</view>
		<skeleton :loading="loading" :row="3" :showAvatar="false" :showTitle="false">
			<!-- v-if="baseBuildingData" -->
			<view class="center">
				<view class="center-style">
					<view class="center-item-one">
						<view class="center-top">
							{{baseBuildingData.price}} <label class="cent-top-y">元/平起</label>
						</view>
						<view class="center-buttom">
							参考均价
						</view>
					</view>
					<view class="center-xian">

					</view>
					<view class="center-item-one ">
						<view class="center-top ">
							{{baseBuildingData.openingDate}}
						</view>
						<view class="center-buttom ">
							开盘时间
						</view>
					</view>
					<view class="center-xian">

					</view>
					<view class="center-shr ">
						<view class="center-top ">
							{{baseBuildingData.floorage }}㎡
						</view>
						<view class="center-buttom ">
							户型面积
						</view>
					</view>
				</view>
			</view>

			<!-- v-if="baseBuildingData" -->
			<view class="">
				<view class="foot-style">
					<image class="address" src="https://img.0728jh.com/staticImg/adress_icon.png"></image>
					<view class="address-text ">

						<!-- <uniNoticeBar background-color="#FFFFFF" speed="40" color=""  scrollable="true" single="true" :text="baseBuildingData.address"></uniNoticeBar> -->


						{{baseBuildingData.address}}
					</view>

					<view class="address-xq" @click="toEstateDetails">
						更多详情
					</view>

				</view>

			</view>
		</skeleton>
		<view class="">
			<view class="advice">
				<button v-if="!wxUser.phone" class="btn-ad" :class="kaipanIStrue?'btn-ad-eee':''" open-type="getPhoneNumber"
				 @getphonenumber="getPhoneNumber"><label>
						<image class="advice-img" :src="kaipanIStrue?'https://img.0728jh.com/staticImg/jiangjia_hei.png':'https://img.0728jh.com/staticImg/jiangjia_icon.png'"></image>降价通知
					</label></button>
				<button v-else class="btn-ad" :class="kaipanIStrue?'btn-ad-eee':''" @click="showTime" data-type="5"><label>
						<image class="advice-img" :src="kaipanIStrue?'https://img.0728jh.com/staticImg/jiangjia_hei.png':'https://img.0728jh.com/staticImg/jiangjia_icon.png'"></image>降价通知
					</label></button>
				<button v-if="!wxUser.phone" class="btn-ad" :class="jiangjiaIStrue?'btn-ad-eee':''" open-type="getPhoneNumber"
				 @getphonenumber="getPhoneNumber"><label>
						<image class="advice-img" :src="jiangjiaIStrue?'https://img.0728jh.com/staticImg/xiaoxi_hei.png':'https://img.0728jh.com/staticImg/kaipan_icon.png'"></image>开盘提醒
					</label></button>
				<button v-else class="btn-ad" :class="jiangjiaIStrue?'btn-ad-eee':''" @click="showTime" data-type="4"><label>
						<image class="advice-img" :src="jiangjiaIStrue?'https://img.0728jh.com/staticImg/xiaoxi_hei.png':'https://img.0728jh.com/staticImg/kaipan_icon.png'"></image>开盘提醒
					</label></button>
			</view>
		</view>
		<!-- v-if="IsBudingPhone && !wxUser.invitee " -->
		<view class="bg-white">
			<view class="">


				<image class="banner" src="https://img.0728jh.com/staticImg/b3d7a72cdde497d9ab42fc88956da66.png" mode=""></image>
			</view>
			<skeleton :loading="loading" :row="1" :showAvatar="false" :showTitle="false">
				<view class="banner-phone">
					{{baseBuildingData.premisesMobile}}
				</view>
			</skeleton>
			<view class="banner-phone-ringht" @click="callPhone">

			</view>
		</view>
		<view class="">
			<view class="">
				<title :title="aparment" :userInfo="wxUser"  @updteUserInfo="userInfoGet"></title>
			</view>
			<scroll-view scroll-x="true" scroll-with-animation>
				<view class="recommend">
					<block v-for="(item,index) in recommendList" :key="index">
						<view class="recommend-list" @click="toLayoutDetails" :data-id="item.id">
							<image class="recommend-img" mode="aspectFill" :src="item.src?item.src:'https://img.0728jh.com/staticImg/banner_pic.png'"></image>
							<view class="recommedVr" v-if="item.srcTd">
							    <image src="https://img.kehuoa.com/staticImg/vrlook.png" mode="aspectFit"></image>
							</view>
                            <view class="">
								<view class="recommend-text-one">
									{{item.type}} <label :class="item.salesStatus=='0'?'layout-center-on-tag-zreo':item.salesStatus=='1'?'layout-center-on-tag-one':item.salesStatus=='2'?'layout-center-on-tag-two':''">{{item.salesStatus=='0'?'在售':item.salesStatus=='1'?'即开':item.salesStatus=='2'?'售馨':''}}</label>
								</view>
								<view class="recommend-text-two">
									{{item.name}} {{item.floorage}}㎡
								</view>
								<view class="recommend-text-shr">
									{{item | pricefiflter}}
								</view>
							</view>

						</view>
						<view class="">

						</view>

					</block>
				</view>

			</scroll-view>
		</view>
		<view>
			<title :title="initialCounter" :userInfo="wxUser"  @updteUserInfo="userInfoGet"></title>
		</view>
		<view class="pclist">
			<block v-for="item in pconsultantList">
				<view class="pconsultantList">
					<counter :userInfo="item" :isShow="'index'"></counter>

				</view>
			</block>
		</view>



		<view class="">
			<title :title="news" :userInfo="wxUser"  @updteUserInfo="userInfoGet"></title>
		</view>
		<view class="new-total">
			<block v-for="(item,index) in newsList" key="index">
				<view class="new-items" @click="tonewsDetails" :data-id="item.id" :data-item="item">
					<news :newData="item" v-if="item.delFlag=='0'"></news>
				</view>
			</block>
			<!-- <view class="">
				
			</view> -->
			<!-- <swiper class="screen-swipers  square-dot" :indicator-dots="true" :circular="true" indicator-color="#BFBFBF"
			 indicator-active-color="#16CCF6" :autoplay="true" interval="5000" duration="400">
				<swiper-item v-for="(item,index) in newsList" key="index">

					<view class="new-items" @click="tonewsDetails" :data-id="item.id" :data-item="item">
						<news :newData="item" v-if="item.delFlag=='0'"></news>
					</view>

				</swiper-item>
			</swiper> -->
		</view>
		<view class="" v-if="isShowTX=='0'">
			<title :title="loyal" :userInfo="wxUser"  @updteUserInfo="userInfoGet"></title>
		</view>
		<view class="dianp" v-if="isShowTX=='0'">
			<swiper class="screen-swiperss square-dot" :indicator-dots="true" indicator-color="#BFBFBF" indicator-active-color="#16CCF6"
			 :circular="true" :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in commentList" key="index">
					<!-- <navigator :url="'/pages/pReviewsDetails/home?item='+ encodeURIComponent(JSON.stringify(item))"> -->
					<view class="" @click="toPReviewsDetails" :data-id="item.id">
						<comment :wxUser="wxUser" :swiperItem="item" :page="'index'" :logoImg="logoImg" @getRefreshData="getRefreshData"></comment>
					</view>

					<!-- </navigator> -->
				</swiper-item>
			</swiper>
			<!--  -->
			<button class="btn" @click="getUserProfile" v-if="!wxUser.nickName && isShowTX=='0' && wxUser.userType=='1'">我要点评</button>
			<button class="btn" @click="topReviewsPublish" v-if="wxUser.nickName && isShowTX=='0'&& wxUser.userType =='1'">我要点评</button>
		</view>

		<view class="" v-if="isShowTX=='0'">
			<title :title="questions" :userInfo="wxUser"  @updteUserInfo="userInfoGet"></title>
		</view>
		<block v-for="item in questionsList">
			<view class="basics-questions" @click="toquestionsDetails" :data-id="item.id" v-show="isShowTX=='0'">
				<!-- <navigator :url="'/pages/questionsDetails/home?item='+ encodeURIComponent(JSON.stringify(item))"> -->
				<!-- 			<navigator :url="'pages/questionsDetails/home'"> -->
				<questions :questionsData="item"></questions>
				<!-- </navigator> -->
			</view>

		</block>

		<view class="" v-if="isShowTX=='0'">
			<title :title="xup" :userInfo="wxUser" @updteUserInfo="userInfoGet"></title>
		</view>
		<block>
			<view class="xup-itmes" v-if="isShowTX=='0'">
				<block v-for="item in awesomeshootingList">
					<view class="item-xup" @click="toFlareUpsDetail" :data-id="item.id">
						<dazzleBeat :dazzleBeatData="item"></dazzleBeat>
					</view>
				</block>

			</view>
		</block>
		<button class="btn-f" @click="toflareUpsPush" v-if="wxUser.nickName && isShowTX=='0' && wxUser.userType=='1'">我要发布</button>
		<button class="btn-f" @click="getUserProfiles" v-if="!wxUser.nickName && isShowTX=='0' && wxUser.userType=='1'">我要发布</button>
		<view class="">
			<title :title="aroundp" :userInfo="wxUser"  @updteUserInfo="userInfoGet"></title>

		</view>
		<view class="aroundzb">

			<view class="aroundzb-name">

				<view class="aroundzb-item" :class="chanNames=='银行' ?'aroundzb-item-change':''" @click="changName" data-name="银行">
					银行
				</view>
				<view class="aroundzb-item" :class="chanNames=='医院' ?'aroundzb-item-change':''" @click="changName" data-name="医院">
					医院
				</view>
				<view class="aroundzb-item" :class="chanNames=='购物' ?'aroundzb-item-change':''" @click="changName" data-name="购物">
					购物
				</view>
				<view class="aroundzb-item" :class="chanNames=='学校' ?'aroundzb-item-change':''" @click="changName" data-name="学校">
					学校
				</view>
				<view class="aroundzb-item" :class="chanNames=='娱乐' ?'aroundzb-item-change':''" @click="changName" data-name="娱乐">
					娱乐
				</view>

			</view>


			<map id="my-basics-map" class="mymap" show-location :scale="scale" :longitude="longitude" :latitude="latitude"
			 :include-points="markers" :markers="markers"></map>
		</view>
		<view class="kongbai">

		</view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content"></view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您还未授权，请先授权
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<!-- @tap="toMine" -->
						<button class="cu-btn bg-green margin-left" @click="getUserProfiles">授权</button>

					</view>
				</view>
			</view>
		</view>

		<!-- <view class="cu-modal" :class="modalNames=='Modal'?'show':''" >
			<view class="cu-dialog">
				<view class="modal-m">
					<image class="modal-img" src="https://img.0728jh.com/staticImg/dxtx.png"></image>
					<view class="modal-text">
						<view class="modal-dy">
							<view class="modal-text-quxiao">
								取消订阅
							</view>
							<view class="modal-text-quxiaotis">
								取消后将不再接收提醒
							</view>
							
							   系统已经记录我们会用短信通知您的
							
							
						</view>
						
						<view class="modald-y-btn" @click="dingyue">
							<view class="btn-one">
								确定
							</view>
							<view class="btn-two">
								取消
							</view>
							好的，知道了
						</view>
					</view>
					
				</view>
				
			</view>
		</view> -->

		<view style="width: 100%;height: 100%;">
			<drag-button :isDock="true" :existTabBar="true" :textStr="'客服'" :unReard="unreadMessage" :edgeleft="15" :edgetop="80" @btnClick="btnClick"
			 @btnTouchstart="btnTouchstart" @btnTouchend="btnTouchend" />

		</view>
		<popupads :popupadsData="popupadsData" :popupaShow="popupaShow"></popupads>
	</view>
</template>

<script>
	import dragButton from "@/components/drag-button/drag-button.vue";

	import Skeleton from '../../components/skeleton/index.vue'
	import api from '../api/home.js'
	import init from '../../utils/initPage.js'
	var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
	let qqmapsdk;
	export default {
		components: {
			Skeleton,
			dragButton,
			
		},
		name: "basics",
		data: function() {
			return {
unreadMessage:0,
				// showSkeleton: true,
				popupadsData: '',
				popupaShow: '',
				viewsloading: true,
				loading: true,
				IsBudingPhone: '',
				totalViews: '',
				isShowTX: '',
				noticeData: '',
				wxUser: getApp().globalData.wxUser,
				showModalKey: '',
				jiangjiaIStrue: false,
				kaipanIStrue: false,
				questionsList: '',
				latitude: 30.66339,
				longitude: 113.16614,
				scale: 14,
				markers: [],
				obj: {
					id: 0,
					width: 33,
					height: 39,
					latitude: 30.66339,
					longitude: 113.16614,
					zIndex: 9,
					iconPath: 'https://img.0728jh.com/staticImg/adress_icon.png',
					callout: {
						content: '湖北省\n地址：天门市新文化宫',
						color: '#999999',
						fontSize: 12,
						display: 'ALWAYS',
						borderRadius: 5,
						bgColor: '#FFFFFF',
						padding: 8,
					},
				},
				chanNames: '银行',

				modalNames: '',
				modalName: '',

				awesomeshootingList: '',
				newsList: [{
					id: 0
				}, {
					id: 1
				}, {
					id: 2
				}],

				pconsultantList: [],
				questions: {
					name: '楼盘问答',
					type: 'questions'
				},
				aparment: {
					name: '推荐户型',
					type: 'aparment'
				},
				aroundp: {
					name: '周边配套',
					type: 'aroundp'
				},
				xup: {
					name: '楼盘炫拍',
					type: 'xup'
				},
				news: {
					name: '新闻动态',
					type: 'news'
				},
				loyal: {
					name: '楼盘点评',
					type: 'loyal'
				},
				initialCounter: {
					name: '置业顾问',
					type: 'initialCounter'
				},
				recommendList: [],
				swiperList: [],
				commentList: [],
				tagData: [],
				baseBuildingData: {},
				logoImg: '',
				interaction: '',
			}

		},
		filters: {

			pricefiflter: function(value) {
				let baseprice = getApp().globalData.BaseBudding

				if (baseprice && value) {
					let BaseBuddingprice = parseFloat(baseprice.price)
					let floorage = parseFloat(value.floorage)

					// console.log("查看总价")
					// console.log(BaseBuddingprice)
					// console.log(value)
					let price = parseFloat(value.price)
					let total = ((floorage * price) / 10000).toFixed(2)
					if (!total || total == "NaN") {
						total = ((floorage * BaseBuddingprice) / 10000).toFixed(2)
					}
					if (!total || total == "NaN") {
						return '总价待定'
					}
					return '约' + total + '万/套'
				}


			}
		},
		computed: {

			classphone: function() {
				//console.log("--------------------------")
				let BaseBudding = getApp().globalData.BaseBudding
				let wxUser = getApp().globalData.wxUser
				let sminvitee = getApp().globalData.invitee
				let list = this.pconsultantList
				//console.log(BaseBudding)
				//console.log(wxUser)
				if ((wxUser && wxUser.userType) && wxUser.userType == '1') {
					//console.log(wxUser)
					return wxUser.phone;
				} else
				if (wxUser && wxUser.invitee) {
					if (list) {
						//console.log(list)
						list.forEach(item => {
							if (item.id == wxUser.invitee) {

								return item.phone;
							}
						})
					}
				} else
				if (sminvitee) {
					if (list) {
						list.forEach(item => {
							if (item.id == sminvitee) {
								return item.phone;
							}
						})
					}
				} else {
					if (BaseBudding && BaseBudding.premisesMobile) {
						return BaseBudding.premisesMobile;
					}
				}
				//console.log("--------------------------")
			},
            
		},
		methods: {
			btnClick() {
				uni.navigateTo({
					url: '../../pagestwo/chart/home'
				})
			},
            navigateToVR(value){
            	console.log("123")
            	console.log(value)
                if(value.page){
                    uni.navigateTo({
                    	url: '../../pagestwo/vR/home?srcTd='+value.page
                    })
                }
            	//TODO:
            	//判断类型为什么的跳转否则不跳
            // uni.navigateTo({
            // 	url: '../../pagestwo/vR/home'
            // })	 
            },
			btnTouchstart() {},
			btnTouchend() {},
			reloadData() {


				this.loading = false

			},
			toMine: function(e) {
				uni.redirectTo({
					url: '/pages/index/index?PageCur=mine'
				})
			},
			posterData(e) {
				//console.log('置业顾问二维码发送')
				//	console.log(e)
			},
			callPhone() {
				// let phoneNum=this.baseBuildingData.premisesMobile
				let wxinvitee = getApp().globalData.wxUser.invitee
				let wxUser = getApp().globalData.wxUser
				let tempinvitee = getApp().globalData.invitee
				let list = this.pconsultantList
				let BaseBudding = getApp().globalData.BaseBudding
				let phoneNum = ''
				if (wxinvitee || tempinvitee || wxUser.userType == '1') {

					phoneNum = list[0].phone
				} else {
					phoneNum = BaseBudding.premisesMobile
				}



				uni.makePhoneCall({
					phoneNumber: phoneNum //仅为示例
				});
			},
			tonewsDetails: function(e) {
				let id = e.currentTarget.dataset.id
				//console.log(id)
				//TODO:
				let item = e.currentTarget.dataset.item
				//console.log(item)

				this.viewsAdd(id)
				switch (item.type) {
					case '0':
						uni.navigateTo({
							url: '../newsInformationDetails/home?id=' + id
						})
						break;
					case '1':
						uni.navigateTo({
							url: '../newsWebview/home?id=' + id
						})
						break;
				}

			},
			toLayoutDetails: function(e) {
				let id = e.currentTarget.dataset.id



				uni.navigateTo({
					url: '../../pagestwo/layoutDetails/home?id=' + id
				})
			},
			toFlareUpsDetail: function(e) {
				let id = e.currentTarget.dataset.id
				//console.log(id)
				uni.navigateTo({
					url: '../flareUps-details/home?id=' + id
				})
			},

			toPReviewsDetails: function(e) {
				let id = e.currentTarget.dataset.id

				uni.navigateTo({
					url: '../pReviewsDetails/home?id=' + id
				})
			},
			toquestionsDetails: function(e) {
				let id = e.currentTarget.dataset.id
				let num = this.questionsList.length
				uni.navigateTo({
					url: '../questionsDetails/home?id=' + id + '&num=' + num
				})
			},
			viewsAdd: function(value) {
				let that = this;
				that.http(api.AddViewNewsIFtion, 'POST', {
					id: value
				}, false).then(res => {
					//	console.log("最新动态加view")
					//	console.log(res)
				})
			},
			hideModal: function(e) {
				this.modalName = null

			},
			toTrend: function() {
				uni.navigateTo({
					url: '../trend/home'
				})
			},
			changName: function(e) { //周边配套 点击keyword切换关键字收搜
				//	console.log(e)
				let _self = this;
				_self.chanNames = e.currentTarget.dataset.name;
				//console.log(_self.chanNames)
				qqmapsdk.search({
					keyword: _self.chanNames,
					location: {
						latitude: _self.latitude,
						longitude: _self.longitude
					},
					success: (res) => {
						_self.markers = []
						//	console.log(res)
						for (let item of res.data) {
							let markersArray = {
								id: item.id,
								title: item.title,
								width: 33,
								height: 39,
								address: item.address,
								latitude: item.location.lat,
								longitude: item.location.lng,
								_distance: item._distance,
								iconPath: 'https://img.0728jh.com/staticImg/myadress_icon.png',
								callout: {
									content: item.title,
									color: '#999999',
									fontSize: 12,
									display: 'BYCLICK',
									borderRadius: 5,
									bgColor: '#FFFFFF',
									padding: 8,
								},
							}
							_self.markers.push(markersArray)

						}
						_self.markers.push(_self.obj)
					}
				})
			},
			toEstateDetails: function() {
				uni.navigateTo({
					url: '../../pagestwo/estateDetails/home'
				})
			},
			getwxUser: function(value) {
				let that = this;
				that.http(api.wxUserSave, "POST", value, false).then(res => {
					//	console.log(res)
					that.wxUser = res.data
					getApp().globalData.wxUser = res.data
				})
			},

			toflareUpsPush: function() {

				uni.navigateTo({
					url: '../flareUps-push/home'
				})
			},
			getUserProfiles(e) {
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				let that = this;
				wx.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						that.getwxUser(res)
						that.toflareUpsPush()
					}
				})
			},

			getUserProfile(e) {
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				let that = this;
				wx.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						that.getwxUser(res)
						that.topReviewsPublish()
					}
				})
			},
			topReviewsPublish: function() {

				uni.navigateTo({
					url: '../pReviewsPublish/home'
				})
			},
			getreadingReviews: function() { //楼盘点评
				let that = this;
				//console.log("看下wxUser")
				//console.log(getApp().globalData.wxUser)
				console.log(
					"+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
				)
				let id = getApp().globalData.projectItem.id
				console.log(id)
				that.http(api.ReadingReviews, 'GET', {
					current: 1,
					size: 5,
					descs: 'create_time', //降序
					auditStatus: 1,

					createId: getApp().globalData.wxUser.id,

					affiliationId: id
				}, false).then(res => {
					console.log("楼盘点评")
					console.log(res)
					if (res.ok) {
						that.commentList = res.data.records
					}

				})
			},
			userInfoGet() {
				let that = this
				this.http(api.userInfoGet, 'GET', {}, false)
					.then(res => {
						// console.log("userInfoGet")
						// console.log(res)
						// userInfo: res.data
						that.wxUser = res.data
						getApp().globalData.wxUser = res.data
						that.getUserinfozhiye();
						that.$emit('cachwxUser', res.data)
						//刷新置业顾问
					})
			},

			getTaills() {
				let that = this;
				let id = getApp().globalData.projectItem.id
				return new Promise((l, r) => {
					that.http(api.getall, 'GET', {
						affId: id
					}, false).then(res => {
						l(res)
					})
				});
			},
			async getUserinfozhiye() { //置业顾问
				let that = this;
				let id = getApp().globalData.projectItem.id
				let res = await that.getTaills();
				let pconsul = res.data
				// console.log(id)
				// console.log("ddddddddddddddddddd")
				// console.log(pconsul)
				let wxUser = getApp().globalData.wxUser.distribution
				let list = [];

				for (let i = 0; i < pconsul.length; i++) {

					for (let j = 0; j < wxUser.length; j++) {

						if (pconsul[i].id == wxUser[j]) {
							getApp().globalData.distribution = pconsul[i]
							list.push(pconsul[i])

						}
					}
				}
				if (list.length == 0) {
					that.pconsultantList = pconsul;
				} else {
					that.pconsultantList = list;
				}


this.unReadMessage()

			},

			getapartmentlayout: function() { //户型
				let _self = this;
				let id = getApp().globalData.projectItem.id
				_self.http(api.ApartmentLayout, 'GET', {
					current: 1,
					size: 20,
					descs: 'is_stick',
					affiliation: '2',
					affiliationId: id
				}, false).then(res => {
					// console.log("户型")
					// console.log(res)
					_self.recommendList = res.data.records
				})
			},
			getNotice: function() {
				let _self = this;
				let id = getApp().globalData.projectItem.id
				//	console.log("affiliatiaonId:"+id)
				_self.http(api.Notice, 'GET', {
					type: '1', //swipelist 轮播图
					enable: '1',
					affiliation: '2',
					affiliationId: id
				}, false).then(res => {
					//	console.log("轮播图")
					//		console.log(res)
					if (res.data.listAdvertisementItem) {
						_self.swiperList = res.data.listAdvertisementItem
						_self.logoImg = res.data.listAdvertisementItem[0].url

						try {
							uni.setStorageSync('logoImg', res.data.listAdvertisementItem[0].url);
						} catch (e) {
							// error

						}
					}


				})
				_self.http(api.Notice, 'GET', {
					type: '2', // notice 公告
					enable: '1',
					affiliation: '2',
					affiliationId: id
				}, false).then(res => {
					//		console.log("公告")
					//    console.log(res)
					// noticeData=res.data.listAdvertisementItem.content
					let notice = '';
					if (res.data && res.data.listAdvertisementItem) {
						res.data.listAdvertisementItem.forEach(item => {
							notice = notice + item.content
						})
						_self.noticeData = notice
					}

				})
			},
			getBaseBuing: function() { //楼盘基本信息
				let _self = this;
				//	_self.http(api.BaseBudiing,'GET',{affiliationId:getApp().globalData.projectItem.id},false).then(res=>{
				//	console.log("楼盘基本信息")
				//	console.log(res)
				//	if(res.data){
				let resdata = getApp().globalData.projectItem

				_self.baseBuildingData = resdata
				_self.$emit('BaseBudding', resdata)
				getApp().globalData.BaseBudding = resdata
				//console.log(resdata)
				_self.tagData = resdata.keywords


				_self.latitude = resdata.latitude
				_self.longitude = resdata.longitude
				_self.obj.latitude = resdata.latitude
				_self.obj.longitude = resdata.longitude

				_self.obj.callout.content = resdata.projectName
				_self.markers.push(_self.obj)

				//let phone=resdata.premisesMobile

				_self.interaction = getApp().globalData.interaction == "0" ? true : false

				//let sum=parseInt(phone.length)

				// let isShowTX = phone.substring(sum-2,sum)

				//if(isShowTX=='-1'){

				_self.isShowTX = getApp().globalData.interaction
				// console.log("查看显示状态")
				// console.log(getApp().globalData.interaction)
				// 					try {
				// 					    uni.setStorageSync('isShowTX', false);
				// 					} catch (e) {
				// 					    // error
				// 					}	
				// 					}else{
				// 						try {
				// 						    uni.setStorageSync('isShowTX', true);
				// 						} catch (e) {
				// 						    // error
				// 						}
				// 					}
				this.reloadData()
				//	}

				//})
			},
			getNewsinformation: function() { //新闻动态
				let _self = this;
				let id = getApp().globalData.projectItem.id
				_self.http(api.NewsInformation, 'GET', {
					current: 1,
					size: 3,
					descs: 'create_time', //降序

					affiliationId: id
					//asc 升序
				}, false).then(res => {
					// console.log("新闻动态")
					// console.log(res)
					if (res.ok) {
						_self.newsList = res.data.records
					}

				})
			},
			getAwesomeshooting: function() { //楼盘炫拍
				let that = this;
				let id = getApp().globalData.projectItem.id
				that.http(api.Awesomeshootingredding, 'GET', {
					current: 1,
					size: 3,
					descs: 'create_time', //降序
					auditStatus: 1,
					createId: getApp().globalData.wxUser.id,

					affiliationId: id
				}, false).then(res => {
					//	console.log("楼盘炫拍")
					//	console.log(res)
					that.awesomeshootingList = res.data.records
				})
			},
			getQuestionsPage: function() {

				let that = this;
				let id = getApp().globalData.projectItem.id
				that.http(api.QuestionsPage, 'GET', {
					current: 1,
					size: 3,
					descs: 'create_time', //降序
					auditStatus: 1,
					createId: getApp().globalData.wxUser.id,
					affiliationId: id
				}, false).then(res => {
					//	console.log("楼盘问答")
					//	console.log(res)
					that.questionsList = res.data.records
				})
			},
			getRefreshData: function(value) {

			},
			getApartmentConcern: function() {
				this.http(api.getApartmentConcern, 'GET', {
					attentionType: '1',
					userId: getApp().globalData.wxUser.id
				}, false).then(res => {
					//	console.log("关注列表")
					//	console.log(res)
					this.kaipanIStrue = false
					this.jiangjiaIStrue = false
					for (let item of res.data) {
						//console.log(item)

						if (item.attentionType == '5') {
							this.kaipanIStrue = true
						}
						if (item.attentionType == '4') {
							this.jiangjiaIStrue = true
						}
					}

				})
			},
			guanzhu: function(str) {

				this.http(api.ApartmentConcern, 'POST', {
					affiliationId: getApp().globalData.projectItem.id,
					attentionType: str.toString(),

				}, false).then(res => {

				})
			},
			getSubscribeList: function() { //拉取能订阅的列表
				let that = this;
				that.http(api.Subscribe, 'POST', {
					enable: '1',
					useTypeList: ['4', '5']
				}, false).then(res => {
					//	console.log(res)
					let tmplIds = []
					res.data.forEach(item => {
						tmplIds.push(item.priTmplId)
					})
					let value = that.showModalKey
					let tmplIdsOne = (tmplIds[0] || '').split(' ')
					//tmplIdsOne = tmplIdsOne.push()
					let tmplIdsTwo = (tmplIds[1] || '').split(' ')
					let tmplist = value == 5 ? tmplIdsOne : (value == 4 ? tmplIdsTwo : tmplIds)

					wx.requestSubscribeMessage({
						tmplIds: tmplist,
						success(res) {
							if (res[tmplist[0]] === 'accept') {

								if (value == 5) {
									that.kaipanIStrue = !that.kaipanIStrue
								} else
								if (value == 4) {
									that.jiangjiaIStrue = !that.jiangjiaIStrue
								} else {}

								that.guanzhu(value)
								uni.showToast({
									title: '订阅成功',
									icon: 'none',
									duration: 2000
								});
								that.userInfoGet()

							}
						},
						fail(res) {
							//		console.log("订阅失败")
							console.log(res)
						},
						complete(res) {
							//			console.log("订阅结果complete")
							console.log(res)

						}
					})


				})

			},


			getPhoneNumber: function(e) { //第一步，获取手机授权
				let that = this;

				if (e.detail.errMsg == "getPhoneNumber:ok") { //用户点击了一个
					let encryptedData = e.detail.encryptedData;

					let iv = e.detail.iv;
					// };
					init.initPage().then(res => { //保证sessionkey最新有效
						let session_key = getApp().globalData.sessionKey;
						that.sendphoneNumber(encryptedData, session_key, iv)
					})
				} else {
					return;
				}
			},
			savephone(encryptedData, session_key, iv) {
				let that = this;
				let data = {
					encryptedData: '',
					session_key: '',
					iv: ''
				};
				data.encryptedData = encryptedData;
				data.session_key = session_key;
				data.iv = iv
				return new Promise((l, r) => {
					console.log("解析手机号码")


					//console.log(encryptedData+'\n'+session_key+'\n'+iv)
					uni.request({
						url: api.GetPhone, //仅为示例，并非真实接口地址。
						method: 'POST',
						data: data,
						timeout: 120000,
						header: {
							'app-id': wx.getAccountInfoSync().miniProgram.appId,
							'third-session': getApp().globalData.thirdSession
						},
						success: (res) => {
							if (res.errMsg == "request:ok") {
								l(true);
							} else {
								l(false);
							}
						}
					});
				});
			},
			getInfo() {
				let that = this;
				return new Promise((l, r) => {
					that.http(api.userInfoGet, 'GET', {}, false).then(reslut => {
						if (reslut.data) {
							getApp().globalData.wxUser = reslut.data
							that.wxUser = reslut.data
							console.log("授权后，再次获取uerInfo")
							console.log(reslut.data);
							l(reslut.data);
						} else {
							l(false);
						}


					});
				});
			},
			async sendphoneNumber(encryptedData, session_key, iv) { //解析手机号码
				let that = this;
				let isAuthPhone = await that.savephone(encryptedData, session_key, iv);
				if (isAuthPhone) {
					let user = await that.getInfo();

					if (user) {
						let invitte = user.invitee;
						if (invitte) {
							let ischeck = await that.checkPhone();
							console.log(ischeck)
							if (ischeck == "true") {
								that.brokerprocess();
							}

						} else {
							let ischeck = await that.checkphonept();
							if (ischeck == "true") {
								that.getProcessDefinition();
							}
						}

					}
				}
			},
			checkphonept() {
				let that = this;
				let projectItem = getApp().globalData.projectItem
				let data = {
					phone: that.wxUser.phone,
					senderId: that.wxUser.id,
					affId: projectItem.id,
					salesmanId: getApp().globalData.distribution ? getApp().globalData.distribution.id : null,
					groupId: getApp().globalData.distribution ? getApp().globalData.distribution.memberGroup : null,
					tenantId: that.wxUser.tenantId,
				};
				return new Promise((l, r) => {

					// that.http(api.Verification,"GET",data,false).then(res=>{


					// 	console.log("验证电话pt")
					// 	console.log(res);
					// 	if(res.ok){
					// 		l("true");
					// 	} else{
					// 		l("false");
					// 	}

					// })
					uni.request({
						method: "GET",
						url: api.Verificationplt,
						data: data,
						header: {
							'app-id': wx.getAccountInfoSync().miniProgram.appId,
							'third-session': getApp().globalData.thirdSession
						},
						success: function(reslt) {
							// that.checkPhone=false;
							console.log("验证电话pt")
							console.log("_________________________________")
							console.log(reslt);
							console.log("_________________________________")
							if (reslt.data.ok) {
								l("true");
							} else {
								l("false");
							}

						}

					})

				});
			},
			checkPhone() {
				let that = this;
				let projectItem = getApp().globalData.projectItem
				let data = {
					phone: that.wxUser.phone,
					senderId: that.wxUser.id,
					affId: projectItem.id,
					salesmanId: getApp().globalData.distribution ? getApp().globalData.distribution.id : null,
					groupId: getApp().globalData.distribution ? getApp().globalData.distribution.memberGroup : null,
					tenantId: that.wxUser.tenantId,
				};
				return new Promise((l, r) => {

					// that.http(api.Verification,"GET",data,false).then(res=>{
					// 	console.log("验证电话")
					// 	console.log(res);
					// })
					uni.request({
						method: "GET",
						url: api.Verification,
						data: data,
						success: function(reslt) {
							// that.checkPhone=false;
							console.log("验证电话")
							console.log(reslt.data.ok);
							if (reslt.data.ok) {
								l("true");
							} else {
								l("false");
							}

						}

					})

				});
			},
			brokerprocess: function() {
				let that = this;
				//获取定义流程列表，
				let budding = getApp().globalData.BaseBudding;

				// console.log("查看缓存");
				// console.log(getApp().globalData)
				uni.request({
					url: api.GetProcessDefinition,
					method: 'GET',
					data: {
						tenantIdIn: budding.id
					},
					success: function(vlaue) {
						// console.log('流程');
						// console.log(vlaue);

						if (vlaue.statusCode == 200) {
							let res = vlaue.data;
							let id;
							for (let i = 0; i < res.length; i++) {
								if (res[i].key == 'broker') {
									id = res[i].id;
								}
							}
							if (id) {
								that.PostProcess(id);
							} else {
								uni.showToast({
									title: "请检查key为broker的流程是否存在",
									icon: "none",
									duration: 3000,
								})
							}

						} else {
							uni.showToast({
								title: '未找到有效流程，或流程未配置',
								icon: 'none',
								duration: 3000
							});
						}
					}
				});

			},
			getProcessDefinition() { //获取自有流程id
				let that = this;
				let budding = getApp().globalData.BaseBudding;
				uni.request({
					url: api.GetProcessDefinition,
					method: 'GET',
					data: {
						tenantIdIn: budding.id //楼盘id
					},
					success: function(vlaue) {
						console.log('平台');
						// console.log(vlaue);
						if (vlaue.statusCode == 200) {
							let res = vlaue.data;
							let id;
							for (let i = 0; i < res.length; i++) {
								if (res[i].key == 'passenger') {
									id = res[i].id;
								}
							}
							if (id) {
								that.PostProcessAcquistion(id);
							} else {
								uni.showToast({
									title: "请检查key为passenger的流程是否存在",
									icon: "none",
									duration: 3000,
								})
							}
						} else {
							uni.showToast({
								title: '未找到有效流程，或流程未配置',
								icon: 'none',
								duration: 3000
							});
						}
					}
				})
			},
			PostProcessAcquistion(id) {
				let that = this;
				let ids = id;
				let project = getApp().globalData.projectItem
				let initator = getApp().globalData.wxUser.id
				let datamap = {
					variables: {
						initiator: {
							value: initator
						},
						phone: {
							value: that.wxUser.phone
						},
						customerName: {
							value: that.wxUser.realName ? that.wxUser.realName : that.wxUser.nickName
						},
						affiliationId: {
							value: project.id
						},
						currentTaskDeposit: {
							value: false
						},
						gender: {
							value: that.wxUser.sex,
							type: 'String',
							valueInfo: {}
						},
						tenantId: {
							value: that.wxUser.tenantId
						},
						characters: {
							value: null
						},
						unspecified: {
							value: getApp().globalData.distribution ? false : true
						}, //未指定    有置业 false ，否则true
						salesmanId: {
							value: getApp().globalData.distribution ? getApp().globalData.distribution.id : null
						},
						origin: {
							value: '1'
						},
					}

				};
				uni.request({
					url: api.GetProcessDefinition + "/" + ids + "/submit-form",
					method: 'POST',
					data: datamap,
					success: function(response) {
						// console.log('提交平台流程');
						// console.log(response);
						if (response.statusCode == 200) {

						}
					}
				})

			},
			PostProcess(id) {
				let that = this;
				let ids = id;
				//console.log(that.wxUser)
				let porject = getApp().globalData.projectItem
				//console.log("----------------------------------------------------")
				//description
				//问题：1.性别  2.重复推荐， 3推荐后跳转
				console.log(ids)
				console.log("-----------分享客户信息------------")
				console.log(that.wxUser)
				console.log("-----------------------")
				uni.request({
					url: api.GetProcessDefinition + "/" + ids + "/submit-form",
					method: 'POST',
					data: {
						variables: {
							phone: {
								value: that.wxUser.phone,
								type: 'String',
								valueInfo: {}
							},
							customerName: {
								value: that.wxUser.realName ? that.wxUser.realName : that.wxUser.nickName,
								type: 'String',
								valueInfo: {}
							},
							gender: {
								value: that.wxUser.sex || "",
								type: 'String',
								valueInfo: {}
							},
							introduction: {
								value: "",
								type: 'String',
								valueInfo: {}
							},
							affiliationId: {
								value: porject.id,
								type: 'String',
								valueInfo: {}
							},
							brokerId: {
								value: that.wxUser.invitee,
								type: 'String',
								valueInfo: {}
							},
							salesmanId: {
								value: getApp().globalData.distribution.id || null,
								type: 'String',
								valueInfo: {
									name: "XXXXX"
								}
							},
							brokerName: {
								value: that.wxUser.inviteeUser ? (that.wxUser.inviteeUser.realName ? that.wxUser.inviteeUser.realName : that.wxUser.inviteeUser.nickName) : "匿名用户",
								type: 'String',
								valueInfo: getApp().globalData.wxUser
							},
							brokerPhone: {
								value: that.wxUser.inviteeUser ? that.wxUser.inviteeUser.phone : "没有电话",
								type: 'String',
								valueInfo: {}
							},
							inviteeId: {
								value: that.wxUser.invitee,
								type: 'String',
								valueInfo: {}
							},
							tenantId: {
								value: that.wxUser.tenantId,
								type: 'String',
								valueInfo: {}
							},
							// totalDuration:{value:'PT3H'}
							origin: {
								value: '1'
							},
						},
						businessKey: that.phone
					},
					success: function(response) {
						console.log('提交流程');
						console.log(response);
						if (response.statusCode == 200) {

						}
					}
				});
			},
			showTime: function(e) {
				let that = this;
				that.showModalKey = e.currentTarget.dataset.type
				let showKey = that.showModalKey
				that.wxUser = getApp().globalData.wxUser
				if (showKey == 4) {
					if (that.jiangjiaIStrue) {
						that.guanzhu(4)
						uni.showToast({
							title: '成功退订',
							icon: 'none',
							duration: 2000
						});
						that.jiangjiaIStrue = !that.jiangjiaIStrue
					} else {
						that.getSubscribeList()
					}
				}
				if (showKey == 5) {
					if (that.kaipanIStrue) {
						that.guanzhu(5)
						uni.showToast({
							title: '成功退订',
							icon: 'none',
							duration: 2000
						});
						that.kaipanIStrue = !that.kaipanIStrue
					} else {
						that.getSubscribeList()
					}
				}


			},


			Gettotalviews: function() {
				let that = this;
				let id = getApp().globalData.projectItem.id
				that.http(api.Totalviews + "/" + id, 'GET', {}, false).then(res => {
					// console.log("浏览量三个")
					// console.log(res)
					that.totalViews = res.data
					that.viewsloading = false
					try {
						uni.setStorageSync('userCount', res.data);
					} catch (e) {
						// error
					}
				})
			},
			Sendaddviews: function() {
				let that = this;
				that.http(api.Addviews, 'POST', {
					id: getApp().globalData.projectItem.id
				}, false).then(res => {
					// console.log("进首页加浏览量")
					// console.log(res)
				})
			},
			getPopupads: function() {
				let that = this;
				that.http(api.Popupads, 'GET', {}, false).then(res => {
					// console.log("弹框")
					// console.log(res)
					if (res) {
						that.popupadsData = res.data
					}

				})
			},
			// xianshi:function(){
			// 	  this.showSkeleton = false;
			// },
			unReadMessage(){
				let that=this;
				let project = getApp().globalData.projectItem;
				let wxUser = getApp().globalData.wxUser;
				let salesman= getApp().globalData.distribution;
				console.log(project);
				console.log(wxUser)
				console.log(salesman)
				that.http(api.getUnReadMessage,'POST',{
					"affiliationId":project.id,
					"tenantId":project.tenantId,
					"userId":wxUser.id,
					"salesmanId":salesman?salesman.id : "",
					"messageblob":"",
					"type":"",
				},false).then((res)=>{
					console.log("_______________未读消息条数___________________________")
					console.log(res)
					if(res.ok){
					that.unreadMessage=res.data.unreadcount;
					}
					
				});
			},
			loadData: function() {
				//console.log('……………………loadData……………………………………………………………………………')
				this.userInfoGet()
				this.getBaseBuing()
				this.getNotice()
				this.getNewsinformation()
				this.getapartmentlayout()
				this.getAwesomeshooting()
				this.getQuestionsPage()
				this.getApartmentConcern()
				this.Sendaddviews()
				this.Gettotalviews()
				this.getreadingReviews()
				this.getPopupads()
				

			},
			initpage: function() {
				let that = this;
				//	console.log('………………………BasicsinitPage…………………………………………………')
				init.initPage().then(res => { //登录之后再请求其他内容，不然会超时
					that.loadData()
					that.wxUser = getApp().globalData.wxUser
					console.log(getApp().globalData.wxUser)
				})
			}
		},
		beforeCreate() {
			this.loading = true
			this.viewsloading = true
		},
		mounted() {
			let that = this;
			console.log("shouye ----------- mounted ")
			console.log(getApp().globalData)
			that.popupaShow = getApp().globalData.popupaShow == null ? true : getApp().globalData.popupaShow
			console.log("popupaShow")
			console.log(that.popupaShow)
			if (getApp().globalData.thirdSession) {
				this.loading = true
				this.viewsloading = true
				that.loadData()

			}

			qqmapsdk = new QQMapWX({ //初始化腾讯地图sdk
				key: '2OABZ-3FGRJ-27CFB-FFEEQ-EKUMZ-22BXH'
			});
			that.scale = 14
			//this.$nextTick(function () {

		}

		// _self.http(api.Notice,'GET',{ type: '2',
		// enable: '1'},false).then(res=>{
		// 	console.log("")
		// 		  console.log(res)
		// })
	}
</script>

<style>
    .recommedVr{
        position: absolute;
        z-index: 9;
        top:20rpx;
        margin-left: 22rpx;
        
    }
    .recommedVr image{
        width:60rpx;
        height: 80rpx;
    }
	.layout-center-on-tag-two {
		background: rgba(225, 242, 251, 1);
		color: rgba(90, 161, 251, 1);
		padding: 4rpx 10rpx;
		font-size: 20rpx;
		margin-left: 10rpx;
		border-radius: 8rpx;
	}

	.layout-center-on-tag-one {
		color: rgba(252, 168, 47, 1);
		background: rgba(252, 241, 217, 1);
		padding: 4rpx 10rpx;
		font-size: 20rpx;
		margin-left: 10rpx;
		border-radius: 8rpx;
	}

	.layout-center-on-tag-zreo {
		background: rgba(255, 230, 230, 1);
		color: rgba(255, 89, 89, 1);
		padding: 4rpx 10rpx;
		font-size: 20rpx;
		margin-left: 10rpx;
		border-radius: 8rpx;
	}

	.banner-phone {
		margin-top: -160rpx;
		margin-left: 170rpx;
		position: absolute;
		z-index: 99;
		color: #FFFFFF;
		line-height: 48rpx;
		font-size: 48rpx;
		font-family: PingFang SC;
		font-weight: bold;
		letter-spacing: 5rpx;
		font-style: italic;
	}

	.banner-phone-ringht {
		position: absolute;
		z-index: 99;
		width: 100rpx;
		height: 100rpx;
		margin-top: -170rpx;
		margin-left: 590rpx;

		/* border:solid 1rpx #333333; */
		border-radius: 50%;

	}

	.new-total {
		margin-top: 10rpx;
	}

	.basics-questions {
		box-shadow: 0rpx 0rpx 22rpx 5rpx rgba(198, 198, 198, 0.2);
		border-radius: 20rpx;
		margin: 0rpx 30rpx;
		max-width: 690rpx;
		padding-bottom: 30rpx;
		margin-bottom: 20rpx;
	}

	.modald-y-btn {
		width: 482rpx;
		height: 90rpx;
		background: rgba(0, 202, 232, 1);
		border-radius: 10rpx;
		margin-top: 60rpx;
		margin-left: 49rpx;
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		line-height: 90rpx;
	}

	.modal-dy {
		width: 373rpx;
		height: 92rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 62rpx;
		margin-left: 96rpx;

	}

	.item-xup {
		margin-bottom: 30rpx;
	}

	.btn-two {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		width: 280rpx;
		text-align: center;
		border: solid 1rpx #EEEEEE;
	}

	.btn-one {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 400;
		width: 280rpx;
		color: rgba(45, 140, 240, 1);
		text-align: center;
		border: solid 1rpx #EEEEEE;
	}

	.modal-text-quxiaotis {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: rgba(178, 177, 182, 1);
		margin-top: 20rpx;
	}

	.modal-text-quxiao {
		font-size: 48rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: rgba(59, 66, 76, 1);

	}

	.modal-text-btn {
		display: flex;
		align-items: center;


		text-align: center;
		margin-top: 70rpx;
		line-height: 89rpx;
		justify-content: space-around;
	}

	.modal-img {
		width: 560rpx;
		height: 676rpx;
		border-radius: 10rpx;
	}

	.modal-text-center {
		width: 560rpx;
	}

	.modal-text {
		position: absolute;
		z-index: 99;
		margin-top: -280rpx;
	}

	.notice {
		position: absolute;
		z-index: 99;
		margin-top: -80rpx;
		width: 690rpx;
		padding: 0rpx 30rpx;
		margin-left: 30rpx;
		border-radius: 40rpx;
		opacity: 0.68;

		background-color: #FFFFFF;

	}

	.kongbai {
		width: 100%;
		height: 100rpx;
	}

	.aroundzb {
		padding: 30rpx;
	}

	.aroundzb-item {
		padding: 8rpx 19rpx;
		font-size: 28rpx;
		margin-right: 20rpx;
		border: 1px solid rgba(229, 229, 229, 1);
		border-radius: 10px;

	}

	.aroundzb-item-change {
		background: rgba(22, 204, 246, 1);
		color: #FFFFFF;
	}

	.aroundzb-name {
		display: flex;
		justify-content: space-around;
		margin-bottom: 20rpx;
	}

	.mymap {
		height: 380rpx;
		width: 690rpx;

	}

	.btn-f {
		margin-top: 40rpx;
		height: 85rpx;
		width: 693rpx;
		font-size: 32rpx;
		color: #16CCF6;
		background-color: #EEF9FB;
		align-items: center;

	}

	.xup-itmes {
		padding: 0rpx 30rpx;
	}

	.btn {
		height: 85rpx;
		width: 625rpx;
		margin: 45rpx 31rpx;
		font-size: 32rpx;
		color: #16CCF6;
	}

	.text-flat {
		float: left;
	}

	.screen-swipers {
		min-height: 350upx;

	}

	.screen-swiperss {
		min-height: 350upx;
	}

	.new-right {
		margin-left: 30rpx;
	}

	.new-items {
		padding: 10rpx 30rpx;
	}

	.myhopne-img {
		width: 85rpx;
		height: 86rpx;
		border-radius: 50%;
	}

	.pconsultantList {
		padding: 20rpx 30rpx;
	}

	.chant-img {
		width: 82rpx;
		height: 82rpx;
		margin-left: 140rpx;
	}

	.iphone-img {
		width: 82rpx;
		height: 82rpx;
		margin-left: 20rpx;
	}

	.recommend-img {
		width: 280rpx;
		height: 243rpx;
		margin: 12rpx 23rpx 31rpx 27rpx;
	}

	.recommend-list {
		width: 330rpx;
		box-shadow: 0rpx 10rpx 23rpx 4rpx rgba(198, 198, 198, 0.15);
		background-color: #FFFFFF;
		padding-bottom: 39rpx;
		margin-right: 30rpx;
	}

	.recommend {
		display: flex;
		background-color: #FFFFFF;
		/* justify-content: space-around; */
		padding: 30rpx 30rpx;
		width: 100%;

	}

	.recommend-text-one {
		font-size: 30rpx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		margin-left: 37rpx;
		align-items: center;
	}

	.recommend-text-two {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		margin: 10rpx 0rpx 10rpx 37rpx;

	}

	.recommend-text-shr {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 800;
		color: rgba(250, 94, 50, 1);
		margin-left: 37rpx;

	}

	.recommend-text-rex {
		font-size: 20rpx;
		font-weight: 500;
		background: rgba(249, 74, 71, 1);
		border-radius: 5rpx;
		padding: 5rpx 7rpx;
		color: #FFFFFF;
		margin-left: 10rpx;
		margin: 30rpx 0rpx;
	}

	.banner {
		height: 216rpx;
		width: 100%;
	}

	.advice {
		display: flex;
		background-color: #FFFFFF;
		padding: 20rpx 0rpx;
	}

	.btn-ad {
		width: 321rpx;
		height: 88rpx;
		background: rgba(238, 249, 251, 1);
		border-radius: 14rpx;
		font-size: 32rpx;
		color: #16CCF6;
		border-color: #16CCF6;
	}

	.btn-ad-eee {
		color: #999999;
		background: #EEEEEE;
	}

	.address-text {
		font-size: 28rpx;
		font-weight: bold;
		width: 460rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		/* border:solid 1rpx #333333; */
		/* margin-left: -30rpx; */
		margin-right: 10rpx;
	}

	.address-xq {
		border: 1rpx solid rgba(250, 94, 50, 1);
		border-radius: 23rpx;
		padding: 8rpx 20rpx;
		font-size: 27rpx;
		color: rgba(250, 94, 50, 1);

	}

	.dianp {
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 0rpx 22rpx 5rpx rgba(198, 198, 198, 0.2);
		margin: 10rpx 30rpx;
		padding-bottom: 20rpx;
	}

	.advice-img {
		width: 30rpx;
		height: 29rpx;
		margin-right: 15rpx;
	}

	.address {
		width: 32rpx;
		height: 35rpx;
		margin-right: 20rpx;
	}

	.foot-style {
		display: flex;
		align-items: center;
		padding: 10rpx 30rpx 10rpx 29rpx;
		background-color: #FFFFFF;
	}

	.center-top {
		font-size: 32rpx;
		color: #FA5E32;
	}

	.cent-top-y {
		font-size: 22rpx;
	}

	.center-bottom {
		font-size: 24rpx;
		color: #999999;
	}

	.center-item-one {
		/* padding:0rpx 40rpx 0rpx 0rpx; */
		/* border-right: solid 1rpx #DCDCDC; */
		/* text-align: center;
		width: 250rpx; */
	}

	.center-shr {
		/* text-align: center;
		width: 250rpx; */
	}

	.center-style {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.center {
		margin-top: 190rpx;
		padding: 30rpx;
		background-color: #FFFFFF;
		/* 	border:solid 1rpx #DCDCDC; */
		z-index: 99;
	}

	.center-xian {
		height: 70rpx;
		border: solid 1rpx #DCDCDC;
	}

	.text-a {
		width: 500rpx;
		height: 50rpx;
		font-size: 23rpx;
		color: #999999;
		padding: 10rpx 30rpx;
		/* border: solid 1rpx #333333; */
	}

	.img-fang {
		height: 34rpx;
		width: 120rpx;
	}

	.rate-style {
		margin-left: 15rpx;
		margin-top: 10rpx;
	}

	.text-items {
		display: flex;
		justify-content: start;
	}

	.text-item-one {
		padding-right: 15rpx;

	}

	.basics-img {
		position: absolute;
		margin-left: 75%;
	}

	.basics-name {
		font-size: 39rpx;
	}

	.basics-b-flex {
		display: flex;
		padding: 0rpx 30rpx;
		align-items: center;
		margin-bottom: 20rpx;
		/* border:solid 1rpx #333333; */
	}

	.name-top {
		position: absolute;
		margin-top: 67rpx;
		margin-left: 29rpx;
		font-size: 36rpx;
		z-index: 99;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}

	.swiper-sc {
		height: 488rpx;
	}

	.basics-b {
		position: absolute;
		padding: 44rpx 15rpx 0rpx 15rpx;
		border-radius: 30rpx;
		margin-top: -20rpx;
		z-index: 55;
		width: 100%;
		background-color: #FFFFFF;
		/* 	border:solid 1rpx #333333; */
	}

	.vip {
		background-color: #FFFFFF;
	}
</style>
