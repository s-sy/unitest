<template>
	<view class="">
		<!-- <cu-custom bgColor="" :isBack="true">
				 <block slot="backText"></block>
				 <block slot="content" class="title-text"></block>
		</cu-custom> -->
		<web-view :src="newsData.articleLink"></web-view>
	</view>
</template>

<script>
	import init from '../../utils/initPage.js'
	import api from '../api/home.js'
	export default {
		data: function() {
			return {
				newsData: '',

			}

		},
		methods: {
			getNewsInformation: function(ids) {
				let that = this;
				let id = ids
				that.http(api.NewsInformation, 'GET', {
					id: id
				}, false).then(res => {
					console.log("单挑news")
						console.log(res)
					that.newsData = res.data.records[0]
				})
			},
			getBaseBudding() {
				let that = this;
				console.log("build")
				let id =getApp().globalData.projectItem.id;
				that.http(api.BaseBudiing+"/get/"+id,'GET',{},false).then(res => {
					console.log("楼盘基本信息")
					console.log(res)


					getApp().globalData.BaseBudding = res.data
					//that.tagData=(this.baseBudding.keywords || '').split(' ')
					//that.index=parseInt(this.baseBudding.salesStatus)
					//that.getBuddingDetail()
				})

			},
			Jiema(web,aff,user){
				let that=this;
				return new Promise((resolve,reject)=>{
					that.http(api.Jiema,'GET',{
						aff:aff,
						user:user,
						scene:web,
					},false).then(res=>{
						console.log("解码")
						console.log(res)
						resolve(res)
					})
				})
			},
		},
		onShareAppMessage: function() {
			let BaseBudding = getApp().globalData.BaseBudding
			let invitee = '';
			let project = getApp().globalData.projectItem;
			let code =project.affiliationCode || this.affCode
			let wxUser = getApp().globalData.wxUser
			// if(wxUser.userType=='1'){
			invitee = wxUser.id
			// }
			// if(wxUser.userType=='0'){
			// 	invitee=wxUser.invitee
			// }
			//console.log("invitee")
			//console.log(invitee)
			 let scene='age_'+code+'_'+wxUser.userCode
			let newsData = this.newsData
			
			return {
				title: newsData.title,
				imageUrl: newsData.thumbnail,
				path: '/pages/newsWebview/home?invitee=' + invitee + '&id=' + this.newsData.id+'&scene='+scene
			};
			
			
			
			// let project = getApp().globalData.projectItem
			// let code =project.affiliationCode || this.affCode
			// let scene='age_'+code+'_'+wxUser.userCode
			// return {
			//   title:BaseBudding.projectName,
			//   path: '/pages/questionsAndAnswers/home?invitee='+invitee +'&scene='+scene
			// }
			
		},
	async onLoad(options) {
			
			console.log("-----------------------------------------------------------------")
			console.log(options)
			let that=this;
			if(options.scene){
				let scene=decodeURIComponent(options.scene)
			
				let list=scene.split("_")
				let values= await that.Jiema(list[0],list[1],list[2])
				//console.log(list)
				//console.log(values)
				values.data['senen']=list[0]
				let obj={id:values.data.affId}
				 getApp().globalData.projectItem= obj
				// console.log(values.data)
				 getApp().globalData.senen=values.data
			    getApp().globalData.invitee=values.data.userId
				// this.ordinal=parseInt(list[3])
				that.affCode = list[1]
			}
			if (options.invitee) {
				getApp().globalData.invitee = options.invitee
			}
			init.initPage().then(res => {
				
				that.getNewsInformation(options.id)
				that.getBaseBudding()
			})
		}
	}
</script>

<style>
</style>
