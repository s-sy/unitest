(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagestwo/common/vendor"],{253:
/*!**************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/utils/checker.js ***!
  \**************************************************************************/
/*! no static exports found */function(t,e){t.exports={error:"",isJSON:function(t){if("string"==typeof t)try{var e=JSON.parse(t);return!("object"!=typeof e||!e)}catch(n){return console.log("error："+t+"!!!"+n),!1}},isNumber:function(t){var e=/^-?[1-9][0-9]?.?[0-9]*$/;return e.test(t)}}},315:
/*!*******************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/utils/websocket/ws.js ***!
  \*******************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n(/*! ./stomp.js */316),i=o(n(/*! ./uniWebSocket.js */317)),s=n(/*! ./config/config.js */318);function o(t){return t&&t.__esModule?t:{default:t}}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,e,n){return e&&c(t.prototype,e),n&&c(t,n),t}var h=function(){function t(){u(this,t),this.reconnectInterval=5e4,this.debug=!0,0===s.wsUrl.indexOf("http://")?this.url=s.wsUrl.replace("http://","ws://"):0===s.wsUrl.indexOf("https://")?this.url=s.wsUrl.replace("https://","wss://"):this.url=s.wsUrl,this.client=null,this.reconnectId=null,this.subscribes={}}return a(t,[{key:"connect",value:function(){var t=this;if(!this.client||!this.client.connected){getApp().globalData.thirdSession;var e=new i.default(this.url);this.client=r.Stomp.over(e),this.debug||(this.client.debug=function(){console.log(e)}),this.client.connect({token:getApp().globalData.thirdSession},(function(e){Object.keys(t.subscribes).forEach((function(e){t.subscribe(e,t.subscribes[e].callback)}))}),(function(e){t.reconnectId=setTimeout((function(){t.reconnect()}),t.reconnectInterval)})),e.onerror=function(){t.reconnectId=setTimeout((function(){(0,s.refreshToken)().then((function(){t.reconnect()}))}),t.reconnectInterval)}}}},{key:"reconnect",value:function(){var t=this;Object.keys(this.subscribes).forEach((function(e){t.subscribes[e]["subscribed"]=!1})),this.connect()}},{key:"disconnect",value:function(){this.client&&this.client.disconnect(),this.reconnectId&&(clearTimeout(this.reconnectId),this.reconnectId=null),this.subscribes={}}},{key:"subscribe",value:function(t,e){if(!this.subscribes[t]||!this.subscribes[t]["subscribed"])if(this.client&&this.client.connected){var n=this.client.subscribe(t,(function(t){return e(t)}));this.subscribes[t]={callback:e,subscribed:!0,subscribe:n}}else this.subscribes[t]={callback:e,subscribed:!1}}},{key:"unsubscribe",value:function(t){this.subscribes[t]&&(this.subscribes[t].subscribe.unsubscribe(),delete this.subscribes[t])}},{key:"send",value:function(t,e){console.log(t),console.log(e),this.client&&(console.log(this.client),this.client.send(t,null,e))}}]),t}(),f=new h;e.default=f},316:
/*!**********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/utils/websocket/stomp.js ***!
  \**********************************************************************************/
