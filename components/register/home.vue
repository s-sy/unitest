<template>
	<view class="">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="title-text">注册经纪人</block>
		</cu-custom>
      
		<view class="recommend-infor">
			<view class="recommend-infor-two">
				<view class="recommend-name">姓名</view>
				<view class="recommend-input-tao">
					<input class="recommend-input" placeholder-class="input-class" placeholder="请输入您的姓名" :value="name" @input="getname" />
				</view>
			</view>


			<view class="recommend-infor-two">
				<view class="recommend-name">性别</view>
				<view class="recommend-input-tao">
					<radio-group @change="radioChange">
						<view class="recommend-input-radio">
							<view class="radio-item">
								<label class="text-center">
									<radio class="radio-class" color="#007AFF" value="1" :checked="gender==1"/>
									先生
								</label>
							</view>
							<view class="radio-item">
								<label class="text-center">
									<radio class="radio-class" color="#007AFF" value="0" :checked="gender==2"/>
									女士
								</label>
							</view>
						</view>
					</radio-group>
				</view>
			</view>

			<view class="recommend-infor-two">
				<view class="recommend-name">电话</view>
				<view class="recommend-input-tao">
					<input class="recommend-input" placeholder-class="input-class" :placeholder="sdf" :value="phone?phone:'' " disabled=true />
				</view>
			</view>
			<view class="cukkk">
				*请选择经纪人类型
			</view>
			<view class="cu-form-group">
				<view class="title">经纪人类型</view>
				<picker @change="PickerChange" :value="pickerIndex" :range="picker">
					<view class="picker">
						{{pickerIndex>-1?picker[pickerIndex]:'选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group" v-if="picker[pickerIndex]=='中介公司' ">
				<view class="title">中介公司</view>
				<picker @change="companyPickerChange" :value="companyIndex" :range="companyList" range-key="name">
					<view class="picker">
						{{companyIndex>-1?companyList[companyIndex].name:'选择'}}
					</view>
				</picker>
			</view>
			<view class="flex" v-if="picker[pickerIndex]=='中介公司' ">
				<view class="companyView" @tap="company">
					注册中介公司门店
				</view>

			</view>


			<!-- <view class="recommend-infor-fou">
				<view class="recommend-major">备注</view>
				<view class=""><textarea class="textarea" placeholder-class="input-class" placeholder="备注内容" :value="textarea"
					 fixed="true" @input="gettextarea"></textarea></view>
			</view> -->
			<view class="padding flex flex-direction">
				<!-- <button class="cu-btn bg-grey lg">玄灰</button> -->
				<button class="cu-btn bg-red margin-tb-sm lg" @tap="regborker">注册</button>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">注册中介公司门店</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-lg bg-white">
					<view class="" style="width:500rpx">
						<view class="companyRow">
							<view class="">
								公司名称
							</view>
							<input class="companyInput" type="text" value="" placeholder="请填写公司名称" @input="getCorporationName" />
						</view>
						<view class="companyRow">
							<view class="">
								地址
							</view>
							<input class="companyInput" type="text" value="" placeholder="请填写公司地址" @input="getCompanyAddress" />
						</view>
						<view class="companyRow">
							<view class="">
								联系人
							</view>
							<input class="companyInput" type="text" value="" placeholder="请填写公司联系人姓名" @input="getCompanyPrincipal" />
						</view>
						<view class="companyRow">
							<view class="">
								手机号
							</view>
							<input class="companyInput" type="number" placeholder="请填写公司联系人手机" @input="getcompanyPhone" />
						</view>
						<view class="companyRow">
							<view class="">
								公司总人数
							</view>
							<input class="companyInput" type="number" value="" placeholder="请填写公司总人数" @input="getcompanyTeamNumber" />
						</view>
						<view class="companyRow">
							<view class="">
								简介
							</view>
							<input class="companyInput" type="text" value=""  placeholder="请填写公司简介" @input="getcompanyIntroduction" />
						</view>
						<view class="companyRowImg">
							<view class="">
								门店图片
							</view>
							<image v-if="!companyOutletUrl" @tap="uploadImg" class="outImg" src="https://img.0728jh.com/staticImg/pic-jia.png"
							 mode=""></image>
							<view class="flex" v-if="companyOutletUrl">
								<image @tap="uploadImg" class="outImg" :src="companyOutletUrl" mode=""></image>
								<view class="deleteImg" @tap="deleteImg">
									X
								</view>
							</view>

						</view>

					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="commitc">确定</button>

					</view>
				</view>
			</view>
		</view>



	</view>
</template>

<script>
	
	// import init from '../../utils/initPage.js'
	// import api from '@/api/home.js';
	import api from '../../pages/api/home.js'
	export default {
		
		data: function() {
			return {
				modalName: '',
				picker: ['注册经纪人', '中介公司', '内部员工（非销售岗)', '业主'],
				pickerIndex: -1,
				companyList: [],
				companyIndex: -1,
				name: "",
				gender: '',
				phone:"",
				textarea: '',
				wxUser: {},


				companyName: "",
				companyAddress: "",
				companyPrincipal: "",
				companyPhone: "",
				companyTeamNumber: "",
				companyIntroduction: "",
				companyOutletUrl: "",
			}
		},
		created() {
			this.getCompanyList();
			this.getwxUser()
		},
		

		methods: {
			getwxUser() {
				let that = this;
				that.http(api.userInfoGet, 'GET', {}, false).then(res => {
					console.log("查看用户信息")
					console.log(res)
					this.wxUser=res.data
					this.phone= res.data.phone
					this.gender=res.data.sex
					getApp().globalData.wxUser = res.data
				})
			},
			hideModal: function() {
				this.modalName = '';
			},
			getname: function(e) {
				//console.log(e)
				//console.log(this.name)
				this.name = e.detail.value
			},
			gettextarea: function(e) {
				this.textarea = e.detail.value;
			},
			radioChange: function(e) { //性别
				//console.log(e);
				this.gender = e.detail.value;
				//console.log(this.gender);
			},
			PickerChange: function(e) {
				//console.log(e);
				this.pickerIndex = parseInt(e.detail.value);
			},
			companyPickerChange(e) {
				this.companyIndex = parseInt(e.detail.value);
			},
			getCompanyList() {
				let that = this;

				that.http(api.intermediaryCompany + '/list', 'GET', {
					current: 1,
					size: 100
				}, false).then(res => {
					console.log("查看companyList")
				//	console.log(res);
					that.companyList = res.data

				})
			},
			regborker() {
				let that = this;
				let wxUser=that.wxUser
				if(that.name==""){
					uni.showToast({
						title:'请填写正确姓名',
						duration:1000,
						icon:'none',
					})
					return;
				}
				if(that.pickerIndex<0){
					uni.showToast({
						title:'请选择经纪人类型',
						duration:1000,
						icon:'none',
					})
					return;
				}
				if(that.pickerIndex==1){
					if(that.companyIndex<0){
						uni.showToast({
							title:'请选择经纪人公司，如没有对应公司请注册公司',
							duration:1000,
							icon:'none',
						})
						return;
					}
					
				}
				let pickerindex=that.pickerIndex
				 pickerindex=    pickerindex+1;
				if(pickerindex==4){
					pickerindex=pickerindex+1;
				}
				let data = {
					realName: that.name,
					sex: that.gender,
					userRole:that.pickerIndex>=0?pickerindex:0,// （0： 普通经纪人，1：注册经纪人 2：中介公司 3，内部员工（非销售岗） 4，内部员工（销售岗）（wu）5，业主）
					intermediaryCompanyId: that.companyIndex >= 0 ? that.companyList[that.companyIndex].id : wxUser.intermediaryCompanyId,
				}
				//console.log(data)
				
				that.http(api.userInfoGet,'PUT',data,false).then(res=>{
					//console.log(res)
					if(res.ok){
						// that.getwxUser()
						that.$emit('cachwxUser');
						uni.showToast({
							title:"注册成功",
							duration:1000,
							icon:'success',
						})
							// let eventChannel =that.getOpenerEventChannel()
							// eventChannel.emit("getss",{data:'test_____________________'})
							// that.$emit("userinfo");
						
					}
				})
			},
			// async userInfoGet() {
			// 	let that = this
			// 	return new Promise((r,l)=>{
			// 		that.http(api.userInfoGet, 'GET', {}, false).then((res)=>{
			// 			that.wxUser = res.data
			// 			getApp().globalData.wxUser = res.data
			// 			if(res.ok){
			// 				r("success");
			// 			}else{
			// 				l("fail")
			// 			}
			// 		})
			// 	});
				
			// },
			commitc() {

				let that = this;
				
				if(that.companyName==""){
					uni.showToast({
						title:'请填写公司名称',
						duration:1000,
						icon:'none',
					})
					return;
				}
				if(that.companyAddress==""){
					uni.showToast({
						title:'请填写地址',
						duration:1000,
						icon:'none',
					})
					return;
				}
				if(that.companyPrincipal==""){
					uni.showToast({
						title:'请填写联系人',
						duration:1000,
						icon:'none',
					})
					return;
				}
				
					 var re = /^1\d{10}$/
					    if(!re.test(that.companyPhone)){
							uni.showToast({
								title:'请填写正确电话号码',
								duration:1000,
								icon:'none',
							})
								return;
						}
					
					
					
				
				
				if(that.companyTeamNumber==""){
					uni.showToast({
						title:'请填写公司人数',
						duration:1000,
						icon:'none',
					})
					return;
				}
				if(that.companyIntroduction==""){
					uni.showToast({
						title:'请填写公司简介',
						duration:1000,
						icon:'none',
					})
					return;
				}
				if(that.companyOutletUrl==""){
					uni.showToast({
						title:'请上传一张门店图片',
						duration:1000,
						icon:'none',
					})
					return;
				}
				

				let data = {
					createId: getApp().globalData.wxUser.id,
					corporationName: that.companyName, //公司名称
					address: that.companyAddress, //地址
					principal: that.companyPrincipal, //联系人
					phone: that.companyPhone, //联系人电话
					introduction: that.companyIntroduction, //介绍
					outletUrl: that.companyOutletUrl, //门店图片
					teamNumber: that.companyTeamNumber //人数

				}
				//console.log(data);

				that.http(api.intermediaryCompany, 'POST', data, false).then(res => {
					//console.log(res)
					if (res.data == true && res.ok) {
						that.hideModal()
						uni.showToast({
							title: "提交成功，等待审核",
							duration: 2000,
							icon: 'none',
						})
						that.getCompanyList()
					}
				})
			},
			company: function() {
				//console.log("123456")
				this.modalName = "DialogModal1";
			},
			getCorporationName(e) {
				//console.log(e)
				this.companyName = e.detail.value
			},
			getCompanyAddress(e) {
				this.companyAddress = e.detail.value
			},
			getCompanyPrincipal(e) {
				this.companyPrincipal = e.detail.value
			},
			getcompanyPhone(e) {
				this.companyPhone = e.detail.value
			},
			getcompanyTeamNumber(e) {
				this.companyTeamNumber = e.detail.value
			},
			getcompanyIntroduction(e) {
				this.companyIntroduction = e.detail.value
			},
			uploadImg() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],

					success: (res) => {
						//console.log(res)
						let tempFilePaths = res.tempFilePaths

						uni.uploadFile({
							url: api.UpLoad,
							files: tempFilePaths,
							filePath: tempFilePaths[0],
							name: 'file',
							fileType: 'image',
							header: {
								'app-id': wx.getAccountInfoSync().miniProgram.appId,
								'third-session': getApp().globalData.thirdSession
							},
							formData: {
								dir: 'material',
								fileType: 'image',
							},
							success: (reslut) => {
							//	console.log(reslut)
								this.companyOutletUrl = JSON.parse(reslut.data).link
							}
						})
					}
				})
			},
			deleteImg() {
				this.companyOutletUrl = "";
			},
			userInfoGets: function() {
				let that = this;
				this.http(api.userInfoGet, 'GET', {}, false).then(res => {
					that.wxUser = res.data;
					//console.log(res);
					
					that.phone= res.data.phone
					getApp().globalData.wxUser = res.data;
					//	that.getUserinfo() 		
						//刷新置业顾问
						
				});
			},


		},
	}
