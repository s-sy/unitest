<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" class="title-text">Chart</block>
		</cu-custom>
		<view>
			<button @click="connect">连接</button>
			<button @click="disconnect">断开</button>
			<button @click="subscribe">订阅</button>
			<button @click="unsubscribe">取消订阅</button>
			<input class="uni-input" v-model="msg" />
			<button @click="send">发送消息</button>
			<view v-for="(item, index) in dataList" :key="index">
				{{index}}:{{item}}
			</view>
			
			
		</view>
		<block v-for="(item, index) in dataList" :key="index">
			<view class="cu-chat" >
				<view class="cu-item self" v-if="item.senderId==wxUser.id">
					<view class="main">
						<view class="content bg-green shadow">
							<text>{{item.messageblob}}</text>
						</view>
					</view>
					<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
					<view class="date">{{item.createTime}}</view>
				</view>
				
				<!-- <view class="cu-info round">对方撤回一条消息!</view> -->
				<view class="cu-item" v-else>
					<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
					<view class="main">
						<view class="content shadow">
							<text>{{item.messageblob}}</text>
						</view>
					</view>
					<view class="date">{{item.createTime}}</view>
				</view>
			
		
		
			<!-- <view class="cu-info">
				<text class="cuIcon-roundclosefill text-red "></text> 对方拒绝了你的消息
			</view> -->
			<!-- <view class="cu-info">
				对方开启了好友验证，你还不是他(她)的好友。请先发送好友验证请求，对方验证通过后，才能聊天。
				<text class="text-blue">发送好友验证</text>
			</view> -->
			<!-- <view class="cu-item self">
				<view class="main">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date"> 13:23</view>
			</view> -->
			<!-- <view class="cu-item self">
				<view class="main">
					<view class="action text-bold text-grey">
						3"
					</view>
					<view class="content shadow">
						<text class="cuIcon-sound text-xxl padding-right-xl"> </text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view> -->
			<!-- <view class="cu-item self">
				<view class="main">
					<view class="action">
						<text class="cuIcon-locationfill text-orange text-xxl"></text>
					</view>
					<view class="content shadow">
						喵星球，喵喵市
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view> -->
			<!-- <view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						@#$^&**
					</view>
					<view class="action text-grey">
						<text class="cuIcon-warnfill text-red text-xxl"></text> <text class="text-sm margin-left-sm">翻译错误</text>
					</view>
				</view>
				<view class="date">13:23</view>
			</view> -->
		</view>
		</block>
		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
			 @focus="InputFocus" @blur="InputBlur"  :value="msg"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow" @tap="PostSend">发送</button>
		</view>
	</view>
	
	
</template>

