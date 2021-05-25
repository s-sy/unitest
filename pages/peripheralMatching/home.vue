<template>
	<view class="matching">
		
			<cu-custom bgColor="" :isBack="true">
					 <block slot="backText"></block>
					 <block slot="content" class="title-text">周边配套</block>
			</cu-custom>
		
		
		<view class="">
			<map 
			
			:class= "active ? 'my-map' : 'my-mapcopy' "
			id="my-map" 
			show-location
			:longitude="longitude" 
			:latitude="latitude" 
			:include-points="markers" 
			scale="14" 
			:markers="markers" 
			@markertap="markertap"
			@callouttap="callouttap"
			@regionchange="regionchange"
			></map>
		</view>
		<view>
		       <drag-button
		           :isDock="true"
		           :existTabBar="true"
				   :textStr="'导航'"
		           @btnClick="btnClick"
		           @btnTouchstart="btnTouchstart"
		           @btnTouchend="btnTouchend" />
		   </view>
		<view>
			
			<view class="matching-center">
				<view class="matching-icon">
					<image class="matching-icon-iimg" src="https://img.0728jh.com/staticImg/xia_icon.png" @click="qujiedian"></cover-image> 
				</view>
				<view class="aroundzb-name">
				
					<view class="aroundzb-item" :class="chanNames=='银行' ?'aroundzb-item-change':''" @click="changName" data-name="银行">
						银行
					</view>
					<view class="aroundzb-item" :class="chanNames=='医院' ?'aroundzb-item-change':''" @click="changName" data-name="医院">
						医院
					</view>
					<view class="aroundzb-item"  :class="chanNames=='购物' ?'aroundzb-item-change':''" @click="changName" data-name="购物">
						购物
					</view>
					<view class="aroundzb-item"  :class="chanNames=='学校' ?'aroundzb-item-change':''" @click="changName" data-name="学校">
						学校
					</view>
					<view class="aroundzb-item"  :class="chanNames=='娱乐' ?'aroundzb-item-change':''" @click="changName" data-name="娱乐">
						娱乐
					</view>
				
				</view>
				
			</view>
		</view>
		<scroll-view id="scoll-h" v-if="active==true" class="wcroll-style" scroll-y>
			<block v-for="item in markers" :key="item.id">
			<view  v-if="item.id!=0" class="swcroll-items" @click="markerstapitem" :data-id="item.id">
				<view class="" >
					<view class="scroll-name">
						{{item.title}}
					</view>
					<view class="scroll-address">
						{{item.address}}
					</view>
				</view>
				<view class="scroll-juli">
					距{{item._distance}}m
				</view>
			</view>
			
			
			</block>
		</scroll-view>
		 
	</view>
</template>

