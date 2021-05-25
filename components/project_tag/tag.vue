<template>
	<view class="flex">
		<view :class="salesStatus==0?'stateone':salesStatus==1?'statetwo':salesStatus==2?'stateshr':'saleState'">
			{{titleData[salesStatus]}}
		</view>
		<view class="item_tag" v-for="(item,index) in tagData" v-if="index<3">
			{{item}}
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			tagData:{
				type:Array,
				default:['高端住宅','商业中心','文旅综合体'],
			},
			salesStatus:{
				type:Number,
				default:0,
			}
			
		},
		
		data:function(){
			return {
				titleData:["热销","即开","售罄"]
			}
		}
	}
</script>

<style>
	.saleState{
		background-color: #00BFFF;
		color: #FFFFFF;
		border-radius: 10rpx;
		padding:5rpx 10rpx;
		margin:5rpx;
	}
 .item_tag{
	 background-color: #000000;
	 opacity: 0.75;
	 color: #FFFFFF;
	 border-radius: 10rpx;
	 padding:5rpx 10rpx;
	 margin:5rpx;
 }
 .stateone {
 		background:rgba(255, 89, 89, 1) ;
 		color: rgba(225, 251, 243, 1);
		border-radius: 10rpx;
		padding:5rpx 10rpx;
		margin:5rpx;
 	}
 
 	.statetwo {
 		background: rgba(8, 193, 137, 1);
 		color: rgba(252, 241, 217, 1);
 		border-radius: 10rpx;
 		padding:5rpx 10rpx;
 		margin:5rpx;
 	}
 /*  */
 	.stateshr {
 		background: rgba(255, 230, 230, 1);
 		color: #999999;
 	    border-radius: 10rpx;
     	padding:5rpx 10rpx;
 	    margin:5rpx;
 	}
 
 	
</style>
