<template>
	<view class="vcode-input-body">
		<text class="vcode-input-item" :class="isBorderLine?'vcode-input-line':'vcode-input-border'" v-for="(v,index) in sum"
		 :key="index" @tap="setFocus" @cleanText="cleanText" :style="{borderColor:text.length===index?borderActiveColor:(text.length>index?borderValueColor:borderColor),color:text.length>index?borderValueColor:borderColor}">
			{{ text[index]?text[index]:'' }}
		</text>
		<input type="number" class="hidden-input" :value=inputValue :focus="focus" :maxlength="sum" @input="inputVal" @blur="setBlur"
		 :password="isPassword" />
	</view>
</template>

<script>
	export default {
		name: 'VcodeInput',
		props: {
			
			sum: {
				type: Number,
				default: 6
			},
			isBorderLine: {
				type: Boolean,
				default: false
			},
			borderColor: {
				type: String,
				default: '#DADADA'
			},
			borderValueColor: {
				type: String,
				default: '#424456'
			},
			borderActiveColor: {
				type: String,
				default: '#FF6B00'
			},
			isAutoComplete: {
				type: Boolean,
				default: true
			},
			isPassword: {
				type: Boolean,
				default: false
			},
			jump: {
				type: Boolean,
				default: false,
			},
			jumpsum: {
				type: Number,
				default: 2,
			}
		},
		
		data() {
			return {
				focus: false,
				text: [],
				inputValue: '',
			};
		},
		created() {
			// setTimeout(() => {
			// 	this.focus = true;
			// }, 300)

		},
		methods: {
			cleanText() {
				this.text = []
				this.inputValue = ""
			},
			getStyle(index) {
				let style = {};
				style.borderColor = this.borderColor;
				if (this.text.length > index) {
					style.borderColor = this.borderValueColor;
					style.color = this.borderValueColor;
				}
				if (this.text.length === index) {
					style.borderColor = this.borderActiveColor;
				}
				return style;
			},
			setBlur() {
				this.focus = false;
			},
			setFocus() {
				this.focus = true;
			},
			inputVal(e) {
				//console.log("查看进入的jump")
				//console.log(this.jump)

				let value = e.detail.value;
				this.inputValue = e.detail.value;

				let cursorvalue = e.detail.cursor

				
				if (!this.jump) {
				console.log(!this.jump)
					let val = '';
					for (let i = 0; i < value.length; i++) {

						val += value[i]
						console.log(this.jumpsum)
						switch (this.jumpsum) {
							case 2:
								//console.log("ji")
								if (i == 3) {
									//console.log(val)
									val = val + '●' + '●'
									
									//console.log(val)
								}

								break;
							case 3:
								if (i == 2)
									val = val + '●' + '●' + '●'
								break;
							case 4:
								if (i == 3)
									val = val + '●' + '●' + '●'
								break;
							case 5:
								if (i == 2)
									val = val + '●' + '●' + '●' + '●'
								break;
						}

						// if(i==1){
						// 	val=val.replace(value[i],'●')
						// 	val=val+'●'
						// }



					}
					
					this.text = val

				} else {
					this.text = value;
				}
				
				if (this.isAutoComplete) {
					if (this.text.length >= this.sum) {
						this.focus = false;
						this.$emit('vcodeInput',this.text);
					}
				} else {
					this.$emit('vcodeInput', this.text);
				}
				//	this.text=value
				// if(this.isPassword){
				// 	let val='';
				// 	for (let i = 0; i < value.length; i++) {
				// 		val+='●';
				// 	}
				// 	this.text=val;
				// }else{
				// 	this.text=value;
				// }
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vcode-input-body {
		margin-left: -36rpx;
		margin-right: -36rpx;
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		.vcode-input-item {
			width: 50rpx;
			height: 50rpx;
			margin-left: 5rpx;
			margin-right: 5rpx;
			line-height: 50rpx;
			text-align: center;
			font-weight: 500;
		}

		.vcode-input-border {
			border-style: solid;
			border-width: 2rpx;
			border-color: $uni-border-color;
			border-radius: 4rpx;
		}

		.vcode-input-line {
			border-bottom-style: solid;
			border-bottom-width: 2rpx;
			border-color: $uni-border-color;
		}

		.hidden-input {
			width: 1rpx;
			height: 1rpx;
			position: absolute;
			left:-1000rpx;
			top: -1rpx;
		}
	}
</style>
