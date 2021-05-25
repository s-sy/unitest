<template>
	<view class="tx-vips">
		
			<cu-custom bgColor="bg-white" :isBack="true">
				<block slot="backText"></block>
				<block slot="content" class="title-text">裂变客户</block>
			</cu-custom>
			<scroll-view scroll-y="true" >
				<view class="tx-items" v-for="item in fissionData" >
					<fission :fissionItem="item"></fission>
				</view>
			</scroll-view>
			
		
	</view>
	
</template>

<script>
	import fission from '../../components/fission/home.vue'
	import api from '../../../pages/api/home.js'
	export default {
		name:'tx',
		components:{
			fission
		},
		data: function(){
			return {
				txData:[],
				fissionData:[],
				contents:{
					content:"暂时没有提醒哦，快去设置吧~",
					url:"https://img.0728jh.com/staticImg/kong_tx.png",
					btn:"去设置",
					key:'tx'
				}
				
		   }
		},
		methods:{
			getFissionUserData:function(){
				let that=this;
				that.http(api.FissionUser,'GET',{},false).then(res=>{
					console.log("裂变数据")
					console.log(res)
					that.fissionData=res.data
				})
			}
		},
		onLoad: function(){
			
			this.getFissionUserData()
		}
	}
</script>

<style>
	.tx-items{
		margin: 10rpx 30rpx;
		box-shadow: 0rpx 0rpx 10rpx 2rpx #EEEEEE;
	}
	.tx-has-items-wei-date{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		line-height:36rpx;
	}
	.tx-has-items-wei-text{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:36rpx;
	}
	.tx-has-items-wei{
		display: flex;
		width:450rpx;
		justify-content: space-between;
	}
	.tx-has-items-text-li-lable{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		opacity:0.9;
		
	}
	.tx-has-items-text-li{
		width:134rpx;
		height:40rpx;
		border:1rpx solid rgba(102,102,102,1);
		opacity:0.5;
		border-radius:20rpx;
		text-align:  center;
		font-size:24rpx;
		line-height: 40rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		
	}
	.tx-has-items-text{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:36rpx;
		margin-left: 10rpx;
		text-align: center;
	}
	.tx-has-items-y{
		width:520rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.tx-has-items-dian{
		width:17px;
		height:17px;
		background:rgba(248,0,0,1);
		border-radius:50%;
	}
	.tx-has-items-right-top{
		display: flex;
		align-items: center;
	}
	.tx-has-items-right{
		width: 528rpx;
		margin-left: 20rpx;
	}
	.tx-has-items-img{
		height: 85rpx;
		width: 84rpx;
		margin-left: 28rpx;
	}
	.tx-has-items{
		width:690rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 5rpx 19rpx 2rpx rgba(236,236,236,0.31);
		display: flex;
		align-items: center;
		padding:45rpx 0rpx;
		margin: 10rpx 0rpx;
	}
	.tx-has{
		padding:20rpx 30rpx;
	}
	.tx-vips{
		height:100vh;
		background:rgba(255,255,255,1);
	}
</style>

