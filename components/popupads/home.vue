<template>
	<!-- v-if="popupadsData.picUrls && popupadsData.enable=='1' && timebetween && popupaShow" -->
	<view class="" v-if="(popupadsData.enable=='1' && popupaShow ) && timebetween">
		
	
	<view class="cu-modal"  :class="modalName=='Image'?'show':''" >
		<view class="cu-dialog">
			<view class="bg-img" v-if="popupadsData.picUrls" :style="'background-image: url('+popupadsData.picUrls+');height:1000rpx;width:500rpx'">
				<view class="cu-bar justify-end ">
					<!-- <view class="action" @tap="hideModal">
						<text class="cuIcon-close"></text>关闭
					</view> -->
					
					<view class="cu-capsule round ">
						<view class='cu-tag bg-black ' @tap="hideModal">
							关闭
						</view>
						<view class="cu-tag bg-black  text-color">
							{{time}}s
						</view>
					</view>
					<!-- <view class="action" v-if="popupadsData.autohide=='0'">
						{{time}}s
					</view> -->
				</view>
			</view>
			
		
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		props:{
			popupadsData:{
				type:Object,
				default:null,
			},
			popupaShow:{
				type:Boolean,
				default:true,
			}
		},
		data:function(){
			return {
				modalName:'Image',
				time:'',
			}
		},
		methods:{
			hideModal(){
				this.modalName=''
				getApp().globalData.popupaShow=false;
			},
			timesetout(time){
				let that=this;
				if(time==0){
					that.modalName='';
					getApp().globalData.popupaShow=false;
					return;
				}
				setTimeout(()=>{
					that.time--
					that.timesetout(that.time)
				},1000)
				
			}
		},
		computed:{
			timeout:function(){
			console.log(this.popupaShow)
				let pData = this.popupadsData;
			//	console.log(pData)
				if(pData&&pData.timeWrap&&pData.autohide=='0'){
					this.time=pData.timeWrap
					this.timesetout(pData.timeWrap)
				}
			},
			timebetween:function(){
				let poData= this.popupadsData;
				let timebetween=true
				if(poData&&poData.startTime&&poData.endTime){
					// console.log(poData.startTime)
					// console.log(poData.endTime)
					const startTimes=poData.startTime.replace(/-/g, '/')
					const endTimes=poData.endTime.replace(/-/g, '/')
				//	console.log(startTimes)
				//	console.log(endTimes)
					let startTime=new Date(startTimes).getTime()
					let endTime=new Date(endTimes).getTime()
					let date=new Date();
				//	console.log("_________timebetween____________")
				//	console.log(date)
				
					let tody=date.getTime()
					// console.log(startTime)
					// console.log(tody)
					// console.log(endTime)
					if(startTime<=tody&&tody<=endTime){
						timebetween=true;
						
						}else{
							timebetween=false;
					}
					// console.log("当前时间是否在区间内")
					// console.log(timebetween)
					return timebetween;
					}
				
			//	return timebetween;
				}
		},
		destroyed() {
		//	console.log("destroyed")
			getApp().globalData.popupaShow=false;
		//	console.log(getApp().globalData)
		}
	}
	
</script>
<style>
	.cu-bar {
	display: flex;
	position: relative;
	align-items: center;
	min-height: 70upx;
	/* justify-content: space-between; */
	padding-right: 10rpx;
}
.text-color{
	color: #FFFFFF;
}
</style>
