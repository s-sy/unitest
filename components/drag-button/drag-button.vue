<template>
	
	<view >
		<view 
		
			id="_drag_button"
			class="drag"
			:style="'left: ' + left + 'px; top:' + top + 'px;'"
			@touchstart="touchstart"
			@touchmove.stop.prevent="touchmove"
			@touchend="touchend"
			@click.stop.prevent="click"
			:class="{transition: isDock && !isMove }">
			<text>{{ text }}</text>
			<view v-if="unReard!=0 && unReard<=99" class="tags">{{unReard}}</view>
			<view v-if="unReard>99" class="tags">99<text v-if="unReard>99">+</text></view>
		</view>
		
		
	</view>
	
</template>

<script>
	export default {
		name: 'drag-button',
		props: {
			isDock:{
				type: Boolean,
				default: false
			},
			existTabBar:{
				type: Boolean,
				default: false
			},
			textStr:{
				type: String,
				default:''
			},
			edgetop:{
				type:Number,
				default:80
			},
			edgeleft:{
				type:Number,
				default:15
			},
			unReard:{
				type:Number,
				default:0
			}
		},
		computed:{
			// y:(){
			// 	if(this.unReard>99){
			// 		 this.unReard=99;
			// 	}
			// },
		},
		data() {
			return {
				top:0,
				left:0,
				width: 0,
				height: 0,
				offsetWidth: 0,
				offsetHeight: 0,
				windowWidth: 0,
				windowHeight: 0,
				isMove: true,
				// edge: 50,
				text: '导航'
			}
		},
		mounted() {
		
			this.text=this.textStr
			
			
			
			const sys = uni.getSystemInfoSync();
			
			this.windowWidth = sys.windowWidth;
			this.windowHeight = sys.windowHeight;
			
			// #ifdef APP-PLUS
				this.existTabBar && (this.windowHeight -= 200);
			// #endif
			if (sys.windowTop) {
				this.windowHeight += sys.windowTop;
			}
			console.log(sys)
			
			const query = uni.createSelectorQuery().in(this);
			query.select('#_drag_button').boundingClientRect(data => {
				this.width = data.width;
				this.height = data.height;
				this.offsetWidth = data.width / 2;
				this.offsetHeight = data.height / 2;
				this.left = this.windowWidth - this.width - this.edgeleft;
				this.top = this.windowHeight - this.height - this.edgetop;
			}).exec();
		},
		methods: {
			click() {
				this.$emit('btnClick');
			},
			touchstart(e) {
				this.$emit('btnTouchstart');
			},
			touchmove(e) {
				// 单指触摸
				if (e.touches.length !== 1) {
					return false;
				}
				
				this.isMove = true;
				
				this.left = e.touches[0].clientX - this.offsetWidth;
				
				let clientY = e.touches[0].clientY - this.offsetHeight;
				// #ifdef H5
					clientY += this.height;
				// #endif
				let edgeBottom = this.windowHeight - this.height - this.edgetop;

				// 上下触及边界
				if (clientY < this.edgetop) {
					this.top = this.edgetop;
				} else if (clientY > edgeBottom) {
					this.top = edgeBottom;
				} else {
					this.top = clientY
				}
				
			},
			touchend(e) {
				if (this.isDock) {
					let edgeRigth = this.windowWidth - this.width - this.edgeleft;
					
					if (this.left < this.windowWidth / 2 - this.offsetWidth) {
						this.left = this.edgeleft;
					} else {
						this.left = edgeRigth;
					}
					
				}
				
				this.isMove = false;
				
				this.$emit('btnTouchend');
			},
		}}
</script>

<style lang="scss">
	.tags{
		position: absolute;
		z-index: 999999;
		// padding: 5rpx;
		top: -10rpx;
		color: white;
		font-size: 18rpx;
		padding:8rpx;
		background-color:red;
		border-radius: 50%;
	}
	.drag {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		box-shadow: 0 0 6upx rgba(0, 0, 0, 0.4);
		color: $uni-text-color-inverse;
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		font-size: $uni-font-size-sm;
		position: fixed;
		z-index: 999999;
		
		&.transition {
			transition: left .3s ease,top .3s ease;
		}
	}
	
</style>
