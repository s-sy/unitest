(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/contactUs/home"],{340:
/*!**********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/pages/contactUs/home.vue ***!
  \**********************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! ./home.vue?vue&type=template&id=684c0229&name=contactUs& */341),a=n(/*! ./home.vue?vue&type=script&lang=js& */343);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n(/*! ./home.vue?vue&type=style&index=0&lang=css& */345);var i,s=n(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */10),u=Object(s["default"])(a["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],i);u.options.__file="pages/contactUs/home.vue",t["default"]=u.exports},341:
/*!********************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/pages/contactUs/home.vue?vue&type=template&id=684c0229&name=contactUs& ***!
  \********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./home.vue?vue&type=template&id=684c0229&name=contactUs& */342);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},342:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/project/项目/unitest/pages/contactUs/home.vue?vue&type=template&id=684c0229&name=contactUs& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return a})),n.d(t,"staticRenderFns",(function(){return i})),n.d(t,"recyclableRender",(function(){return r})),n.d(t,"components",(function(){return o}));var a=function(){var e=this,t=e.$createElement;e._self._c},r=!1,i=[];a._withStripped=!0},343:
/*!***********************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/pages/contactUs/home.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./home.vue?vue&type=script&lang=js& */344),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=a.a},344:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/project/项目/unitest/pages/contactUs/home.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n(/*! ./node_modules/@babel/runtime/regenerator */18)),a=i(n(/*! ../api/home.js */11)),r=i(n(/*! ../../utils/initPage.js */21));function i(e){return e&&e.__esModule?e:{default:e}}function s(e,t,n,o,a,r,i){try{var s=e[r](i),u=s.value}catch(l){return void n(l)}s.done?t(u):Promise.resolve(u).then(o,a)}function u(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var r=e.apply(t,n);function i(e){s(r,o,a,i,u,"next",e)}function u(e){s(r,o,a,i,u,"throw",e)}i(void 0)}))}}var l={data:function(){return{BaseBudding:getApp().globalData.BaseBudding,modalName:"",wxUser:"",gender:"",name:"",textarea:"",distribution:""}},created:function(){var e=this;return u(o.default.mark((function t(){var n;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.userInfoGets();case 2:return t.next=4,e.getdistribution();case 4:if(n=t.sent,null!=n){t.next=12;break}return t.next=8,e.choose();case 8:return t.next=10,e.getdistribution();case 10:return t.next=12,e.userInfoGets();case 12:console.log(getApp().globalData.distribution);case 13:case"end":return t.stop()}}),t)})))()},methods:{gettextarea:function(e){this.textarea=e.detail.value},radioChange:function(e){this.gender=e.detail.value},getname:function(e){this.name=e.detail.value},showModal:function(e){this.modalName="Modal"},hideModal:function(e){this.modalName=null},toIndex:function(){e.redirectTo({url:"/pages/index/index?PageCur=basics"})},savephone:function(t,n,o){var r={encryptedData:"",session_key:"",iv:""};return r.encryptedData=t,r.session_key=n,r.iv=o,new Promise((function(t,n){console.log("解析手机号码"),e.request({url:a.default.GetPhone,method:"POST",data:r,timeout:12e4,header:{"app-id":wx.getAccountInfoSync().miniProgram.appId,"third-session":getApp().globalData.thirdSession},success:function(e){"request:ok"==e.errMsg?t(!0):t(!1)}})}))},sendphoneNumber:function(e,t,n){var a=this;return u(o.default.mark((function r(){var i,s;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return i=a,o.next=3,i.savephone(e,t,n);case 3:if(s=o.sent,!s){o.next=8;break}return o.next=7,i.userInfoGets();case 7:o.sent;case 8:case"end":return o.stop()}}),r)})))()},getPhoneNumber:function(e){var t=this;if("getPhoneNumber:ok"==e.detail.errMsg){var n=e.detail.encryptedData,o=e.detail.iv;r.default.initPage().then((function(e){var a=getApp().globalData.sessionKey;t.sendphoneNumber(n,a,o)}))}},choose:function(){var e=this,t=getApp().globalData.BaseBudding;return console.log("++++++++++++++++++++++"),console.log(getApp().globalData.projectItem),console.log(getApp().globalData.platforminfo),console.log("++++++++++++++++++++++"),new Promise((function(n,o){e.http(a.default.GetShareInfno+"/distributions","GET",{affId:t.id},!1).then((function(t){console.log(t),t.data&&(getApp().globalData.wxUser=t.data,e.wxUser=t.data,n("success"))}))}))},getdistribution:function(){var e=this,t=getApp().globalData.projectItem.id,n=getApp().globalData.wxUser.distribution;return console.log("wxUser"),console.log(getApp().globalData.wxUser),new Promise((function(o,r){e.http(a.default.getall,"GET",{affId:t},!1).then((function(t){console.log("查看置业列表"),console.log(t);for(var a=t.data,r=null,i=0;i<a.length;i++)for(var s=0;s<n.length;s++)a[i].id==n[s]&&(r=a[i],e.distribution=a[i],getApp().globalData.distribution=a[i]);console.log("第二步，获取置业"),console.log(getApp().globalData.distribution),o(r)}))}))},checkphonept:function(){var t=this,n=getApp().globalData.projectItem;console.log("查看projctItem"),console.log(n),console.log(getApp().globalData.distribution);var o={phone:t.wxUser.phone,senderId:t.wxUser.id,affId:n.id,salesmanId:getApp().globalData.distribution?getApp().globalData.distribution.id:null,groupId:getApp().globalData.distribution?getApp().globalData.distribution.memberGroup:null,tenantId:t.wxUser.tenantId};return new Promise((function(t,n){e.request({method:"GET",url:a.default.Verificationplt,data:o,header:{"app-id":wx.getAccountInfoSync().miniProgram.appId,"third-session":getApp().globalData.thirdSession},success:function(e){console.log("验证电话pt"),console.log("_________________________________"),console.log(e),console.log("_________________________________"),t(e.data.ok)}})}))},userInfoGets:function(){var e=this,t=this;return new Promise((function(n,o){e.http(a.default.userInfoGet,"GET",{},!1).then((function(e){e.ok&&(t.wxUser=e.data,console.log(e),getApp().globalData.wxUser=e.data,n(e.data))}))}))},commit:function(){var t=this;return u(o.default.mark((function n(){var a,r;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a=t,a.name){n.next=4;break}return a.modalName="Modal",n.abrupt("return");case 4:if(a.gender){n.next=7;break}return a.modalName="Modal",n.abrupt("return");case 7:if(a.wxUser.phone){n.next=10;break}return a.modalName="Modal",n.abrupt("return");case 10:return n.next=12,a.checkphonept();case 12:if(r=n.sent,r){n.next=16;break}return e.showToast({title:"楼盘已存在此号码，请使用电话咨询!",icon:"none",duration:3e3}),n.abrupt("return");case 16:a.getProcessDefinition();case 17:case"end":return n.stop()}}),n)})))()},getProcessDefinition:function(){var t=this,n=getApp().globalData.projectItem;console.log("查看流程定义的id"),console.log(n),e.request({url:a.default.GetProcessDefinition,method:"GET",data:{tenantIdIn:n.id},success:function(n){if(console.log("平台流程"),console.log(n),200==n.statusCode){for(var o,a=n.data,r=0;r<a.length;r++)"passenger"==a[r].key&&(o=a[r].id);o?t.PostProcessAcquistion(o):e.showToast({title:"请检查key为passenger的流程是否存在",icon:"none",duration:3e3})}else e.showToast({title:"未找到有效流程，或流程未配置",icon:"none",duration:3e3})}})},PostProcessAcquistion:function(t){var n=this,o=t,r=getApp().globalData.projectItem,i=getApp().globalData.wxUser.id,s=n.name,u={variables:{initiator:{value:i},phone:{value:n.wxUser.phone},customerName:{value:s},description:{value:n.textarea,type:"String",valueInfo:{}},affiliationId:{value:r.id},currentTaskDeposit:{value:!1},gender:{value:n.wxUser.sex,type:"String",valueInfo:{}},tenantId:{value:n.wxUser.tenantId},characters:{value:null},unspecified:{value:!getApp().globalData.distribution},salesmanId:{value:getApp().globalData.distribution?getApp().globalData.distribution.id:null},origin:{value:"1"}}};console.log(u),e.request({url:a.default.GetProcessDefinition+"/"+o+"/submit-form",method:"POST",data:u,success:function(e){console.log(e),200==e.statusCode&&(n.modalName="DialogModal")}})},callPhone:function(){var t=this.distribution;e.makePhoneCall({phoneNumber:t.phone})}}};t.default=l}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},345:
/*!*******************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/pages/contactUs/home.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./home.vue?vue&type=style&index=0&lang=css& */346),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=a.a},346:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/project/项目/unitest/pages/contactUs/home.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/contactUs/home.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/contactUs/home-create-component',
    {
        'pages/contactUs/home-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(340))
        })
    },
    [['pages/contactUs/home-create-component']]
]);