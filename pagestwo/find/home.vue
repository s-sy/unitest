<template>
	<view class="">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="title-text">发现</block>
		</cu-custom>
		
		
	</view>
</template>

<script>
	export default{
		data:function(){
			return {
				
			}
		},
		onLoad(options) {
			console.log(options)
		},
		onShareAppMessage() {
			
		},
		onShareTimeline(){
			   return {
			                        title: '我的自定义标题',
			                        query: 'name=xxx&age=xxx',
			                       
			                    }
		},
	
	}
</script>

<style>
</style>
