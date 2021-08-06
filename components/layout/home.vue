<template>
	<view class="layout">
		<image class="layout-img" :src="layoutData.src?layoutData.src:'https://img.0728jh.com/staticImg/banner_pic.png'" mode=""></image>
        <view class="vr" v-if="layoutData.srcTd">
            
            <image  src="https://img.kehuoa.com/staticImg/vrlook.png" mode="aspectFill"></image>
          <!--  <image  src="https://img.kehuoa.com/staticImg/vrz.png"></image> -->
        </view>
		<view class="layout-center">
			<view class="layout-center-on">
				<view class="layout-center-on-text">
					 {{layoutData.type}}
				</view>
				<!-- <image class="layout-center-on-tag" src="https://img.0728jh.com/staticImg/sell_pic.png"></image> -->
				<view v-if="shopIndex==0 || shopIndex==1 || shopIndex==2" :class="shopIndex==0?'layout-center-on-tag-zreo':shopIndex==1?'layout-center-on-tag-one':shopIndex==2?'layout-center-on-tag-two':''">
					{{shopState[shopIndex]}}
				</view>
			</view>
			<view class="layout-center-tw">
				<view class="">
					{{layoutData.name}}
				</view>
				<view class="layout-center-floorage">
					{{layoutData.floorage}}㎡
				</view>
			</view>
			<view class="layout-center-sh">
			{{layoutData | pricefiflter}}
			</view>
		</view>
		<view class="layout-right" @click="toLayoutDetails" :data-id="layoutData.id">
			查看更多
		</view>
       
	</view>
</template>

<script>
	export default {
		props:{
			layoutData:{
				type:Object,
				default:null,
			},
		},
		data:function(){
			return {
				 // 0在售 1待售 2售馨
				shopState:['在售','即开','售馨'],
				
			}
		},
		computed:{
			shopIndex:function(){
                // console.log("-----------------------------")
                // console.log(this.layoutData)
                // console.log("-----------------------------")
				return parseInt(this.layoutData.salesStatus) 
			}
		},
		filters:{
			pricefiflter:function(value){
				// console.log(value.price)
				
				
				
					let BaseBudding=getApp().globalData.BaseBudding
					if(value&&BaseBudding&&BaseBudding.price){
						
						let BaseBuddingprice=parseFloat(BaseBudding.price)
						let floorage=parseFloat(value.floorage)
						let price = parseFloat(value.price) 
						// || parseInt(getApp().globalData.BaseBudding.price)
						let total =((floorage*price)/10000).toFixed(2)
						if(!total || total=="NaN"){
							total=((floorage*BaseBuddingprice)/10000).toFixed(2)
						}
						if(!total || total=="NaN"){
							return '总价待定';
						}
						
						return '约'+total+'万/套';
						
					}
					
				
				
				
				
				// if(value){
				// 	let prices= value["price"]
				// 	console.log("----------")
				// 	console.log(prices.replace(/[^\d]/g,''))
				// 	if(!value['floorage'].replace(/[^\d]/g,'')){
				// 		return '总价待定';
				// 	}
				// 	let floorage=parseFloat(value.floorage)
				// 	if(!prices.replace(/[^\d]/g,'')){
				// 		if(getApp().globalData.BaseBudding['price'].replace(/[^\d]/g,'')){
				// 			return '总价待定';
				// 		}else{
				// 			let BaseBuddingprice=parseFloat(getApp().globalData.BaseBudding.price)
				// 			total=((floorage*BaseBuddingprice)/10000).toFixed(2)
				// 			return '约'+total+'万/套';
				// 		}
						
				// 	}else{
				// 		let price = parseFloat(value.price)
				// 		let total =((floorage*price)/10000).toFixed(2)
				// 		return '约'+total+'万/套';
				// 	}
				// 	}
					// let price = parseFloat(value.price)
					// console.log(price)
					// let BaseBuddingprice=parseFloat(getApp().globalData.BaseBudding.price)
					// let floorage=parseFloat(value.floorage)
					// // let price = parseFloat(value.price)
					// console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++")
					// console.log(value)
					// console.log(price)
					// console.log(floorage)
					// console.log(BaseBuddingprice)
					// let total =((floorage*price)/10000).toFixed(2)
					
					// if(!total){
					// 	total=((floorage*BaseBuddingprice)/10000).toFixed(2)
					// }
					// if(!total){
					// 	return '总价待定';
					// }
					
					// return '约'+total+'万/套';
				// }
				
				
			}
		},
		methods:{
			toLayoutDetails:function(e){
			//	console.log('toLayoutDetails')
				let id = e.currentTarget.dataset.id
				uni.navigateTo({
					url: '../../pagestwo/layoutDetails/home?id='+id
				})
			}
		}
		
	}
</script>

<style>
	.layout-center-floorage{
		margin-left: 20rpx;
	}
	.layout-right{
		width:149rpx;
		height:60rpx;
		border:1rpx solid rgba(153,153,153,1);
		border-radius:30rpx;
		margin-top:45rpx;
		text-align: center;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:60rpx;
		position: absolute;
		margin-left: 500rpx;
	}
	.layout-center-sh{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(237,48,48,1);
		margin-top:56rpx;
	}
	.layout-center-tw{
		display: flex;
		margin-top:18rpx;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
	
	
	
	.layout-center-on-tag-two{
		background:rgba(225,242,251,1);
		color:rgba(90,161,251,1);
		padding:4rpx 10rpx;
		font-size: 20rpx;
		margin-left: 10rpx;
		border-radius: 8rpx;
	}
	.layout-center-on-tag-one{
		color:rgba(252,168,47,1);
		background:rgba(252,241,217,1);
		padding:4rpx 10rpx;
		font-size: 20rpx;
		margin-left: 10rpx;
		border-radius: 8rpx;
	}
	.layout-center-on-tag-zreo{
		background:rgba(255,230,230,1);
		color:rgba(255,89,89,1);
		padding:4rpx 10rpx;
		font-size: 20rpx;
		margin-left: 10rpx;
		border-radius: 8rpx;
	}
	.layout-center-on-tag{
		width: 61rpx;
		height: 32rpx;
		margin-left:15rpx;
	}
	.layout-center-on-text{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.layout-center-on{
		display: flex;
		align-items: center;
	}
	.layout-center{
		position: absolute;
		margin-left: 251rpx;
	}
	.layout-img{
		height: 183rpx;
		width: 183rpx;
		background:rgba(229,229,229,1);
	}
	.layout{
		width:692rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 3rpx 9rpx 0rpx rgba(198,198,198,0.22);
		margin:30rpx 0rpx;
		display: flex;
		align-items: center;
		
		padding:34rpx 32rpx 33rpx 31rpx;
	}
    .vr{
        position: absolute;
    
     
        z-index: 99;
        height: 183rpx;
        width: 183rpx;   
    }
   .vr image:nth-child(1) {
        width:60rpx;
        height:45rpx;
        border-radius: 5rpx;
       
        
    }
    
    
</style>
