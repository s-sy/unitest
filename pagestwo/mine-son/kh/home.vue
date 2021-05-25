<template>
	<view class="kh-vips">
		
			<cu-custom bgColor="" :isBack="true">
				<block slot="backText"></block>
				<block slot="content" class="title-text">我的客户</block>
			</cu-custom>
			<kong v-if="wode.length != 0" v-bind:content='contents'></kong>
			<view v-else class="kh-has">
				<image class="kh-has-img" src="https://img.0728jh.com/staticImg/bannerkh.png" mode=""></image>
				<view class="kh-has-top">
					<input class="kh-has-input" type="sreach"  :value="inputValue" placeholder="请输入客户或客户电话" placeholder-class="sreach-input-placeholder" @input="inputChange"/>
					<image class="kh-has-sou" src="https://img.0728jh.com/staticImg/sousuo_icon.png"></image>
					<image class="kh-has-tu" src="https://img.0728jh.com/staticImg/pic.png"></image>
				</view>
				<!-- <view class="kh-has-title">
					<view class="kh-has-padding-title">
						<block v-for="item in titleName" :key="index">
						<view class="kh-has-item" v-on:click="changeKHData" :data-keyword="item.keyword">
							<view :class="keyword==item.keyword?'kh-has-text-copy':'kh-has-text'" >
								{{item.name}}
							</view>
							<view :class="keyword==item.keyword?'kh-has-xian-copy':'kh-has-xian'">
								
							</view>
						</view>
						</block>
					</view>
				</view> -->
			<view class="" >
					
				<block v-for="item in copylistData">
				<view class="kh-user-items" @click="detailCostomer" :data-items="item">
					<view class="kh-user-top">
						<view class="kh-user-name">
						{{item.customerName}}	
						</view>
						<view class="kh-user-sex margin-left-xl">
							{{item.gender=="1"?"男":"女"}}	
						</view>
						<view class="tag">
						{{item.workflowStatus=='0'?"正常":item.workflowStatus=='1'?"完结":item.workflowStatus=='2'?"冻结":item.workflowStatus=='3'?"延期":"无效客户"}}
						</view>
					</view>
					<view class="kh-user-phone">
						{{item.phone}}	
					</view>
				</view>
				</block>
			</view>
				<!-- <view class="kh-body">
					<view class="kh-body-top">
						<view class="kh-body-name">
							刘女士
						</view>
						<view class="kh-body-call">
							联系电话：18666086491
						</view>
						<view class="kh-body-yx">
							<image class="kh-body-yx-img" src="https://img.0728jh.com/staticImg/yixinag.png"></image>
							<view class="kh-body-yx-text">
								想买一套三室二厅的房子，在高层，风景好
							</view>
						</view>
					</view>
					<view class="kh-body-bottom">
						<view class="kh-body-bottom-one">
							<view class="kh-body-dian">
								
							</view>
							<view class="kh-body-bottom-text">
								曾唠叨查看了3栋23户
							</view>
							<view class="kh-body-bottom-date">
								2019.9.26
							</view>
						</view>
						<view class="kh-body-bottom-one">
							<view class="kh-body-dian">
								
							</view>
							<view class="kh-body-bottom-textw">
								带看了带看了...
							</view>
							<view class="kh-body-bottom-textw-zk">
								展开
							</view>
						</view>
					</view>
				</view> -->
				
				
				<view class="">
					
				</view>
				
			</view>
		
	</view>
	
</template>

<script>
	import api from '../../../pages/api/home.js'
	export default {
		name:'kh',
		data: function(){
			return {
				inputValue:"",
				keyword:'',
				titleName:[{name:"邀约", keyword:"yy"},{name:"来访",keyword:'lf'},{name:"认筹",keyword:'rc'},{name:"下定",keyword:'xd'},{name:"签合同",keyword:'qct'},{name:"结佣金",keyword:'jyj'}],
				wode:[],
				contents:{
					content:"空空如也，暂时没有客户哦~",
					url:"https://img.0728jh.com/staticImg/kong_dp.png",
					btn:"",
					key:'dp'
				},
				wxUser:'',
				listData:[],
				copylistData:[],
		   }
		},
		methods:{
			inputChange(e){
				console.log(e)
				let name =e.detail.value;
				console.log(name)
				let that=this;
				let list=[];
				let listData=[].concat(that.listData);
				for(let i =0;i<listData.length;i++){
					let cusName=listData[i].customerName
					let cusPhone=listData[i].phone
					console.log(listData[i].customerName)
					console.log(listData[i].phone)
					if(cusName.indexOf(name)!=-1 || cusPhone.indexOf(name)!=-1){
						list.push(listData[i])
					}
					
					
				}
				that.copylistData=list
			},
			changeKHData:function(e){
				
				this.keyword=e.currentTarget.dataset.keyword
				
			},
			// getReferrals(){
			// 	let that = this;
			// 	that.http(api.Referrals+'/get','GET',{
			// 		id:'1310388275707846657'
			// 	},false).then(res=>{
			// 		console.log("woe")
			// 		console.log(res)
			// 	})
			// },
			postReferrals(){
				let that=this;
				let wxUser=that.wxUser;
				let projectItem = getApp().globalData.projectItem;
				console.log(getApp().globalData)
				console.log(wxUser);
			
				that.http(api.Referrals+'/page','POST',{
					currentPage:1,
					pageSize:100,
					brokerId:wxUser.id,
					affiliationId:projectItem.id,
					desc:"create_time"
					//tenantId:wxUser.tenantId
					//currentHandler:
					//customerName:
					//phone:
				},false).then(res=>{
					console.log("mycoustom")
					console.log(res)
					that.listData=res.data.referrals
					that.copylistData=res.data.referrals
				})
			},
			deleteReferrals(){
				let that=this;
				let id =null;
				that.http(api.Referrals+'/'+id,'Delete',{},false).then(res=>{
					console.log("delete")
					console.log(res)
				})
			},
			getCustom:function(){
				let that=this;
				let wxUser= that.wxUser
				if(wxUser.userType=='0'){
					that.http(api.Custom,'GET',{
						senderId:that.wxUser.id
					},false).then(res=>{
						console.log(res)
						let senderData=res.data.records
						for(let item of senderData){
							item.details=(item.details || '').split(',')
						}
						console.log(senderData)
						that.listData=senderData
						that.copylistData=senderData
					})
				}else{
					that.http(api.Custom,'GET',{
						receiverId:that.wxUser.id
					},false).then(res=>{
						console.log(res)
						let receiverData=res.data.records
						for(let item of receiverData){
							item.details=(item.details || '').split(',')
						}
						console.log(receiverData)
						that.listData=receiverData
						that.copylistData=senderData
					})
				}
				
				
			},
			detailCostomer(value){
				console.log(value);
				
				var id = value.currentTarget.dataset.items.id
				uni.navigateTo({
					url:"../../costomerDetail/home?id="+id
				})
			}
		},
		onLoad: function(){
			console.log("11111")
			this.wxUser=getApp().globalData.wxUser
			this.getCustom()
			//this.getReferrals()
			this.postReferrals()
		}
	}
