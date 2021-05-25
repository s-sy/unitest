import api from '../pages/api/home.js';
import Vue from 'vue'
let vm = new Vue()

function initPage(mum) {
	    let that = this
		
		
		console.log('@@@@@@@@@')
		console.log('~~~~~~~~~~initPage(1)~~~~~~~~~~~~~^^^^^^^^')
		
		//console.log("initPage")
	    return new Promise((resolve, reject) => {
			console.log(getApp().globalData.thirdSession)
	      if (!getApp().globalData.thirdSession ) {//无thirdSession，进行登录
	        doLogin().then(res => {
				 console.log("success")
	            resolve("success")
	          })
	      } else {//有thirdSession，说明已登录，返回初始化成功
	        resolve("success")
	      }
	    })
	  };
 function doLogin(){
	console.log("doLogin")
	      wx.showLoading({
	        title: '登录中',
	      })
		  
	      let that = this
	      return new Promise((resolve, reject) => {
	        wx.login({
	          success: function (res) {
	            if (res.code) {
					let code=res.code
					console.log("查看code")
					console.log(code)
					console.log(getApp().globalData)
					let seneedistribution=getApp().globalData.senen
				  let scene=getApp().globalData.senen?getApp().globalData.senen.senen :null;
				  let distObjectId=getApp().globalData.distribution?getApp().globalData.distribution.id:null;
				  let list=[];
				  if(distObjectId){
					  list.push(distObjectId)
				  }
				  let distribution=seneedistribution?seneedistribution.distribution:list
				console.log("initPage參數");
				 console.log(getApp().globalData.senen)
				// console.log("jscode:"+code);
				// console.log("場景："+scene);
				 console.log("綁定业务员：");
				 console.log(distribution)
				 console.log("invitee:"+getApp().globalData.invitee);
				 uni.request({
				 	url:api.Longin,
					method:'POST',
					header: {
					  'app-id': wx.getAccountInfoSync().miniProgram.appId,
					  'third-session': getApp().globalData.thirdSession
					},
					data:{
						jsCode:code,
					  scene:scene,//场景
					  distribution:distribution,//置业
					  invitee:getApp().globalData.invitee,},
					  success(val) {
						  wx.hideLoading()
						  console.log(val)
						  
						  if(val.statusCode==200){
							let success=val.data;
							 if(success.ok){
							 	console.log("成功")
							 	console.log(success.data)
							    let wxUser = success.data
								getApp().globalData.thirdSession = wxUser.thirdSessionKey
								getApp().globalData.sessionKey= wxUser.sessionKey
							 	resolve("success")
							 }else{
							 	console.log(val.data.msg)
							 	uni.showModal({
							 	    title:"提示",
							 		content:val.data.msg,
							 		success: (res) => {
							 			if(res.confirm) { } else { } 
							 		}
							 	})
							 	reject("fail")
							 } 
						  }
						  
						
						
						
						
					  },
					
					  
				 })
				 
	    //           vm.http(api.Longin,'POST',{
					//   jsCode:code,
					//   scene:scene,//场景
					//   distribution:distribution,//置业
					//   invitee:getApp().globalData.invitee,
					//   },false).then(resss => {
					//   if(resss.ok != false) {
					// 	  console.log(resss.mgg);
					// 	  resolve("fail")
					//   } else {
					// 	if(resss.data){
					// 		wx.hideLoading()
					// 		let wxUser = resss.data
					// 								getApp().globalData.thirdSession = wxUser.thirdSessionKey 
					// 								getApp().globalData.sessionKey= wxUser.sessionKey
					// 								//getApp().globalData.wxUser = wxUser   
					// 								// console.log(wxUser.thirdSessionKey)
					// 								console.log('=====initPage(2)=======')
					// 								// console.log(wxUser.sessionKey)
					// 		resolve("success")
					// 	}
					// 	}
					
	    //             }).catch((e)=>{
					// 	console.log(e);
					// })
	            }
	          }
	        })
	      }).then(function () {
			  return new Promise((resolve,reject)=>{
				  vm.http(api.userInfoGet,'GET',{},false).then(res => {
					    console.log("登录后的用户信息")
				    	console.log(res)
				        getApp().globalData.wxUser=res.data
						let projectItem = getApp().globalData.projectItem;
						if(projectItem){
							vm.http(api.getall,'GET',{affId:projectItem.id},false).then(reslut=>{
								console.log(reslut)
								let pconsul=reslut.data
								let dis=getApp().globalData.wxUser.distribution
								for(let i=0;i<pconsul.length;i++){
										 for(let j=0 ;j<dis.length;j++){
											 if(pconsul[i].id == dis[j]){
												 getApp().globalData.distribution = pconsul[i] 
												 console.log("++++++++++++++++++++++++++++++")
												 console.log(getApp().globalData.distribution)
											 }
										 }
									}
							})
						}
						resolve("success")
				     })
			  })
		  })
	    }
export default {
	initPage
}