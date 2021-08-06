<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="title-text">客户详情</block>
		</cu-custom>
		<!-- <view class="topA">
			<view class="" >
				<image class="image-A" src="https://img.0728jh.com/staticImg/bannerbg.png" mode=""></image>
			</view>
			<view class="topA-center margin-lr-xl">
				<view class="flex ">
					<view class="topA-center-name">
						王超
					</view>
					<view class="A-state">
						询问
					</view>
					<view class="A-reater">
						B
						
					</view>
				</view>
				<view class="B-phone">
					18666086490
				</view>
				<view class="">
					资料完整度：77%
				</view>
			</view>
			<view class="flex margin-top-xl">
				<text class="cuIcon-mark" style="width:30rpx,height:30rpx"></text>
				<view class="driver">
					
				</view>
				<text class="cuIcon-dianhua"></text>
			</view>
		</view> -->
		
		<view class="kh-has-title">
			<view class="kh-has-padding-title">
				<block v-for="(item,index) in titleName" :key="index">
				<view class="kh-has-item" v-on:click="changeKHData" :data-keyword="item.keyword">
					<view :class="keyword==item.keyword?'kh-has-text-copy':'kh-has-text'" >
						{{item.name}}
					</view>
					<view :class="keyword==item.keyword?'kh-has-xian-copy':'kh-has-xian'">
						
					</view>
				</view>
				</block>
			</view>
		</view>
		<view class="" v-if="keyword=='yy'">
			<view class="padding-lr-lg">
				<evan-steps >
					<block v-for="(items,index) in historyData" :key="index">
						<evan-step :createTime="items | getcreateTime"
								   :title="items.name"  
								   :distribution="items | getdistribution"
								   :description="items | getrequestData" 
								   :subdescription="items | getmanagerDeration" 
								   :ImgData="items | getimgData" 
								   :status="index==items.length?'process':'wait'">
							
						</evan-step>
						
					</block>
					
					<!-- <evan-step title="第一步" description="nihoa ">
						
					</evan-step>
					<evan-step title="人员判客"  subdescription="跟进人 : 小文">
						
					</evan-step> -->
				</evan-steps>
			</view>
		</view>
		<view class="" v-if="keyword=='rc'">
			<view class="twoItemye">
				
			
			<view class="itemtopc">
				<view class="itemtitle">
				客户姓名：
				</view>
				<view class="itemcontent">
					{{baseData.customername}}
				</view>
				
			</view>
			<view class="itemtopc">
				<view class="itemtitle">
				性别：
				</view>
				<view class="itemcontent">
					{{baseData.gender=="1"?"男":"女"}}
				</view>
			</view>
			<view class="itemtopc">
				<view class="itemtitle">
			电话：
				</view>
				<view class="itemcontent">
					{{variableData | getphone}}
				</view>
			</view>
			<view class="itemtopc">
				<view class="itemtitle">
			意向：
				</view>
				<view class="itemcontent">
					{{baseData.description}}
				</view>
			</view>
			<view class="itemtopc">
				<view class="itemtitle">
			创建时间：
				</view>
				<view class="itemcontent">
					{{getdetailcreateTime}}
				</view>
			</view>
			<view class="itemtopc">
				<view class="itemtitle">
			置业顾问：
				</view>
				<view class="itemcontent">
					{{variableData | getsleanmanName}}
				</view>
			</view>
			<view class="itemtopc">
				<view class="itemtitle">
			当前流程：
				</view>
				<view class="itemcontent">
					{{baseData.currenthandler? baseData.currenthandler:"暂无信息"}}
				</view>
			</view>
			<view class="itemtopc">
				<view class="itemtitle">
				客户状态：
				</view>
				<view class="itemcontent">
					{{baseData.workflowstatus==0?"正常":baseData.workflowstatus==1?"完结":baseData.workflowstatus==2?"冻结":baseData.workflowstatus==3?"延期":"无效客户"}}
				</view>
				
			</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import EvanSteps from 'pagestwo/components/evan-steps/evan-steps.vue'
	import EvanStep from 'pagestwo/components/evan-steps/evan-step.vue'
	import api from '../../pages/api/home.js'
	export default{
		data:function(){
			return {
				baseData:'',
				keyword:'yy',
				titleName:[{name:"跟进记录", keyword:"yy"},{name:"资料信息",keyword:'rc'},],
				historyData:[],
				variableData:[],
			};
		},
		components:{
			EvanSteps,
			EvanStep
		},
		computed:{
			getdetailcreateTime:function(){
				console.log("++++++++++++++++++++++")
				
				console.log(this.historyData)
				if(this.historyData.length!=0){
					let createTime = new Date(this.historyData[0].startTime);
					
					let year=createTime.getFullYear()
					let month=createTime.getMonth()+1
					// let day =createTime.getDay()
					let day = createTime.getDate();
					let hours=createTime.getHours()
					let minutes=createTime.getMinutes()
					let createTimes=year+"/"+month+"/"+day+" "+hours+":"+minutes
					return createTimes;
				}else{
					return "暂无时间";
				}
				
				
			},
		},
		filters:{
			getcreateTime:function(value){
				console.log("取时间")
			
				console.log(value.startTime)
			
				// return "123456";
				// let createTime=new Date(value.startTime).toLocaleString().replace(/:\d{1,2}$/,' ');
				let createTime = new Date(value.startTime);
				console.log(createTime);
				let year=createTime.getFullYear()
				let month=createTime.getMonth()+1
				let day = createTime.getDate();
				// console.log(getDate);
				// let day =createTime.getDay()
				console.log(day);
				let hours=createTime.getHours()
				let minutes=createTime.getMinutes()
				let createTimes =year+"/"+month+"/"+day+" "+hours+":"+minutes
				console.log(createTimes);
				return createTimes;
			},
			getdistribution:function(value){
				let distribution="";
			        
					for(let i =0;i<value.resdistribList.length;i++){
						if(value.resdistribList[i].id == value.assignee){
							distribution=value.resdistribList[i].realName?value.resdistribList[i].realName:value.resdistribList[i].nickName
						}
					}
					if(distribution==""){
						distribution="经理";
					}
					// console.log("置业顾问")
			  //   	console.log(value)
				return "办理人："+distribution;
			},
			getphone:function(value){
				for(let i =0;i<value.length;i++){
					if(value[i]["phone"]){
					return value[i]["phone"];
					}
				}
			},
			
			getsleanmanName:function(value){
				for(let i =0;i<value.length;i++){
					if(value[i]["customerName"]){
					return value[i]["customerName"];
					}
				}
			},
		getrequestData:function(value){
			let type='_requestData';
		//	console.log(value)
			let res=""
			let list= value.variableData;
			for(let i =0;i<list.length;i++){
				
				let id =value.id+type;
				for(let key in list[i]){
					//console.log(key)
					 if(id==key){
						res= list[i][key];
					 }
				}
			}
			return res;
		},
		getmanagerDeration:function(value){
			let type='_managerDeration';
		//	console.log(value)
			let res=""
			let list= value.variableData;
			for(let i =0;i<list.length;i++){
				
				let id =value.id+type;
				for(let key in list[i]){
					//console.log(key)
					 if(id==key){
						res= list[i][key];
					 }
				}
			}
			return res;
		},
		getimgData:function(value){
			let type='_imgData';
			//console.log(value)
			let res=""
			let list= value.variableData;
			for(let i =0;i<list.length;i++){
				
				let id =value.id+type;
				for(let key in list[i]){
					//console.log(key)
					 if(id==key){
						res= list[i][key];
					 }
				}
			}
			return res;
		},
		},
		methods:{
			cehckData:function(e){
				// console.log("___________________________________________")
				// console.log(this.baseData)
				// console.log(this.historyData)
				// console.log(this.variableData)
			},
			changeKHData:function(e){
				
				this.keyword=e.currentTarget.dataset.keyword
				
			},
			
			getReferrals(id,resdistriblist){
				let that = this;
				that.http(api.Referrals+'/get','GET',{
					id:id,
				},false).then(res=>{
					console.log(res)
					that.baseData=res.data.referrals
					let value = res.data.referrals.instanceid
					console.log(value)
					
					
					that.getHistoryVariableInstanceId(value,resdistriblist)
					
				
				})
			},
		 getHistoryVariableInstanceId(values,resdistriblist){
				let that=this;
				console.log(values)
				let resData=[];
				uni.request({
					url:api.GetHistoryVariable,
					method:'GET',
					data:{
						processInstanceId:values,
						//variableNameLike:"%Record"
					},
					success(res) {
						console.log("Variable")
						console.log(res)
						for(let i=0;i<res.data.length;i++)
						{
							let object={};
							let id ="id";
							let idvalue= res.data[i].id
							let key = res.data[i].name;
							let value=res.data[i].value;
							//console.log(key)
							//console.log(value)
							object[key]=value;
							// object[id]=idvalue;
						
						
						resData.push(object)
						}
						console.log(resData)
						console.log("Variable")
						that.variableData=resData;
						// let idss =getApp().globalData.projectItem.id
						// let resdistriblist= await that.http(api.getall,'GET',{affId:idss},false);
						// console.log("_____")
						that.getHistoryByInstanceId(values,resData,resdistriblist)
						
					}
				})
			},
			getHistoryByInstanceId(id,list,resdistriblist){
				let that=this;
				console.log("++++")
				// that.http(api.GetHistory,'GET',{
				// 	processInstanceId:id
				// },false).then(res=>{
				// 	console.log(res)
				// })
				uni.request({
					url:api.GetHistory,
					method:'GET',
					data:{
						processInstanceId:id,
					},
					success(res) {
						
							
							let resData=res.data;
							if(resData.length>0){
								for(var i =0;i<resData.length;i++){
									resData[i].startTime = new Date(resData[i].startTime).getTime();
									resData[i]["variableData"] =list;
									resData[i]["resdistribList"]=resdistriblist;
								}
								resData.sort(function(a,b){
									return a.startTime - b.startTime;
								});
							}
							
							console.log(resData);
							// for(let j=0;j<resData.length;j++){
							// 	if(!resData[i].id){
							// 		resData.splice(i,1);
							// 	}
							// }
							that.historyData = resData
					}
				})
			},
			
		},
		async onLoad(options) {
			let that=this;
			// console.log(options)
			// console.log("========================")
			//let time = new Date("2020-09-28T16:23:00.000+0800");
			//console.log(time.getTime())
			
			
			let idss =getApp().globalData.projectItem.id
			let resdistriblist= await that.http(api.getall,'GET',{affId:idss},false);
			console.log("+++++++++++++++++++++++++++")
			console.log(resdistriblist)
			this.getReferrals(options.id,resdistriblist.data)
		}
	}
