(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/home"],{365:
/*!*****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/pages/mine/home.vue ***!
  \*****************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var o=n(/*! ./home.vue?vue&type=template&id=7427a91c& */366),i=n(/*! ./home.vue?vue&type=script&lang=js& */368);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);n(/*! ./home.vue?vue&type=style&index=0&lang=css& */370);var a,r=n(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */10),u=Object(r["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],a);u.options.__file="pages/mine/home.vue",e["default"]=u.exports},366:
/*!************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/pages/mine/home.vue?vue&type=template&id=7427a91c& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,n){"use strict";n.r(e);var o=n(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./home.vue?vue&type=template&id=7427a91c& */367);n.d(e,"render",(function(){return o["render"]})),n.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(e,"components",(function(){return o["components"]}))},367:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/project/项目/unitest/pages/mine/home.vue?vue&type=template&id=7427a91c& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,n){"use strict";var o;n.r(e),n.d(e,"render",(function(){return i})),n.d(e,"staticRenderFns",(function(){return a})),n.d(e,"recyclableRender",(function(){return s})),n.d(e,"components",(function(){return o}));var i=function(){var t=this,e=t.$createElement;t._self._c},s=!1,a=[];i._withStripped=!0},368:
/*!******************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/pages/mine/home.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var o=n(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./home.vue?vue&type=script&lang=js& */369),i=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);e["default"]=i.a},369:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/project/项目/unitest/pages/mine/home.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o,i=s(n(/*! ../api/home.js */11));function s(t){return t&&t.__esModule?t:{default:t}}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var r={name:"mine",data:function(){return{baseBudding:"",wxUser:"",summation:"",nominations:"",isShowTX:"",questionNum:"",reviewsNum:"",hootingNum:"",replysNum:""}},computed:{numData:function(){if(this.questionNum&&this.reviewsNum&&this.hootingNum&&this.replysNum)return this.questionNum+this.reviewsNum+this.hootingNum+this.replysNum}},created:function(){this.wxUser=getApp().globalData.wxUser,this.baseBudding=getApp().globalData.BaseBudding,this.userInfoGet()},mounted:function(){var t=this;t.isShowTX=getApp().globalData.interaction||"1";var e=t.wxUser;"3"==e.userType&&(this.getAwesomeshooting(),this.getQuestionsPage(),this.getreadingReviews(),this.getTopicreplys()),"0"!=e.userRole&&(this.getSummation(),this.getNominations())},methods:(o={getUserProfile:function(t){var e=this;wx.getUserProfile({desc:"用于完善会员资料",success:function(t){console.log("+++++++++++++++++++++++++++++++++++++"),console.log(t),console.log("+++++++++++++++++++++++++++++++++++++"),e.http(i.default.wxUserSave,"POST",t,!1).then((function(t){console.log(t),e.userInfoGet()}))}})},toChanges:function(){var e=this;getApp().globalData.wxUser.nickName?t.navigateTo({url:"../register/home",events:{getss:function(t){e.userInfoGet()}}}):t.showToast({title:"请先授权",icon:"none",duration:2e3})},getTopicreplys:function(){var t=this;t.http(i.default.GetTopicreply2,"GET",{current:1,size:5,descs:"create_time",auditStatus:0,replyTypes:"3"},!1).then((function(e){for(var n=e.data.records,o=0,i=0;i<n.length;i++)"0"==n[i].auditStatus&&(o+=1);t.replysNum=o}))},getAwesomeshooting:function(){var t=this;t.http(i.default.Awesomeshootingredding,"GET",{current:1,size:5,descs:"create_time",auditStatus:0},!1).then((function(e){for(var n=e.data.records,o=0,i=0;i<n.length;i++){"0"==n[i].auditStatus&&(o+=1);for(var s=0;s<n[i].listTopicReply.length;s++)"0"==n[i].listTopicReply[s].auditStatus&&(o+=1)}t.hootingNum=o}))},getQuestionsPage:function(){var t=this;t.http(i.default.QuestionsPage,"GET",{current:1,size:5,descs:"create_time",auditStatus:0},!1).then((function(e){for(var n=e.data.records,o=0,i=0;i<n.length;i++){"0"==n[i].auditStatus&&(o+=1);for(var s=0;s<n[i].listTopicReply.length;s++)"0"==n[i].listTopicReply[s].auditStatus&&(o+=1)}t.questionNum=o}))},getreadingReviews:function(){var t=this;t.http(i.default.ReadingReviews,"GET",{current:1,size:5,descs:"create_time",auditStatus:0},!1).then((function(e){for(var n=e.data.records,o=0,i=0;i<n.length;i++){"0"==n[i].auditStatus&&(o+=1);for(var s=0;s<n[i].listTopicReply.length;s++)"0"==n[i].listTopicReply[s].auditStatus&&(o+=1)}t.reviewsNum=o}))},uploader:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed "],sourceType:["album","camera"],success:function(n){t.showLoading({title:"上传中..."});var o=n.tempFilePaths;t.uploadFile({url:i.default.UpLoad,files:o,filePath:o[0],name:"file",fileType:"image",header:{"app-id":wx.getAccountInfoSync().miniProgram.appId,"third-session":getApp().globalData.thirdSession},formData:{dir:"material",fileType:"image"},success:function(n){t.hideLoading();var o=JSON.parse(n.data);e.http(i.default.userInfoGet,"PUT",{id:getApp().globalData.wxUser.id,userQrcode:o.link},!1).then((function(n){t.showToast({title:"上传成功",icon:"success",duration:2e3}),e.userInfoGet()}))}})}})},userInfoGet:function(){var t=this;this.http(i.default.userInfoGet,"GET",{},!1).then((function(e){console.log("userInfoGet"),console.log(e),t.wxUser=e.data,getApp().globalData.wxUser=e.data}))}},a(o,"userInfoGet",(function(){var t=this;this.http(i.default.userInfoGet,"GET",{},!1).then((function(e){t.wxUser=e.data,console.log(e),getApp().globalData.wxUser=e.data}))})),a(o,"getNominations",(function(){var t=this,e=this;e.http(i.default.Nominations,"GET",{},!1).then((function(e){console.log("++++++++++++++++++++++++++++++++++++++++++++++++++"),console.log(e),t.nominations=e.data.count,console.log("++++++++++++++++++++++++++++++++++++++++++++++++++")}))})),a(o,"getSummation",(function(){var t=this;t.http(i.default.Summation,"GET",{},!1).then((function(e){console.log("查看次数"),console.log(e),t.summation=e.data}))})),a(o,"agreenGetUser",(function(t){console.log(t);var e=this;"getUserInfo:ok"==t.detail.errMsg&&e.http(i.default.wxUserSave,"POST",t.detail,!1).then((function(t){console.log(t),e.userInfoGet()}))})),a(o,"toChange",(function(e){var n=e.currentTarget.dataset.cur;console.log(n),getApp().globalData.wxUser.nickName?t.navigateTo({url:"../../pagestwo/mine-son/"+n+"/home"}):t.showToast({title:"请先授权",icon:"none",duration:2e3})})),o)};e.default=r}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},370:
/*!**************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/pages/mine/home.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var o=n(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./home.vue?vue&type=style&index=0&lang=css& */371),i=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);e["default"]=i.a},371:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/project/项目/unitest/pages/mine/home.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/home.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/mine/home-create-component',
    {
        'pages/mine/home-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(365))
        })
    },
    [['pages/mine/home-create-component']]
]);