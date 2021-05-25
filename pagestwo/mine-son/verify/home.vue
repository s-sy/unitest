<template>
	<view class="">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="title-text">信息确认</block>
		</cu-custom>
		<scroll-view scroll-y class="srollview"  @scrolltolower="scrolltolower">
		<view class="margin-bottom-sm">
			<view class="title">
				<view class="titleItem" :class="curPage==item.type?'titleItemCheck':''" v-for="item in tilteData" @click="changeTitle" :data-cur="item.type">
					{{item.name}}
				</view>
				
				<!-- <view class="titleItem" :class="curPage=='hf'?'titleItemCheck':''"  @click="changeTitle" :data-cur="'hf'"> -->
					<!-- <picker class="titleItem" :class="curPage=='hf'?'titleItemCheck':''" :data-cur="'hf'" mode="selector"  :range="reviewsTitle"   @change="ClickWitchHf">
						<view>{{replyName}}</view>
					</picker> -->
				<!-- </view> -->
			</view>
		</view>
		<view class="" v-if="curPage=='xp'"> 
			<view class="" v-for="item in flareUpsData">
				<verIfyXp :flareUpsData="item" @deleteItemXp="deleteItemXp" @ckeckdItemXp="ckeckdItemXp" @replyckeckdItem="replyckeckdItem"></verIfyXp>
			</view>
		</view>
		<view class="" v-if="curPage=='dp'">
			<view class="" v-for="(item,index) in reviewsData">
				<verIfyDp :reviewsData="item" :index="index" @deleteItemDp="deleteItemDp" @ckeckdItemDp="ckeckdItemDp" @replyckeckdItem="replyckeckdItem"></verIfyDp>
			</view>
			
		</view>
		<view class="" v-if="curPage=='wd'">
			<view class="" v-for="item in questionsData">
				<verIfyWd :questionsData="item" @deleteItemWd="deleteItemWd" @ckeckdItemWd="ckeckdItemWd" @replyckeckdItem="replyckeckdItem"></verIfyWd>
			</view>
			
		</view>
		<view class="" v-if="curPage=='hf'">
			<view class=""  v-for="item in replyData">
				<verIfyHf :replyData="item" @deleteItemHf="deleteItemHf" @ckeckdItemHf="ckeckdItemHf"></verIfyHf>
			</view>
			
			
		</view>
		</scroll-view>
	</view>
</template>

