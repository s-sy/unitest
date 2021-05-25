<template>
	<view class="pl-vips">
		
			<cu-custom bgColor="" :isBack="true">
				<block slot="backText"></block>
				<block slot="content" class="title-text">报表</block>
			</cu-custom>
			<!-- <kong v-if="plData.length!=0" v-bind:content='contents' ></kong> -->
			<!-- <give v-else></give> -->
			<view class="flex baobiaotop">
				<view class="">
					<view class="">
						平台总用户：<text>{{userCount.userCount}}</text>人
					</view>
				</view>
				<view class="margin-left-xl">
					<view class="">
						咨询客户：<text>{{userCount.smsRecordsCount}}</text>人
					</view>
				</view>
			</view>
			<scroll-view class="scroll-view-class" scroll-y="true">
				
				<view class="dynatown-items" v-for="(item,index) in userInfoList">
					<!-- <counter :userInfo="item"></counter> -->
					<view class="dynatown-items-kuang"  :class="actives==index?'class-dynatown':''" @click="clickDynatown" :data-index="index" >
						<dynatown :user="item"></dynatown>
					</view>
					
				</view>
			</scroll-view>
			<!-- <view class="pagination-k">
				<uni-pagination title="标题文字" :pageSize="size" :total="total" @change="onlickYeMa"></uni-pagination>
			</view> -->
			<view class="">
				<!-- <view class="month-zankai" v-if="IsMonthClick">
					<view class="itemMonth" :class="IsBgMonth==indexItem.type?'itembgMonth':''" v-for="indexItem in monthListData" @click="ClickWitchMonth" :data-type="indexItem.type">
						{{indexItem.name}}
					</view>
				</view> -->
				<view class="mine-report">
					
					<view class="report-week" :class="changkey=='week'?'report-weeks':''" @click="ClickWeek" data-changkey="week">
							周
					</view>
					<!-- <view class="report-month" @click="ClickMonth">
							月
					</view> -->
					<picker class="report-month" :class="changkey=='month'?'report-months':''" mode="selector" :range="monthListData" range-key="name"  @change="ClickWitchMonth" data-changkey="month">
						<view>{{monthItem}}</view>
					</picker>
				</view>
			</view>
			<view class="">
				<view class="qiun-charts" >
					<!--#ifdef MP-ALIPAY -->
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchLineA"></canvas>
					<!--#endif-->
					<!--#ifndef MP-ALIPAY -->
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
					<!--#endif-->
				</view>
			</view>
			<view class="Itemdatadetails">
				<view class="Itemdatadetails-name">
					<text>姓名：</text>{{userItem.realName?userItem.realName:userItem.nickName}}
				</view>
				<view class="flex justify-center">
					<view class="">
						裂变了<text class="padding-lr-sm fenxiangnine">{{shareUserCount}}</text> 次
					</view>
					<view class="margin-left-xl">
						获取新客户<text class="padding-lr-sm fenxiangnine" >{{recommendCount}}</text> 人
					</view>
				
				</view>
			</view>
	</view>
	
</template>

