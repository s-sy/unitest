<script>
	import Vue from 'vue';
	// import api from './pages/api/home.js'
	// let vm =new Vue;
	
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
					success: function(e) {
						// #ifndef MP
						Vue.prototype.StatusBar = e.statusBarHeight;
						if (e.platform == 'android') {
							Vue.prototype.CustomBar = e.statusBarHeight + 50;
						} else {
							Vue.prototype.CustomBar = e.statusBarHeight + 45;
						};
						// #endif
						// #ifdef MP-WEIXIN
						Vue.prototype.StatusBar = e.statusBarHeight;
						let custom = wx.getMenuButtonBoundingClientRect();
						Vue.prototype.Custom = custom;
						Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
						// #endif		
						// #ifdef MP-ALIPAY
						Vue.prototype.StatusBar = e.statusBarHeight;
						Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
						// #endif
					}
				})
				 if (wx.canIUse('getUpdateManager')) {
				   const updateManager = wx.getUpdateManager()
				   updateManager.onCheckForUpdate(function (res) {
				    if (res.hasUpdate) {
				     updateManager.onUpdateReady(function () {
				      wx.showModal({
				       title: '更新提示',
				       content: '新版本已经准备好，是否重启应用？',
				       success: function (res) {
				        if (res.confirm) {
				         updateManager.applyUpdate()
				        }
				       }
				      })
				     })
				     updateManager.onUpdateFailed(function () {
				      wx.showModal({
				       title: '已经有新版本了哟~',
				       content: '新版本已经上线啦~，请您删除当前小程序，重新进入哟~'
				      })
				     })
				    }
				   })
				  } else {
				   wx.showModal({
				    title: '提示',
				    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				   })
				  }
		
		},
		methods:{
			// initPage:function() {
			// 	    let that = this
					
			// 		console.log("initPage")
			// 	    return new Promise((resolve, reject) => {
			// 			 console.log(that.$scope.globalData.thirdSession)
			// 	      if (!that.$scope.globalData.thirdSession ) {//无thirdSession，进行登录
			// 	        that.doLogin().then(res => {
			// 				  console.log("success")
			// 	            resolve("success")
			// 	          })
			// 	      } else {//有thirdSession，说明已登录，返回初始化成功
			// 	        resolve("success")
			// 	      }
			// 	    })
			// 	  },
			// doLogin:function(){
			// 	  	 console.log("doLogin")
			// 	  	      wx.showLoading({
			// 	  	        title: '登录中',
			// 	  	      })
			// 	  	      let that = this
			// 	  	      return new Promise((resolve, reject) => {
			// 	  	        wx.login({
			// 	  	          success: function (res) {
			// 	  	            if (res.code) {
			// 	  					let code=res.code
			// 	  					console.log(vm)
			// 	  					console.log(api)
			// 	  	              vm.http(api.Longin,"POST",{jsCode:code},false).then(res => {
			// 	  					  console.log(res)
			// 	  	                  wx.hideLoading()
			// 	  	                let wxUser = res.data
			// 	  	                 that.$scope.globalData.thirdSession = wxUser.sessionKey
			// 	  	                 that.$scope.globalData.wxUser = wxUser
			// 	  	                  resolve("success")
				  	                 
				  	                
			// 	  	                })
			// 	  	            }
			// 	  	          }
			// 	  	        })
			// 	  	      })
			// 	  	    }
		},
		onShow: function() {
			
		
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {  
		thirdSession:null,
		wxUser: null,
		invitee:null,
		BaseBudding:null,
		isShowTx:null,
		invit:null,
		senen:null,
		popupaShow:null,
		projectItem:null,
		interaction:null,
		distribution:null,
		platforminfo:null,
		websene:false,
		invtUserId:null,
	    }
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	.title-text{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.pages{
		background-color: #FFFFFF;
	}
</style>