<script>
	import api from '../../../pages/api/home.js'
	import verIfyXp from '../../components/verify-son/verify-xp/home.vue'
	import verIfyDp from '../../components/verify-son/verify-dp/home.vue'
	import verIfyWd from '../../components/verify-son/verify-wd/home.vue'
	import verIfyHf from '../../components/verify-son/verify-hf/home.vue'
	export default {
		components:{
			verIfyXp,
			verIfyDp,
			verIfyWd,
			verIfyHf,
		},
		data:function(){
			return{
				// ,{name:'回复',type:'hf'}
				reviewsTitle:["炫拍回复","点评回复","户型回复","问答回复"],
				tilteData:[{name:'炫拍',type:'xp'},{name:'点评',type:'dp'},{name:'问答',type:'wd'},{name:'户型',type:'hf'}],
				curPage:'xp',
				replyTypes:'1',   // 1炫拍回复 2点评回复 3户型回复 4提问回复'
				replyName:'回复',
				flareUpsData:[],
				questionsData:[],
				reviewsData:[],
				replyData:[],
				replyCkeckData:'',
				dpcurrent:1,
				xpcurrent:1,
				wdcurrent:1,
				hfcurrent:1,
				recommendList:'',
			}
			
		},
		methods:{
			scrolltolower:function(){
				console.log("到底了要加载数据")
				let that=this;
				switch(this.curPage){
					case 'xp':
					that.xpcurrent=that.xpcurrent+1
					that.getAwesomeshooting()
					break;
					case 'dp':
					that.dpcurrent=that.dpcurrent+1
					that.getreadingReviews()
					break;
					case 'wd':
					that.wdcurrent=that.wdcurrent+1
					that.getQuestionsPage()
					break;
					case 'hf' :
					that.hfcurrent=that.hfcurrent+1
					that.getTopicreplys()
				}
			},
			// ClickWitchHf:function(e){
			// 	let that=this;
			// 	console.log(e)
			// 	that.curPage=e.currentTarget.dataset.cur
			// 	that.replyName=that.reviewsTitle[e.detail.value]
			// 	that.replyTypes = (parseInt(e.detail.value)+1).toString()
			// 	that.getTopicreply()
			// },
			changeTitle:function(e){
				let type=e.currentTarget.dataset.cur
				console.log(type)
				this.curPage=type
				
			},
			ckeckdreply:function(){
				let that=this;
				let replyCkeckData=that.replyCkeckData
				that.http(api.Topicreply,'PUT',{
					id:replyCkeckData.id,
					auditStatus:replyCkeckData.ckeckd,
				},false).then(res=>{
					console.log(res)
					if(res.data==true){
						switch(replyCkeckData.type){
							case 'xp':
								// that.xpcurrent=1
								// that.flareUpsData=[]
								// that.getAwesomeshooting()
								that.getsengletonAwesomeshooting(replyCkeckData.prentId)
							break;
							case 'wd':
								// that.wdcurrent=1
								// that.questionsData=[]
								that.getsingletonQuestions(replyCkeckData.prentId)
							break;
							case 'dp':
								// that.dpcurrent=1
								// that.reviewsData=[]
								that.getsengletonReviews(replyCkeckData.prentId)
							break;
						}
					}
				})
			},
			ckeckdItemXp:function(value){    //审核炫拍结果
				console.log("ckeckdItemXp")
				console.log(value)
				let that=this;
				that.http(api.Awesomeshooting,'PUT',{
					id:value.id,
					auditStatus:value.ckeckd
				},false).then(res=>{
					console.log(res)
					if(res.data==true){
						// that.xpcurrent=1
						// that.flareUpsData=[]
						that.getsengletonAwesomeshooting(value.id)
					}
				})
			},
			deleteItemXp:function(){		//删除炫拍
				console.log("删除xp")
			},
			replyckeckdItem:function(value){
				console.log("xp回复审核")
				console.log(value)
				this.replyCkeckData=value
				this.ckeckdreply()
			},
			ckeckdItemDp:function(value){   	//审核点评结果
				console.log("ckeckdItemDp")
				console.log(value)
				let that=this;
				that.http(api.Reviews,'PUT',{
					id:value.id,
					auditStatus:value.ckeckd
				},false).then(res=>{
					console.log(res)
					if(res.data==true){
					//	that.dpcurrent=1
						//that.reviewsData=[]
					//	that.getreadingReviews()
						that.getsengletonReviews(value.id)
					}
				})
			},
			deleteItemDp:function(){       //删除点评
				console.log("删除dp")
			},
			ckeckdItemWd:function(value){    //审核问答结果
				console.log('ckeckdItemWd')
				console.log(value)
				let that=this;
				that.http(api.Questions,'PUT',{
					id:value.id,
					auditStatus:value.ckeckd
				},false).then(res=>{
					console.log(res)
					if(res.data==true){
						// that.wdcurrent=1
						// that.questionsData=[]
						that.getsingletonQuestions(value.id)
					}
				})
				
			},
			deleteItemWd:function(){		//删除问答
				console.log("删除wd")
			},
			deleteItemHf:function(){		//删除回复
				console.log("删除hf")
			},
			
			getAwesomeshooting:function(){ //楼盘炫拍
				let that=this;
				that.http(api.Awesomeshootingredding,'GET',{
					current: that.xpcurrent,
					size: 5,
					descs: 'create_time', 
					auditStatus:0,
					//createId:getApp().globalData.wxUser.id,
				},false).then(res=>{
					console.log("审核炫拍")
					console.log(res)
					for(let items of res.data.records){
						that.flareUpsData.push(items)
					}
				
				})
			},
			
			getQuestionsPage:function(){   //楼盘问答
				let that=this;
				that.http(api.QuestionsPage,'GET',{
					current: that.wdcurrent,
					size: 5,
					descs: 'create_time',
					auditStatus:0,
					
				},false).then(res=>{
				console.log("审核问答")
				console.log(res)
				
				//that.questionsData=res.data.records
				for(let items of res.data.records){
					that.questionsData.push(items)
				}
				})
			},
			
			getsingletonQuestions:function(value){			//问答点击审核后获取点击目标id查询新的状态
				let that=this;
				let id =value
				that.http(api.QuestionsPage,'GET',{
					// current: 1,
					// size: 5,
					id:id
					// auditStatus:1,
					// createId:getApp().globalData.wxUser.id
				},false).then(res=>{
					console.log("楼盘问答")
					console.log(res)
					
					let questionsItem=res.data.records[0]
					let index = ''
					let list = that.questionsData
					for(let i =0;i<list.length;i++){
						if(list[i].id==questionsItem.id){
							index=i
						}
						
					}
					that.questionsData.splice(index,1,questionsItem)	//替换最新的点击目标
					
				})
			},
			getsengletonAwesomeshooting:function(value){   //單條查詢
				let that=this;
				let id =value 
				that.http(api.Awesomeshootingredding,'GET',{
					current: 1,
					size: 1,
					id:id
					//auditStatus:1,
					
					// createId:getApp().globalData.wxUser.id,
					// userId:getApp().globalData.wxUser.id
				},false).then(res=>{
					console.log("单挑炫拍")
					console.log(res)
					
					let dazzleBeatData = res.data.records[0]     
				//	that.chooseGW()
					let index=''
					let list=that.flareUpsData
					for(let i =0;i<list.length;i++){
						if(list[i].id==dazzleBeatData.id){
							index=i
						}
					}
					that.flareUpsData.splice(index,1,dazzleBeatData)
				})
			},
			getsengletonReviews:function(ids){  //楼盘点评
				let that=this;
				let id = ids 
				console.log(id)
				that.http(api.ReadingReviews,'GET',{
					current: 1,
					size: 1,
					id:id
					//auditStatus:1,
					
					//createId:getApp().globalData.wxUser.id,
					// userId:getApp().globalData.wxUser.id
				},false).then(res=>{
					console.log("1请求点评详情，2刷新数据")
					console.log(res)
					let itemReviews = res.data.records[0]
					let list = that.reviewsData
					console.log(list)
					let y=0
					for(let i =0;i<list.length;i++){
						if(list[i].id==itemReviews.id){
							y=i
						}
					}
					console.log(list)
					that.reviewsData.splice(y,1,itemReviews)
					
				})
			},
			getreadingReviews:function(){  //楼盘点评
				let that=this;
				that.http(api.ReadingReviews,'GET',{
					current: that.dpcurrent,
					size: 5,
					descs: 'create_time',
					auditStatus:0,
				//	createId:getApp().globalData.wxUser.id,
					//userId:getApp().globalData.wxUser.id
				},false).then(res=>{
					console.log("审核点评")
					console.log(res)
					
					for(let items of res.data.records){
						
						that.reviewsData.push(items)
					}
					// that.reviewsData=res.data.records
				})
			},
			ckeckdItemHf:function(value){
				let that=this;
				console.log(value)
				that.http(api.Topicreply,'PUT',{
					id:value.id,
					auditStatus:value.ckeckd,
				},false).then(res=>{
					this.getSingletonTopicreply(value.id)
				})
			},
			getSingletonTopicreply:function(value){
				let that=this;
				that.http(api.GetTopicreply2,'GET',{
					// current: 1,
					// size: 5,
					id:value,
				//	descs: 'create_time',
					// auditStatus:0,
					// replyTypes:'3'
				},false).then(res=>{
					console.log("查单个")
					console.log(res)
					let itemReplyDate=res.data.records[0]
					let replyData=that.replyData
					let recommendList =that.recommendList
					for(let item of recommendList){
						if(item.id==itemReplyDate.typesId){
							itemReplyDate.apartmentLayout=item
						}
					}
					let index=''
					for(let i =0;i<replyData.length;i++){
						if(replyData[i].id==itemReplyDate.id){
							index=i
						}
					}
					that.replyData.splice(index,1,itemReplyDate)
				})
			},
			getTopicreplys:function(){
				let that=this;
				// let replyTypes=this.replyTypes
				// console.log(replyTypes)
				// let replyData=that.replyData
				that.http(api.GetTopicreply2,'GET',{
					current: that.hfcurrent,
					size: 5,
				//	descs: 'create_time',
					auditStatus:0,
					replyTypes:'3'
				},false).then(res=>{
					console.log("审核户型回复")
					console.log(res)
					let recommendList=that.recommendList
					// that.replyData=res.data.records
					let list = res.data.records
					console.log(recommendList)
					for(let i=0;i<recommendList.length;i++){
						for(let j=0;j<list.length;j++){
							if(recommendList[i].id==list[j].typesId){
								list[j].apartmentLayout=recommendList[i]
							}
						}
					}
					for(let item of list){
						that.replyData.push(item)
					}
					
				})	
			},
			getapartmentlayout:function(){    //户型
				let _self=this;
				_self.http(api.ApartmentLayout,'GET',{
					current: 1,
					size:20,
					descs: 'is_stick',
				},false).then(res=>{
					console.log("户型")
					console.log(res)
					_self.recommendList=res.data.records
					_self.getTopicreplys()
				})
			},
		},
		onLoad() {
			this.getAwesomeshooting()
			this.getQuestionsPage()
			this.getreadingReviews()
			this.getapartmentlayout()
		}
	}
</script>

<style>
	.srollview{
		height: calc(100vh - 160rpx);
	}
	.title{
		display: flex;
		justify-content: space-between;
		padding:10rpx 30rpx;
	}
	.titleItemCheck{
	    background:rgba(22,204,246,1);
		color:rgba(255,255,255,1);
	}
	.titleItem{
		padding:10rpx 20rpx;
		border-radius:10rpx;
		box-shadow: 0rpx 0rpx 5rpx 2rpx #EEEEEE;
	}
	page{
		background-color: #FFFFFF;
	
	}
</style>
