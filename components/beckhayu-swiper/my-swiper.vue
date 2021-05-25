<template>
	<view class="main">
		<view class="content" :style="'color:'+color+';background-color:'+backgroundColor+';border-color:'+borderColor+';height:'+height">
			<view v-for="(item,index) in list" :key="index">
				<view class="swiper-item" v-if="showIndex==index" :style="'line-height:'+height">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			"borderColor":{
				type:String,
				default:'#FFFFFf',
			},
			"color":{
				type:String,
				default:'#181924',
			},
			"backgroundColor":{
				type:String,
				default:'white',
			},
			"list":{
				type:Array,
				default:[],
			},
			"height":{
				type:String,
				default:'90rpx',
			},
		},
		data(){
			return{
				showIndex:0, //当前展示的轮播
				timer:{},
			}
		},
		beforeDestroy(){
			clearInterval(this.timer);
		},
		mounted(){
			this.timer=setInterval(()=>{
				this.showIndex=this.showIndex==(this.list.length-1)?0:++this.showIndex;
			},2900)
		}
	}
</script>

<style lang="less" scoped>
	.main{
		width: 100%;
		display: flex;
		justify-content: center;
		.content{
			width: 90%;
			// height: 90rpx;
			box-sizing: border-box;
			border-style: solid;
			border-width: 1rpx;
			border-radius: 8rpx;
			position: relative;
			display: flex;
			justify-content: center;
			overflow: hidden;
			.swiper-item{
				font-size: 32rpx;
				width: 90%;
				height: 100%;
				text-align: center;
				// line-height: 90rpx;
				position: absolute;
				top:50%;
				left: 50%;
				transform: translate(-50%,-50%);
				// transform: translate(0px, 0%) translateZ(0px);
				// will-change: transform;
				animation: animation-key 3s linear 0s 1 normal;
				// animation: text-2 0.7s ease-in 3s 1 normal;
			}
		}
		
		
		@keyframes animation-key{
			0%{
				top:100%;
			}
			10%{
				top:50%;
			}
			80%{
				top:50%
			}
			100%{
				top:-50%
			}
			
		}
		
	}
</style>
