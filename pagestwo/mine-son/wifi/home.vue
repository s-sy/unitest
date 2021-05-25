<template>
	<view class="wifi-vips">
		
			<cu-custom bgColor="" :isBack="true">
				<block slot="backText"></block>
				<block slot="content" class="title-text">关注户型</block>
			</cu-custom>
			<kong v-bind:content='contents' ></kong>
		
		
	</view>
	
</template>

<script>
	export default {
		name:'wifi',
		data: function(){
			return {
				contents:{
					content:"暂时没有关注户型哦~",
					url:"https://img.0728jh.com/staticImg/konghu_gz.png",
					btn:"去关注",
				}
				
		   }
		},
		onLoad: function(){
			console.log("11111")
		}
	}
</script>

<style>
	.wifi-vips{
		height:100vh;
		background:rgba(255,255,255,1);
	}
</style>