</script>

<style>
	.twoItemye{
		margin:20rpx;
		padding:10rpx 20rpx;
		
	}
	.itemtopc{
		display: flex;
		padding: 10rpx 5rpx;
		/* border: solid 1rpx #000000; */
	}
	
	.itemtitle{
		font-size: 30rpx;
		font-weight: 800;
		width:160rpx;
		/* border:solid 1rpx  #000000; */
	}
	.itemcontent{
		font-size: 30rpx;
		font-weight: 400;
		color: rgba(153,153,153,1);
		/* width:500rpx; */
		max-width:500rpx;
		/* border: solid 1rpx #000000; */
	}
	.topA{
		display: flex;
		align-items: center;
		justify-content: center;
		background: url(https://img.0728jh.com/staticImg/bannerbg.png) repeat fixed center;
		padding:100rpx 30rpx;
		color:white;
	}
	.image-A{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		border:solid 1rpx white;
	}
	.topA-center{
		
	}
	.driver{
		border-left: solid white 1rpx;
		margin:0rpx 20rpx;
	}
	.topA-center-name{
		padding:5rpx 10rpx;
	}
	.A-state{
		padding:5rpx 10rpx;
		border: solid 1rpx white;
		border-radius: 10rpx;
		margin:0rpx 10rpx 0rpx 5rpx;
	}
	.A-reater{
		padding:5rpx 10rpx;
		border: solid 1rpx white;
		border-radius: 10rpx;
	}
	.B-phone{
		margin:5rpx 0rpx;
	}
	
	
	/**
	 * 	标题导航	
	 */
	.kh-has-xian-copy{
			background:rgba(0,202,232,1);
			border-radius:4rpx;
			width:100rpx;
			height:8rpx;
			margin:auto;
		}
		.kh-has-xian{
			
			border-radius:4rpx;
			width:100rpx;
			height:8rpx;
			margin:auto;
		}
		.kh-has-item{
			
		}
		.kh-has-text-copy{
			margin-bottom: 23rpx;
			color:rgba(0,202,232,1);
		}
		.kh-has-text{
			margin-bottom: 23rpx;
		}
		.kh-has-padding-title{
			display: flex;
			border-bottom: solid 1rpx #EEEEEE;
			justify-content: space-between;
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(153,153,153,1);
			
		}
		.kh-has-title{
			padding:30rpx;
		}
</style>
