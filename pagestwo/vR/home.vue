<template>
	<view class="">
		<web-view class="" :src="srcTd" >
		</web-view>
	</view>
	
</template>

<script>
    export default {
        onLoad(options) {
            console.log(options);
            this.srcTd = options.srcTd
        },
        data:function(){
            return {
               srcTd:"" 
            };
        },
    }
</script>
    
<style>
</style>
