<template>
	<view class="">
		<button @click="getUserProfile">微信授权</button>
	</view>
</template>

<script>
	export default{
		data:function(){
			return {
				
			}
		},
		methods:{
			// getuserinfo(){
			// if(e.detail.errMsg=="getUserInfo:ok"){
			// 			//TODO:e.detail 存起来
			// 	this.getwxUser(e.detail)
			// 	//this.toflareUpsPush()
			// 	}
			// }
			getUserProfile(e) {
					    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
					    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
					let that=this;
					    wx.getUserProfile({
					      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					      success: (res) => {
					
							   that.http(api.wxUserSave,"POST",res,false).then(reslut=>{
							   
							   console.log(reslut)
							   	
							   	that.userInfoGet()
							   	
							   })
					      }
					    })
					  },
		},
		
		userInfoGet:function(){
					 let that=this
					 this.http(api.userInfoGet,'GET',{},false)
					    .then(res => {
					    that.wxUser=res.data
						console.log(res)
					    getApp().globalData.wxUser=res.data
					    })
					},
		
	}
</script>

<style>
</style>
