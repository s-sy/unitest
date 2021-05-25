<template>
	<view class="">
		<view class="flex padding-lr-sm justify-end margin-tb-sm">
		<button v-if="isShowTX=='0'" class="cu-btn" :disabled="disabled=='0'?false:true" @tap.stop="checkItem">{{disabled=='0'?'审核':disabled=='1'?'已审':disabled=='0'?'拒绝':''}}</button>
		<!-- <button class="cu-btn margin-left-sm" @tap.stop="deleteItem">删除</button> -->
		</view>
		
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">审核</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="">
					
						<radio-group class="block radiogroup" @change="RadioChange">
							<view class="cu-form-group">
								<view class="title">通过</view>
								<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
							</view>
							<view class="cu-form-group">
								<view class="title">不通过</view>
								<radio :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
							</view>
						</radio-group>
						<view class="bg-white">
							<view class="cu-group-wargeen">
								审核确定后将不能更改，如需变更请登录后台管理系统
							</view>
							
						</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="firmData">确定</button>
		
					</view>
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		props:{
			disabled:{
				type:String,
				default:'',
			},
			
		},
		data:function(){
			return {
				modalName:'',
				radio:'A',
				isShowTX:false,
			}
		},
		methods:{
			firmData:function(){
				let checkd=this.radio
				this.modalName='';
				this.$emit('ckeckdItem',checkd)
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			hideModal:function(){
				this.modalName=''
			},
			checkItem:function(){
				let that=this;
				that.modalName='DialogModal1'
			},
			deleteItem:function(){
				let that =this;
				uni.showModal({
					title:'删除',
					content:'确认删除',
					success(){
						//console.log("发射删除事件")
						that.$emit('deleteItem')
					}
				})
			},
			
		},
		mounted() {
			let that=this;
			that.isShowTX=getApp().globalData.interaction
		}
	}
</script>

<style>
	.cu-group-wargeen{
		width:500rpx;
		padding:10rpx 20rpx;
	}
	.radiogroup{
		min-width: 500rpx;
	}
</style>
