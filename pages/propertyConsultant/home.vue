<template>
	<view class="consultant">
		<cu-custom bgColor="" :isBack="true">
				 <block slot="backText"></block>
				 <block slot="content" class="title-text">置业顾问</block>
		</cu-custom>
		<view class="consultant-counter" v-for="item in pconsultantList">
			<counter :userInfo="item" :isShow="'consultant'"></counter>
		</view>
	</view>
</template>

<script>
	import api from '../../pages/api/home.js'
	export default {
		data:function(){
			return {
				pconsultantList:'',
				wxUser:getApp().globalData.wxUser
			}
		},
		methods:{
			// getUserinfo:function(){   //置业顾问
			// 	let that=this;
			// 	that.http(api.UserInfo,'GET',{
			// 		current: 1,
			// 		size: 3,
			// 		userType:'1'
			// 		// descs: 'sort',
			// 	},false).then(res=>{
			// 		console.log("置业顾问")
			// 		console.log(res)
			// 		that.pconsultantList=res.data.records
			// 	})
			// },
			userInfoGet:function(){
			 let that=this
			 this.http(api.userInfoGet,'GET',{},false)
			    .then(res => {
						// console.log("userInfoGet")
						// console.log(res)
			       // userInfo: res.data
			    that.wxUser=res.data
			    getApp().globalData.wxUser=res.data
				//that.getUserinfo() 			//刷新置业顾问
				that.getUserinfozhiye();
			    })
			},
			async getUserinfozhiye(){   //置业顾问
				let that=this;
				let id =getApp().globalData.projectItem.id
			    let res= await that.http(api.getall,'GET',{affId:id},false);
				let pconsul=res.data
				//console.log("ddddddddddddddddddd")
				//console.log(pconsul)
				let wxUser=getApp().globalData.wxUser.distribution
				let list=[];
				
				for(let i=0;i<pconsul.length;i++){
					
						 for(let j=0 ;j<wxUser.length;j++){
						
							 if(pconsul[i].id == wxUser[j]){
								 getApp().globalData.distribution = pconsul[i]
								 list.push(pconsul[i])
							 }
						 }
					}
				if(list.length==0){
					let senen = getApp().globalData.senen
						//console.log(senen)
					if(senen){
						switch(senen.senen){
							case 'web':
							await that.bingZy(senen.userId)
							for(let x=0;x<pconsul.length;x++){
								if(pconsul[x].id==senen.userId){
									list.push(pconsul[x])
								}
							}
							that.pconsultantList=list	
							break;
							default: that.pconsultantList=pconsul;
						 }
					 }else{
						that.pconsultantList=pconsul;
					 }

					}else{
						that.pconsultantList=list;
					}
			// console.log("zhye")
			// console.log(res)
	
			},
			// getUserinfo:function(){   //置业顾问
			// 	let that=this;
			// 	that.http(api.UserInfo,'GET',{
			// 		current: 1,
			// 		size: 50,
			// 		userType:'1'
			// 		// descs: 'sort',
			// 	},false).then(res=>{
			// 		console.log("置业顾问")
			// 		console.log(res)
			// 		console.log("置业顾问")
			// 		console.log("wxUser")
			// 		console.log(getApp().globalData)
			// 		console.log("wxUser")
			// 		let pconsultantList=res.data.records
			// 		let wxUser = getApp().globalData.wxUser
			// 		let wxInvitee = getApp().globalData.wxUser.invitee  
			// 		let scanInviteen = getApp().globalData.invitee
					
					
			// 		switch(wxUser.userType){
			// 			case '3':
			// 			that.pconsultantList=pconsultantList
			// 			break;
			// 			case '1':
			// 				let myList=[]
			// 				pconsultantList.forEach(item=>{
			// 					if(item.id==wxUser.id){
			// 						myList.push(item)
			// 					}
			// 				})
			// 				// if(myList.length==0){
			// 				// 	myList=pconsultantList
			// 				// }
			// 				console.log(myList)
			// 				getApp().globalData.callMePhone=myList[0]
			// 				that.pconsultantList=myList
							
			// 			break;
			// 			case '0':
							
			// 				if(wxInvitee){
			// 					let pconsultantListOne=[]
			// 					// pconsultantList.forEach(item=>{
			// 					// 	if(item.id==wxInvitee){
										
			// 					// 		pconsultantListOne.push(item)
			// 					// 		that.IsBudingPhone=false;
										
			// 					// 	}
			// 					// })
			// 					for(let j=0 ;j<pconsultantList.length;j++){
			// 						if(pconsultantList[j].id==wxInvitee){
			// 							pconsultantListOne.push(pconsultantList[j])
			// 							that.IsBudingPhone=false;
			// 						}
			// 					}
			// 					console.log(pconsultantListOne)
			// 					getApp().globalData.callMePhone=pconsultantListOne[0]
			// 					that.pconsultantList=pconsultantListOne
			// 				}else{
			// 					that.pconsultantList=pconsultantList
			// 				}
			// 				break;
			// 		}
					
					// if(wxUser.userType=='3'){
					// 	that.pconsultantList=pconsultantList
					// 	return;
					// }
					// if(wxUser.userType=='1'){
					// 	let myList=[]
					// 	pconsultantList.forEach(item=>{
					// 		if(item.id==wxUser.id){
					// 			myList.push(item)
					// 		}
					// 	})
					// 	if(myList.length==0){
					// 		myList=pconsultantList
					// 	}
					// 	that.pconsultantList=myList
					// }else{
					// 	if((!wxInvitee) && (!scanInviteen)){
					// 		that.pconsultantList=pconsultantList
					// 	}else{
					// 		let pconsultantListOne=[]
					// 		if(wxInvitee){
					// 			pconsultantList.forEach(item=>{
					// 				if(item.id==wxInvitee){
					// 					pconsultantListOne.push(item)
					// 				}
					// 			})
					// 		}else{
					// 			pconsultantList.forEach(item=>{
					// 				if(item.id==scanInviteen){
					// 					pconsultantListOne.push(item)
					// 				}
					// 			})
					// 		}
					// 		getApp().globalData.callMePhone=pconsultantListOne[0]
					// 		that.pconsultantList=pconsultantListOne
							
					// 	}
					// }
					
					
					
				// })
			// },
			
		},
		onLoad() {
			//console.log("onL")
			this.userInfoGet()
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
	.consultant-counter{
		padding:10rpx 30rpx 20rpx 30rpx;
	}
	.consultant{
		height: 100vh;
		background-color: #FFFFFF;
	}
</style>
