<template name="contactUs">
	<!-- 	<cu-custom bgColor="bg-white" :isBack="true" :ischart="true">
			<block slot="backText">	
			</block><block slot="content" class="title-text">联系我们</block>
		</cu-custom> -->
	<!-- <view class="vip">
	
		<view class="text-total">
			<view class="callme-img">
				<image class="callme" src="https://img.0728jh.com/staticImg/callmetwo.png"></image>
			</view>
			<view class="text-basebuddingname">
				{{BaseBudding.projectName}}
			</view>
			<view class="text-one">
				
				<text class="text-24ho">24小时为您服务</text>
			</view>
		
			
		</view>
		<view class="btn-total">
			<view class="btn-one" @click="callMe">
				拨打电话
			</view>
			
		</view>
		
	</view> -->
	<view class="vip">
		<view class="phoneconsulting">
			<view class="phoneconsulting-title">电话咨询</view>
			<view class="phoneconsulting-body">
				
					<image class="counter-img " :src="distribution.headimgUrl" mode="" ></image>
				
				<view class="namekefu">
					{{distribution.realName}}{{distribution.phone}}
				</view>
			 <view>
				  <image class="honeclass"  src="https://img.0728jh.com/staticImg/iphone_icon.png" mode="" @click="callPhone"></image>
			 </view>
			
			</view>
		</view>
		
		<view style="margin-top:30rpx">
			<view class="phoneconsulting-title">
				预约咨询
			</view>
			<view class="consultingform">
				<view class="recommend-infor-two">
					<view class="recommend-name">姓名</view>
					<view class="recommend-input-tao">
						<input
							class="recommend-input"
							placeholder-class="input-class"
							:placeholder="'请输入您的姓名'"
							:value="name"
							@input="getname"
						/>
					</view>
				</view>
				<view class="recommend-infor-two">
					<view class="recommend-name">性别</view>
					<view class="recommend-input-tao">
						<radio-group @change="radioChange">
							<view class="recommend-input-radio">
								<view class="radio-item">
									<label class="text-center">
										<radio class="radio-class" color="#007AFF" value="先生" />
										先生
									</label>
								</view>
								<view class="radio-item">
									<label class="text-center">
										<radio class="radio-class" color="#007AFF" value="女士" />
										女士
									</label>
								</view>
							</view>
						</radio-group>
					</view>
				</view>
				<view class="recommend-infor-two" >
					<view class="recommend-name">电话</view>
					<view class="recommend-input-tao">
					   <input 
					    v-if="wxUser.phone"
					   	class="recommend-input"
					   	placeholder-class="input-class"
					   	:placeholder="wxUser.phone"
					   	disabled="flase"
					   />
					   <button  v-if="!wxUser.phone"  class="getphoneButton"  open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" > 电话授权 </button>
					</view>
				</view>
				<view class="recommend-infor-fou">
					<view class="recommend-major">需求</view>
					<view class=""><textarea class="textarea" placeholder-class="input-class" placeholder="请输入意向" :value="textarea" fixed="true" @input="gettextarea"></textarea></view>
				</view>
				<button  class="commit" @click="commit" >提交</button>
			</view>
		</view>
		<view class="cu-modal" :class="modalName == 'Modal' ? 'show' : ''" @click.capture="hideModal">
			<view class="cu-dialog">
				<view class="modal-m">
					<image class="modal-img" src="https://img.0728jh.com/staticImg/shibai_icon.png"></image>
					<view class="modal-text">请填写正确信息哦</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName == 'DialogModal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content"></view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl">预约成功，楼盘稍后会与您联系！</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="toIndex">回首页</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal">留在此页</button>
					</view>
				</view>
			</view>
		</view>
		
	</view>
	