<script>
	import dynatown from '../../components/dynatown/home.vue'
	// import uniPagination from '@dcloudio/uni-ui/lib/uni-pagination/uni-pagination.vue'
	import api from '../../../pages/api/home.js'
	import uCharts from '../../../utils/u-charts.js'
	import  { isJSON } from '../../../utils/checker.js'
	var _self;
	var canvaLineA=null;
	export default {
		name:'pl',
		components:{
		//	uniPagination,
			dynatown
		},
		data: function(){
			return {
				// plData:[],
				// contents:{
				// 	content:"暂时没有评论回复哦，快去评论吧",
				// 	url:"https://img.0728jh.com/staticImg/kong_pl.png",
				// 	btn:"去评论",
				// 	key:'pl',
				// },
				// isShowTX:'',
				current: 1,
				size: 5,
				userInfoList:[],
				userItem:{},
				userInfoListTotal:[],
				total:20,
				
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				textarea:'',
				actives:0,
				IsBgMonth:'', //选中月份
				duration:1,//星期
				portion:1, //月份
				monthListData:[],
				monthItem:'月份',
				IsMonthClick:false,
				
				recommendCount:0,
				shareUserCount:0,
				userCount:'',
				changkey:'week',
		   }
		},
		methods:{
			ClickWitchMonth:function(event){   //点击月份
			console.log(event.detail.value)
				console.log(event)
			this.changkey=event.currentTarget.dataset.changkey
				// this.portion=e.currentTarget.dataset.type
				// this.IsBgMonth=e.currentTarget.dataset.type
				this.duration=2
				// this.getStatementMonth()
				//console.log(this.monthListData)
				this.portion=this.monthListData[event.detail.value].type
				this.monthItem=this.monthListData[event.detail.value].name
				console.log(this.monthItem)
				this.getStatementMonth()
			},
			clickDynatown:function(e){   //点击人物
				
				this.actives=e.currentTarget.dataset.index
				let userItem = this.userInfoList[e.currentTarget.dataset.index]
				this.userItem = userItem
				//let id = userItem.id
				this.IsMonthClick=false
				this.IsBgMonth=''
				
				if(this.duration==1){
					this.getStatement()
				}else{
					this.getStatementMonth()
				}
				
			},
			// ClickMonth:function(){   //点击 月
			// 	console.log("变月报")
			// 	this.IsMonthClick=!this.IsMonthClick
			// 	this.duration=2
			// 	// this.IsBgMonth=''
			// 	console.log(this.monthListData)
			// },
			ClickWeek:function(e){   //点击 周
					console.log("变周报")
					this.changkey=e.currentTarget.dataset.changkey
					this.duration=1
					this.IsMonthClick=false
					this.IsBgMonth=''
					this.getStatement()
			},
			// onlickYeMa:function(e){   //点击分页器
			// 	console.log("点击分页器")
			// 	console.log(e)
			// 	let type=e.type;
			// 	if(type=='next'){
			// 		console.log("点击分页器next")
			// 		this.current=this.current+1
			// 		this.IsMonthClick=false
			// 		this.actives=0
			// 		this.getDynatown()
			// 	}
			// 	if(type=='prev'){
			// 		console.log("点击分页器prev")
			// 		this.current=this.current-1
			// 		this.IsMonthClick=false
			// 		this.actives=0
			// 		this.getDynatown()
			// 	}
			// },
			getDynatown:function(){ 
				let that=this
				that.http(api.UserInfo,'GET',{
					current: 1,
					size: 100,
					userType:'1'
				// descs: 'sort',
				},false).then(res=>{
					console.log("置业顾问")
					console.log(res)
					that.userInfoList=res.data.records
					that.userItem=res.data.records[0]
					console.log("置业顾问")
					//that.getStatement()   
					//let duration=that.duration
					if(isJSON(_self.textarea)){
						
						if(this.duration==1){
							this.getStatement()
						}else{
							this.getStatementMonth()
						}
						
						
						//that.getStatement()
						
					}else{
						that.getServerData();
					}
			
				
				
					})
			},
			getDynatowntotal:function(){  //置业顾问总数
				let that=this
				that.http(api.UserInfo,'GET',{
					current: 1,
					size:100,
					userType:'1'
				// descs: 'sort',
				},false).then(res=>{
					console.log("置业顾问")
					console.log(res)
					that.userInfoListTotal=res.data.records
					that.total=res.data.records.length
					console.log("置业顾问")
					
					})
					
			},
			getTiemmoth(){
				let tiem = new Date()
				let month= tiem.getMonth()
				console.log("月份")
				console.log(month+1)
				this.portion=month+1
				let monthList=[]
				for(let i =this.portion ; i >=1;i--){
					let item={
						name:i+'月',
						type:i
					}
					monthList.push(item)
				}
					console.log(monthList)
				this.monthListData=monthList.slice(0,5)
					console.log(this.monthListData)
			},
			getStatementMonth:function(){
				let that=this;
				let id =this.userItem.id
				
				that.http(api.Statement+'/'+id+'?duration='+that.duration +'&portion='+that.portion,'POST',{},false).then(res=>{
					console.log("报表数据 月")
					console.log(res)
			
					let series=[
						{
							name:'总裂变量',
							data:[],
							index: 0,
							legendShape: "line",
							pointShape: "circle",
							show: true,
							color: "#2fc25b",
							type: "line",
						},
						{
							name:'总客户量',
							data:[],
							index: 0,
							legendShape: "line",
							pointShape: "circle",
							show: true,
							color: "#1890ff",
							type: "line",
						},
					]
					let	recommendCount=0
					let shareUserCount=0
					for(let item of res.data){
						if(item.shareUserCount!=null){
							series[0].data.push(item.shareUserCount)
							shareUserCount=item.shareUserCount+shareUserCount
						}
						if(item.recommendCount!=null){
							series[1].data.push(item.recommendCount)
							recommendCount=item.recommendCount+recommendCount
						}
					}
					that.recommendCount=recommendCount
					that.shareUserCount=shareUserCount
					let categories=[
						'第一周',
						'第二周',
						'第三周',
						'第四周',
						'第五周',
						'第六周'
						]
					canvaLineA.updateData({
						series:series,
						categories:categories
					});
				})
			},
			getStatement:function(){
				let that=this;
				let id =that.userItem.id
				
				that.http(api.Statement+'/'+id+'?duration='+that.duration +'&portion='+that.portion,'POST',{},false).then(res=>{
					console.log("报表数据")
					console.log(res)
					let series=[
						{
							name:'总裂变量',
							data:[],
							index: 0,
							legendShape: "line",
							pointShape: "circle",
							show: true,
							color: "#2fc25b",
							type: "line",
						},
						{
							name:'总客户量',
							data:[],
							index: 0,
							legendShape: "line",
							pointShape: "circle",
							show: true,
							color: "#1890ff",
							type: "line",
						},
					]
					let	recommendCount=0
					let shareUserCount=0
					for(let item of res.data){
						if(item.shareUserCount!=null){
							series[0].data.push(item.shareUserCount)
							shareUserCount=item.shareUserCount+shareUserCount
						}
						if(item.recommendCount!=null){
							series[1].data.push(item.recommendCount)
							recommendCount=item.recommendCount+recommendCount
						}
					}
					that.recommendCount=recommendCount
					that.shareUserCount=shareUserCount
					let categories=[
						'星期一',
						'星期二',
						'星期三',
						'星期四',
						'星期五',
						'星期六',
						'星期日',
						]
							
					canvaLineA.updateData({
						series:series,
						categories:categories
					});
				})
			},
			getServerData(){
			//	let _self=this;
			let that=this;
			let id =that.userItem.id
			that.http(api.Statement+'/'+id+'?duration='+that.duration +'&portion='+that.portion,'POST',{},false).then(res=>{
				console.log("报表数据")
				console.log(res)
				let series=[
					{
						name:'总裂变量',
						data:[],
						index: 0,
						legendShape: "line",
						pointShape: "circle",
						show: true,
						color: "#2fc25b",
						type: "line",
					},
					{
						name:'总客户量',
						data:[],
						index: 0,
						legendShape: "line",
						pointShape: "circle",
						show: true,
						color: "#1890ff",
						type: "line",
					},
				]
			let	recommendCount=0
			let shareUserCount=0
				for(let item of res.data){
					if(item.shareUserCount!=null){
						series[0].data.push(item.shareUserCount)
						shareUserCount=item.shareUserCount+shareUserCount
					}
					if(item.recommendCount!=null){
						series[1].data.push(item.recommendCount)
						recommendCount=item.recommendCount+recommendCount
					}
				}
				that.recommendCount=recommendCount
				that.shareUserCount=shareUserCount
				let categories=[
					'星期一',
					'星期二',
					'星期三',
					'星期四',
					'星期五',
					'星期六',
					'星期日',
					]
				let LineA={categories:[],series:[]};
				LineA.categories=categories;
				LineA.series=series;
				that.showLineA("canvasLineA",LineA);
				that.textarea = JSON.stringify(LineA);
			})
				// uni.request({
				// 	url: 'https://www.ucharts.cn/data.json',
				// 	data:{
				// 	},
				// 	success: function(res) {
				// 		console.log("查看数据结构")
				// 		console.log("res")
				// 		console.log(res.data.data)
				// 		let LineA={categories:[],series:[]};
				// 		//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				// 		LineA.categories=res.data.data.LineA.categories;
				// 		LineA.series=res.data.data.LineA.series;
				// 		that.textarea = JSON.stringify(res.data.data.LineA);
				// 		that.showLineA("canvasLineA",LineA);
				// 	},
				// 	fail: () => {
				// 		that.tips="网络错误，小程序端请检查合法域名";
				// 	},
				// });
			},
			showLineA(canvasId,chartData){
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					padding:[15,20,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:0,
					},
					dataLabel:true,
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
						dashLength:8,
						boundaryGap:'justify'
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
						format:(val)=>{return val.toFixed(0)+'人'}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'curve'
						}
					}
				});
				// //下面是默认选中索引
				// let cindex=3;
				// //下面是自定义文案
				// let textList=[{text:'我是一个标题',color:null},{text:'自定义1：值1',color:'#2fc25b'},{text:'自定义2：值2',color:'#facc14'},{text:'自定义3：值3',color:'#f04864'}];
				// //下面是event的模拟,tooltip的Y坐标值通过这个mp.changedTouches[0].y控制
				// let tmpevent={mp:{changedTouches:[{x: 0, y: 80}]}};
				// setTimeout(()=>{
				// 	canvaLineA.showToolTip( tmpevent , {
				// 		index:cindex,
				// 		textList:textList
				// 	});
				// },200)
			},
			touchLineA(e) {
				canvaLineA.touchLegend(e);
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			changeData(){
				if(isJSON(_self.textarea)){
					let newdata=JSON.parse(_self.textarea);
					canvaLineA.updateData({
						series: newdata.series,
						categories: newdata.categories
					});
				}else{
					uni.showToast({
						title:'数据格式错误',
						image:'../../../static/images/alert-warning.png'
					})
				}
			}
		
		},
		onLoad: function(){
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio =2;
					}
				}
			});
			//#endif
			this.userCount=uni.getStorageSync('userCount') || 0
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			
			this.getDynatown()
			this.getDynatowntotal()
			this.getTiemmoth()
		}
	}
