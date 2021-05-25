import Vue from 'vue'
import App from './App'
// import store from './store/index.js'
// Vue.prototype.$store = store
import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import contactUs from './pages/contactUs/home.vue'
Vue.component('contactUs',contactUs)

import recommend from './pages/recommend/home.nvue'
Vue.component('recommend',recommend)

import shares from './pages/shares/home.vue'
Vue.component('shares',shares)

import mine from './pages/mine/home.vue'
Vue.component('mine',mine)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import {uniRate} from '@dcloudio/uni-ui/lib/uni-rate/uni-rate.vue'
Vue.component('uni-rate',uniRate)

import uniNoticeBar from '@dcloudio/uni-ui/lib/uni-notice-bar/uni-notice-bar.vue'
Vue.component('uniNoticeBar',uniNoticeBar)

import tag from 'components/tag/tag.vue'
Vue.component('tag',tag)

import title from 'components/title/title.vue'
Vue.component('title',title)

import kong from './components/kong/home.vue'
Vue.component('kong',kong)

import dropdown from './components/dt-dropdown/dt-dropdown.vue'
Vue.component('dropdown', dropdown)

import follow from './components/follow/home.vue'
Vue.component('follow',follow)

import dazzleBeat from './components/dazzleBeat/home.vue'
Vue.component('dazzleBeat',dazzleBeat)

import comment from'./components/comment/home.vue'
Vue.component('comment',comment)

import layout from './components/layout/home.vue'
Vue.component('layout',layout)

import counter from './components/counter/home.vue'
Vue.component('counter',counter)

import news from './components/news/home.vue'
Vue.component('news',news)

import reply from './components/reply/home.vue'
Vue.component('reply',reply)

import bludding from './components/bludding/home.vue'
Vue.component('bludding',bludding)

import netReply from './components/netReply/home.vue'
Vue.component('netReply',netReply)

import zan from './components/zan/home.vue'
Vue.component('zan',zan)

import give from './components/giveTheThumbs-Up/home.vue'
Vue.component('give',give)

import UniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue'
Vue.component('UniPopup',UniPopup)

import wxParse from './components/u-parse/u-parse.vue'
Vue.component('wxParse',wxParse)

import questions from 'components/questions/home.vue'
Vue.component('questions',questions)

import layoutPL from 'components/layoutPL/home.vue'
Vue.component('layoutPL',layoutPL)
 
import replyDouble from 'components/replyDouble/home.vue'
Vue.component('replyDouble',replyDouble)
 
import uniSwipeAction from '@dcloudio/uni-ui/lib/uni-swipe-action/uni-swipe-action.vue'
Vue.component('uniSwipeAction',uniSwipeAction)

import uniSwipeActionItem from '@dcloudio/uni-ui/lib/uni-swipe-action-item/uni-swipe-action-item.vue'
Vue.component('uniSwipeActionItem',uniSwipeActionItem)
 
import auth from 'pages/auth/home.vue'
Vue.component('auth',auth)



import popupads from 'components/popupads/home.vue'
Vue.component('popupads',popupads)


Vue.prototype.http= function (url, method, data, showLoading) {
	
    return new Promise((resolve,reject)=>{
    		 if (showLoading){
    		      wx.showLoading({
    		        title: '加载中',
    		      })
    		    }
				
    			uni.request({
    			    url: url, //仅为示例，并非真实接口地址。
    				method:method,
    			    data: data,
					timeout:120000,
    			    header: {
    			      'app-id': wx.getAccountInfoSync().miniProgram.appId,
    			      'third-session': getApp().globalData.thirdSession
    			    },
    			    success: (res) => {
    			     if (res.statusCode == 200) {
    			              if (res.data.code != 0) {
    			                // wx.showToast({
    			                //   title: res.data.msg+'',
    			                //   icon: 'none',
    			                //   duration: 5000
    			                // })
    			                reject(res.data.msg)
    			              }
    			              resolve(res.data)
    			            } else if (res.statusCode == 404) {
    			              wx.showToast({
    			                title: '接口请求出错，请检查手机网络',
    			                icon: 'none',
    			                duration: 5000
    			              })
    			              reject()
    			            } else {
    			              // wx.showToast({
    			              //   title: res.data.msg + '',
    			              //   icon: 'none',
    			              //   duration: 5000
    			              // })
    			              reject()
    			            }
    			          },
    					   fail(error) {
    					          wx.showToast({
    					            title: '接口请求出错',
    					            icon: 'none',
    					            duration: 2000
    					          })
    					          reject(error)
    					        },
    						complete(res) {
    							        // 加载完成
    							        if (showLoading) {
    							          wx.hideLoading()
    							        }
    							      }
    			})
    	}).catch((e)=>{})
    }
import api from 'pages/api/home.js'
 //  Vue.prototype.intPage= function () {
 //    let that = this
	// console.log('intPage')
 //    return new Promise((resolve, reject) => {
	// 	console.log(getApp().globalData)
 //      if (!getApp().globalData.thirdSession) {//无thirdSession，进行登录
 //      that.doLogin().then(res => {
	//               resolve("success")
	//             })
      
 //      }else {//有thirdSession，说明已登录，返回初始化成功
 //        resolve("success")
 //      }
 //    })
 //  };
// doLogin:function() {
// 	 wx.showLoading({
// 	      title: '登录中',
// 	    })
// 	    let that = this
// 	    return new Promise((resolve, reject) => {
// 	      wx.login({
// 	        success: function (res) {
// 	          if (res.code) {
// 				  let code=res.code;
// 	           that.http(api.Longin,"POST",{jsCode:code},false)
// 	              .then(res => {
// 	                wx.hideLoading()
// 	                let wxUser = res.data
// 	               getApp().globalData.thirdSession = wxUser.sessionKey
// 	                getApp().globalData.wxUser = wxUser
// 	                resolve("success")
	               
	              
// 	              })
// 	          }
// 	        }
// 	      })
// 	    })
// }
Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