</template>
<script>
	import api from '../api/home.js'
	import init from '../../utils/initPage.js'
	export default {
		data:function(){
			return {
				BaseBudding:getApp().globalData.BaseBudding,
				modalName:"",
				wxUser:"",
				gender:"",
				name:"",
				textarea:"",
				distribution:"",
			}
		},
		async created(){
			await this.userInfoGets();
			let distribution= await this.getdistribution();
			if(distribution ==null){
				await this.choose();
				await this.getdistribution();
				await this.userInfoGets();
			}
			console.log(getApp().globalData.distribution)
		},
		methods:{
			
			gettextarea: function(e) {
				this.textarea = e.detail.value;
			},
			radioChange: function(e) {   //性别
				//console.log(e);
				this.gender = e.detail.value;
				//console.log(this.gender);
			},
			getname: function(e) {
				this.name = e.detail.value;
			},
			showModal: function(e) {
				this.modalName = 'Modal';
			},
			hideModal: function(e) {
				this.modalName = null;
			},
			toIndex: function() {
				uni.redirectTo({
					url: '/pages/index/index?PageCur=basics'
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
			async sendphoneNumber(encryptedData, session_key, iv) { //解析手机号码
					let that =this;
			 let isAuthPhone=await that.savephone(encryptedData, session_key, iv);
			 if(isAuthPhone){
					let user =  await that.userInfoGets();
			   }
			},
			getPhoneNumber: function(e) { //第一步，获取手机授权
				let that = this;
				if (e.detail.errMsg == "getPhoneNumber:ok") { //用户点击了一个
					let encryptedData = e.detail.encryptedData;
					let iv = e.detail.iv;
					init.initPage().then(res => { //保证sessionkey最新有效
						let session_key = getApp().globalData.sessionKey;
						that.sendphoneNumber(encryptedData, session_key, iv)
					})
				} else {
					return;
				}
			},
			choose(){
				let that=this;
				let BaseBudding=getApp().globalData.BaseBudding
				//console.log(BaseBudding)
				console.log("++++++++++++++++++++++")
				console.log(getApp().globalData.projectItem)
				console.log(getApp().globalData.platforminfo)
				console.log("++++++++++++++++++++++")
				return new Promise((reslove,reject)=>{
					that.http(api.GetShareInfno+'/distributions','GET',{
						affId:BaseBudding.id
					},false).then(res=>{
						console.log(res)
						if(res.data){
							getApp().globalData.wxUser=	res.data
							that.wxUser=res.data
							
							reslove("success");
						}
					
					})
				});
			},
				getdistribution(){
					let that=this;
					let id = getApp().globalData.projectItem.id
					 let distributionList=getApp().globalData.wxUser.distribution
					 console.log("wxUser")
					 console.log(getApp().globalData.wxUser)
					return new Promise((l,r)=>{
						that.http(api.getall,'GET',{affId:id},false).then(res=>{
							console.log("查看置业列表")
							console.log(res)
							let ress=res.data
							let distributionItem=null;
							
							for(let i=0;i<ress.length;i++){
								
									 for(let j=0 ;j<distributionList.length;j++){
									
										 if(ress[i].id == distributionList[j]){
											 distributionItem=ress[i];
											 that.distribution=ress[i];
											 getApp().globalData.distribution = ress[i]
											
										 }
									 }
								}
								
								console.log("第二步，获取置业")
								console.log(getApp().globalData.distribution)
								l(distributionItem);
						})
						
					});
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
							l(reslt.data.ok);
							// if(reslt.data.ok){
							// 	l("true");
							// } else{
							// 	l("false");
							// }
						
						}
						
					})
					
				});
			},
			userInfoGets(){
				let that = this;
				return new Promise((l,r)=>{
					this.http(api.userInfoGet, 'GET', {}, false).then(res => {
						if(res.ok){
							that.wxUser = res.data;
							console.log(res);
							getApp().globalData.wxUser = res.data;
							l(res.data);
						}	
					});
				});
			},
			async commit(){
				let that=this;
				if(!that.name){
					that.modalName="Modal"
					return;
				}
				if(!that.gender){
					that.modalName="Modal"
					return;
				}
				
				if(!that.wxUser.phone){
					that.modalName="Modal"
					return;
				}
				let ischeck=await that.checkphonept();
				if(!ischeck){
					uni.showToast({
						title:"楼盘已存在此号码，请使用电话咨询!",
						icon:"none",
						duration:3000,
					})
					return;
				}
				that.getProcessDefinition();
			},
			
			getProcessDefinition() { //获取平台流程id
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
				let name = that.name
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
						description: { value: that.textarea, type: 'String', valueInfo: {} },
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
						console.log(response)
						if (response.statusCode == 200) {
								that.modalName='DialogModal'
						}
					}
				})
			
			},
			callPhone:function(){
				// getApp().globalData.callMePhone=this.userInfo
				let distribution = this.distribution;
				uni.makePhoneCall({
				    phoneNumber: distribution.phone //仅为示例
				});
			},
		}
	}
</script>


