//let Baseurl='https://dev.aiforest.net';
//let Baseurl='https://admin.0728jh.com';
// let Baseurl='http://192.168.22.201:8082';
let Baseurl = 'https://ad.kehuoa.com';
export default {
	platforminfo: Baseurl + '/estate/api/es/platforminfo',
	getall: Baseurl + '/estate/api/es/salesmen/all',
	get: Baseurl + '/estate/api/es/salesmen/get',
	Longin: Baseurl + '/weixin/api/es/wxuser/login', //登录
	userInfoGet: Baseurl + '/estate/api/es/userinfo', // 查看用户信息
	wxUserSave: Baseurl + '/estate/api/es/wxuser', //授权
	// wxUserGet:Baseurl+'/estate/api/ma/wxuser'  ,  //用户查询
	Notice: Baseurl + '/estate/api/es/advertisement', //通告 和 幻灯广告 
	BaseBudiing: Baseurl + '/estate/api/es/basicinfo', //  基本信息
	BuddingDetail: Baseurl + '/estate/api/es/detailsinfo', // 详情信息
	NewsInformation: Baseurl + '/estate/api/es/newstrends/page', //新闻动态
	AddViewNewsIFtion: Baseurl + '/estate/api/es/newstrends/addviews',

	UpLoad: Baseurl + '/estate/api/es/file/upload', //上传图片

	UserInfo: Baseurl + '/estate/api/es/userinfo/page', //置业顾问


	ApartmentLayout: Baseurl + '/estate/api/es/apartmentlayout/page', //戶型
	ApartmentLayoutthumbup: Baseurl + '/estate/api/es/apartmentlayout/thumbup',
	ApartmentConcern: Baseurl + '/estate/api/es/attention/concern', //post 关注
	getApartmentConcern: Baseurl + '/estate/api/es/attention/list',
	getApartmentConcern2: Baseurl + '/estate/api/es/attention/list2',

	Topicreply: Baseurl + '/estate/api/es/topicreply', //写回复  1 炫拍  2 点评  
	Topicreplythumbup: Baseurl + '/estate/api/es/topicreply/thumbup', //回复点赞
	GetTopicreply: Baseurl + '/estate/api/es/topicreply/page',
	GetTopicreply2: Baseurl + '/estate/api/es/topicreply/page2',

	Reviews: Baseurl + '/estate/api/es/reviews', //提交楼盘点评
	ReadingReviews: Baseurl + '/estate/api/es/reviews/page', //楼盘点评
	TestReviews: Baseurl + '/estate/api/es/reviews/addviews', // 浏览量
	TextZan: Baseurl + '/estate/api/es/reviews/thumbup', //点赞

	Awesomeshooting: Baseurl + '/estate/api/es/awesomeshooting', //post 发布炫拍   put id 
	AwesomeshootingZan: Baseurl + '/estate/api/es/awesomeshooting/thumbup',
	Awesomeshootingviews: Baseurl + '/estate/api/es/awesomeshooting/addviews',
	Awesomeshootingredding: Baseurl + '/estate/api/es/awesomeshooting/page', //查炫拍 單 id 查單條
	AwesomeshootingDelete: Baseurl + '/estate/api/es/awesomeshooting/',

	Questions: Baseurl + '/estate/api/es/askquestions',
	QuestionsPage: Baseurl + '/estate/api/es/askquestions/page',


	LikesList: Baseurl + '/estate/api/es/likes/list',

	ShareInfo: Baseurl + '/estate/api/es/shareinfo',
	GetShareInfno: Baseurl + '/estate/api/es/userinfo',

	// @GetMapping("/distribution/{id}")   直接绑定id顾问 
	// @GetMapping("/invitee/{id}")			直接邦经纪人
	// @GetMapping("/distributions")			判断是否有顾问，有不操作， 参数  affId 

	ShareCode: Baseurl + '/weixin/api/ma/wxqrcode/unlimited',


	GetPhone: Baseurl + '/estate/api/es/userinfo/phone', //post 获取手机号码


	Subscribe: Baseurl + '/weixin/api/ma/wxtemplatemsg/list', //订阅

	Recommed: Baseurl + '/estate/api/es/yuntongxun/custn',

	Addviews: Baseurl + '/estate/api/es/basicinfo/addviews', //写首页浏览量
	Totalviews: Baseurl + '/estate/api/es/basicinfo/total',


	Statement: Baseurl + '/estate/api/es/userinfo/statement',
	// /estate/api/es/userinfo/statement/*?duration=1&portion=5  * 是id  duration 1 星期 2月   portion 月是有效 
	Nominations: Baseurl + '/estate/api/es/referrals/nominations',
	Summation: Baseurl + '/estate/api/es/userinfo/summation',
	// /estate/api/es/userinfo/statement/summation  直接get    nine次数
    
	Custom: Baseurl + '/estate/api/es/smsrecord/page',
	Popupads: Baseurl + '/estate/api/es/popupadsapi',
	FissionUser: Baseurl + '/estate/api/es/userinfo/listvalid',

	GetProcessDefinition: Baseurl + '/broker/engine-rest/process-definition', //查看流程列表 tenantIdIn  租户id   path: +id 实例id 发起流程

	// PostBroKerCommit:Baseurl+'broker/engine-rest/task', // {id} /complete   

	Referrals: Baseurl + '/estate/api/es/referrals',

	GetHistory: Baseurl + '/broker/engine-rest/history/task',
	GetHistoryVariable: Baseurl + '/broker/engine-rest/history/variable-instance',

	ChattingRecords: Baseurl + '/estate/api/es/chattingrecords',
	Verification: Baseurl + '/broker/mapi/br/referrals/verification', //验证电话号码
	Verificationplt: Baseurl + '/broker/mapi/br/referrals/verify',
	Jiema: Baseurl + '/estate/api/es/basicinfo/getcode', //扫码进入   解码
	getCompanyList: Baseurl + '/estate/api/es/intermediarycompany',

	intermediaryCompany: Baseurl + '/estate/api/es/intermediarycompany', //中介公司

	getTask: Baseurl + '/broker/engine-rest/task', //中介查找在办流程人员
	
	getUnReadMessage:Baseurl+'/estate/api/es/chattingrecords/unreadcount',//未读消息
}
