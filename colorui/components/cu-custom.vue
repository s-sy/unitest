<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action"  v-if="isBack">
					<text v-if="fanhui && senen &&!home && ischart" class="cuIcon-back" @tap="BackPage"></text>
					<text v-if="fanhui && !home" class="cuIcon-home" @tap="goHome"></text>
					<text  v-if="fanhui && home" :class="'cuIcon-homefill'" @tap="goHomes"></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			senen:{
				type:Boolean,
				default:true
			},
			ischart:{
				type:Boolean,
				default:true
			},
			home:{
				type:Boolean,
				default:false,
			},
			fanhui:{
				type: [Boolean, String],
				default: true
			},
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		methods: {
			goHome(){
				console.log("单个楼盘首页")
				uni.redirectTo({
					url:"/pages/index/index"
				})
			},
			goHomes(){
				console.log("多个楼盘首页")
				getApp().globalData.projectItem=null;
				getApp().globalData.distribution=null;
				uni.redirectTo({
					url:"/pages/index/index"
				})
			},
			BackPage() {
				console.log("返回上一层")
				if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
					let url = '/' + __wxConfig.pages[0]
					return uni.redirectTo({url})
				}
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>

</style>