</script>


<style>
	.scroll-view-class{
		height: 580rpx;
	}
	.Itemdatadetails-name text {
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
	}
	.Itemdatadetails-name{
		
		width:690rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.fenxiangnine{
		font-size: 32rpx;
		font-weight: bold;
	}
	.Itemdatadetails{
		text-align: center;
		line-height: 50rpx;
		font-size: 32rpx;
	}
	.baobiaotop{
		padding:10rpx 30rpx;
		font-weight: bold;
		font-size: 32rpx;
	}
	.itembgMonth{
		background-color: #1CBBB4;
		color:#FFFFFF;
	}
	.itemMonth{
		height: 60;
		padding:0rpx 10rpx;
		box-shadow: 0rpx 0rpx 10rpx 2rpx #EEEEEE;
	}
	.month-zankai{
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: space-around;
		/* border:solid 1rpx #000000; */
		height: 60rpx;
		width: 500rpx;
		animation: zankai 4s;
	}
	@keyframes zankai{
		from{width:500rpx;}
		to{
			widht:0rpx;
		}
	}
	.dynatown-items-kuang{
		margin:10rpx 0rpx;
		padding:10rpx 20rpx;
		box-shadow: 0rpx 0rpx 20rpx 4rpx #EEEEEE;
	}
	.class-dynatown{
		border:solid 1rpx #EEEEEE;
		margin:20rpx 0rpx;
		font-weight: bold;
		font-size: 28rpx;
		box-shadow: 0rpx 0rpx 22rpx 5rpx #EEEEEE;
	}
	.dynatown-items{
		margin:20rpx 0rpx;
		padding:0rpx 30rpx;
	}
	.mine-report{
		display: flex;
		margin:30rpx 0rpx 30rpx 500rpx;
	
	}
	.report-week{
		padding:10rpx 20rpx;
		background-color: #EEEEEE;
		
		
	}
	.report-weeks{
		
		background-color: #39B54A;
		color: #FFFFFF;
	}
	.report-month{
		margin-left: 40rpx;
		padding:10rpx 20rpx;
		background-color: #EEEEEE;
	}
	.report-months{
		
		background-color: #007AFF;
		color: #FFFFFF;
	}
	.pagination-k{
		padding:20rpx 30rpx; 
	}
	.pl-vips{
		height:100vh;
		background:rgba(255,255,255,1);
	}
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>

