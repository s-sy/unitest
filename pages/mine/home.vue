<template>
	<view class="mine">
		<image class="mine-top-img" src="https://img.0728jh.com/staticImg/bannerbg.png"></image>
		
		
		<view class="mine-top-text">
			我的
		</view>
		<view class="mine-zong-center">
			
		
			<view class="mine-box-d">

		<view class="mine-center">
			<image class="mine-center-img" :src="wxUser.headimgUrl?wxUser.headimgUrl:'https://img.0728jh.com/staticImg/logo.png'" mode=""></image>
			
			<view class="mine-center-right">
					<view class="mine-center-right-one">
					<!-- open-type="getUserInfo" @getuserinfo="agreenGetUser" lang="zh_CN" -->
					<button v-if="!wxUser.nickName" class="mine-center-names" @click="getUserProfile" >
						 {{wxUser.nickName ? '点击授权' : '点击授权'}}
					</button>
					<view v-else class="mine-center-name">
						{{wxUser.nickName?wxUser.nickName:'点击授权'}} 
					</view>
					<view class="mine-center-name mine-center-erweima" @click="uploader" v-if="wxUser.userType=='1'&& wxUser.userQrcode==null">上传二维码</view>
					<image class="mine-erweima" v-if="wxUser.userType=='1' && wxUser.userQrcode!=null" src="https://img.0728jh.com/staticImg/erma_icon.png" @click="uploader"></image>
				</view>
				<view class="flex">
					
				<view class="mine-center-tag">
					<view class="">
						<!-- （0： 普通经纪人，1：注册经纪人 2：中介公司 3，内部员工（非销售岗） 4，内部员工（销售岗）（wu）5，业主） -->
						{{wxUser.userRole==0?"普通用户":wxUser.userRole==1?"全民经纪人":wxUser.userRole==2?"中介经纪人":wxUser.userRole==3?"内部员工（非销售岗）":wxUser.userRole==4?"内部员工（销售岗）":wxUser.userRole==5?"业主":""}}
					</view>
					<view class="">
						欢迎您进入{{baseBudding.projectName}}
					</view>
					
				</view>
				<button class="mine-gxnc" @click="getUserProfile">
					 {{!wxUser.nickName ? '点击授权' : '更新昵称'}}
				</button>
				<!-- <view class="mine-gxnc" hover-class="mine-gxnc-dian" @click="agreenGetUser">
					更新昵称
				</view> -->
				</view>
				<!-- v-if="wxUser.userType=='1'" -->
				
			</view>
			
			
		</view>
		<view class="mine-center-number" v-if="wxUser.userRole!='0' && summation">
			<view class="mini-items">
				
					<view class="share-name">
						{{summation.shareUserCount}}
					</view>
					<view class="">
					总裂变量
					</view>
				
			</view>
			<view class="mini-items-xian">
				
			</view>
			<view class="mini-items">
				<view class="share-name">
					{{summation.recommendCount}}
				</view>
				<view class="">
					<!-- 总客户量	 -->
					分享量
				</view>
			</view>
			<view class="mini-items-xian">
				
			</view>
			<view class="mini-items">
				<view class="share-name">
					{{nominations}}
				</view>
				<view class="">
					<!-- 总客户量	 -->
					我的推荐
				</view>
			</view>
		</view>
		
			</view>
		
		<view class="mine-conston">
			<view class="mine-conston-item" @click="toChange" data-cur="gz">
				<image class="mine-conston-img" src="https://img.0728jh.com/staticImg/guanzhu_icon.png"></image>
				<view class="mine-conston-text">
					关注户型
				</view>
				<text class=" cuIcon-right positions"></text>
			</view>
			
			
			<view class="mine-conston-item" @click="toChange" data-cur="dp" v-if="isShowTX=='0'">
				<image class="mine-conston-img" src="https://img.0728jh.com/staticImg/dainping_icon.png"></image>
				<view class="mine-conston-text">
					我的点评
				</view>
				<text class=" cuIcon-right positions"></text>
			</view>
			<view class="mine-conston-item" @click="toChange" data-cur="wd" v-if="isShowTX=='0'">
				<image class="mine-conston-img" src="https://img.0728jh.com/staticImg/dainping_icon.png"></image>
				<view class="mine-conston-text">
					我的问答
				</view>
				<text class=" cuIcon-right positions"></text>
			</view>
			<view class="mine-conston-item" @click="toChange" data-cur="xp" v-if="isShowTX=='0'">
				<image class="mine-conston-img" src="https://img.0728jh.com/staticImg/xuanpai_icon.png"></image>
				<view class="mine-conston-text">
					楼盘炫拍
				</view>
				
				<text class=" cuIcon-right positions"></text>
			</view>
			<view class="mine-conston-item" @click="toChange" data-cur="kh" v-if="wxUser.userType!='3' && wxUser.userRole>0">
				<image class="mine-conston-img" src="https://img.0728jh.com/staticImg/kehu_icon.png"></image>
				<view class="mine-conston-text">
					我的客户
				</view>
				<text class=" cuIcon-right positions"></text>
			</view>
			<view class="mine-conston-item" @click="toChange" data-cur="tx" v-if="wxUser.userType=='1'">
				<image class="mine-conston-img" src="https://img.0728jh.com/staticImg/liebian.png"></image>
				<view class="mine-conston-text">
					裂变客户
				</view>
				<text class=" cuIcon-right positions"></text>
			</view>
			<!-- v-if="wxUser.userType=='3'" -->
			<!-- <view class="mine-conston-item" @click="toChange" data-cur="pl" v-if="wxUser.userType=='3'">
				<image class="mine-conston-imgs" src="https://img.0728jh.com/staticImg/baobiao.png"></image>
				<view class="mine-conston-text">
					数据报表
				</view>
				
				<text class=" cuIcon-right positions"></text>
			</view>	 -->											<!-- v-if="false" -->
			<view class="mine-conston-item" @click="toChange" data-cur="verify" v-if="wxUser.userType=='3'">
				<image class="mine-conston-imgs" src="https://img.0728jh.com/staticImg/baobiao.png"></image>
				<view class="mine-conston-text">
					信息确认
				</view>
				<view class="numData" v-if="numData">
					{{numData}}
				</view>
				<text class=" cuIcon-right positions"></text>
			</view>
			<!--  -->
			<view class="mine-conston-item" @click="toChanges" v-if="wxUser.userRole==0">
				<image class="mine-conston-imgs" src="https://img.0728jh.com/staticImg/baobiao.png"></image>
				<view class="mine-conston-text">
					注册经纪人
				</view>
				
				<text class=" cuIcon-right positions"></text>
			</view>	
		</view>			
		</view>
		
	
	
		
		
		
	</view>
