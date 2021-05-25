<template>
	<view class="">
		<cu-custom bgColor="bg-white" :isBack="true" :senen="false">
			<block slot="backText"></block>
			<block slot="content" class="title-text">{{projectName}}营销中心</block>
		</cu-custom>
		<view class="" v-if="!wxUser.phone">
			<!-- <auth @refData="userInfoGet" :showText="'微信一键登录'" :sendPassed="false" ></auth> -->
			
			<view class="auth-vips">
				<view class="text-xxx">
					<!-- <view class="">
						天门新客邦
					</view> -->
					<image class="auth-img" src="https://img.0728jh.com/1332139872148000768/material/b6be615b-f5ae-4765-9fd4-0a404ae1eaa3.png" mode="aspectFit"></image>
					<button class="auth-button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信一键登录</button>
				</view>
			</view>
			
		</view>
		<view v-else>
			<view class="" v-if="firstFigure">
						<image class="imgclass" :src="firstFigure" mode="aspectFill"></image>
					</view>
					<view class="commet">
					    
						
						<view class="margin-bottom-sm margin-top-sm title-size" v-if="wxUser.userRole==2">
							选择客户
						</view>
						
						<view class="" style="margin-bottom: 200rpx;" @click="useOutClickSides" v-if="wxUser.userRole==2">
							<easySelect ref="easySelect1" :options="coustomerRealList" :value="nowCoustomer.realName" size="medium" @selectOne="selectTwo"></easySelect>
						</view>
			
						<view class="margin-bottom-sm title-size">
							{{isCheck?'选择置业顾问':'跟踪的置业顾问'}}
						</view>
			
						<view class="" @click="useOutClickSide" >
							<easySelect ref="easySelect" :options="isCheck?list:listone" size="medium" :value="distribution.realName?distribution.realName:distribution.nickName"
							 @selectOne="selectOne"></easySelect>
						</view>
						
						
			           
			
			
					</view>
					<view class="text-title" v-if="!isCheck" style="marign-top:230rpx">
						请前台通知<text class="text_name">{{distribution.realName}}</text>前来接待客户
					</view>
					
					<view class="flex  padding flex-direction" style="marign-top:250rpx">
					<!-- 	<view class="" style="width:200rpx">
			class="cu-btn"
						</view> -->
						<!-- <button v-if="!wxUser.nickName"  class="cu-btn bg-grey lg" @click="getUserProfile">授权</button>
						<button v-if="wxUser.nickName && !wxUser.phone"  open-type="getPhoneNumber" class="cu-btn bg-grey lg" @getphonenumber="getPhoneNumber">电话授权</button> -->
					<!-- 	<button v-if="wxUser.nickName && wxUser.phone && wxUser.userRole!=2" class="cu-btn bg-grey lg" @tap="commit">提交</button>
						<button v-if="wxUser.nickName && wxUser.phone && wxUser.userRole==2" class="cu-btn bg-grey lg" @tap="commitprocessed">办理</button> -->
						<button v-if=" wxUser.phone && wxUser.userRole!=2" class="cu-btn bg-grey lg" @tap="commit">提交</button>
						<button v-if=" wxUser.phone && wxUser.userRole==2" class="cu-btn bg-grey lg" @tap="commitprocessed">办理</button>
					</view>
			
			
		</view>
		
	</view>
</template>

