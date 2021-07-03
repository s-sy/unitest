<template>
	<view class="auth-vips">
		<view class="text-xxx">
			<!-- <view class="">
				天门新客邦
			</view> -->
			<image class="auth-img" src="https://img.0728jh.com/1332139872148000768/material/b6be615b-f5ae-4765-9fd4-0a404ae1eaa3.png" mode="aspectFit"></image>
			<button class="auth-button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">{{showText}}</button>
		</view>
	</view>
</template>

<script>
	import api from '../api/home.js'
	import init from '../../utils/initPage.js'
	export default {
		data: function() {
			return {

			}
		},
		props:{
			showText:{
				type:String,
				default:"获取手机授权",
			},
			sendPassed:{
				type:Boolean,
				default:true,
			}
		},
		created() {
			this.getUserinfozhiye();
		},
		methods: {
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
			getTaills(){
				let that=this;
					
				let id =getApp().globalData.projectItem.id
				console.log("Check Id")
				console.log(id);
				return new Promise((l,r)=>{
					that.http(api.getall,'GET',{affId:id},false).then(res=>{
						console.log("++++++++++++++++++check getTaills+++++++")
						console.log(res)
						l(res)
					})
				});
			},
			async getUserinfozhiye() { //置业顾问
				let that = this;
				console.log("_____________auth get distribution__________________")
				console.log(getApp().globalData.projectItem)
				let id = getApp().globalData.projectItem.id
				let res = await that.getTaills();
					console.log("++++++++++++++++++++++++++++++++++++++++++++++")
console.log(res)
console.log("++++++++++++++++++++++++++++++++++++++++++++++")
				let pconsul = res.data
				for (let p = 0; p < pconsul.length; p++) {
					if (pconsul[p].userStatus != "0") {
						pconsul.splice(p, 1)
						p--;
					}
				}
				console.log("ddddddddddddddddddd")
				console.log(pconsul)
				let distribution = getApp().globalData.wxUser.distribution || []
				//console.log(distribution)
				if (distribution == null) {
					distribution = []
				}
				let list = [];
				console.log(distribution)
				for (let i = 0; i < pconsul.length; i++) {

					for (let j = 0; j < distribution.length; j++) {

						if (pconsul[i].id == distribution[j]) {
							getApp().globalData.distribution = pconsul[i]

						}
					}
				}

				console.log("c+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
				console.log(getApp().globalData.distribution)

			},
			brokerprocess: function() {
				let that = this;
				let phone = '';
				// if (that.remm == 'her') {
				// 	phone = that.phone;
				// } else {
				phone = that.wxUser.phone;
				// }
				// if (!that.name) {
				// 	that.showModal();
				// 	return;
				// }
				// if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
				// 	that.showModal();
				// 	return;
				// }



				//获取定义流程列表，
				//let budding = getApp().globalData.BaseBudding;
				let project = getApp().globalData.projectItem;
				console.log("project");
				console.log(getApp().globalData)
				uni.request({
					url: api.GetProcessDefinition,
					method: 'GET',
					data: {
						tenantIdIn: project.id
					},
					success: function(vlaue) {
							console.log('流程');
							console.log(vlaue);

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
				let budding = getApp().globalData.projectItem;
				console.log("查看流程定义的id")
				console.log(budding);
				uni.request({
					url: api.GetProcessDefinition,
					method: 'GET',
					data: {
						tenantIdIn: budding.id //楼盘id
					},
					success: function(vlaue) {
							console.log('平台流程');
							console.log(vlaue);
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
				let name = that.wxUser.realName ? that.wxUser.realName : that.wxUser.nickName?that.wxUser.nickName:""
				let datamap = {
					variables: {
						initiator: {
							value:initator
						},
						phone: {
							value: that.wxUser.phone
						},
						customerName: {
							value: name 
						},
						affiliationId: {
							value: project.id
						},
						currentTaskDeposit:{
							value: false,
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
				console.log(datamap);
				uni.request({
					url: api.GetProcessDefinition + "/" + ids + "/submit-form",
					method: 'POST',
					data: datamap,
					success: function(response) {
						//	console.log('平台流程');
						//	console.log(response);
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
				//console.log(ids)
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
								value: that.wxUser.sex,
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
								value: that.wxUser.inviteeUser ? (that.wxUser.inviteeUser.realName ? that.wxUser.inviteeUser.realName : that.wxUser
									.nickName) : "匿名用户",
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
							}
						},
						businessKey: that.phone
					},
					success: function(response) {
						//console.log('提交流程');
						//	console.log(response);
						if (response.statusCode == 200) {

						}
					}
				});
			},
			savephone(encryptedData, session_key, iv){
				let that=this;
				let data = {
					encryptedData: '',
					session_key: '',
					iv: ''
				};
				data.encryptedData = encryptedData;
				data.session_key = session_key;
				data.iv = iv
				return new Promise((l,r)=>{
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
								if(res.errMsg == "request:ok"){
									l(true);
								}else{
									l(false);
								}
							}
							});
				});
			},
			getInfo(){
				let that=this;
				return new Promise((l,r)=>{
					that.http(api.userInfoGet,'GET',{},false).then(reslut=>{
						if(reslut.data){
							getApp().globalData.wxUser = reslut.data
							that.wxUser = reslut.data
							console.log("授权后，再次获取uerInfo")
							console.log(reslut.data);
							l(reslut.data);
						}else{
							l(false);
						}
						
						
					});
				});
			},
		async sendphoneNumber(encryptedData, session_key, iv) { //解析手机号码
		let that =this;
	    let isAuthPhone=await that.savephone(encryptedData, session_key, iv);
	    if(isAuthPhone){
		let user =  await that.getInfo();
		console.log("++++++++++++++++++++++++++++")
		console.log(that.sendPassed)
		console.log("++++++++++++++++++++++++++++")
		if(user && that.sendPassed){
			console.log("发起了流程")
			let invitte =user.invitee;
			if(invitte){
				let ischeck=await that.checkPhone();
				console.log(ischeck)
				if(ischeck =="true"){
					that.brokerprocess();
				}
				
			}else{
				let ischeck=await that.checkphonept();
				if(ischeck=="true"){
					that.getProcessDefinition();
				}
				
			}
		}
		that.$emit('refData')
	   }
			// console.log("解析手机号码")
			// 	let that = this;
			// 	let data = {
			// 		encryptedData: '',
			// 		session_key: '',
			// 		iv: ''
			// 	};
			// 	data.encryptedData = encryptedData;
			// 	data.session_key = session_key;
			// 	data.iv = iv
			// 	//console.log(encryptedData+'\n'+session_key+'\n'+iv)
			// 	uni.request({
			// 		url: api.GetPhone, //仅为示例，并非真实接口地址。
			// 		method: 'POST',
			// 		data: data,
			// 		timeout: 120000,
			// 		header: {
			// 			'app-id': wx.getAccountInfoSync().miniProgram.appId,
			// 			'third-session': getApp().globalData.thirdSession
			// 		},
			// 		success: (res) => {

						// if (res.errMsg == "request:ok") {
							// getApp().globalData.wxUser = res.data //成功获取手机缓存到wxUser
							// console.log("电话授权后返回的信息")
							// console.log("___________________________")
							// console.log(res.data)
							// console.log("___________________________")
							// that.wxUser = res.data
							// that.http(api.userInfoGet,'GET',{},false).then(reslut=>{
							// 	console.log("授权结束后再请求userInfo")
							// 	console.log(reslut)
							// 		console.log("+++++++++++++++")
							// 		getApp().globalData.wxUser = reslut.data
							// 		that.wxUser = reslut.data
									
							// 		let isTrue=reslut.data.invitee
									
									
							// 		if (isTrue) { //第一次授权电话号码，发起流程如果有经纪人邀请码发起经纪人流程 
							// 			//经纪人流程
							// 			console.log("经纪人流程")
							// 		let checkphone = await that.checkPhone()
							// 		if(checkphone){
							// 			that.brokerprocess()
							// 		}
										
							// 		} else {
							// 			//自有流程
							// 			console.log("自有流程")
							// 			that.getProcessDefinition()
							// 		}
									
									
									
							// 		
							// })
							
				// 		}
				// 	}
				// })



			},
			checkphonept(){
				let that =this;
				let projectItem=getApp().globalData.projectItem
				console.log("查看projctItem")
				console.log(projectItem)
				console.log(getApp().globalData.distribution)
				let distrubtyin
				let data={
						phone:that.wxUser.phone,
						senderId:that.wxUser.id,
						affId:projectItem.id,
						salesmanId:getApp().globalData.distribution?getApp().globalData.distribution.id : null,
						groupId:getApp().globalData.distribution?getApp().globalData.distribution.memberGroup: null,
						tenantId:that.wxUser.tenantId,
					};
				return new Promise((l,r)=>{
					
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
						method:"GET",
						url:api.Verificationplt,
						data:data,
						header: {
						  'app-id': wx.getAccountInfoSync().miniProgram.appId,
						  'third-session': getApp().globalData.thirdSession
						},
						success:function(reslt) {
							// that.checkPhone=false;
							console.log("验证电话pt")
							console.log("_________________________________")
							console.log(reslt);
							console.log("_________________________________")
							if(reslt.data.ok){
								l("true");
							} else{
								l("false");
							}
						
						}
						
					})
					
				});
			},
			checkPhone(){
				let that =this;
				let projectItem=getApp().globalData.projectItem
				let data={
						phone:that.wxUser.phone,
						senderId:that.wxUser.id,
						affId:projectItem.id,
						salesmanId:getApp().globalData.distribution?getApp().globalData.distribution.id : null,
						groupId:getApp().globalData.distribution?getApp().globalData.distribution.memberGroup: null,
						tenantId:that.wxUser.tenantId,
					};
				return new Promise((l,r)=>{
					
					// that.http(api.Verification,"GET",data,false).then(res=>{
					// 	console.log("验证电话")
					// 	console.log(res);
					// })
					uni.request({
						method:"GET",
						url:api.Verification,
						data:data,
						success:function(reslt) {
							// that.checkPhone=false;
							console.log("验证电话")
							console.log(reslt.data.ok);
							if(reslt.data.ok){
								l("true");
							} else{
								l("false");
							}
						
						}
						
					})
					
				});
			}

		}
	}
</script>

<style>
	.auth-img {
			/* border: dashed 1rpx #999999; */
		/* margin-left: 90rpx; */
		height: 150rpx;
		
	}
	.text-xxx{
		
		text-align: center;
		
	}
	.auth-vips {
		/* height: 100vh; */
		background-color: #FFFFFF;
		padding-top: 400rpx;
	}

	.auth-button {
		width: 650rpx;
		margin-left: 50rpx;
		/* margin-top: 20rpx; */
		/* width: 580rpx; */
		height: 98rpx;
		background: rgba(22, 204, 246, 1);
		border-radius: 10rpx;
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 98rpx;
		/* margin-left: 70rpx; */
		bottom: 250rpx;
		position: absolute;

	}
</style>