<style>
	/**
	 * 预约咨询
	 * ________________________________________
	 */
	.getphoneButton{
		width: 400rpx;
		height: 60rpx;
		background: rgba(255, 255, 255, 1);
		line-height: 60rpx;
		font-size: 28rpx;
		text-align: center;
		margin-right: 180rpx;
	}
	.commit {
		width: 690rpx;
		height: 88rpx;
		background: rgba(22, 204, 246, 1);
		border-radius: 10rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 88rpx;
		text-align: center;
		margin-top: 50rpx;
	}
	.recommend-major {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}
	.textarea {
		width: 561rpx;
		height: 223rpx;
		background: rgba(250, 250, 250, 1);
		margin-right: 30rpx;
		padding: 10rpx;
	}
	.recommend-infor-fou {
		display: flex;
		justify-content: space-between;
		margin: 20rpx 0rpx;
	}
	.input-class {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(180, 180, 180, 1);
	}
	.radio-class {
		transform: scale(0.7);
		color: rgba(22, 204, 246, 1);
	}
	.radio-item {
		display: flex;
		align-items: center;
		margin-right: 50rpx;
	}
	.recommend-input-radio {
		display: flex;
		align-items: center;
	
		width: 560rpx;
		height: 81rpx;
	
		margin-right: 30rpx;
		padding: 0 20rpx;
	}
	.input-class {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(180, 180, 180, 1);
	}
	.recommend-input {
		width: 560rpx;
		height: 81rpx;
		background: rgba(250, 250, 250, 1);
		margin-right: 30rpx;
		padding: 0 20rpx;
	}
	.recommend-name {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 142rpx;
	}

	.recommend-infor-two {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.consultingform{
		padding-left: 20rpx;
	}
	/* .consultingform{
		border:solid 1rpx #000000;
	} */
	/**
	 * 电话咨询
	 * ________________________________________
	 */
	.counter-img{
		width:85rpx;
		height: 85rpx;
		border-radius: 50%;
	}
	.namekefu{
		  width:500rpx;
		  white-space:nowrap;
		  overflow: hidden;
		  text-overflow: ellipsis;
	}
	.phoneconsulting-body{
		 display: flex;
		 justify-content: space-between;
		 align-items: center;
		 padding:0rpx 20rpx;
	}
	.phoneconsulting-title{
		
		font-size: 38rpx;
		margin-bottom: 20rpx;
		padding-left: 10rpx;
	}
	
 .phoneconsulting{
	margin-top: 160rpx;
	/* border: solid 1rpx #000000; */
	
 }
	.honeclass{
		width:90rpx;
		height: 90rpx;
	}
	/**
	 * Modal
	 */
	.modal-m {
		width: 330rpx;
		height: 240rpx;
		background: rgba(0, 0, 0, 1);
		opacity: 0.7;
	}
	.modal-text {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
	}
	.modal-img {
		height: 104rpx;
		width: 104rpx;
		margin-top: 35rpx;
		margin-bottom: 31rpx;
	}
	
	
/* 	.callme-img{
		
		margin: 120rpx 0rpx 30rpx 0rpx;
	}
	.btn-total{
		width: 100%;	
	} */
	/* .callme{
		border: dashed 1rpx #999999;
	} */
	/* .btn-one{
		text-align: center;
		height: 95.9rpx;
		line-height: 95.9rpx;
		width: 631rpx;
		margin:100rpx 59rpx 0rpx 60rpx;
		
		font-size:30rpx;
		border:1px solid rgba(22,204,246,1);
		color: #16CCF6;
	}
	.btn-two{
		margin:47rpx 59rpx 0rpx 60rpx;
		height: 95.9rpx;
		width: 631rpx;
		background:rgba(22,204,246,1);
		color:#FFFFFF;
		line-height: 95.9rpx;
		font-size:30rpx;
		text-align: center;
	}
	.text-basebuddingname{
		margin-top:101rpx;
		font-size:45rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		
	}
	.text-24ho{
		margin-left: 20rpx;
		font-size:45rpx;
		font-family:PingFang SC;
		font-weight:320;
		color:rgba(51,51,51,1);
		font-style: italic;
	}
	.text-upadte{
		font-size:45rpx;
		font-family:PingFang SC;
		font-weight:300;
		
		color:rgba(51,51,51,1);
	}
	.text-two{
		margin-top:36rpx;
		font-size:21rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(102,102,102,1);
	}
	.text-one{
		margin-top: 10rpx;
		font-size:45rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.text-total{
		text-align: center;
		
		
	}
	.title-text{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	} */
	page{
		background-color: #FFFFFF;
	}
	.vip{
		background-color: #FFFFFF;
		height:100%;
		width: 100%;
		
	}
</style>