/*! no static exports found */function(t,e,n){(function(){var t,n,r,i,s={}.hasOwnProperty,o=[].slice;t={LF:"\n",NULL:"\0"},r=function(){var e;function n(t,e,n){this.command=t,this.headers=null!=e?e:{},this.body=null!=n?n:""}return n.prototype.toString=function(){var e,r,i,o,u;for(r in e=[this.command],i=!1===this.headers["content-length"],i&&delete this.headers["content-length"],u=this.headers,u)s.call(u,r)&&(o=u[r],e.push(r+":"+o));return this.body&&!i&&e.push("content-length:"+n.sizeOfUTF8(this.body)),e.push(t.LF+this.body),e.join(t.LF)},n.sizeOfUTF8=function(t){return t?encodeURI(t).match(/%..|./g).length:0},e=function(e){var r,i,s,o,u,c,a,h,f,l,p,d,b,y,v,g,w;for(o=e.search(RegExp(""+t.LF+t.LF)),u=e.substring(0,o).split(t.LF),s=u.shift(),c={},d=function(t){return t.replace(/^\s+|\s+$/g,"")},g=u.reverse(),b=0,v=g.length;b<v;b++)l=g[b],h=l.indexOf(":"),c[d(l.substring(0,h))]=d(l.substring(h+1));if(r="",p=o+2,c["content-length"])f=parseInt(c["content-length"]),r=(""+e).substring(p,p+f);else for(i=null,a=y=p,w=e.length;p<=w?y<w:y>w;a=p<=w?++y:--y){if(i=e.charAt(a),i===t.NULL)break;r+=i}return new n(s,c,r)},n.unmarshall=function(n){var r;return function(){var i,s,o,u;for(o=n.split(RegExp(""+t.NULL+t.LF+"*")),u=[],i=0,s=o.length;i<s;i++)r=o[i],(null!=r?r.length:void 0)>0&&u.push(e(r));return u}()},n.marshall=function(e,r,i){var s;return s=new n(e,r,i),s.toString()+t.NULL},n}(),n=function(){var e;function n(t){this.ws=t,this.ws.binaryType="arraybuffer",this.counter=0,this.connected=!1,this.heartbeat={outgoing:2e4,incoming:0},this.maxWebSocketFrameSize=16384,this.subscriptions={}}return n.prototype.debug=function(t){var e;return"undefined"!==typeof window&&null!==window&&null!=(e=window.console)?e.log(t):void 0},e=function(){return Date.now?Date.now():(new Date).valueOf},n.prototype._transmit=function(t,e,n){var i;i=r.marshall(t,e,n),"function"===typeof this.debug&&this.debug(">>> "+i);while(1){if(!(i.length>this.maxWebSocketFrameSize))return this.ws.send(i);this.ws.send(i.substring(0,this.maxWebSocketFrameSize)),i=i.substring(this.maxWebSocketFrameSize),"function"===typeof this.debug&&this.debug("remaining = "+i.length)}},n.prototype._setupHeartbeat=function(n){var r,s,o,u,c,a;if((c=n.version)===i.VERSIONS.V1_1||c===i.VERSIONS.V1_2)return a=function(){var t,e,r,i;for(r=n["heart-beat"].split(","),i=[],t=0,e=r.length;t<e;t++)u=r[t],i.push(parseInt(u));return i}(),s=a[0],r=a[1],0!==this.heartbeat.outgoing&&0!==r&&(o=Math.max(this.heartbeat.outgoing,r),"function"===typeof this.debug&&this.debug("send PING every "+o+"ms"),this.pinger=i.setInterval(o,function(e){return function(){return e.ws.send(t.LF),"function"===typeof e.debug?e.debug(">>> PING"):void 0}}(this))),0!==this.heartbeat.incoming&&0!==s?(o=Math.max(this.heartbeat.incoming,s),"function"===typeof this.debug&&this.debug("check PONG every "+o+"ms"),this.ponger=i.setInterval(o,function(t){return function(){var n;if(n=e()-t.serverActivity,n>2*o)return"function"===typeof t.debug&&t.debug("did not receive server activity for the last "+n+"ms"),t.ws.close()}}(this))):void 0},n.prototype._parseConnect=function(){var t,e,n,r;switch(t=1<=arguments.length?o.call(arguments,0):[],r={},t.length){case 2:r=t[0],e=t[1];break;case 3:t[1]instanceof Function?(r=t[0],e=t[1],n=t[2]):(r.login=t[0],r.passcode=t[1],e=t[2]);break;case 4:r.login=t[0],r.passcode=t[1],e=t[2],n=t[3];break;default:r.login=t[0],r.passcode=t[1],e=t[2],n=t[3],r.host=t[4]}return[r,e,n]},n.prototype.connect=function(){var n,s,u,c;return n=1<=arguments.length?o.call(arguments,0):[],c=this._parseConnect.apply(this,n),u=c[0],this.connectCallback=c[1],s=c[2],"function"===typeof this.debug&&this.debug("Opening Web Socket..."),this.ws.onmessage=function(n){return function(i){var o,u,c,a,h,f,l,p,d,b,y,v;if(a="undefined"!==typeof ArrayBuffer&&i.data instanceof ArrayBuffer?(o=new Uint8Array(i.data),"function"===typeof n.debug&&n.debug("--- got data length: "+o.length),function(){var t,e,n;for(n=[],t=0,e=o.length;t<e;t++)u=o[t],n.push(String.fromCharCode(u));return n}().join("")):i.data,n.serverActivity=e(),a!==t.LF){for("function"===typeof n.debug&&n.debug("<<< "+a),y=r.unmarshall(a),v=[],d=0,b=y.length;d<b;d++)switch(h=y[d],h.command){case"CONNECTED":"function"===typeof n.debug&&n.debug("connected to server "+h.headers.server),n.connected=!0,n._setupHeartbeat(h.headers),v.push("function"===typeof n.connectCallback?n.connectCallback(h):void 0);break;case"MESSAGE":p=h.headers.subscription,l=n.subscriptions[p]||n.onreceive,l?(c=n,f=h.headers["message-id"],h.ack=function(t){return null==t&&(t={}),c.ack(f,p,t)},h.nack=function(t){return null==t&&(t={}),c.nack(f,p,t)},v.push(l(h))):v.push("function"===typeof n.debug?n.debug("Unhandled received MESSAGE: "+h):void 0);break;case"RECEIPT":v.push("function"===typeof n.onreceipt?n.onreceipt(h):void 0);break;case"ERROR":v.push("function"===typeof s?s(h):void 0);break;default:v.push("function"===typeof n.debug?n.debug("Unhandled frame: "+h):void 0)}return v}"function"===typeof n.debug&&n.debug("<<< PONG")}}(this),this.ws.onclose=function(t){return function(){var e;return e="Whoops! Lost connection to "+t.ws.url,"function"===typeof t.debug&&t.debug(e),t._cleanUp(),"function"===typeof s?s(e):void 0}}(this),this.ws.onopen=function(t){return function(){return"function"===typeof t.debug&&t.debug("Web Socket Opened..."),u["accept-version"]=i.VERSIONS.supportedVersions(),u["heart-beat"]=[t.heartbeat.outgoing,t.heartbeat.incoming].join(","),t._transmit("CONNECT",u)}}(this)},n.prototype.disconnect=function(t,e){return null==e&&(e={}),this._transmit("DISCONNECT",e),this.ws.onclose=null,this.ws.close(),this._cleanUp(),"function"===typeof t?t():void 0},n.prototype._cleanUp=function(){if(this.connected=!1,this.pinger&&i.clearInterval(this.pinger),this.ponger)return i.clearInterval(this.ponger)},n.prototype.send=function(t,e,n){return null==e&&(e={}),null==n&&(n=""),e.destination=t,this._transmit("SEND",e,n)},n.prototype.subscribe=function(t,e,n){var r;return null==n&&(n={}),n.id||(n.id="sub-"+this.counter++),n.destination=t,this.subscriptions[n.id]=e,this._transmit("SUBSCRIBE",n),r=this,{id:n.id,unsubscribe:function(){return r.unsubscribe(n.id)}}},n.prototype.unsubscribe=function(t){return delete this.subscriptions[t],this._transmit("UNSUBSCRIBE",{id:t})},n.prototype.begin=function(t){var e,n;return n=t||"tx-"+this.counter++,this._transmit("BEGIN",{transaction:n}),e=this,{id:n,commit:function(){return e.commit(n)},abort:function(){return e.abort(n)}}},n.prototype.commit=function(t){return this._transmit("COMMIT",{transaction:t})},n.prototype.abort=function(t){return this._transmit("ABORT",{transaction:t})},n.prototype.ack=function(t,e,n){return null==n&&(n={}),n["message-id"]=t,n.subscription=e,this._transmit("ACK",n)},n.prototype.nack=function(t,e,n){return null==n&&(n={}),n["message-id"]=t,n.subscription=e,this._transmit("NACK",n)},n}(),i={VERSIONS:{V1_0:"1.0",V1_1:"1.1",V1_2:"1.2",supportedVersions:function(){return"1.1,1.0"}},client:function(t,e){var r,s;return null==e&&(e=["v10.stomp","v11.stomp"]),r=i.WebSocketClass||WebSocket,s=new r(t,e),new n(s)},over:function(t){return new n(t)},Frame:r},null!==e&&(e.Stomp=i),"undefined"!==typeof window&&null!==window?(i.setInterval=function(t,e){return window.setInterval(e,t)},i.clearInterval=function(t){return window.clearInterval(t)},window.Stomp=i):e?(i.setInterval=function(t,e){return setInterval(e,t)},i.clearInterval=function(t){return clearInterval(t)}):self.Stomp=i}).call(this)},317:
/*!*****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/utils/websocket/uniWebSocket.js ***!
  \*****************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";(function(t){function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=function(){function e(r,i){var s=this;n(this,e),this.activeClose=!1,this.openListener=[],this.closeListener=[],this.errorListener=[],this.messageListener=[],t.connectSocket({url:r}),t.onSocketOpen((function(t){for(var e in s.onopen(t),s.openListener)s.openListener[e](t)})),t.onSocketClose((function(t){for(var e in s.activeClose?s.activeClose=!1:s.onclose(t),s.closeListener)s.closeListener[e](t)})),t.onSocketError((function(t){for(var e in s.onerror(t),s.errorListener)s.errorListener[e](t)})),t.onSocketMessage((function(t){for(var e in s.onmessage(t),s.messageListener)s.messageListener[e](t)}))}return i(e,[{key:"addEventListener",value:function(t,e){"open"===t?this.openListener.push(e):"close"===t?this.closeListener.push(e):"error"===t?this.errorListener.push(e):"message"===t&&this.messageListener.push(e)}},{key:"removeEventListener",value:function(t){"open"===t?this.openListener.pop():"close"===t?this.closeListener.pop():"error"===t?this.errorListener.pop():"message"===t&&this.messageListener.pop()}},{key:"onopen",value:function(t){}},{key:"onclose",value:function(t){}},{key:"onerror",value:function(t){}},{key:"onmessage",value:function(t){}},{key:"send",value:function(e){t.sendSocketMessage({data:e})}},{key:"close",value:function(){this.activeClose=!0,t.closeSocket()}}]),e}(),o=s;e.default=o}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},318:
/*!******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/utils/websocket/config/config.js ***!
  \******************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.refreshToken=i,e.wsUrl=void 0;n(/*! ./sha256.min.js */319);var r="wss://ad.kehuoa.com/broker/ss";function i(){return new Promise((function(e,n){setTimeout((function(){var n=getApp().globalData.thirdSession;t.setStorageSync("AccessToken",n),e()}),1e3)}))}e.wsUrl=r}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},319:
