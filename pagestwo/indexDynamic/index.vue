<template>
	<view class="">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="title-text">企业动态</block>
		</cu-custom>
		
		<view class="" v-for="item in 6">
			
		
		<view class="text-center margin-top-sm">
			6月12日
		</view>
		<view class="" @tap="goToFind">
			<view class="">
				<image class="" style="width:100%;" src="http://g.hiphotos.baidu.com/image/pic/item/6d81800a19d8bc3e770bd00d868ba61ea9d345f2.jpg" mode=""></image>
			</view>
			<view class="_text">
				新邦网络为武汉加油！
			</view>
		</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data:function(){
			return {
				
			};
		},
		methods:{
			goToFind(){
				uni.navigateTo({
					url:"../find/home"
				})
			}
		}
	}
</script>

<style>
	._text{
		position: absolute;
		z-index: 4;
		background-color: #000000;
		opacity: 0.5;
		width:100%;
		line-height: 100rpx;
		height:100rpx;
		padding-left: 20rpx;
		color: #FFFFFF;
		margin-top:-100rpx;
		/* top: 20rpx; */
		
	}
</style>
