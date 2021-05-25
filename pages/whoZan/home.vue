<template>
	<view class="">
		<cu-custom bgColor="" :isBack="true">
				 <block slot="backText"></block>
				 <block slot="content" class="title-text">谁赞了我</block>
		</cu-custom>
		<view class="" v-for="item in data.upvote">
			<zan :zandata="item"></zan>
		</view>
	</view>
	
	
</template>

<script>
	export default {
		data:function(){
			return {
				data:'',
			}
		},
		methods:{
			
		},
		onLoad(option) {
			const data = JSON.parse(decodeURIComponent(option.data));
			this.data=data;
		//	console.log(data)
		}
	}
</script>

<style>
</style>