</script>

<style>
	.cukkk{
		color: red;
		position: absolute;
		line-height: 25rpx;
		font-size: 18rpx;
	}
	.companyView {
		/* position: relative; */
		display: flex;
		font-size: 20rpx;
		padding: 5rpx 10rpx;
		background-color: #EEEEEE;
	}

	.cu-form-group {
		background-color: #ffffff;
		padding: 1upx 0rpx;
		display: flex;
		align-items: center;
		min-height: 81rpx;
		justify-content: space-between;
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
		height: 60rpx;

		margin-right: 30rpx;
		padding: 0 20rpx;
	}

	.radio-class {
		transform: scale(0.7);
		color: rgba(22, 204, 246, 1);
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
		margin: 10rpx 0rpx;
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
		line-height: 100rpx;
	}

	.recommend-infor-two {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.recommend-infor {
		width: 100%;
		padding: 100rpx 30rpx;
		margin-top: -90rpx;
		z-index: 99;
		background: rgba(255, 255, 255, 1);
		border-radius: 40rpx 50rpx 50rpx 50rpx;
		position: absolute;
	}

	.recommend {
		background: rgba(255, 255, 255, 1);
		height: 100vh;
	}

	.companyRow {
		display: flex;
		margin-bottom: 50rpx;
	}

	.companyInput {
		width: 350rpx;
		height: 50rpx;
		background: rgba(250, 250, 250, 1);
		position: absolute;
		padding: 0 10rpx;
		margin-left: 150rpx;
	}

	.deleteImg {
		position: relative;
		background-color: #EEEEEE;
		border: solid #EEEEEE 1rpx;
		border-radius: 50%;
		max-height: 40rpx;
		max-width: 40rpx;
		padding: 5rpx;
	}

	.outImg {
		height: 100rpx;
		width: 100rpx;
	}

	.companyRowImg {
		display: flex;
		justify-content: space-between;
	}
</style>

