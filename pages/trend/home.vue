<template>
	<view class="trend">
		<cu-custom bgColor="" :isBack="true">
				 <block slot="backText"></block>
				 <block slot="content" class="title-text">房价走势</block>
		</cu-custom>
		<view class="trend-title">
			{{BaseBudding.projectName}}房价走势图
		</view>
		<view class="trend-databuild">
			数据来自{{BaseBudding.projectName}}研究院，价格数据为均价
		</view>
		<view class="trend-canvas">
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
		</view>
		<view class="trend-text">
			<text class="trend-text-name">{{BaseBudding.projectName}}：</text>
			当前楼盘均价为5900元/㎡，2月天门商圈宅均价为6679元/㎡(赠送精装修等可能均价测算产生影响。
		</view>
		<view class="trend-btn">
			咨询更多房价走势问题
		</view>
	</view>
</template>

<script>
	import uCharts from '../../utils/u-charts.js'
	var _self;
	var canvaLineA=null;
	export default {
				data() {
					return {
						wxUser:getApp().globalData.wxUser,
						BaseBudding:getApp().globalData.BaseBudding,
						cWidth:'',
						cHeight:'',
						pixelRatio:1,
						chartData:{
							categories: ['2012', '2013', '2014', '2015', '2016', '2017','2018','2019'],
								series: [{
									name: '房价',
									data: [3500, 3600, 3800, 3600, 4500, 4000,6000,8000],
									color: '#16CCF6'
								}]
						}
					}
				},
				onLoad() {
					_self = this;
					
					this.cWidth=uni.upx2px(750);
					this.cHeight=uni.upx2px(500);
					this.getServerData();
				},
				methods: {
					getServerData(){
						_self.showLineA("canvasLineA",this.chartData);
					// 	uni.request({
					// 		url: 'https://www.ucharts.cn/data.json',
					// 		data:{
					// 		},
					// 		success: function(res) {
					// 			console.log(res.data.data)
					// 			let LineA={categories:[],series:[]};
					// 			//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
					// 			LineA.categories=res.data.data.LineA.categories;
					// 			LineA.series=res.data.data.LineA.series;
					// 			_self.showLineA("canvasLineA",LineA);
					// 		},
					// 		fail: () => {
					// 			_self.tips="网络错误，小程序端请检查合法域名";
					// 		},
					// 	});
					},
					showLineA(canvasId,chartData){
						canvaLineA=new uCharts({
							$this:_self,
							canvasId: canvasId,
							type: 'line',
							fontSize:11,
							legend:{show:true},
							dataLabel:false,
							dataPointShape:true,
							background:'#FFFFFF',
							pixelRatio:_self.pixelRatio,
							categories: chartData.categories,
							series: chartData.series,
							animation: true,
							xAxis: {
								type:'grid',
								gridColor:'#CCCCCC',
								gridType:'dash',
								dashLength:8
							},
							yAxis: {
								gridType:'dash',
								gridColor:'#CCCCCC',
								dashLength:8,
								splitNumber:5,
								min:10,
								max:180,
								format:(val)=>{return val.toFixed(0)+'元'}
							},
							width: _self.cWidth*_self.pixelRatio,
							height: _self.cHeight*_self.pixelRatio,
							extra: {
								line:{
									type: 'straight'
								}
							}
						});
						
					},
					touchLineA(e) {
						canvaLineA.showToolTip(e, {
							format: function (item, category) {
								return category + ' ' + item.name + ':' + item.data 
							}
						});
					}
				}
			}
</script>

<style>
	.charts {
			width: 750upx;
			height: 500upx;
			background-color: #FFFFFF;
		}
	.trend-canvas{}
	.trend-title{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin-top:31rpx;
		margin-left: 26rpx;
		margin-bottom: 20rpx;
	}
	.trend-databuild{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		margin-left: 26rpx;
		margin-bottom: 60rpx;
	}
	.trend-text-name{
		font-weight:Heavy;
		
	}
	.trend-text{
		padding:36rpx 31rpx 38rpx 27rpx;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
		line-height:48rpx;
		margin-left: 28rpx;
		background:rgba(248,248,248,1);
	}
	.trend-btn{
		width:690rpx;
		height:88rpx;
		background:rgba(238,249,251,1);
		border-radius:10rpx;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(22,204,246,1);
		text-align: center;
		line-height: 88rpx;
		margin-left: 29rpx;
		margin-top:20rpx;
	}
	.trend{
		background-color: #FFFFFF;
		height: 100vh;
	}
</style>