/*!**********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/utils/websocket/config/sha256.min.js ***!
  \**********************************************************************************************/
/*! no static exports found */function(module,exports,__webpack_require__){(function(process,global){var __WEBPACK_AMD_DEFINE_RESULT__;
/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */!function(){"use strict";function t(t,e){e?(d[0]=d[16]=d[1]=d[2]=d[3]=d[4]=d[5]=d[6]=d[7]=d[8]=d[9]=d[10]=d[11]=d[12]=d[13]=d[14]=d[15]=0,this.blocks=d):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t?(this.h0=3238371032,this.h1=914150663,this.h2=812702999,this.h3=4144912697,this.h4=4290775857,this.h5=1750603025,this.h6=1694076839,this.h7=3204075428):(this.h0=1779033703,this.h1=3144134277,this.h2=1013904242,this.h3=2773480762,this.h4=1359893119,this.h5=2600822924,this.h6=528734635,this.h7=1541459225),this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0,this.is224=t}function i(e,n,r){var i,s=typeof e;if("string"===s){var o,u=[],c=e.length,a=0;for(i=0;i<c;++i)(o=e.charCodeAt(i))<128?u[a++]=o:o<2048?(u[a++]=192|o>>6,u[a++]=128|63&o):o<55296||o>=57344?(u[a++]=224|o>>12,u[a++]=128|o>>6&63,u[a++]=128|63&o):(o=65536+((1023&o)<<10|1023&e.charCodeAt(++i)),u[a++]=240|o>>18,u[a++]=128|o>>12&63,u[a++]=128|o>>6&63,u[a++]=128|63&o);e=u}else{if("object"!==s)throw new Error(h);if(null===e)throw new Error(h);if(f&&e.constructor===ArrayBuffer)e=new Uint8Array(e);else if(!(Array.isArray(e)||f&&ArrayBuffer.isView(e)))throw new Error(h)}e.length>64&&(e=new t(n,!0).update(e).array());var l=[],p=[];for(i=0;i<64;++i){var d=e[i]||0;l[i]=92^d,p[i]=54^d}t.call(this,n,r),this.update(p),this.oKeyPad=l,this.inner=!0,this.sharedMemory=r}var h="input is invalid type",r="object"==typeof window,s=r?window:{};s.JS_SHA256_NO_WINDOW&&(r=!1);var e=!r&&"object"==typeof self,n=!s.JS_SHA256_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;n?s=global:e&&(s=self);var o=!s.JS_SHA256_NO_COMMON_JS&&"object"==typeof module&&module.exports,a=__webpack_require__(/*! !webpack amd options */322),f=!s.JS_SHA256_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,u="0123456789abcdef".split(""),c=[-2147483648,8388608,32768,128],y=[24,16,8,0],p=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],l=["hex","array","digest","arrayBuffer"],d=[];!s.JS_SHA256_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!f||!s.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"==typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var A=function(e,n){return function(r){return new t(n,!0).update(r)[e]()}},w=function(e){var r=A("hex",e);n&&(r=b(r,e)),r.create=function(){return new t(e)},r.update=function(t){return r.create().update(t)};for(var i=0;i<l.length;++i){var s=l[i];r[s]=A(s,e)}return r},b=function b(t,i){var r=eval("require('crypto')"),s=eval("require('buffer').Buffer"),e=i?"sha224":"sha256",n=function(n){if("string"==typeof n)return r.createHash(e).update(n,"utf8").digest("hex");if(null===n||void 0===n)throw new Error(h);return n.constructor===ArrayBuffer&&(n=new Uint8Array(n)),Array.isArray(n)||ArrayBuffer.isView(n)||n.constructor===s?r.createHash(e).update(new s(n)).digest("hex"):t(n)};return n},v=function(t,e){return function(n,r){return new i(n,e,!0).update(r)[t]()}},_=function(t){var e=v("hex",t);e.create=function(e){return new i(e,t)},e.update=function(t,n){return e.create(t).update(n)};for(var n=0;n<l.length;++n){var r=l[n];e[r]=v(r,t)}return e};t.prototype.update=function(t){if(!this.finalized){var e,n=typeof t;if("string"!==n){if("object"!==n)throw new Error(h);if(null===t)throw new Error(h);if(f&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!(Array.isArray(t)||f&&ArrayBuffer.isView(t)))throw new Error(h);e=!0}for(var r,i,s=0,o=t.length,u=this.blocks;s<o;){if(this.hashed&&(this.hashed=!1,u[0]=this.block,u[16]=u[1]=u[2]=u[3]=u[4]=u[5]=u[6]=u[7]=u[8]=u[9]=u[10]=u[11]=u[12]=u[13]=u[14]=u[15]=0),e)for(i=this.start;s<o&&i<64;++s)u[i>>2]|=t[s]<<y[3&i++];else for(i=this.start;s<o&&i<64;++s)(r=t.charCodeAt(s))<128?u[i>>2]|=r<<y[3&i++]:r<2048?(u[i>>2]|=(192|r>>6)<<y[3&i++],u[i>>2]|=(128|63&r)<<y[3&i++]):r<55296||r>=57344?(u[i>>2]|=(224|r>>12)<<y[3&i++],u[i>>2]|=(128|r>>6&63)<<y[3&i++],u[i>>2]|=(128|63&r)<<y[3&i++]):(r=65536+((1023&r)<<10|1023&t.charCodeAt(++s)),u[i>>2]|=(240|r>>18)<<y[3&i++],u[i>>2]|=(128|r>>12&63)<<y[3&i++],u[i>>2]|=(128|r>>6&63)<<y[3&i++],u[i>>2]|=(128|63&r)<<y[3&i++]);this.lastByteIndex=i,this.bytes+=i-this.start,i>=64?(this.block=u[16],this.start=i-64,this.hash(),this.hashed=!0):this.start=i}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},t.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,e=this.lastByteIndex;t[16]=this.block,t[e>>2]|=c[3&e],this.block=t[16],e>=56&&(this.hashed||this.hash(),t[0]=this.block,t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.hBytes<<3|this.bytes>>>29,t[15]=this.bytes<<3,this.hash()}},t.prototype.hash=function(){var t,e,n,r,i,s,o,u,c,a=this.h0,h=this.h1,f=this.h2,l=this.h3,d=this.h4,b=this.h5,y=this.h6,v=this.h7,g=this.blocks;for(t=16;t<64;++t)e=((i=g[t-15])>>>7|i<<25)^(i>>>18|i<<14)^i>>>3,n=((i=g[t-2])>>>17|i<<15)^(i>>>19|i<<13)^i>>>10,g[t]=g[t-16]+e+g[t-7]+n<<0;for(c=h&f,t=0;t<64;t+=4)this.first?(this.is224?(s=300032,v=(i=g[0]-1413257819)-150054599<<0,l=i+24177077<<0):(s=704751109,v=(i=g[0]-210244248)-1521486534<<0,l=i+143694565<<0),this.first=!1):(e=(a>>>2|a<<30)^(a>>>13|a<<19)^(a>>>22|a<<10),r=(s=a&h)^a&f^c,v=l+(i=v+(n=(d>>>6|d<<26)^(d>>>11|d<<21)^(d>>>25|d<<7))+(d&b^~d&y)+p[t]+g[t])<<0,l=i+(e+r)<<0),e=(l>>>2|l<<30)^(l>>>13|l<<19)^(l>>>22|l<<10),r=(o=l&a)^l&h^s,y=f+(i=y+(n=(v>>>6|v<<26)^(v>>>11|v<<21)^(v>>>25|v<<7))+(v&d^~v&b)+p[t+1]+g[t+1])<<0,e=((f=i+(e+r)<<0)>>>2|f<<30)^(f>>>13|f<<19)^(f>>>22|f<<10),r=(u=f&l)^f&a^o,b=h+(i=b+(n=(y>>>6|y<<26)^(y>>>11|y<<21)^(y>>>25|y<<7))+(y&v^~y&d)+p[t+2]+g[t+2])<<0,e=((h=i+(e+r)<<0)>>>2|h<<30)^(h>>>13|h<<19)^(h>>>22|h<<10),r=(c=h&f)^h&l^u,d=a+(i=d+(n=(b>>>6|b<<26)^(b>>>11|b<<21)^(b>>>25|b<<7))+(b&y^~b&v)+p[t+3]+g[t+3])<<0,a=i+(e+r)<<0;this.h0=this.h0+a<<0,this.h1=this.h1+h<<0,this.h2=this.h2+f<<0,this.h3=this.h3+l<<0,this.h4=this.h4+d<<0,this.h5=this.h5+b<<0,this.h6=this.h6+y<<0,this.h7=this.h7+v<<0},t.prototype.hex=function(){this.finalize();var t=this.h0,e=this.h1,n=this.h2,r=this.h3,i=this.h4,s=this.h5,o=this.h6,c=this.h7,a=u[t>>28&15]+u[t>>24&15]+u[t>>20&15]+u[t>>16&15]+u[t>>12&15]+u[t>>8&15]+u[t>>4&15]+u[15&t]+u[e>>28&15]+u[e>>24&15]+u[e>>20&15]+u[e>>16&15]+u[e>>12&15]+u[e>>8&15]+u[e>>4&15]+u[15&e]+u[n>>28&15]+u[n>>24&15]+u[n>>20&15]+u[n>>16&15]+u[n>>12&15]+u[n>>8&15]+u[n>>4&15]+u[15&n]+u[r>>28&15]+u[r>>24&15]+u[r>>20&15]+u[r>>16&15]+u[r>>12&15]+u[r>>8&15]+u[r>>4&15]+u[15&r]+u[i>>28&15]+u[i>>24&15]+u[i>>20&15]+u[i>>16&15]+u[i>>12&15]+u[i>>8&15]+u[i>>4&15]+u[15&i]+u[s>>28&15]+u[s>>24&15]+u[s>>20&15]+u[s>>16&15]+u[s>>12&15]+u[s>>8&15]+u[s>>4&15]+u[15&s]+u[o>>28&15]+u[o>>24&15]+u[o>>20&15]+u[o>>16&15]+u[o>>12&15]+u[o>>8&15]+u[o>>4&15]+u[15&o];return this.is224||(a+=u[c>>28&15]+u[c>>24&15]+u[c>>20&15]+u[c>>16&15]+u[c>>12&15]+u[c>>8&15]+u[c>>4&15]+u[15&c]),a},t.prototype.toString=t.prototype.hex,t.prototype.digest=function(){this.finalize();var t=this.h0,e=this.h1,n=this.h2,r=this.h3,i=this.h4,s=this.h5,o=this.h6,u=this.h7,c=[t>>24&255,t>>16&255,t>>8&255,255&t,e>>24&255,e>>16&255,e>>8&255,255&e,n>>24&255,n>>16&255,n>>8&255,255&n,r>>24&255,r>>16&255,r>>8&255,255&r,i>>24&255,i>>16&255,i>>8&255,255&i,s>>24&255,s>>16&255,s>>8&255,255&s,o>>24&255,o>>16&255,o>>8&255,255&o];return this.is224||c.push(u>>24&255,u>>16&255,u>>8&255,255&u),c},t.prototype.array=t.prototype.digest,t.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(this.is224?28:32),e=new DataView(t);return e.setUint32(0,this.h0),e.setUint32(4,this.h1),e.setUint32(8,this.h2),e.setUint32(12,this.h3),e.setUint32(16,this.h4),e.setUint32(20,this.h5),e.setUint32(24,this.h6),this.is224||e.setUint32(28,this.h7),t},i.prototype=new t,i.prototype.finalize=function(){if(t.prototype.finalize.call(this),this.inner){this.inner=!1;var e=this.array();t.call(this,this.is224,this.sharedMemory),this.update(this.oKeyPad),this.update(e),t.prototype.finalize.call(this)}};var B=w();B.sha256=B,B.sha224=w(!0),B.sha256.hmac=_(),B.sha224.hmac=_(!0),o?module.exports=B:(s.sha256=B.sha256,s.sha224=B.sha224,a&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return B}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))}()}).call(this,__webpack_require__(/*! ./node_modules/node-libs-browser/mock/process.js */320),__webpack_require__(/*! (webpack)/buildin/global.js */3))},320:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */function(t,e,n){e.nextTick=function(t){var e=Array.prototype.slice.call(arguments);e.shift(),setTimeout((function(){t.apply(null,e)}),0)},e.platform=e.arch=e.execPath=e.title="browser",e.pid=1,e.browser=!0,e.env={},e.argv=[],e.binding=function(t){throw new Error("No such module. (Possibly not yet loaded)")},function(){var t,r="/";e.cwd=function(){return r},e.chdir=function(e){t||(t=n(/*! path */321)),r=t.resolve(e,r)}}(),e.exit=e.kill=e.umask=e.dlopen=e.uptime=e.memoryUsage=e.uvCounters=function(){},e.features={}},321:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */function(t,e,n){(function(t){function n(t,e){for(var n=0,r=t.length-1;r>=0;r--){var i=t[r];"."===i?t.splice(r,1):".."===i?(t.splice(r,1),n++):n&&(t.splice(r,1),n--)}if(e)for(;n--;n)t.unshift("..");return t}function r(t){"string"!==typeof t&&(t+="");var e,n=0,r=-1,i=!0;for(e=t.length-1;e>=0;--e)if(47===t.charCodeAt(e)){if(!i){n=e+1;break}}else-1===r&&(i=!1,r=e+1);return-1===r?"":t.slice(n,r)}function i(t,e){if(t.filter)return t.filter(e);for(var n=[],r=0;r<t.length;r++)e(t[r],r,t)&&n.push(t[r]);return n}e.resolve=function(){for(var e="",r=!1,s=arguments.length-1;s>=-1&&!r;s--){var o=s>=0?arguments[s]:t.cwd();if("string"!==typeof o)throw new TypeError("Arguments to path.resolve must be strings");o&&(e=o+"/"+e,r="/"===o.charAt(0))}return e=n(i(e.split("/"),(function(t){return!!t})),!r).join("/"),(r?"/":"")+e||"."},e.normalize=function(t){var r=e.isAbsolute(t),o="/"===s(t,-1);return t=n(i(t.split("/"),(function(t){return!!t})),!r).join("/"),t||r||(t="."),t&&o&&(t+="/"),(r?"/":"")+t},e.isAbsolute=function(t){return"/"===t.charAt(0)},e.join=function(){var t=Array.prototype.slice.call(arguments,0);return e.normalize(i(t,(function(t,e){if("string"!==typeof t)throw new TypeError("Arguments to path.join must be strings");return t})).join("/"))},e.relative=function(t,n){function r(t){for(var e=0;e<t.length;e++)if(""!==t[e])break;for(var n=t.length-1;n>=0;n--)if(""!==t[n])break;return e>n?[]:t.slice(e,n-e+1)}t=e.resolve(t).substr(1),n=e.resolve(n).substr(1);for(var i=r(t.split("/")),s=r(n.split("/")),o=Math.min(i.length,s.length),u=o,c=0;c<o;c++)if(i[c]!==s[c]){u=c;break}var a=[];for(c=u;c<i.length;c++)a.push("..");return a=a.concat(s.slice(u)),a.join("/")},e.sep="/",e.delimiter=":",e.dirname=function(t){if("string"!==typeof t&&(t+=""),0===t.length)return".";for(var e=t.charCodeAt(0),n=47===e,r=-1,i=!0,s=t.length-1;s>=1;--s)if(e=t.charCodeAt(s),47===e){if(!i){r=s;break}}else i=!1;return-1===r?n?"/":".":n&&1===r?"/":t.slice(0,r)},e.basename=function(t,e){var n=r(t);return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},e.extname=function(t){"string"!==typeof t&&(t+="");for(var e=-1,n=0,r=-1,i=!0,s=0,o=t.length-1;o>=0;--o){var u=t.charCodeAt(o);if(47!==u)-1===r&&(i=!1,r=o+1),46===u?-1===e?e=o:1!==s&&(s=1):-1!==e&&(s=-1);else if(!i){n=o+1;break}}return-1===e||-1===r||0===s||1===s&&e===r-1&&e===n+1?"":t.slice(e,r)};var s="b"==="ab".substr(-1)?function(t,e,n){return t.substr(e,n)}:function(t,e,n){return e<0&&(e=t.length+e),t.substr(e,n)}}).call(this,n(/*! ./../node-libs-browser/mock/process.js */320))},322:
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */function(t,e){(function(e){t.exports=e}).call(this,{})}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagestwo/common/vendor.js.map