</template>

<script>
	import api from '../api/home.js'
	export default{
		name:'mine',
		data: function() {
			return {
			baseBudding:'',
			wxUser:'',
			summation:'',
			nominations:'0',
			isShowTX:'',
			questionNum:'',
			reviewsNum:'',
			hootingNum:'',
			replysNum:'',
			}
		},
		computed:{
			numData:function(){
				if(this.questionNum&&this.reviewsNum&&this.hootingNum&&this.replysNum){
					return this.questionNum+this.reviewsNum+this.hootingNum+this.replysNum
				}
			}
		},
		created(){
			this.wxUser=getApp().globalData.wxUser
			this.baseBudding=getApp().globalData.BaseBudding
			this.userInfoGet()
			// this.getSummation()
		},
		mounted() {
			let that=this;
			that.isShowTX=getApp().globalData.interaction || '1'
			let wxUser=that.wxUser
			if(wxUser.userType=='3'){
				this.getAwesomeshooting()
				this.getQuestionsPage()
				this.getreadingReviews()
				this.getTopicreplys()
			}
			if(wxUser.userRole!='0'){
				this.getSummation();
				this.getNominations();
			}
			
			
		},
		
		methods:{
		 getUserProfile(e) {
		    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
		    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
			let that=this;
		    wx.getUserProfile({
		      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
		      success: (res) => {
				  console.log("+++++++++++++++++++++++++++++++++++++")
				  console.log(res)
				  
				   console.log("+++++++++++++++++++++++++++++++++++++")
				   that.http(api.wxUserSave,"POST",res,false).then(reslut=>{
				   
				   console.log(reslut)
				   	
				   	that.userInfoGet()
				   	
				   })
				   
				   
		        // this.setData({
		        //   userInfo: res.userInfo,
		        //   hasUserInfo: true
		        // })
		      }
		    })
		  },
			toChanges:function(){
				let that=this;
				if(!getApp().globalData.wxUser.nickName){
					uni.showToast({
						title:'请先授权',
						icon:'none',
						duration:2000
					})
					return;
				}
				
				uni.navigateTo({
					url:'../register/home',
					events:{
						getss:function(data){
							that.userInfoGet();
						},
					}
				})
			},
			getTopicreplys:function(){
				let that=this;
				
				that.http(api.GetTopicreply2,'GET',{
					current: 1,
					size: 5,
					descs: 'create_time',
					auditStatus:0,
					replyTypes:'3'
				},false).then(res=>{
				//	console.log("审核户型回复")
				//	console.log(res)
					let list = res.data.records
					let replysNum=0
					for(let i = 0;i<list.length;i++){
						if(list[i].auditStatus=='0'){
							replysNum+=1
						}
					}
					that.replysNum=replysNum
				})	
			},
			getAwesomeshooting:function(){ //楼盘炫拍
				let that=this;
				that.http(api.Awesomeshootingredding,'GET',{
					current: 1,
					size: 5,
					descs: 'create_time', 
					auditStatus:0,
					//createId:getApp().globalData.wxUser.id,
				},false).then(res=>{
				//	console.log("审核炫拍")
				//	console.log(res)
					let hootingData=res.data.records
					let hootingNum=0
					for(let i =0;i<hootingData.length;i++){
						if(hootingData[i].auditStatus=='0'){
							hootingNum+=1
						}
						for(let j=0;j<hootingData[i].listTopicReply.length;j++){
							if(hootingData[i].listTopicReply[j].auditStatus=='0'){
								hootingNum+=1
							}
						}
					}
					that.hootingNum=hootingNum
				})
			},
			getQuestionsPage:function(){   //楼盘问答
				let that=this;
				that.http(api.QuestionsPage,'GET',{
					current: 1,
					size: 5,
					descs: 'create_time',
					auditStatus:0,
					
				},false).then(res=>{
			//	console.log("审核问答")
			//	console.log(res)
				let questionData=res.data.records
				let questionNum=0
						for(let i =0;i<questionData.length;i++){
							if(questionData[i].auditStatus=='0'){
								questionNum+=1
							}
							for(let j=0;j<questionData[i].listTopicReply.length;j++){
								if(questionData[i].listTopicReply[j].auditStatus=='0'){
									questionNum+=1
								}
							}
						}
						that.questionNum=questionNum
				})
			},
			getreadingReviews:function(){  //楼盘点评
				let that=this;
				that.http(api.ReadingReviews,'GET',{
					current:1,
					size: 5,
					descs: 'create_time',
					auditStatus:0,
				//	createId:getApp().globalData.wxUser.id,
					//userId:getApp().globalData.wxUser.id
				},false).then(res=>{
				//	console.log("审核点评")
				//	console.log(res)
					let reviewsData = res.data.records
					let reviewsNum=0
					for(let i =0;i<reviewsData.length;i++){
						if(reviewsData[i].auditStatus=='0'){
							reviewsNum+=1
						}
						for(let j=0;j<reviewsData[i].listTopicReply.length;j++){
							if(reviewsData[i].listTopicReply[j].auditStatus=='0'){
								reviewsNum+=1
							}
						}
					}
					that.reviewsNum=reviewsNum
					// that.reviewsData=res.data.records
				})
			},
			uploader:function(){
				let that=this;
				uni.chooseImage({
				count:1,
				sizeType:['original','compressed '],
				sourceType:['album','camera'],
				
				success:(res)=>{
					uni.showLoading({
						title:'上传中...'
					})
				//	console.log(res)
					let tempFilePaths=res.tempFilePaths
					uni.uploadFile({
						url:api.UpLoad,
						files:tempFilePaths,
						filePath: tempFilePaths[0],
						name: 'file',
						fileType:'image',
						header:{
							'app-id': wx.getAccountInfoSync().miniProgram.appId,
							'third-session': getApp().globalData.thirdSession
						},
						formData:{
							dir:'material',
							fileType:'image',
							},
						success:(res)=>{
							uni.hideLoading()
					//		console.log(res)
							
							      let erweima=JSON.parse(res.data)
						//	console.log(erweima)
							
							that.http(api.userInfoGet,'PUT',{
								id:getApp().globalData.wxUser.id,
								userQrcode:erweima.link
							},false).then(res=>{
						//		console.log(res)
								uni.showToast({
									title:'上传成功',
									icon:'success',
									duration:2000
								})
								that.userInfoGet()
							})
							
						}
					})
				}
				})
			},
			  userInfoGet:function(){
				  let that=this
			   this.http(api.userInfoGet,'GET',{},false)
			      .then(res => {
					  console.log("userInfoGet")
					console.log(res)
			         // userInfo: res.data
			      that.wxUser=res.data
			      getApp().globalData.wxUser=res.data
				  
			      })
			  },
			// login:function(){
			// 	let _self=this;
			// 	wx.login({
			// 	  success (res) {
			// 	    if (res.code) {
			// 	      //发起网络请求
			// 		  let code=res.code
			// 	//	  console.log(res)
					  
			
					 
			// 		_self.http(api.Longin,'POST',{jsCode:code},false).then(res=>{
			// 	//		console.log(res)
			// 			_self.wxUser=res.data
						
			// 			getApp().globalData.wxUser=res.data
						
			// 		})
			// 		wx.getSetting({
			// 		  success(res) {
			// 		//	  console.log(res)
			// 		    if (!res.authSetting['scope.userInfo']) {
			// 		      wx.authorize({
			// 		        scope: 'scope.userInfo',
			// 		        success:function (res) {
			// 					that.agreenGetUser()
			// 		  //       console.log(res)
			// 		        }
			// 		      })
			// 		    }
			// 		  }
			// 		})
						
					
			// 	    } else {
			// 	      console.log('登录失败！' + res.errMsg)
			// 	    }
			// 	  }
			// 	})
				
			
			// },
			userInfoGet:function(){
			 let that=this
			 this.http(api.userInfoGet,'GET',{},false)
			    .then(res => {
					
			    that.wxUser=res.data
				console.log(res)
			    getApp().globalData.wxUser=res.data
	
			    })
			},
			getNominations(){
				let that= this;
				that.http(api.Nominations,'GET',{},false).then(res=>{
					console.log("++++++++++++++++++++++++++++++++++++++++++++++++++");
					console.log(res);
					this.nominations =res.data.count
					console.log("++++++++++++++++++++++++++++++++++++++++++++++++++");
				})
			},
			getSummation:function(){
				let that=this;
				that.http(api.Summation,'GET',{},false).then(res=>{
					console.log("查看次数")
					console.log(res)
					that.summation=res.data
				})
			},
			agreenGetUser:function(e){
				console.log(e)
				
				let that=this;
			  if (e.detail.errMsg == 'getUserInfo:ok') {
				that.http(api.wxUserSave,"POST",e.detail,false).then(res=>{
				
				console.log(res)
					
					that.userInfoGet()
					
				})
				
		
			}
			},
			toChange: function(e){
				let step = e.currentTarget.dataset.cur;
				console.log(step)
				if(!getApp().globalData.wxUser.nickName){
					uni.showToast({
						title:'请先授权',
						icon:'none',
						duration:2000
					})
					return;
				}
				uni.navigateTo({
				    url: '../../pagestwo/mine-son/'+ step +'/home'
				});

			}
			
		}
		
	}
	
