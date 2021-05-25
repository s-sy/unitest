<template>
	<view class="newsInformation">
	<cu-custom bgColor="" :isBack="true">
			 <block slot="backText"></block>
			 <block slot="content" class="title-text">新闻动态</block>
	</cu-custom>
	<view class="newsInformation-title">
		<view class="newsInformation-title-items">
			<view :class="istrue=='qb'?'newsInformation-title-items-name-copy':'newsInformation-title-items-name'" @click="changeNewsData" data-key="qb">
				全部
			</view>
			<view :class="istrue=='qb'?'newsInformation-title-items-xian-copy':'newsInformation-title-items-xian'">
				
			</view>
		</view>
		<view class="newsInformation-title-items">
			<view  :class="istrue=='yh'?'newsInformation-title-items-name-copy':'newsInformation-title-items-name'" @click="changeNewsData" data-key="yh">
				最新优惠
			</view>
			<view :class="istrue=='yh'?'newsInformation-title-items-xian-copy':'newsInformation-title-items-xian'">
				
			</view>
		</view>
		<view class="newsInformation-title-items">
			<view  :class="istrue=='hd'?'newsInformation-title-items-name-copy':'newsInformation-title-items-name'" @click="changeNewsData" data-key="hd">
				楼盘活动
			</view>
			<view :class="istrue=='hd'?'newsInformation-title-items-xian-copy':'newsInformation-title-items-xian'">
				
			</view>
		</view>
		<view class="newsInformation-title-items">
			<view  :class="istrue=='jd'?'newsInformation-title-items-name-copy':'newsInformation-title-items-name'" @click="changeNewsData" data-key="jd">
				工程进度
			</view>
			<view :class="istrue=='jd'?'newsInformation-title-items-xian-copy':'newsInformation-title-items-xian'">
				
			</view>
		</view>
		<view class="newsInformation-title-items">
			<view :class="istrue=='dg'?'newsInformation-title-items-name-copy':'newsInformation-title-items-name'" @click="changeNewsData" data-key="dg">
				置业导购
			</view>
			<view :class="istrue=='dg'?'newsInformation-title-items-xian-copy':'newsInformation-title-items-xian'">
				
			</view>
		</view>
	</view>
	<scroll-view scroll-y class="scroll-view" @scrolltolower="addData" >
		<view class="newsInformation-news" v-for="(item,index) in newsLists " >
			<view class="" @click="tonewsInformationDetails" :data-item="item" >
				<news :newData="item " v-if="item.delFlag=='0'"></news>
			</view>
			
		</view>
	</scroll-view>
	
	</view>
</template>