<script>
	import init from '../../utils/initPage.js';
	import api from '../../pages/api/home.js';
	import easySelect from '@/components/easy-select/easy-select.vue'
	export default {
		data: function() {
			return {
				list: [], //置业顾问列表
				wxUser: "",
				selecValue: '双皮奶',
				distribution: {}, //选择的置业顾问 或者已经绑定在本楼盘的顾问
				coustomerList: [], //客户列表
				nowCoustomer: {}, //当前选择的客户
				coustomerRealList: [], // 根据流程查出来的用户信息
				firstFigure:"", //图片
				projectName:"",
				isCheck:true,
				listone:[],
			};
		},
		components:{
			easySelect
		},
		onLoad(options) {
			let that=this;
			console.log("+++++++++++++++++onLoad++++++++++++++++++++++++++++++");
			init.initPage().then(res => {
				
				// console.log("marketingCenter________________")
				// console.log(getApp().globalData.wxUser)
				// console.log(getApp().globalData.platforminfo)
				// console.log(getApp().globalData.projectItem)
				let wxUser=getApp().globalData.wxUser;
				that.getplatforminfo();
				that.getUserinfozhiye();
				if(wxUser.userRole===2){
					that.getTask();
				}	
			})

		},
		methods: {
			async commit() {
				let that = this;
				if(!that.isCheck){
					that.redirect();
					return;
				}
				
				let isAuth = await that.chooseGW();
				console.log("---------------------------------")
				if(isAuth){
					await that.userInfoGet();
					console.log("---------------------------------")
					await that.getProcessDefinition();
				}
			},
			// agreenGetUser:function(e){
			// 	console.log(e)
				
			// 	let that=this;
			//   if (e.detail.errMsg == 'getUserInfo:ok') {
			// 	that.http(api.wxUserSave,"POST",e.detail,false).then(res=>{
				
			// 	console.log(res)
					
			// 		that.userInfoGet()
					
			// 	})
				
					
			// }
			// },
			getUserProfile(e) {
		    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
		    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
		let that=this;
		    wx.getUserProfile({
		      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
		      success: (res) => {
				that.http(api.wxUserSave,"POST",res,false).then(reslut=>{
				
				
					
					that.userInfoGet()
					
				})
		      }
		    })
		  },
			getplatforminfo(){
				let that=this;
				that.http(api.platforminfo,"GET",{},false).then(res=>{
					console.log("getplatforminfo-信息")
					console.log(res)
					let projectList = res.data.basicInfoList;
					let id = getApp().globalData.projectItem.id;
					let projectnow={};
					for(let i =0;i<projectList.length;i++){
						if(projectList[i].id ==id){
						projectnow= projectList[i];	
						}
					}
					console.log(projectnow)
					that.firstFigure=projectnow.firstFigure
					that.projectName=projectnow.projectName
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
			sendphoneNumber: function(encryptedData, session_key, iv) { //解析手机号码
				let that = this;
				let data = {
					encryptedData: '',
					session_key: '',
					iv: ''
				};
				data.encryptedData = encryptedData;
				data.session_key = session_key;
				data.iv = iv
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
							getApp().globalData.wxUser = res.data //成功获取手机缓存到wxUser
							that.wxUser = res.data

							// if(that.wxUser.invteer){  //第一次授权电话号码，发起流程如果有经纪人邀请码发起经纪人流程
							// 	//经纪人流程
							// 	that.brokerprocess()
							// }else{
							// 	//自有流程
							// 	that.getProcessDefinition()
							// }
							
								that.checkphonept();
						
							
							
						}
					}
				})
			},
			async getUserinfozhiye() { //置业顾问
				let that = this;
				let id = getApp().globalData.projectItem.id
				console.log(id)
				let res = await that.http(api.getall, 'GET', {
					affId: id
				}, false);
				let pconsul = res.data
				console.log("ddddddddddddddddddd")
				console.log(pconsul)
				that.list = res.data;
				
				let distribution = getApp().globalData.wxUser.distribution
				that.wxUser = getApp().globalData.wxUser
				let distributionItem = {}

				for (let i = 0; i < pconsul.length; i++) {

					for (let j = 0; j < distribution.length; j++) {

						if (pconsul[i].id == distribution[j]) {
							getApp().globalData.distribution = pconsul[i]
							distributionItem = pconsul[i]

						}
					}
				}
				that.distribution = distributionItem
				that.listone.push(distributionItem);
				if(that.wxUser.phone && that.wxUser.userRole!=2){that.checkphonept();}
			},
			getProcessDefinition(){   //获取自有流程id
				let that=this;
				let projectItemId = getApp().globalData.projectItem.id
				uni.request({
					url: api.GetProcessDefinition,
					method: 'GET',
					data: {
						tenantIdIn:projectItemId  //楼盘id
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
							if(id){
								that.PostProcessAcquistion(id);
							}else{
								uni.showToast({
									title:"请检查key为passenger的流程是否存在",
									icon:"none",
									duration:3000,
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
								that.isCheck=true;
								l("true");
							} else{
								that.isCheck=false;
								uni.showToast({
									title:"号码楼盘已存在",
									icon:'none',
									duration:2000,
								})
								l("false");
							}
						
						}
						
					})
					
				});
			},
			 PostProcessAcquistion(id){
				
				let that=this;
				let ids=id;
				let project = getApp().globalData.projectItem
				uni.request({
					url: api.GetProcessDefinition+"/"+ids+"/submit-form",
					method: 'POST',
					data:{
						variables:{
						initiator: {
							value:getApp().globalData.wxUser.id
						},
						phone: {
							value: that.wxUser.phone
						},
						customerName: {
							value:that.wxUser.realName?that.wxUser.realName:that.wxUser.nickName 
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
						// {
						// 	initiator:{value:getApp().globalData.wxUser.id},
						// 	phone:{value:that.wxUser.phone},
						// 	customerName:{value:that.wxUser.realName?that.wxUser.realName:that.wxUser.nickName},
						// 	affiliationId:{value:project.id},
						// 	tenantId:{value:that.wxUser.tenantId},
						// 	characters:{value:null},
						// 	unspecified:{value:that.distribution?false:true} ,//未指定    有置业 false ，否则true
						// 	salesmanId:{value:that.distribution?that.distribution.id:null},
						// 	origin:{value:'1'}
						// }
						
					},
					success: function(response) {
						console.log('提交平台流程');
						console.log(response);
						if(response.statusCode == 200){
							that.redirect();
							}
						}
					})
					
			},
			
			async userInfoGet() {
				let that = this
				return new Promise((r,l)=>{
					that.http(api.userInfoGet, 'GET', {}, false).then((res)=>{
						that.wxUser = res.data
						getApp().globalData.wxUser = res.data
						if(res.ok){
							r("success");
						}else{
							l("fail")
						}
					})
				});
				let res=await that.http(api.userInfoGet, 'GET', {}, false);
					
						console.log("userInfoGet")
						console.log(res)
						// userInfo: res.data
						that.wxUser = res.data
						getApp().globalData.wxUser = res.data
						// that.getUserinfozhiye();	
						// that.$emit('cachwxUser',res.data)
						//刷新置业顾问
					
			},
			async chooseGW() {
				//	console.log("选择置业")
				let id = getApp().globalData.projectItem.id
				let that = this;
				let data = that.distribution;
				return new Promise((r,l)=>{
					that.http(api.GetShareInfno + '/distribution/' + data.id, 'GET', {
						affId: id
					}, false).then((res)=>{
						if(res.data!=true){
							uni.showToast({
								title:res.data,
								duration:2000,
								icon:'none'
							})
							l(false);
						}else{
							r(true);
						}
					})
					
				});
				
				//	console.log(data)
				//	console.log("开始发起")
				// let res = await that.http(api.GetShareInfno + '/distribution/' + data.id, 'GET', {
				// 	affId: id
				// }, false);
				// console.log(res);
				// if(res.data!=true){
				// 	uni.showToast({
				// 		title:res.data,
				// 		duration:1000,
				// 		icon:'none'
				// 	})
				// }

			},
			getTask() {
				let that = this;
				let wxUser = getApp().globalData.wxUser;
				console.log(wxUser.id)
				// that.http(api.getTask,'GET',{assigneeIn:wxUser.id},false).then((res)=>{
				// 	console.log("++++++++++++++++++++++++++++++")
				// 	console.log(res)
				// })
				uni.request({
					url: api.getTask,
					method: "GET",
					data: {
						assigneeIn: wxUser.id
					},
					success(res) {
						console.log("-------------------")
						console.log(res)
						if (res.data) {
							that.coustomerList = res.data
							let list = [];
							for (let i = 0; i < res.data.length; i++) {
								list.push(res.data[i]["processInstanceId"])
							}
							console.log("查看执行list id")
							console.log(list)
							if (list.length > 0) {
								that.postReferrals(list);
							} else {
								uni.showToast({
									title: "无客户可操作",
									duration: 1000,
									icon: 'none',
								})
							}

						}

					}
				});

			},
			postReferrals(list) {
				let that = this;

				that.http(api.Referrals + '/list', 'POST', list, false).then(res => {
					console.log("mycoustom")
					console.log(res)


					for (let i = 0; i < res.data.length; i++) {
						res.data[i]["realName"] = res.data[i]["customerName"]
					}
					that.coustomerRealList = res.data

				})
			},
			commitprocessed() { //中介提交流程
				let that = this;
				let coustomerList = that.coustomerList
				let coustomer = that.nowCoustomer;
				let id = "";
				for (let i = 0; i < coustomerList.length; i++) {
					if (coustomerList[i].processInstanceId == coustomer.instanceId) {
						id = coustomerList[i].id
					}
				}
				let distribution = that.distribution;
				if(id==""){
					uni.showToast({
						title:"未选择客户无法办理",
						duration:1000,
						icon:"none",
					})
					return;
				}
				// console.log("___________________________")
				// console.log(coustomerList)
				// console.log(coustomer)
				// console.log(distribution)
				// console.log("___________________________")
				let data = {
					"variables": {
						"agentId": {
							"value": distribution.id.toString()
						}
					},
					"withVariablesInReturn": true
				}
				uni.request({
					url: api.getTask + "/" + id + "/complete",
					method: "POST",
					data: data,
					success(res) {
						console.log(res)
						if(res.statusCode==200){
							uni.showToast({
								title:'处理成功',
								duration:1000,
								icon:'none'
							})
							setTimeout(()=>{
								that.redirect();
							},1000)
							
							
				
						}
					},
					fail(response) {
						console.log(response)
						uni.showToast({
							title:res.data.message,
							duration:2000,
							icon:"none",
						})
					}
				})
			},
			redirect(){
				console.log("跳转")
				uni.redirectTo({
					url:'/pages/index/index',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				
			},
			selectOne(options) {
				console.log(options)
				this.distribution = options

			},
			selectTwo(options) {
				console.log(options)
				this.nowCoustomer = options
			},
			useOutClickSide() {
				console.log();	
				this.$refs.easySelect.hideOptions && this.$refs.easySelect.hideOptions()
			},
			useOutClickSides() {
				console.log();
				
				
				this.$refs.easySelect1.hideOptions && this.$refs.easySelect1.hideOptions()
			
			}

		}

	}
</script>

<style>
	.text-title{
		
		text-align: center;
	}
	.text_name{
		color: red;
		font-weight: bold;
		
		padding:0rpx 5rpx;
	}
	.commet {
		padding: 0rpx 30rpx;
		margin-bottom: 200rpx;
	}
	.title-size{
		font-size: 40rpx;
		font-weight: 400;
	}
	.imgclass{
		width:100%;
		height: 400rpx;
	}
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