</script>

<style>
	.numData{
		margin-left: 300rpx;
		text-align: center;
		align-items: center;
		padding:5rpx 10rpx;
		background-color: red;
		color:#FFFFFF;
		border-radius: 50%;
	}
	.mine-box-d{
		/* border:solid 1rpx #000000; */
		margin-top:-126rpx;
		margin:-126rpx 30rpx 30rpx;
		border-radius:10rpx ;
		box-shadow: 0rpx 0rpx 18rpx 2rpx #EEEEEE;
	}
	.mini-items{
		
		text-align: center;
	}
	.number-share{
		/* margin-left: 20rpx; */
	}
	.mini-items-xian{
		width:2rpx;
		border:solid 1rpx #EEEEEE;
	}
	.share-name{
		margin:auto;
	}
	.mine-center-number{
		/* border:solid 1rpx #000000; */
		display: flex;
		align-content: center;
		justify-content: space-between;
		padding:40rpx 30rpx;
		/* box-shadow: 0rpx 0rpx 18rpx 2rpx #EEEEEE; */
		/* margin:0rpx 30rpx 20rpx; */
		/* border-radius: 10rpx; */
	}
	.mine-center-s{
		display: flex;
		align-items: center;
		justify-content: space-around;
		
	}
	.jszc{
		height:30rpx;
		/* width:100%; */
		text-align: center;
		font-size: 24rpx;
		color:#d3d3d3;
	}
	.mine-bottom-myself{
		position: fixed;
		bottom:120rpx;
		left: 0;
		width:100%;
		/* border:solid 1rpx #333333; */
		height: 100rpx;
		
		
	}
	.mine-center-erweima{
		background-color: #EEEEEE;
		padding:0rpx 20rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
	}
	.mine-erweima{
		margin-top:70rpx;
		height: 60rpx;
		width: 60rpx;
	}
	.mine-gxnc-dian{
		box-shadow: 0rpx 0rpx 1rpx 2rpx pink;
	}
	.mine-gxnc{
		margin-left: 20rpx;
		border:solid 1rpx pink;
		border-radius: 30rpx;
		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		padding:0rpx 20rpx;
		margin-top:10rpx;
	}
	.mine-conston-text{
		margin-left: 30rpx;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.mine-conston-imgs{
		width: 40rpx;
		height: 38rpx;
		margin-left: 15rpx;
	}
	.mine-conston-img{
		width: 36rpx;
		height: 34rpx;
		margin-left: 15rpx;
	}
	.positions{
		width:15rpx;
		height:25rpx;
		color: #FFC6C6C6;
		position: absolute;
		margin-left: 80%;	
	}
	.mine-conston-item{
		height:120rpx;
		border-bottom: solid 1rpx #FFEDECEC;
		display: flex;
		align-items: center;
	}
	.mine-conston{
		margin:30rpx 30rpx 0rpx;
		width:688rpx;	
		background:rgba(255,255,255,1);
		box-shadow:0rpx 9rpx 20rpx 4rpx rgba(213,213,213,0.38);
		border-radius:12rpx;
		padding:0rpx 30rpx;
	}
	.mine-center-tag{
		margin-left:33rpx;
		margin-top:10rpx;
		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);	
	}
	.mine-center-names{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		width:200rpx;
		height: 50rpx;
		line-height: 50rpx;
		margin-top:74rpx;
		margin-left:33rpx;	
	}
	.mine-center-name{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin-top:74rpx;
		margin-left:33rpx;
		width:200rpx;
		/* border:solid 1rpx #000000; */
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.mine-center-img{
		width:113rpx;
		height:113rpx;
		border-radius:50%;
		margin-left: 32rpx;
		margin-top:52rpx;
	}
	.mine-zong-center{
		position: absolute;
		z-index: 99;
	}
	.mine-center{
		display: flex;
		width:690rpx;
		/* height:221rpx; */
		background:rgba(255,255,255,1);
		/* box-shadow:0rpx 5rpx 19rpx 2rpx rgba(213,213,213,0.22); */
		border-radius:12rpx;
		/* margin:0rpx 30rpx; */
		
		
		padding-bottom: 20rpx;
	}
	.mine-top-text{
		position: absolute;
		z-index: 99;
		margin-top:-255rpx;
		margin-left:29rpx;
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
		
		
	}
	
	.mine-top-img{
		
		height: 322rpx;
		width: 750rpx;
	}
	.mine-center-right-one{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.mine{
		width:750rpx;
		height:100vh;
		background:rgba(255,255,255,1);
	}
</style>