<script>
	import api from '../../pages/api/home.js'
	import ws from '../../utils/websocket/ws.js'
	//import { refreshToken } from '@/config/config.js'
	//import {mapState,mapMutations} from 'vuex'
	export default {
	//	computed:{ ...mapState(['login'])},
		data() {
			return {
				msg: '',
				dataList: [],
				InputBottom:0,
				wxUser:getApp().globalData.wxUser,
			}
		},
		onLoad() {
			// 模拟获取token，此步操作应在登录时去做
			//refreshToken()
			console.log(getApp().globalData)
		},
		watch:{
			dataList:function(){
				console.log(this.dataList)
			},
		},
		onShow() {
			this.connect()
			this.subscribe()
			this.PostPage()
			
		},
		onHide() {
			this.disconnect()
		},
		methods: {
		//	...mapMutations(['logout']),
			PostUnreadCount(){
				let that=this;
				let project=getApp().globalData.projectItem
				let user=getApp().globalData.wxUser
				that.http(api.ChattingRecords+"/unreadcount",'POST',{
					affiliationId:"",
					tenantId:'',
					userId:user.id,
					salesmanId:user.invteen,
				},false).then(res=>{
					console.log(res);
				})
			},
		
			PostSend(){
				
				
				let that=this;
				if(!that.msg.replace(" ","")){
					return;
				}
				let project=getApp().globalData.projectItem
				let user=getApp().globalData.wxUser
				console.log(user)
				
				let salessId="1301357596194103298"
				that.http(api.ChattingRecords+"/send",'POST',{
					 affiliationId:project.id,
					 tenantId:project.tenantId,
					 userId:user.id,
					 salesmanId:salessId,
					 messageblob:that.msg,
					 type:'0', //0 表示消息，1表示图片
				},false).then(res=>{
					console.log(res);
				})
				let message={
					affiliationId:project.id,
					tenantId:project.tenantId,
					senderId:user.id,
					userId:user.id,
					salesmanId:salessId,
					createTime:new Date(),
					messageblob:that.msg,
					type:'0', //0 表示消息，1表示图片
				}
				that.send(message);
				that.dataList.push(message)
			},
			PostReceived(){
				let that=this;
				that.http(api.ChattingRecords+"/received",'POST',{
					affiliationId:"",
					tenantId:'',
					userId:user.id,
					salesmanId:user.invteen,
				},false).then(res=>{
					console.log(res);
				})
			},
			PostPage(){
				let that=this;
				let project=getApp().globalData.projectItem
				let user=getApp().globalData.wxUser
				that.http(api.ChattingRecords+"/page",'POST',{
					currentPage:1,
					pageSize:20,
					affiliationId:project.id,
					tenantId:project.tenantId,
					userId:user.id,
				},false).then(res=>{
					console.log(res);
					that.dataList=that.dataList.concat(res.data.chattingRecordsVOList);
				})
			},
			deleteMessage(iid){
				let that=this;
				let id=iid;
				that.http(api.ChattingRecords+"/"+id,'DELETE',{},false).then(res=>{
					console.log(res);
				})
			},
			
			/**
			 * 创建连接
			 */
			connect() {
				ws.connect()
			},
			/**
			 * 断开连接
			 */
			disconnect(aa) {
				ws.disconnect()
			},
			/**
			 * 订阅
			 */
			subscribe() {
				ws.subscribe("/topic/chat.typing", this.typing)
				ws.subscribe("/topic/chat.message",this.message)
				ws.subscribe("/user/exchange/amq.direct/chat.message",this.chatMessage)
				ws.subscribe("/app/chat.participants",this.participants)
				ws.subscribe("/topic/chat.login",this.login)
				ws.subscribe("/topic/chat.logout",this.logout)
				
			},
			/**
			 * 取消订阅
			 */
			unsubscribe() {
				ws.unsubscribe("/user/topic/message")
			},
			participants(data){
				console.log("---获取在线列表--")
				console.log(data)
			    console.log("-----")
				
			//	this.dataList.push(data.body)
				
			},
			typing(data){
				console.log("打字")
				console.log(data)
				
			//	this.dataList.push(data.body)
			},
			login(data){
				console.log("登录")
				console.log(data)
			//	this.dataList.push(data.body)
			},
			logout(data){
				console.log("登出");
				console.log(data)
			//	this.dataList.push(data.body)
			},
			chatMessage(data){
				console.log("dddddd")
				console.log(data)
				console.log("--------------------------------------")
				let JSONMage = JSON.parse(data.body)
				console.log(JSONMage)
				console.log("--------------------------------------")
				let message={
					senderId:JSONMage.id,
					messageblob:JSONMage.message,
					// createTime:new Date()
				}
				console.log(message)
				this.dataList.push(message)
			},
			/**
			 * 接收消息
			 * @param {Object} data
			 */
			message(data) {
				console.log(data.body)
			
				
				
				//this.dataList.push(meassage)
			},
			
			/**
			 * 向服务端发送消息
			 */
			send(message) {
				console.log(message);
				
				let userId= message.salesmanId;
				console.log(this.msg)
				
				//client.send('/app/chat.message', {}, JSON.stringify({ message: 'newMessage' }));
				//  
								//  1313016136671330306
								  
				ws.send("/app/chat.private/1301357596194103298",JSON.stringify({ message: this.msg }))
			},
		
			
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
				console.log("++++++++++++++++++++++++++++++++++")
				console.log(e)
				this.msg=e.detail.value;
				
			},
			sendMessage(){
				this.send()
			}
		}
	}
</script>

<style>
	.uni-input {
		height: 40px;
	}
</style>