<script>
	import dragButton from "@/components/drag-button/drag-button.vue";
	var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
	let mapcontext;
	let qqmapsdk;
	export default {
		components:{
			dragButton
		},
		data:function(){
			return {
				active:false,
				longitude:'',
				latitude:'',
				chanNames:'银行',
				markers:[],
				obj:{
						id:0,
						width: 33,
						height: 39,				
						latitude:30.66339,
						longitude:113.16614,
						zIndex:9,
						iconPath:'https://img.0728jh.com/staticImg/adress_icon.png',
						callout:{
							content:'湖北省\n地址：天门市新文化宫',
							color:'#999999',
							fontSize:15,
							display:'ALWAYS',
							borderRadius:5,
							bgColor:'#FFFFFF',
							padding:15,
						},
					}
			}
		},
		onLoad() {
			let that=this;
			uni.getLocation({
			    type: 'wgs84',
			    success: function (res) {
			        // console.log('当前位置的经度：' + res.longitude);
			        // console.log('当前位置的纬度：' + res.latitude);
					// that.longitude=res.longitude
					// that.latitude=res.latitude
			 }
			});
			let baseBudding=getApp().globalData.BaseBudding
			that.longitude=baseBudding.longitude
			that.latitude=baseBudding.latitude
			that.obj.longitude=baseBudding.longitude
			that.obj.latitude=baseBudding.latitude
			// console.log("lat:"+baseBudding.latitude)
			// console.log("lng:"+baseBudding.longitude)
			// let location=that.convertBD09ToGCJ02(baseBudding.latitude,baseBudding.longitude)
			// console.log("轉換後")
			// console.log(location)
			// that.longitude=location.lng
			// that.latitude=location.lat
			// that.obj.longitude=location.lng
			// that.obj.latitude=location.lat
			that.obj.callout.content=baseBudding.projectName+'\n'+'地址：'+ baseBudding.address
			that.markers.push(that.obj)
		 qqmapsdk = new QQMapWX({
		            key: '2OABZ-3FGRJ-27CFB-FFEEQ-EKUMZ-22BXH'
		        });
		 mapcontext = uni.createMapContext('my-map',this)
		},
		methods:{
			btnTouchstart:function(){},
			btnTouchend:function(){},
			btnClick:function(){
				uni.openLocation({
							latitude: this.latitude,
				            longitude: this.longitude,
				            success: function () {
				              //  console.log('success');
				            }
				})
			},
			
			regionchange:function(e){ //当视野发出变化时
				//console.log(e)
			},
			markerstapitem:function(e){ // 点击下面每一行
		//	console.log()
			let id = e.currentTarget.dataset.id
		//	console.log(id)
			for(var index=0;index<this.markers.length;index++){
				
				if(id==this.markers[index].id){
					
					 this.markers[index].callout.display='ALWAYS'
				}else{
					 this.markers[index].callout.display='BYCLICK'
				}
			}
			//console.log(e)
			},
			markertap:function(e){    //  点击每个markers
			//	mapcontext.moveToLocation()
			},
			callouttap:function(e){   // 点击每个汽包
				//console.log(e)
				let xiao = e.detail
			//	console.log(xiao)
				//mapcontext.moveToLocation()
			},
			toJSON(){
				return this;
			},
			changName: function(e){
				let _self=this;
				// console.log(e)
				_self.chanNames = e.currentTarget.dataset.name;
				qqmapsdk.search({
					keyword:_self.chanNames,
					location:{
						  latitude: _self.latitude ,
						  longitude: _self.longitude
					},
					success:(res)=>{
						_self.markers=[]
						
						//console.log(res.data)
						for(let item of res.data){
						let markersArray = {
							id:item.id,
							title:item.title,
							width: 33,
							height: 39,
							address:item.address,
							latitude:item.location.lat,
							longitude:item.location.lng,
							_distance:item._distance,
							iconPath:'https://img.0728jh.com/staticImg/myadress_icon.png',
							callout:{
								content:item.title,
								color:'#999999',
								fontSize:15,
								display:'BYCLICK',
								borderRadius:5,
								bgColor:'#FFFFFF',
								padding:10,
							},
						}
						_self.markers.push(markersArray) 
						}
						_self.markers.push(_self.obj)
					//	console.log(this.markers)
					}
				})
			},
			qujiedian:function(){
				// let query=uni.createSelectorQuery().select("#my-map")
				// query.fields({computedStyle:['height'],properties:['']},res=>{
					
				// }).exec()
				// console.log(query)
				if(this.active==null){
					this.active=true
					
				}else{
					this.active=!this.active
					
				}
				//console.log(this.active)
			}
		}
	}
</script>

<style>
	
page{
		background-color: #FFFFFF;
	}
	.matching-center{
		background-color: #FFFFFF;
	}
	.matching-icon{
		width:100%;
		height: 68rpx;
		text-align: center;
		align-items: center;
		line-height: 40rpx;
		display: flex;
		justify-content: center;
	}
	.matching-icon-iimg{
		width:72rpx;
		height: 15rpx;
		
	}
	.scroll-juli{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
	.scroll-address{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		margin-top:15rpx;
	}
	.scroll-name{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.swcroll-items{
		height: 130rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-left: 31rpx;
		margin-right: 34rpx;
	}

	.wcroll-style{
		width: 100%;
		max-height: calc(100vh - 954rpx);
		background-color: #FFFFFF;
		animation: shouqi 2s forwards;
		
	}
	.aroundzb-item{
		padding: 8rpx 25rpx;
		font-size: 28rpx;
		margin-right: 20rpx;
		border:1px solid rgba(229,229,229,1);
		border-radius:10px;
		
	}
	.aroundzb-item-change{
		background:rgba(22,204,246,1);
		color:#FFFFFF;
	}
	.aroundzb-name{
		display: flex;
		justify-content: space-around;
		margin-bottom: 20rpx;
		
	}
	.my-map{
		width: 100%;
		height: calc(100vh - 289rpx);
		animation: shouqi 1s forwards; 
	}
	/* :active my-map{
		width: 100%;
		
		height: 665rpx;
	} */
	.my-mapcopy{
		width: 100%;
		height: 665rpx;
		animation: zankai 1s forwards;
	    
	}
	@keyframes shouqi{
		from{height: calc(100vh - 289rpx);}
		to{height:665rpx}
	}
	@keyframes zankai{
		from{height: 665rpx;}
		to{height:calc(100vh - 289rpx)}
	}
	.matching{
		height: 100vh;;
		background-color: #FFFFFF;
	}
</style>
