(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/drag-button/drag-button"],{575:
/*!************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/components/drag-button/drag-button.vue ***!
  \************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var i=n(/*! ./drag-button.vue?vue&type=template&id=5aadf2dc& */576),o=n(/*! ./drag-button.vue?vue&type=script&lang=js& */578);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n(/*! ./drag-button.vue?vue&type=style&index=0&lang=scss& */580);var d,u=n(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */10),s=Object(u["default"])(o["default"],i["render"],i["staticRenderFns"],!1,null,null,null,!1,i["components"],d);s.options.__file="components/drag-button/drag-button.vue",e["default"]=s.exports},576:
/*!*******************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/components/drag-button/drag-button.vue?vue&type=template&id=5aadf2dc& ***!
  \*******************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,n){"use strict";n.r(e);var i=n(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./drag-button.vue?vue&type=template&id=5aadf2dc& */577);n.d(e,"render",(function(){return i["render"]})),n.d(e,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(e,"components",(function(){return i["components"]}))},577:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/project/项目/unitest/components/drag-button/drag-button.vue?vue&type=template&id=5aadf2dc& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,n){"use strict";var i;n.r(e),n.d(e,"render",(function(){return o})),n.d(e,"staticRenderFns",(function(){return d})),n.d(e,"recyclableRender",(function(){return r})),n.d(e,"components",(function(){return i}));var o=function(){var t=this,e=t.$createElement;t._self._c},r=!1,d=[];o._withStripped=!0},578:
/*!*************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/components/drag-button/drag-button.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var i=n(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./drag-button.vue?vue&type=script&lang=js& */579),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},579:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/project/项目/unitest/components/drag-button/drag-button.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"drag-button",props:{isDock:{type:Boolean,default:!1},existTabBar:{type:Boolean,default:!1},textStr:{type:String,default:""},edgetop:{type:Number,default:80},edgeleft:{type:Number,default:15},unReard:{type:Number,default:0}},computed:{},data:function(){return{top:0,left:0,width:0,height:0,offsetWidth:0,offsetHeight:0,windowWidth:0,windowHeight:0,isMove:!0,text:"导航"}},mounted:function(){var e=this;this.text=this.textStr;var n=t.getSystemInfoSync();this.windowWidth=n.windowWidth,this.windowHeight=n.windowHeight,n.windowTop&&(this.windowHeight+=n.windowTop),console.log(n);var i=t.createSelectorQuery().in(this);i.select("#_drag_button").boundingClientRect((function(t){e.width=t.width,e.height=t.height,e.offsetWidth=t.width/2,e.offsetHeight=t.height/2,e.left=e.windowWidth-e.width-e.edgeleft,e.top=e.windowHeight-e.height-e.edgetop})).exec()},methods:{click:function(){this.$emit("btnClick")},touchstart:function(t){this.$emit("btnTouchstart")},touchmove:function(t){if(1!==t.touches.length)return!1;this.isMove=!0,this.left=t.touches[0].clientX-this.offsetWidth;var e=t.touches[0].clientY-this.offsetHeight,n=this.windowHeight-this.height-this.edgetop;e<this.edgetop?this.top=this.edgetop:this.top=e>n?n:e},touchend:function(t){if(this.isDock){var e=this.windowWidth-this.width-this.edgeleft;this.left<this.windowWidth/2-this.offsetWidth?this.left=this.edgeleft:this.left=e}this.isMove=!1,this.$emit("btnTouchend")}}};e.default=n}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},580:
/*!**********************************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/components/drag-button/drag-button.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var i=n(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./drag-button.vue?vue&type=style&index=0&lang=scss& */581),o=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},581:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/project/项目/unitest/components/drag-button/drag-button.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/drag-button/drag-button.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/drag-button/drag-button-create-component',
    {
        'components/drag-button/drag-button-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(575))
        })
    },
    [['components/drag-button/drag-button-create-component']]
]);