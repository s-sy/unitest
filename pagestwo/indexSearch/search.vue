<template>
	
	<view class="">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="title-text">搜索</block>
		</cu-custom>
		<!-- <view class="padding-sm margin-sm">
			项目
		</view>
		<view class="flex">
			<view class="atv" :class="indexs==index?'activsse':''" v-for="(item,index) in projectData" :key="index" @tap="itemFaction(index,item)">
				{{item}}
			</view>
		</view> -->
	
		<!-- <view class="search_bigbox" :class="isUpAndDown==0?'search_bigboxdefaultheight':isUpAndDown?'search_bigboxZankai':'search_bigboxShouqi'">
			<view class="clickBox" @tap="changeIsUpAndDown"></view> -->
			<!-- <view class="poject_search">项目搜索</view> -->
			<uniSearchBar @confirm="search" @input="input" placeholder="请输入您要收搜的项目名称" cancelButton="none"></uniSearchBar>
			<view class="padding-tb-sm">
				<block v-for="item in projectCopyList" :key="item.id">
					<view class="bigitem" v-if="item.delFlag=='0'"  @tap="goTolistItem(item)">
						<view class="flex">
							<image class="imagClass" :src="item.firstFigure?item.firstFigure:index%2==0?'https://img.0728jh.com/staticImg/t1.jpg':'https://img.0728jh.com/staticImg/t2.jpg' " mode=""></image>
							<view class="">
								
							</view>
							<view class="sale-tag">
								{{titleData[item.salesStatus]}}
							</view>
						</view>
						<view class="itemright">
							<view class="text-1">
								{{item.projectName}}
							</view>
							<view class="text-2">
								{{item.price==""?"价格待定":item.price==0?"价格待定":"约"+item.price+"元/平方"}}
							</view>
							<view class="" style="white-space:nowrap;overflow: hidden;text-overflow: ellipsis;margin-bottom: 5rpx;">
								{{item.address}}
							</view>
							<!-- <tag :salesStatus="item.salesStatus" :tagData="item.keywords"></tag> -->
							<view class="flex">
								<view class="itemtag" v-for="keyss in item.keywords" :key="index">
									{{keyss}}
								</view>
							</view>
						</view>
					</view>
					
					<!-- <view class="">
						{{item.projectName}} -->
						
					<!-- 	<view class="project_body" @tap="goTolistItem(item)">
							
							<view class="" v-for="(item,index) in projectList" @tap="goTolistItem(item,index)"> -->
								<!-- <view class="project_item" v-if="item.delFlag=='0'">
									<view class="item_Iamge_border"> -->
										<!-- -->
										<!-- <image class="item_Image" :src="item.firstFigure?item.firstFigure:index%2==0?'https://img.0728jh.com/staticImg/t1.jpg':'https://img.0728jh.com/staticImg/t2.jpg' " mode=""></image>
									</view>
									
									<view class="Item_body">
										
										<tag :salesStatus="item.salesStatus" :tagData="item.keywords"></tag>
										
										<view class="" style="width:670rpx;margin-top:280rpx;line-height: 40rpx;">
											<view class="text-xl text-white">
												{{item.projectName}}
											</view>
											<view class=" text-red">
												{{item.price==""?"价格待定":item.price+"元/平方"}}
											</view>
											<view class="flex">
												<view class="text-white solid" style="width:450rpx; white-space:nowrap;overflow: hidden;text-overflow: ellipsis;">
													{{item.address}}
												</view>
												<view class="flex justify-between">
													<image src="http://g.hiphotos.baidu.com/image/pic/item/6d81800a19d8bc3e770bd00d868ba61ea9d345f2.jpg" style="width:30rpx;height: 30rpx;" mode=""></image>
													<view class="text-white">
														960万人想买
													</view>
												</view>
											</view>
										</view> -->
									<!-- </view> -->
							<!-- 	</view>
							</view>
							
						</view> -->
					<!-- </view> -->
				</block>
			<!-- </view> -->
		</view>
	</view>
	
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import tag from '@/components/project_tag/tag.vue'
	export default{
		data:function(){
			return {
				projectData:["火之国","沙之国","雷之国","土之国"],
				indexs:0,
				isUpAndDown:0,
				projectList:[],
				projectCopyList:[],
				titleData:["在售","待售","售罄"]
			}
		},
		components:{
			uniSearchBar
		},
		methods:{
			goTolistItem(item){
				console.log(item)
				getApp().globalData.projectItem=item;
				let pages = getCurrentPages()
				//console.log(pages)
				let nowPage= pages[pages.length-1];
				let prevPage= pages[pages.length-2];
				prevPage.$vm.isShowProject=false
				prevPage.$vm.isShowProjectItem=true
				// that.isShowProject=true
				// that.isShowProjectItem=false
				uni.navigateBack({
					delta:1
				})
			},
			input(e){
				console.log("input")
				console.log(e)
				let that=this;
				let pro=[].concat(that.projectList);
				let list=[]
				for(let i=0;i<pro.length;i++){
					if(pro[i].projectName.indexOf(e.value)!=-1){
						list.push(pro[i])
					}
				}
				that.projectCopyList=list
				
			},
			search(e){
				console.log(e)
				console.log("search")
			},
			changeIsUpAndDown(){
				console.log("kkk")
				console.log(this.isUpAndDown)
				if(this.isUpAndDown==0){
					this.isUpAndDown=true
					return;
				}
				if(this.isUpAndDown=="true"  ){
					this.isUpAndDown=false
					return;
				}
				if(this.isUpAndDown=="false"){
					this.isUpAndDown=true
					return;
				}
				if(this.isUpAndDown==true || this.isUpAndDown==false){
					this.isUpAndDown=!this.isUpAndDown
				}
			},
			itemFaction(index,value){
				console.log(index);
				this.indexs=index;
				console.log(value)
				let pages = getCurrentPages()
				//console.log(pages)
				let nowPage= pages[pages.length-1];
				let prevPage= pages[pages.length-2];
				prevPage.$vm.projectNames=value
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad(options) {
			console.log(options.projectNames)
			for(let i =0;i<this.projectData.length;i++){
				if(this.projectData[i]==options.projectNames){
					this.indexs=i
				}
			}
			if(options.zhaikai){
				this.isUpAndDown=options.zhaikai
			}
			this.projectList=getApp().globalData.platforminfo.basicInfoList
			this.projectCopyList=getApp().globalData.platforminfo.basicInfoList
			}
	}
</script>

<style>
	.atv{
		padding:10rpx 20rpx;
		margin:0rpx 10rpx;
		border:solid 1rpx;
		border-radius: 10rpx;
	}
	.activsse{
		/* background-color: #007AFF; */
		color:#007AFF;
	}
	.poject_search{
		width:100%;
		margin:20rpx auto;
		text-align: center;
	}
	.search_bigbox{
		position: absolute;
		bottom: 0;
		/* border: solid 1rpx #000000 ; */
		max-height: 70%;
		min-height: 300rpx;
		width:100%;
		
		z-index: 9;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		/* box-shadow: 0rpx 0rpx 10rpx 10rpx #00CAE8; */
		/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
		/* animation: @shouqi .25s, 100ms */
		
	}
	.search_bigboxdefaultheight{
		height: 300rpx;
	}
	.search_bigboxShouqi{
		height:300rpx;
		animation: shouqilai 1s, 100ms;
		
	}
	.search_bigboxZankai{
		height:70%;
		animation: zaikailai 1s, 100ms;
		
	}
	
	@keyframes shouqilai{
		from{height:70% }
		to{height:300rpx}
	}
	@keyframes zaikailai{
		from{height:300rpx}
		to{height:70%}
	}
	.clickBox{
		background-color: #EEEEEE;
		width:80rpx;
		height:15rpx;
		border-radius: 10rpx;
		margin:20rpx auto;
	}
/* 	.project_body{
	
		border-radius: 10rpx;
		margin:20rpx;
		position: relative;
		
		
	}
	.item_Iamge_border{
		padding:20rpx;
	
	}
	.item_Image{
		width:670rpx;
		border-radius: 15rpx;
	
	}
	.Item_body{
		position: absolute;
		z-index: 2;
		padding:20rpx;
		margin-top:-520rpx;
	
		opacity: 0.2; 
		margin-left: 20rpx;
	} */
	.bigitem{
		display: flex;
		margin: 0rpx 20rpx;
		padding:20rpx;
		/* border: solid 1rpx #000000; */
		margin-bottom: 10rpx;
		box-shadow: 0rpx 0rpx 5rpx 4rpx #EEEEEE;
		border-radius: 10rpx;
	}
	
	.imagClass{
		width:263rpx;
		height: 162rpx;
		border-radius: 10rpx;
	}
	.sale-tag{
		display: flex;
		position: absolute;
		padding:3rpx 8rpx;
		background-color: #00BFFF;
		color: #FFFFFF;
		font-size: 20rpx;
		/* opacity: 0.8; */
		margin-top:10rpx;
		margin-left: 8rpx;
		border-radius: 5rpx;
	}
	.itemright{
		/* border:solid 1rpx #000000; */
		padding-left:10rpx;
		width:425rpx;
	}
	.text-1{
		font-size: 32rpx;
		font-weight: 600;
			
	}
	.text-2{
		color: red;
		font-weight: 600;	
		line-height: 42rpx;
	}
	.itemtag{
		font-size: 20rpx;
		padding:5rpx 10rpx;
		margin-right: 10rpx;
		background-color: #F0F4F7;
		color: #8799A3 ;
	}
</style>
