(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/beckhayu-swiper/my-swiper"],{561:
/*!**************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/components/beckhayu-swiper/my-swiper.vue ***!
  \**************************************************************************************************/
/*! no static exports found */function(e,n,t){"use strict";t.r(n);var r=t(/*! ./my-swiper.vue?vue&type=template&id=523416b8&scoped=true& */562),u=t(/*! ./my-swiper.vue?vue&type=script&lang=js& */564);for(var o in u)"default"!==o&&function(e){t.d(n,e,(function(){return u[e]}))}(o);t(/*! ./my-swiper.vue?vue&type=style&index=0&id=523416b8&lang=less&scoped=true& */566);var i,c=t(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */10),a=Object(c["default"])(u["default"],r["render"],r["staticRenderFns"],!1,null,"523416b8",null,!1,r["components"],i);a.options.__file="components/beckhayu-swiper/my-swiper.vue",n["default"]=a.exports},562:
/*!*********************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/components/beckhayu-swiper/my-swiper.vue?vue&type=template&id=523416b8&scoped=true& ***!
  \*********************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,n,t){"use strict";t.r(n);var r=t(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./my-swiper.vue?vue&type=template&id=523416b8&scoped=true& */563);t.d(n,"render",(function(){return r["render"]})),t.d(n,"staticRenderFns",(function(){return r["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return r["recyclableRender"]})),t.d(n,"components",(function(){return r["components"]}))},563:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/project/项目/unitest/components/beckhayu-swiper/my-swiper.vue?vue&type=template&id=523416b8&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,n,t){"use strict";var r;t.r(n),t.d(n,"render",(function(){return u})),t.d(n,"staticRenderFns",(function(){return i})),t.d(n,"recyclableRender",(function(){return o})),t.d(n,"components",(function(){return r}));var u=function(){var e=this,n=e.$createElement;e._self._c},o=!1,i=[];u._withStripped=!0},564:
/*!***************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/components/beckhayu-swiper/my-swiper.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************/
/*! no static exports found */function(e,n,t){"use strict";t.r(n);var r=t(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./my-swiper.vue?vue&type=script&lang=js& */565),u=t.n(r);for(var o in r)"default"!==o&&function(e){t.d(n,e,(function(){return r[e]}))}(o);n["default"]=u.a},565:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/project/项目/unitest/components/beckhayu-swiper/my-swiper.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={props:{borderColor:{type:String,default:"#FFFFFf"},color:{type:String,default:"#181924"},backgroundColor:{type:String,default:"white"},list:{type:Array,default:[]},height:{type:String,default:"90rpx"}},data:function(){return{showIndex:0,timer:{}}},beforeDestroy:function(){clearInterval(this.timer)},mounted:function(){var e=this;this.timer=setInterval((function(){e.showIndex=e.showIndex==e.list.length-1?0:++e.showIndex}),2900)}};n.default=r},566:
/*!************************************************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/components/beckhayu-swiper/my-swiper.vue?vue&type=style&index=0&id=523416b8&lang=less&scoped=true& ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */function(e,n,t){"use strict";t.r(n);var r=t(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-2!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./my-swiper.vue?vue&type=style&index=0&id=523416b8&lang=less&scoped=true& */567),u=t.n(r);for(var o in r)"default"!==o&&function(e){t.d(n,e,(function(){return r[e]}))}(o);n["default"]=u.a},567:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-2!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/project/项目/unitest/components/beckhayu-swiper/my-swiper.vue?vue&type=style&index=0&id=523416b8&lang=less&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,n,t){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/beckhayu-swiper/my-swiper.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/beckhayu-swiper/my-swiper-create-component',
    {
        'components/beckhayu-swiper/my-swiper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(561))
        })
    },
    [['components/beckhayu-swiper/my-swiper-create-component']]
]);
