(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/auth/home"],{166:
/*!*****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/pages/auth/home.vue ***!
  \*****************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! ./home.vue?vue&type=template&id=4e5421bd& */167),a=n(/*! ./home.vue?vue&type=script&lang=js& */169);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n(/*! ./home.vue?vue&type=style&index=0&lang=css& */171);var s,i=n(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */10),l=Object(i["default"])(a["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],s);l.options.__file="pages/auth/home.vue",t["default"]=l.exports},167:
/*!************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/pages/auth/home.vue?vue&type=template&id=4e5421bd& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./home.vue?vue&type=template&id=4e5421bd& */168);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},168:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/project/项目/unitest/pages/auth/home.vue?vue&type=template&id=4e5421bd& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return a})),n.d(t,"staticRenderFns",(function(){return s})),n.d(t,"recyclableRender",(function(){return r})),n.d(t,"components",(function(){return o}));var a=function(){var e=this,t=e.$createElement;e._self._c},r=!1,s=[];a._withStripped=!0},169:
/*!******************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/pages/auth/home.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./home.vue?vue&type=script&lang=js& */170),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=a.a},170:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/project/项目/unitest/pages/auth/home.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=s(n(/*! ./node_modules/@babel/runtime/regenerator */18)),a=s(n(/*! ../api/home.js */11)),r=s(n(/*! ../../utils/initPage.js */21));function s(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,o,a,r,s){try{var i=e[r](s),l=i.value}catch(u){return void n(u)}i.done?t(l):Promise.resolve(l).then(o,a)}function l(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var r=e.apply(t,n);function s(e){i(r,o,a,s,l,"next",e)}function l(e){i(r,o,a,s,l,"throw",e)}s(void 0)}))}}var u={data:function(){return{}},props:{showText:{type:String,default:"获取手机授权"},sendPassed:{type:Boolean,default:!0}},created:function(){this.getUserinfozhiye()},methods:{getPhoneNumber:function(e){var t=this;if("getPhoneNumber:ok"==e.detail.errMsg){var n=e.detail.encryptedData,o=e.detail.iv;r.default.initPage().then((function(e){var a=getApp().globalData.sessionKey;t.sendphoneNumber(n,a,o)}))}},getTaills:function(){var e=this,t=getApp().globalData.projectItem.id;return console.log("Check Id"),console.log(t),new Promise((function(n,o){e.http(a.default.getall,"GET",{affId:t},!1).then((function(e){console.log("++++++++++++++++++check getTaills+++++++"),console.log(e),n(e)}))}))},getUserinfozhiye:function(){var e=this;return l(o.default.mark((function t(){var n,a,r,s,i,l;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e,console.log("_____________auth get distribution__________________"),console.log(getApp().globalData.projectItem),getApp().globalData.projectItem.id,t.next=6,n.getTaills();case 6:for(a=t.sent,console.log("++++++++++++++++++++++++++++++++++++++++++++++"),console.log(a),console.log("++++++++++++++++++++++++++++++++++++++++++++++"),r=a.data,console.log("ddddddddddddddddddd"),console.log(r),s=getApp().globalData.wxUser.distribution||[],null==s&&(s=[]),[],console.log(s),i=0;i<r.length;i++)for(l=0;l<s.length;l++)r[i].id==s[l]&&(getApp().globalData.distribution=r[i]);console.log("c+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"),console.log(getApp().globalData.distribution);case 20:case"end":return t.stop()}}),t)})))()},brokerprocess:function(){var t=this;t.wxUser.phone;var n=getApp().globalData.projectItem;console.log("project"),console.log(getApp().globalData),e.request({url:a.default.GetProcessDefinition,method:"GET",data:{tenantIdIn:n.id},success:function(n){if(console.log("流程"),console.log(n),200==n.statusCode){for(var o,a=n.data,r=0;r<a.length;r++)"broker"==a[r].key&&(o=a[r].id);o?t.PostProcess(o):e.showToast({title:"请检查key为broker的流程是否存在",icon:"none",duration:3e3})}else e.showToast({title:"未找到有效流程，或流程未配置",icon:"none",duration:3e3})}})},getProcessDefinition:function(){var t=this,n=getApp().globalData.projectItem;console.log("查看流程定义的id"),console.log(n),e.request({url:a.default.GetProcessDefinition,method:"GET",data:{tenantIdIn:n.id},success:function(n){if(console.log("平台流程"),console.log(n),200==n.statusCode){for(var o,a=n.data,r=0;r<a.length;r++)"passenger"==a[r].key&&(o=a[r].id);o?t.PostProcessAcquistion(o):e.showToast({title:"请检查key为passenger的流程是否存在",icon:"none",duration:3e3})}else e.showToast({title:"未找到有效流程，或流程未配置",icon:"none",duration:3e3})}})},PostProcessAcquistion:function(t){var n=this,o=t,r=getApp().globalData.projectItem,s=getApp().globalData.wxUser.id,i=n.wxUser.realName?n.wxUser.realName:n.wxUser.nickName?n.wxUser.nickName:"",l={variables:{initiator:{value:s},phone:{value:n.wxUser.phone},customerName:{value:i},affiliationId:{value:r.id},currentTaskDeposit:{value:!1},gender:{value:n.wxUser.sex,type:"String",valueInfo:{}},tenantId:{value:n.wxUser.tenantId},characters:{value:null},unspecified:{value:!getApp().globalData.distribution},salesmanId:{value:getApp().globalData.distribution?getApp().globalData.distribution.id:null},origin:{value:"1"}}};console.log(l),e.request({url:a.default.GetProcessDefinition+"/"+o+"/submit-form",method:"POST",data:l,success:function(e){e.statusCode}})},PostProcess:function(t){var n=this,o=t,r=getApp().globalData.projectItem;e.request({url:a.default.GetProcessDefinition+"/"+o+"/submit-form",method:"POST",data:{variables:{phone:{value:n.wxUser.phone,type:"String",valueInfo:{}},customerName:{value:n.wxUser.realName?n.wxUser.realName:n.wxUser.nickName,type:"String",valueInfo:{}},gender:{value:n.wxUser.sex,type:"String",valueInfo:{}},introduction:{value:"",type:"String",valueInfo:{}},affiliationId:{value:r.id,type:"String",valueInfo:{}},brokerId:{value:n.wxUser.invitee,type:"String",valueInfo:{}},salesmanId:{value:getApp().globalData.distribution.id||null,type:"String",valueInfo:{name:"XXXXX"}},brokerName:{value:n.wxUser.inviteeUser?n.wxUser.inviteeUser.realName?n.wxUser.inviteeUser.realName:n.wxUser.nickName:"匿名用户",type:"String",valueInfo:getApp().globalData.wxUser},brokerPhone:{value:n.wxUser.inviteeUser?n.wxUser.inviteeUser.phone:"没有电话",type:"String",valueInfo:{}},inviteeId:{value:n.wxUser.invitee,type:"String",valueInfo:{}},tenantId:{value:n.wxUser.tenantId,type:"String",valueInfo:{}},origin:{value:"1"}},businessKey:n.phone},success:function(e){e.statusCode}})},savephone:function(t,n,o){var r={encryptedData:"",session_key:"",iv:""};return r.encryptedData=t,r.session_key=n,r.iv=o,new Promise((function(t,n){console.log("解析手机号码"),e.request({url:a.default.GetPhone,method:"POST",data:r,timeout:12e4,header:{"app-id":wx.getAccountInfoSync().miniProgram.appId,"third-session":getApp().globalData.thirdSession},success:function(e){"request:ok"==e.errMsg?t(!0):t(!1)}})}))},getInfo:function(){var e=this;return new Promise((function(t,n){e.http(a.default.userInfoGet,"GET",{},!1).then((function(n){n.data?(getApp().globalData.wxUser=n.data,e.wxUser=n.data,console.log("授权后，再次获取uerInfo"),console.log(n.data),t(n.data)):t(!1)}))}))},sendphoneNumber:function(e,t,n){var a=this;return l(o.default.mark((function r(){var s,i,l,u,c,d;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return s=a,o.next=3,s.savephone(e,t,n);case 3:if(i=o.sent,!i){o.next=27;break}return o.next=7,s.getInfo();case 7:if(l=o.sent,console.log("++++++++++++++++++++++++++++"),console.log(s.sendPassed),console.log("++++++++++++++++++++++++++++"),!l||!s.sendPassed){o.next=26;break}if(console.log("发起了流程"),u=l.invitee,!u){o.next=22;break}return o.next=17,s.checkPhone();case 17:c=o.sent,console.log(c),"true"==c&&s.brokerprocess(),o.next=26;break;case 22:return o.next=24,s.checkphonept();case 24:d=o.sent,"true"==d&&s.getProcessDefinition();case 26:s.$emit("refData");case 27:case"end":return o.stop()}}),r)})))()},checkphonept:function(){var t=this,n=getApp().globalData.projectItem;console.log("查看projctItem"),console.log(n),console.log(getApp().globalData.distribution);var o={phone:t.wxUser.phone,senderId:t.wxUser.id,affId:n.id,salesmanId:getApp().globalData.distribution?getApp().globalData.distribution.id:null,groupId:getApp().globalData.distribution?getApp().globalData.distribution.memberGroup:null,tenantId:t.wxUser.tenantId};return new Promise((function(t,n){e.request({method:"GET",url:a.default.Verificationplt,data:o,header:{"app-id":wx.getAccountInfoSync().miniProgram.appId,"third-session":getApp().globalData.thirdSession},success:function(e){console.log("验证电话pt"),console.log("_________________________________"),console.log(e),console.log("_________________________________"),e.data.ok?t("true"):t("false")}})}))},checkPhone:function(){var t=this,n=getApp().globalData.projectItem,o={phone:t.wxUser.phone,senderId:t.wxUser.id,affId:n.id,salesmanId:getApp().globalData.distribution?getApp().globalData.distribution.id:null,groupId:getApp().globalData.distribution?getApp().globalData.distribution.memberGroup:null,tenantId:t.wxUser.tenantId};return new Promise((function(t,n){e.request({method:"GET",url:a.default.Verification,data:o,success:function(e){console.log("验证电话"),console.log(e.data.ok),e.data.ok?t("true"):t("false")}})}))}}};t.default=u}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},171:
/*!**************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/pages/auth/home.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./home.vue?vue&type=style&index=0&lang=css& */172),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=a.a},172:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/project/项目/unitest/pages/auth/home.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/auth/home.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/auth/home-create-component',
    {
        'pages/auth/home-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(166))
        })
    },
    [['pages/auth/home-create-component']]
]);