<script>
	import api from '../../pages/api/home.js'
	export default {
		data:function(){
			return {
			
				istrue:'qb',
				newsList:[],
				newsLists:[],
				current: 1,
				size: 10,
				
				yhCurrent:1,
				yhSize:10,
				hdCurrent:1,
				hdSize:10,
				jdCurrent:1,
				jdSize:10,
				dgCurrent:1,
				dgSize:10,
			}
		},
		
		methods:{
			changeNewsData:function(e){
				this.istrue=e.currentTarget.dataset.key
				console.log(this.istrue)
				
				switch(this.istrue){
					case 'qb':
						this.newsLists=[]
						this.current=1
						this.size=10
						this.getNewsinformation();
					break;
					case 'yh':
					this.newsLists=[]
					this.yhCurrent=1,
					this.yhSize=10,
						this.getNewsinformationTpType(1)
						
					break;
					case 'hd':
					this.newsLists=[]
					this.hdCurrent=1,
					this.hdSize=10,
						this.getNewsinformationTpType(2)
					break;
					case 'jd':
					this.newsLists=[]
					this.jdCurrent=1,
					this.jdSize=10,
						this.getNewsinformationTpType(3)
					break;
					case 'dg':
					this.newsLists=[]
					this.dgCurrent=1,
					this.dgSize=10,
						this.getNewsinformationTpType(4)
					break;
				}
				
			},
			addData(){
				console.log("到底加载")
				let that=this;
				that.current=that.current+1;
				that.getNewsinformation()
			},
			getNewList:function(Category){
				let list=[]
				for(let item of this.newsList){
					console.log(item)
					if(item.category==Category.toString()){
						list.push(item)
					}
				}
				this.newsLists=list
			},
			getNewsinformationTpType(type){  //新闻动态
				let _self=this;
				_self.newsLists=[];
				let current = type==1?_self.yhCurrent:type==2?_self.hdCurrent:type==3?_self.jdCurrent:type==4?_self.dgCurrent:0
				let size = type==1?_self.yhSize:type==2?_self.hdSize:type==3?_self.jdSize:type==4?_self.dgSize:0
				let project =getApp().globalData.projectItem;
				_self.http(api.NewsInformation,'GET',{
					      current:current ,
					      size: size,
					      descs: 'create_time', //降序
						  category:type,
						  affiliationId:project.id
						  //asc 升序
				},false).then(res=>{
					console.log("news")
					console.log(res)
					_self.newsLists=_self.newsLists.concat(res.data.records)
					// _self.newsLists=res.data.records.concat(_self.newsLists)
					})
			},
			viewsAdd:function(value){
				let that=this;
				that.http(api.AddViewNewsIFtion,'POST',{
					id:value
				},false).then(res=>{
				//	console.log("最新动态加view")
				//	console.log(res)
				})
			},
			tonewsInformationDetails:function(e){
				let item = e.currentTarget.dataset.item
				let id = e.currentTarget.dataset.item.id
				this.viewsAdd(id)
				
				switch(item.type){
					 case '0':
						uni.navigateTo({
							url:'../newsInformationDetails/home?id=' + id
						})
					 break;
					 case '1':
						uni.navigateTo({
							url:'../newsWebview/home?id=' + id
						})
					 break;
				}
				
				// uni.navigateTo({
				// 	url:'../newsInformationDetails/home?id='+id
				// })
			},
			
			getNewsinformation:function(){  //新闻动态
				let _self=this;
				let project = getApp().globalData.projectItem
				_self.http(api.NewsInformation,'GET',{
					      current: _self.current,
					      size: _self.size,
					      descs: 'create_time', //降序
						  affiliationId:project.id
						  //asc 升序
				},false).then(res=>{
					console.log("news")
					console.log(res)
					_self.newsLists=_self.newsLists.concat(res.data.records)
					// _self.newsListres=res.data.records.concat(_self.newsListres)
					// _self.newsLists=res.data.records.concat(_self.newsLists)
					})
			},
			getPopupads:function(){
				let that=this;
				that.http(api.Popupads,'GET',{},false).then(res=>{
					//console.log("弹框")
				//	console.log(res)
					if(res){
						that.popupadsData=res.data
					}
					
				})
			},
		},
		onLoad() {
		
			this.getNewsinformation()
			this.getPopupads()
		},
		onShow() {
			
		}
		
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
	.scroll-view{
		height:calc(100% - 280rpx);
	}
	.newsInformation-news{
		margin-top:20rpx;
		padding-left: 30rpx;
	}
	.newsInformation-title-items-xian-copy{
		background:rgba(0,202,232,1);
		border-radius:2rpx;
		margin:auto;
		width: 41rpx;
		height: 4rpx;
	}
	.newsInformation-title-items-xian{
		width: 41rpx;
		height: 4rpx;
		
	}
	.newsInformation-title-items-name-copy{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(22,204,246,1);
		margin-bottom: 17rpx;
	}
	.newsInformation-title-items-name{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(102,102,102,1);
		margin-bottom: 17rpx;
	}
	.newsInformation-title-items{
		
	}
	.newsInformation-title{
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: space-around;
		padding:20rpx;
	}
	.newsInformation{
		height:100vh;
		background-color: #FFFFFF;
	}
</style>