</script>

<style>
	.tag{
		margin-left: 20rpx;
		font-size: 20rpx;
		border-radius: 10rpx;
		border: solid 1rpx pink;
		padding: 1rpx 5rpx;
		line-height: 22rpx;
		height: 24rpx;
		margin-top:10rpx;
	}
	.kh-user-items{
		padding:20rpx 30rpx;
		margin:20rpx 20rpx;
		box-shadow: 0rpx 0rpx 22rpx 4rpx #EEEEEE; 
		border-radius: 10rpx;
		line-height: 50rpx;
	}
	.kh-user-top{
		display: flex;
	}
	
	/**
	 * 	客户
	 */
	.kh-body-bottom-textw-zk{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color: #00CAE8;
	}
	.kh-body-bottom-textw{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(102,102,102,1);
		
		margin-left: 15rpx;
	}
	.kh-body-bottom-date{
		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		position: absolute;
		margin-left: 70%;
	}
	.kh-body-bottom-text{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(102,102,102,1);
		margin-left:15rpx;
	}
	.kh-body-dian{
		width:17rpx;
		height:17rpx;
		background:rgba(0,202,232,1);
		border-radius:50%;
	}
	.kh-body-bottom-one{
		display: flex;
		line-height: 50rpx;
		align-items: center;
		margin-bottom: 26rpx;
	}
	.kh-body-bottom{
		margin-top:10rpx;
	}
	.kh-body-yx-text{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(102,102,102,1);
		margin-left:10rpx ;
	}
	.kh-body-yx-img{
		width: 80rpx;
		height: 25rpx;
	}
	.kh-body-yx{
		display: flex;
		align-items: center;
	
	}
	.kh-body-call{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		margin-bottom: 28rpx;
		
	}
	.kh-body-name{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin-bottom: 27rpx;
		
	}
	.kh-body-top{
		border-bottom: solid 1rpx #EEEEEE;
		padding-bottom: 20rpx;
		
	}
	.kh-body{
		background:rgba(255,255,255,1);
		box-shadow:0rpx 5rpx 19rpx 2rpx rgba(236,236,236,0.49);
		border-radius:20rpx;
		margin:30rpx;
		padding:40rpx 30rpx;
	}
/**
 * 	标题导航	
 */
.kh-has-xian-copy{
		background:rgba(0,202,232,1);
		border-radius:4rpx;
		width:43rpx;
		height:8rpx;
		margin:auto;
	}
	.kh-has-xian{
		
		border-radius:4rpx;
		width:43rpx;
		height:8rpx;
		margin:auto;
	}
	.kh-has-item{
		
	}
	.kh-has-text-copy{
		margin-bottom: 23rpx;
		color:rgba(51,51,51,1);
	}
	.kh-has-text{
		margin-bottom: 23rpx;
	}
	.kh-has-padding-title{
		display: flex;
		border-bottom: solid 1rpx #EEEEEE;
		justify-content: space-between;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		
	}
	.kh-has-title{
		padding:30rpx;
	}
	/**
	 * 搜索输入
	 */
	.sreach-input-placeholder{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(178,178,178,1);
		opacity:0.8;
	}
	.kh-has-input{
		width:550rpx;
		height:80rpx;
		background:rgba(255,255,255,1);
		border-radius:40rpx;
		padding-left:70rpx;
	}
	.kh-has-top{
		display: flex;
		align-items: center;
		margin-top:-140rpx;
		position: absolute;
		z-index: 99;
		padding-left: 22rpx;
	}
	.kh-has{
		
	}
	.kh-has-sou{
		height: 30rpx;
		width:30rpx;
		position: absolute;
		margin-left: 30rpx;
	}
	.kh-has-tu{
		height:81rpx;
		width:158rpx;
		margin-left:20rpx;
	}
	.kh-has-img{
		height: 190rpx;
		width:750rpx;
		
	}
	.kh-vips{
		height:100vh;
		background:rgba(255,255,255,1);
	}
</style>

