<template>
	<view class="tag-left">
		<view :class="tagState==0?'stateone':tagState==1?'statetwo':tagState==2?'stateshr':tagState==3?'statefou':''" v-if="tagState==0||tagState==1||tagState==2||tagState==3">
			{{shopState[tagState]}}
		</view>
		<view :class="hxIndex==0?'stateshr':hxIndex==1?'statetwo':hxIndex==2?'statefou':''" v-if="hxIndex==0||hxIndex==1||hxIndex==2">
			{{hxState[hxIndex]}}
		</view>
		<block v-for="(item,index) in taglist">
			<view class="tag-item" v-if="index<4">
				{{item}}
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			tagData: {
				type: Array,
				defalut: [],
			},
			state: {
				type: String,
				default: null
			},
			hxindex: {
				type: String,
				default: null
			}

		},
		data: function() {
			return {
				shopState: ['热销', '即开', '售罄'],
				hxState: ['热销', '即开', '售罄']
			}

		},
		name: 'tag',
		computed: {
			taglist: function() {
				return this.tagData;
			},
			tagState: function() {
				//console.log("销售状态")
				//console.log(this.state)
				return parseInt(this.state)
				//return 2
			},
			hxIndex: function() {
				return parseInt(this.hxindex)
			}
		},

	}
</script>

<style>
	.stateone {
		background: rgba(225, 251, 243, 1);
		border-radius: 8rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 89, 89, 1);
		padding: 9rpx 15rpx;
		margin-left: 15rpx;
	}

	.statetwo {
		background: rgba(252, 241, 217, 1);
		border-radius: 8rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(8, 193, 137, 1);
		padding: 9rpx 15rpx;
		margin-left: 15rpx;
	}
/*  */
	.stateshr {
		background: rgba(255, 230, 230, 1);
		border-radius: 8rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
		padding: 9rpx 15rpx;
		margin-left: 15rpx;
	}

	.statefou {
		background: rgba(225, 242, 251, 1);
		border-radius: 8rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(90, 161, 251, 1);
		padding: 9rpx 15rpx;
		margin-left: 15rpx;
	}

	.tag-left {
		display: flex;
		flex-wrap: nowrap;
		overflow: hidden;
	}

	.tag-item {
		border-radius: 8rpx;
		font-size: 23rpx;
		padding: 9rpx 15rpx;
		margin: 0rpx 15rpx;
		opacity: 0.8;
		background-color: #F0F4F7;
	}
</style>
