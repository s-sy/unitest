(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pagestwo/common/vendor"],{

/***/ 253:
/*!**************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/utils/checker.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  error: '',
  isJSON: function isJSON(str) {
    if (typeof str == 'string') {
      try {
        var obj = JSON.parse(str);
        if (typeof obj == 'object' && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log('error：' + str + '!!!' + e);
        return false;
      }
    }
  },
  isNumber: function isNumber(checkVal) {
    var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
    return reg.test(checkVal);
  } };

/***/ }),

/***/ 315:
/*!*******************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/utils/websocket/ws.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _stomp = __webpack_require__(/*! ./stomp.js */ 316);
var _uniWebSocket = _interopRequireDefault(__webpack_require__(/*! ./uniWebSocket.js */ 317));
var _config = __webpack_require__(/*! ./config/config.js */ 318);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * WebSocket stomp 实例
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */var
Ws = /*#__PURE__*/function () {

  function Ws() {_classCallCheck(this, Ws);
    // 重连间隔
    this.reconnectInterval = 50000;
    // 是否打印debug信息
    this.debug = true;
    // ws地址
    if (_config.wsUrl.indexOf('http://') === 0) {
      this.url = _config.wsUrl.replace('http://', 'ws://');
    } else if (_config.wsUrl.indexOf('https://') === 0) {
      this.url = _config.wsUrl.replace('https://', 'wss://');
    } else {
      this.url = _config.wsUrl;
    }
    // stomp实例
    this.client = null;
    // 重连事件编号
    this.reconnectId = null;
    // 订阅集合
    this.subscribes = {};
  }

  /**
     * 创建连接
     */_createClass(Ws, [{ key: "connect", value: function connect()
    {var _this = this;
      // 如已存在连接则不创建
      if (this.client && this.client.connected) {
        return;
      }
      // 创建连接，认证token以第二个参数：Sec-WebSocket-Protocol传递到后台，后台需将此头信息原样返回
      // 注：如不想在此处进行认证，可考虑在下面的client.connect方法中传递header进行认证
      // 从缓存中获取token
      var token = getApp().globalData.thirdSession;
      var ws = new _uniWebSocket.default(this.url);
      this.client = _stomp.Stomp.over(ws);
      // 控制是否打印debug信息
      if (!this.debug) {
        this.client.debug = function () {
          console.log(ws);
        };
      }
      this.client.connect({

        token: getApp().globalData.thirdSession },


      function (frame) {
        // 初始化订阅
        Object.keys(_this.subscribes).forEach(function (key) {
          _this.subscribe(key, _this.subscribes[key].callback);
        });
      },
      function (error) {
        // 重连
        _this.reconnectId = setTimeout(function () {
          _this.reconnect();
        }, _this.reconnectInterval);
      });

      // 监听WebSocket对象连接状态，如失败，则stomp的connect回调不会触发，应在此重连
      ws.onerror = function () {
        // 重连
        _this.reconnectId = setTimeout(function () {
          // 刷新token
          (0, _config.refreshToken)().then(function () {
            _this.reconnect();
          });
        }, _this.reconnectInterval);
      };
    }

    /**
       * 重新连接
       */ }, { key: "reconnect", value: function reconnect()
    {var _this2 = this;
      // 订阅状态置false
      Object.keys(this.subscribes).forEach(function (key) {
        _this2.subscribes[key]['subscribed'] = false;
      });
      // 连接
      this.connect();
    }

    /**
       * 断开连接
       */ }, { key: "disconnect", value: function disconnect()
    {
      // 断开连接
      if (this.client) {
        this.client.disconnect();
      }
      // 停止重连事件
      if (this.reconnectId) {
        clearTimeout(this.reconnectId);
        this.reconnectId = null;
      }
      // 清空所有除订阅缓存
      this.subscribes = {};
    }

    /**
       * 订阅
       * @param {Object} destination 主题
       * @param {Object} callback 回调
       */ }, { key: "subscribe", value: function subscribe(
    destination, callback) {
      if (this.subscribes[destination] && this.subscribes[destination]['subscribed']) {// 已订阅
        return;
      } else if (this.client && this.client.connected) {// 已连接：调用订阅，缓存订阅信息
        var subscribe = this.client.subscribe(destination, function (res) {return callback(res);});
        this.subscribes[destination] = { callback: callback, subscribed: true, subscribe: subscribe };
      } else {// 未连接：缓存订阅信息
        this.subscribes[destination] = { callback: callback, subscribed: false };
      }
    }

    /**
       * 取消订阅
       * @param {Object} destination 主题
       */ }, { key: "unsubscribe", value: function unsubscribe(
    destination) {
      if (this.subscribes[destination]) {
        // 取消订阅
        this.subscribes[destination].subscribe.unsubscribe();
        // 删除订阅缓存
        delete this.subscribes[destination];
      }
    }

    /**
       * 向服务器发送消息
       * @param {Object} destination 主题
       * @param {Object} message 消息内容
       */ }, { key: "send", value: function send(
    destination, message) {
      console.log(destination);
      console.log(message);
      if (this.client) {
        console.log(this.client);
        this.client.send(destination, null, message);
      }
    } }]);return Ws;}();var _default =


new Ws();exports.default = _default;

/***/ }),

/***/ 316:
/*!**********************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/utils/websocket/stomp.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.7.1

/*
   Stomp Over WebSocket http://www.jmesnil.net/stomp-websocket/doc/ | Apache License V2.0

   Copyright (C) 2010-2013 [Jeff Mesnil](http://jmesnil.net/)
   Copyright (C) 2012 [FuseSource, Inc.](http://fusesource.com)
 */

(function () {
  var Byte,Client,Frame,Stomp,
  __hasProp = {}.hasOwnProperty,
  __slice = [].slice;

  Byte = {
    LF: '\x0A',
    NULL: '\x00' };


  Frame = function () {
    var unmarshallSingle;

    function Frame(command, headers, body) {
      this.command = command;
      this.headers = headers != null ? headers : {};
      this.body = body != null ? body : '';
    }

    Frame.prototype.toString = function () {
      var lines, name, skipContentLength, value, _ref;
      lines = [this.command];
      skipContentLength = this.headers['content-length'] === false ? true : false;
      if (skipContentLength) {
        delete this.headers['content-length'];
      }
      _ref = this.headers;
      for (name in _ref) {
        if (!__hasProp.call(_ref, name)) continue;
        value = _ref[name];
        lines.push("" + name + ":" + value);
      }
      if (this.body && !skipContentLength) {
        lines.push("content-length:" + Frame.sizeOfUTF8(this.body));
      }
      lines.push(Byte.LF + this.body);
      return lines.join(Byte.LF);
    };

    Frame.sizeOfUTF8 = function (s) {
      if (s) {
        return encodeURI(s).match(/%..|./g).length;
      } else {
        return 0;
      }
    };

    unmarshallSingle = function unmarshallSingle(data) {
      var body, chr, command, divider, headerLines, headers, i, idx, len, line, start, trim, _i, _j, _len, _ref, _ref1;
      divider = data.search(RegExp("" + Byte.LF + Byte.LF));
      headerLines = data.substring(0, divider).split(Byte.LF);
      command = headerLines.shift();
      headers = {};
      trim = function trim(str) {
        return str.replace(/^\s+|\s+$/g, '');
      };
      _ref = headerLines.reverse();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        idx = line.indexOf(':');
        headers[trim(line.substring(0, idx))] = trim(line.substring(idx + 1));
      }
      body = '';
      start = divider + 2;
      if (headers['content-length']) {
        len = parseInt(headers['content-length']);
        body = ('' + data).substring(start, start + len);
      } else {
        chr = null;
        for (i = _j = start, _ref1 = data.length; start <= _ref1 ? _j < _ref1 : _j > _ref1; i = start <= _ref1 ? ++_j : --_j) {
          chr = data.charAt(i);
          if (chr === Byte.NULL) {
            break;
          }
          body += chr;
        }
      }
      return new Frame(command, headers, body);
    };

    Frame.unmarshall = function (datas) {
      var data;
      return function () {
        var _i, _len, _ref, _results;
        _ref = datas.split(RegExp("" + Byte.NULL + Byte.LF + "*"));
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          data = _ref[_i];
          if ((data != null ? data.length : void 0) > 0) {
            _results.push(unmarshallSingle(data));
          }
        }
        return _results;
      }();
    };

    Frame.marshall = function (command, headers, body) {
      var frame;
      frame = new Frame(command, headers, body);
      return frame.toString() + Byte.NULL;
    };

    return Frame;

  }();

  Client = function () {
    var now;

    function Client(ws) {
      this.ws = ws;
      this.ws.binaryType = "arraybuffer";
      this.counter = 0;
      this.connected = false;
      this.heartbeat = {
        outgoing: 20000,
        incoming: 0 };

      this.maxWebSocketFrameSize = 16 * 1024;
      this.subscriptions = {};
    }

    Client.prototype.debug = function (message) {
      var _ref;
      return typeof window !== "undefined" && window !== null ? (_ref = window.console) != null ? _ref.log(message) : void 0 : void 0;
    };

    now = function now() {
      if (Date.now) {
        return Date.now();
      } else {
        return new Date().valueOf;
      }
    };

    Client.prototype._transmit = function (command, headers, body) {
      var out;
      out = Frame.marshall(command, headers, body);
      if (typeof this.debug === "function") {
        this.debug(">>> " + out);
      }
      while (true) {
        if (out.length > this.maxWebSocketFrameSize) {
          this.ws.send(out.substring(0, this.maxWebSocketFrameSize));
          out = out.substring(this.maxWebSocketFrameSize);
          if (typeof this.debug === "function") {
            this.debug("remaining = " + out.length);
          }
        } else {
          return this.ws.send(out);
        }
      }
    };

    Client.prototype._setupHeartbeat = function (headers) {
      var serverIncoming, serverOutgoing, ttl, v, _ref, _ref1;
      if ((_ref = headers.version) !== Stomp.VERSIONS.V1_1 && _ref !== Stomp.VERSIONS.V1_2) {
        return;
      }
      _ref1 = function () {
        var _i, _len, _ref1, _results;
        _ref1 = headers['heart-beat'].split(",");
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          v = _ref1[_i];
          _results.push(parseInt(v));
        }
        return _results;
      }(), serverOutgoing = _ref1[0], serverIncoming = _ref1[1];
      if (!(this.heartbeat.outgoing === 0 || serverIncoming === 0)) {
        ttl = Math.max(this.heartbeat.outgoing, serverIncoming);
        if (typeof this.debug === "function") {
          this.debug("send PING every " + ttl + "ms");
        }
        this.pinger = Stomp.setInterval(ttl, function (_this) {
          return function () {
            _this.ws.send(Byte.LF);
            return typeof _this.debug === "function" ? _this.debug(">>> PING") : void 0;
          };
        }(this));
      }
      if (!(this.heartbeat.incoming === 0 || serverOutgoing === 0)) {
        ttl = Math.max(this.heartbeat.incoming, serverOutgoing);
        if (typeof this.debug === "function") {
          this.debug("check PONG every " + ttl + "ms");
        }
        return this.ponger = Stomp.setInterval(ttl, function (_this) {
          return function () {
            var delta;
            delta = now() - _this.serverActivity;
            if (delta > ttl * 2) {
              if (typeof _this.debug === "function") {
                _this.debug("did not receive server activity for the last " + delta + "ms");
              }
              return _this.ws.close();
            }
          };
        }(this));
      }
    };

    Client.prototype._parseConnect = function () {
      var args, connectCallback, errorCallback, headers;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      headers = {};
      switch (args.length) {
        case 2:
          headers = args[0], connectCallback = args[1];
          break;
        case 3:
          if (args[1] instanceof Function) {
            headers = args[0], connectCallback = args[1], errorCallback = args[2];
          } else {
            headers.login = args[0], headers.passcode = args[1], connectCallback = args[2];
          }
          break;
        case 4:
          headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], errorCallback = args[3];
          break;
        default:
          headers.login = args[0], headers.passcode = args[1], connectCallback = args[2], errorCallback = args[3], headers.host = args[4];}

      return [headers, connectCallback, errorCallback];
    };

    Client.prototype.connect = function () {
      var args, errorCallback, headers, out;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      out = this._parseConnect.apply(this, args);
      headers = out[0], this.connectCallback = out[1], errorCallback = out[2];
      if (typeof this.debug === "function") {
        this.debug("Opening Web Socket...");
      }
      this.ws.onmessage = function (_this) {
        return function (evt) {
          var arr, c, client, data, frame, messageID, onreceive, subscription, _i, _len, _ref, _results;
          data = typeof ArrayBuffer !== 'undefined' && evt.data instanceof ArrayBuffer ? (arr = new Uint8Array(evt.data), typeof _this.debug === "function" ? _this.debug("--- got data length: " + arr.length) : void 0, function () {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = arr.length; _i < _len; _i++) {
              c = arr[_i];
              _results.push(String.fromCharCode(c));
            }
            return _results;
          }().join('')) : evt.data;
          _this.serverActivity = now();
          if (data === Byte.LF) {
            if (typeof _this.debug === "function") {
              _this.debug("<<< PONG");
            }
            return;
          }
          if (typeof _this.debug === "function") {
            _this.debug("<<< " + data);
          }
          _ref = Frame.unmarshall(data);
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            frame = _ref[_i];
            switch (frame.command) {
              case "CONNECTED":
                if (typeof _this.debug === "function") {
                  _this.debug("connected to server " + frame.headers.server);
                }
                _this.connected = true;
                _this._setupHeartbeat(frame.headers);
                _results.push(typeof _this.connectCallback === "function" ? _this.connectCallback(frame) : void 0);
                break;
              case "MESSAGE":
                subscription = frame.headers.subscription;
                onreceive = _this.subscriptions[subscription] || _this.onreceive;
                if (onreceive) {
                  client = _this;
                  messageID = frame.headers["message-id"];
                  frame.ack = function (headers) {
                    if (headers == null) {
                      headers = {};
                    }
                    return client.ack(messageID, subscription, headers);
                  };
                  frame.nack = function (headers) {
                    if (headers == null) {
                      headers = {};
                    }
                    return client.nack(messageID, subscription, headers);
                  };
                  _results.push(onreceive(frame));
                } else {
                  _results.push(typeof _this.debug === "function" ? _this.debug("Unhandled received MESSAGE: " + frame) : void 0);
                }
                break;
              case "RECEIPT":
                _results.push(typeof _this.onreceipt === "function" ? _this.onreceipt(frame) : void 0);
                break;
              case "ERROR":
                _results.push(typeof errorCallback === "function" ? errorCallback(frame) : void 0);
                break;
              default:
                _results.push(typeof _this.debug === "function" ? _this.debug("Unhandled frame: " + frame) : void 0);}

          }
          return _results;
        };
      }(this);
      this.ws.onclose = function (_this) {
        return function () {
          var msg;
          msg = "Whoops! Lost connection to " + _this.ws.url;
          if (typeof _this.debug === "function") {
            _this.debug(msg);
          }
          _this._cleanUp();
          return typeof errorCallback === "function" ? errorCallback(msg) : void 0;
        };
      }(this);
      return this.ws.onopen = function (_this) {
        return function () {
          if (typeof _this.debug === "function") {
            _this.debug('Web Socket Opened...');
          }
          headers["accept-version"] = Stomp.VERSIONS.supportedVersions();
          headers["heart-beat"] = [_this.heartbeat.outgoing, _this.heartbeat.incoming].join(',');
          return _this._transmit("CONNECT", headers);
        };
      }(this);
    };

    Client.prototype.disconnect = function (disconnectCallback, headers) {
      if (headers == null) {
        headers = {};
      }
      this._transmit("DISCONNECT", headers);
      this.ws.onclose = null;
      this.ws.close();
      this._cleanUp();
      return typeof disconnectCallback === "function" ? disconnectCallback() : void 0;
    };

    Client.prototype._cleanUp = function () {
      this.connected = false;
      if (this.pinger) {
        Stomp.clearInterval(this.pinger);
      }
      if (this.ponger) {
        return Stomp.clearInterval(this.ponger);
      }
    };

    Client.prototype.send = function (destination, headers, body) {
      if (headers == null) {
        headers = {};
      }
      if (body == null) {
        body = '';
      }
      headers.destination = destination;
      return this._transmit("SEND", headers, body);
    };

    Client.prototype.subscribe = function (destination, callback, headers) {
      var client;
      if (headers == null) {
        headers = {};
      }
      if (!headers.id) {
        headers.id = "sub-" + this.counter++;
      }
      headers.destination = destination;
      this.subscriptions[headers.id] = callback;
      this._transmit("SUBSCRIBE", headers);
      client = this;
      return {
        id: headers.id,
        unsubscribe: function unsubscribe() {
          return client.unsubscribe(headers.id);
        } };

    };

    Client.prototype.unsubscribe = function (id) {
      delete this.subscriptions[id];
      return this._transmit("UNSUBSCRIBE", {
        id: id });

    };

    Client.prototype.begin = function (transaction) {
      var client, txid;
      txid = transaction || "tx-" + this.counter++;
      this._transmit("BEGIN", {
        transaction: txid });

      client = this;
      return {
        id: txid,
        commit: function commit() {
          return client.commit(txid);
        },
        abort: function abort() {
          return client.abort(txid);
        } };

    };

    Client.prototype.commit = function (transaction) {
      return this._transmit("COMMIT", {
        transaction: transaction });

    };

    Client.prototype.abort = function (transaction) {
      return this._transmit("ABORT", {
        transaction: transaction });

    };

    Client.prototype.ack = function (messageID, subscription, headers) {
      if (headers == null) {
        headers = {};
      }
      headers["message-id"] = messageID;
      headers.subscription = subscription;
      return this._transmit("ACK", headers);
    };

    Client.prototype.nack = function (messageID, subscription, headers) {
      if (headers == null) {
        headers = {};
      }
      headers["message-id"] = messageID;
      headers.subscription = subscription;
      return this._transmit("NACK", headers);
    };

    return Client;

  }();

  Stomp = {
    VERSIONS: {
      V1_0: '1.0',
      V1_1: '1.1',
      V1_2: '1.2',
      supportedVersions: function supportedVersions() {
        return '1.1,1.0';
      } },

    client: function client(url, protocols) {
      var klass, ws;
      if (protocols == null) {
        protocols = ['v10.stomp', 'v11.stomp'];
      }
      klass = Stomp.WebSocketClass || WebSocket;
      ws = new klass(url, protocols);
      return new Client(ws);
    },
    over: function over(ws) {
      return new Client(ws);
    },
    Frame: Frame };


  if ( true && exports !== null) {
    exports.Stomp = Stomp;
  }

  if (typeof window !== "undefined" && window !== null) {
    Stomp.setInterval = function (interval, f) {
      return window.setInterval(f, interval);
    };
    Stomp.clearInterval = function (id) {
      return window.clearInterval(id);
    };
    window.Stomp = Stomp;
  } else if (!exports) {
    self.Stomp = Stomp;
  } else {// 兼容uniapp
    Stomp.setInterval = function (interval, f) {
      return setInterval(f, interval);
    };
    Stomp.clearInterval = function (id) {
      return clearInterval(id);
    };
  }

}).call(this);

/***/ }),

/***/ 317:
/*!*****************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/utils/websocket/uniWebSocket.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 封装uniapp的WebSocket对象，使其与原生类似，供stomp使用
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */var
UniWebSocket = /*#__PURE__*/function () {
  function UniWebSocket(url, protocols) {var _this = this;_classCallCheck(this, UniWebSocket);
    // 是否主动关闭连接
    this.activeClose = false;

    // 相关事件数组
    this.openListener = [];
    this.closeListener = [];
    this.errorListener = [];
    this.messageListener = [];

    // 创建连接
    uni.connectSocket({
      url: url
      //protocols: protocols
    });

    // 连接开启
    uni.onSocketOpen(function (res) {
      _this.onopen(res);
      for (var i in _this.openListener) {
        _this.openListener[i](res);
      }
    });

    // 连接关闭
    uni.onSocketClose(function (res) {
      // 主动关闭连接不进行回调
      if (_this.activeClose) {
        _this.activeClose = false;
      } else {
        _this.onclose(res);
      }
      for (var i in _this.closeListener) {
        _this.closeListener[i](res);
      }
    });

    // 连接异常
    uni.onSocketError(function (res) {
      _this.onerror(res);
      for (var i in _this.errorListener) {
        _this.errorListener[i](res);
      }
    });

    // 接收消息
    uni.onSocketMessage(function (res) {
      _this.onmessage(res);
      for (var i in _this.messageListener) {
        _this.messageListener[i](res);
      }
    });
  }

  /**
     * 添加监听
     * @param {Object} eventName
     * @param {Object} callback
     */_createClass(UniWebSocket, [{ key: "addEventListener", value: function addEventListener(
    eventName, callback) {
      if (eventName === 'open') {
        this.openListener.push(callback);
      } else if (eventName === 'close') {
        this.closeListener.push(callback);
      } else if (eventName === 'error') {
        this.errorListener.push(callback);
      } else if (eventName === 'message') {
        this.messageListener.push(callback);
      }
    }

    /**
       * 移除最后一个监听
       * @param {Object} eventName
       */ }, { key: "removeEventListener", value: function removeEventListener(
    eventName) {
      if (eventName === 'open') {
        this.openListener.pop();
      } else if (eventName === 'close') {
        this.closeListener.pop();
      } else if (eventName === 'error') {
        this.errorListener.pop();
      } else if (eventName === 'message') {
        this.messageListener.pop();
      }
    }

    /**
       * 连接开启
       * @param {Object} res
       */ }, { key: "onopen", value: function onopen(
    res) {}

    /**
             * 连接关闭
             * @param {Object} res
             */ }, { key: "onclose", value: function onclose(
    res) {}

    /**
             * 连接异常
             * @param {Object} res
             */ }, { key: "onerror", value: function onerror(
    res) {}

    /**
             * 接收消息
             * @param {Object} res
             */ }, { key: "onmessage", value: function onmessage(
    res) {}

    /**
             * 发送消息
             * @param {Object} data
             */ }, { key: "send", value: function send(
    data) {
      uni.sendSocketMessage({
        data: data });

    }

    /**
       * 关闭连接
       */ }, { key: "close", value: function close()
    {
      this.activeClose = true;
      uni.closeSocket();
    } }]);return UniWebSocket;}();var _default =


UniWebSocket;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 318:
/*!******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/utils/websocket/config/config.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.refreshToken = refreshToken;exports.wsUrl = void 0;var _sha256Min = __webpack_require__(/*! ./sha256.min.js */ 319);

// Websocket地址，仅为测试地址，请替换成自己的后台地址
var wsUrl = 'wss://ad.kehuoa.com/broker/ss';
// export const wsUrl = 'ws://192.168.22.201:8082/broker/ss'
/**
 * 模拟请求刷新token，并缓存到localStorage
 */exports.wsUrl = wsUrl;
function refreshToken() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      // 生成模拟token
      var token = getApp().globalData.thirdSession;
      //sha256('528c3e36775d438a986eab7c4d45ffacstomp' + parseInt((new Date().getTime() / 600000)))
      // 缓存token
      uni.setStorageSync('AccessToken', token);
      resolve();
    }, 1000);
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 319:
/*!**********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/project/项目/unitest/utils/websocket/config/sha256.min.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
!function () {"use strict";function t(t, i) {i ? (d[0] = d[16] = d[1] = d[2] = d[3] = d[4] = d[5] = d[6] = d[7] = d[8] = d[9] = d[10] = d[11] = d[12] = d[13] = d[14] = d[15] = 0, this.blocks = d) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t ? (this.h0 = 3238371032, this.h1 = 914150663, this.h2 = 812702999, this.h3 = 4144912697, this.h4 = 4290775857, this.h5 = 1750603025, this.h6 = 1694076839, this.h7 = 3204075428) : (this.h0 = 1779033703, this.h1 = 3144134277, this.h2 = 1013904242, this.h3 = 2773480762, this.h4 = 1359893119, this.h5 = 2600822924, this.h6 = 528734635, this.h7 = 1541459225), this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0, this.is224 = t;}function i(i, r, s) {var e,n = typeof i;if ("string" === n) {var o,a = [],u = i.length,c = 0;for (e = 0; e < u; ++e) {(o = i.charCodeAt(e)) < 128 ? a[c++] = o : o < 2048 ? (a[c++] = 192 | o >> 6, a[c++] = 128 | 63 & o) : o < 55296 || o >= 57344 ? (a[c++] = 224 | o >> 12, a[c++] = 128 | o >> 6 & 63, a[c++] = 128 | 63 & o) : (o = 65536 + ((1023 & o) << 10 | 1023 & i.charCodeAt(++e)), a[c++] = 240 | o >> 18, a[c++] = 128 | o >> 12 & 63, a[c++] = 128 | o >> 6 & 63, a[c++] = 128 | 63 & o);}i = a;} else {if ("object" !== n) throw new Error(h);if (null === i) throw new Error(h);if (f && i.constructor === ArrayBuffer) i = new Uint8Array(i);else if (!(Array.isArray(i) || f && ArrayBuffer.isView(i))) throw new Error(h);}i.length > 64 && (i = new t(r, !0).update(i).array());var y = [],p = [];for (e = 0; e < 64; ++e) {var l = i[e] || 0;y[e] = 92 ^ l, p[e] = 54 ^ l;}t.call(this, r, s), this.update(p), this.oKeyPad = y, this.inner = !0, this.sharedMemory = s;}var h = "input is invalid type",r = "object" == typeof window,s = r ? window : {};s.JS_SHA256_NO_WINDOW && (r = !1);var e = !r && "object" == typeof self,n = !s.JS_SHA256_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node;n ? s = global : e && (s = self);var o = !s.JS_SHA256_NO_COMMON_JS && "object" == typeof module && module.exports,a =  true && __webpack_require__(/*! !webpack amd options */ 322),f = !s.JS_SHA256_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,u = "0123456789abcdef".split(""),c = [-2147483648, 8388608, 32768, 128],y = [24, 16, 8, 0],p = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],l = ["hex", "array", "digest", "arrayBuffer"],d = [];!s.JS_SHA256_NO_NODE_JS && Array.isArray || (Array.isArray = function (t) {return "[object Array]" === Object.prototype.toString.call(t);}), !f || !s.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function (t) {return "object" == typeof t && t.buffer && t.buffer.constructor === ArrayBuffer;});var A = function A(i, h) {return function (r) {return new t(h, !0).update(r)[i]();};},w = function w(i) {var h = A("hex", i);n && (h = b(h, i)), h.create = function () {return new t(i);}, h.update = function (t) {return h.create().update(t);};for (var r = 0; r < l.length; ++r) {var s = l[r];h[s] = A(s, i);}return h;},b = function b(t, i) {var r = eval("require('crypto')"),s = eval("require('buffer').Buffer"),e = i ? "sha224" : "sha256",n = function n(i) {if ("string" == typeof i) return r.createHash(e).update(i, "utf8").digest("hex");if (null === i || void 0 === i) throw new Error(h);return i.constructor === ArrayBuffer && (i = new Uint8Array(i)), Array.isArray(i) || ArrayBuffer.isView(i) || i.constructor === s ? r.createHash(e).update(new s(i)).digest("hex") : t(i);};return n;},v = function v(t, h) {return function (r, s) {return new i(r, h, !0).update(s)[t]();};},_ = function _(t) {var h = v("hex", t);h.create = function (h) {return new i(h, t);}, h.update = function (t, i) {return h.create(t).update(i);};for (var r = 0; r < l.length; ++r) {var s = l[r];h[s] = v(s, t);}return h;};t.prototype.update = function (t) {if (!this.finalized) {var i,r = typeof t;if ("string" !== r) {if ("object" !== r) throw new Error(h);if (null === t) throw new Error(h);if (f && t.constructor === ArrayBuffer) t = new Uint8Array(t);else if (!(Array.isArray(t) || f && ArrayBuffer.isView(t))) throw new Error(h);i = !0;}for (var s, e, n = 0, o = t.length, a = this.blocks; n < o;) {if (this.hashed && (this.hashed = !1, a[0] = this.block, a[16] = a[1] = a[2] = a[3] = a[4] = a[5] = a[6] = a[7] = a[8] = a[9] = a[10] = a[11] = a[12] = a[13] = a[14] = a[15] = 0), i) for (e = this.start; n < o && e < 64; ++n) {a[e >> 2] |= t[n] << y[3 & e++];} else for (e = this.start; n < o && e < 64; ++n) {(s = t.charCodeAt(n)) < 128 ? a[e >> 2] |= s << y[3 & e++] : s < 2048 ? (a[e >> 2] |= (192 | s >> 6) << y[3 & e++], a[e >> 2] |= (128 | 63 & s) << y[3 & e++]) : s < 55296 || s >= 57344 ? (a[e >> 2] |= (224 | s >> 12) << y[3 & e++], a[e >> 2] |= (128 | s >> 6 & 63) << y[3 & e++], a[e >> 2] |= (128 | 63 & s) << y[3 & e++]) : (s = 65536 + ((1023 & s) << 10 | 1023 & t.charCodeAt(++n)), a[e >> 2] |= (240 | s >> 18) << y[3 & e++], a[e >> 2] |= (128 | s >> 12 & 63) << y[3 & e++], a[e >> 2] |= (128 | s >> 6 & 63) << y[3 & e++], a[e >> 2] |= (128 | 63 & s) << y[3 & e++]);}this.lastByteIndex = e, this.bytes += e - this.start, e >= 64 ? (this.block = a[16], this.start = e - 64, this.hash(), this.hashed = !0) : this.start = e;}return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this;}}, t.prototype.finalize = function () {if (!this.finalized) {this.finalized = !0;var t = this.blocks,i = this.lastByteIndex;t[16] = this.block, t[i >> 2] |= c[3 & i], this.block = t[16], i >= 56 && (this.hashed || this.hash(), t[0] = this.block, t[16] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = t[9] = t[10] = t[11] = t[12] = t[13] = t[14] = t[15] = 0), t[14] = this.hBytes << 3 | this.bytes >>> 29, t[15] = this.bytes << 3, this.hash();}}, t.prototype.hash = function () {var t,i,h,r,s,e,n,o,a,f = this.h0,u = this.h1,c = this.h2,y = this.h3,l = this.h4,d = this.h5,A = this.h6,w = this.h7,b = this.blocks;for (t = 16; t < 64; ++t) {i = ((s = b[t - 15]) >>> 7 | s << 25) ^ (s >>> 18 | s << 14) ^ s >>> 3, h = ((s = b[t - 2]) >>> 17 | s << 15) ^ (s >>> 19 | s << 13) ^ s >>> 10, b[t] = b[t - 16] + i + b[t - 7] + h << 0;}for (a = u & c, t = 0; t < 64; t += 4) {this.first ? (this.is224 ? (e = 300032, w = (s = b[0] - 1413257819) - 150054599 << 0, y = s + 24177077 << 0) : (e = 704751109, w = (s = b[0] - 210244248) - 1521486534 << 0, y = s + 143694565 << 0), this.first = !1) : (i = (f >>> 2 | f << 30) ^ (f >>> 13 | f << 19) ^ (f >>> 22 | f << 10), r = (e = f & u) ^ f & c ^ a, w = y + (s = w + (h = (l >>> 6 | l << 26) ^ (l >>> 11 | l << 21) ^ (l >>> 25 | l << 7)) + (l & d ^ ~l & A) + p[t] + b[t]) << 0, y = s + (i + r) << 0), i = (y >>> 2 | y << 30) ^ (y >>> 13 | y << 19) ^ (y >>> 22 | y << 10), r = (n = y & f) ^ y & u ^ e, A = c + (s = A + (h = (w >>> 6 | w << 26) ^ (w >>> 11 | w << 21) ^ (w >>> 25 | w << 7)) + (w & l ^ ~w & d) + p[t + 1] + b[t + 1]) << 0, i = ((c = s + (i + r) << 0) >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10), r = (o = c & y) ^ c & f ^ n, d = u + (s = d + (h = (A >>> 6 | A << 26) ^ (A >>> 11 | A << 21) ^ (A >>> 25 | A << 7)) + (A & w ^ ~A & l) + p[t + 2] + b[t + 2]) << 0, i = ((u = s + (i + r) << 0) >>> 2 | u << 30) ^ (u >>> 13 | u << 19) ^ (u >>> 22 | u << 10), r = (a = u & c) ^ u & y ^ o, l = f + (s = l + (h = (d >>> 6 | d << 26) ^ (d >>> 11 | d << 21) ^ (d >>> 25 | d << 7)) + (d & A ^ ~d & w) + p[t + 3] + b[t + 3]) << 0, f = s + (i + r) << 0;}this.h0 = this.h0 + f << 0, this.h1 = this.h1 + u << 0, this.h2 = this.h2 + c << 0, this.h3 = this.h3 + y << 0, this.h4 = this.h4 + l << 0, this.h5 = this.h5 + d << 0, this.h6 = this.h6 + A << 0, this.h7 = this.h7 + w << 0;}, t.prototype.hex = function () {this.finalize();var t = this.h0,i = this.h1,h = this.h2,r = this.h3,s = this.h4,e = this.h5,n = this.h6,o = this.h7,a = u[t >> 28 & 15] + u[t >> 24 & 15] + u[t >> 20 & 15] + u[t >> 16 & 15] + u[t >> 12 & 15] + u[t >> 8 & 15] + u[t >> 4 & 15] + u[15 & t] + u[i >> 28 & 15] + u[i >> 24 & 15] + u[i >> 20 & 15] + u[i >> 16 & 15] + u[i >> 12 & 15] + u[i >> 8 & 15] + u[i >> 4 & 15] + u[15 & i] + u[h >> 28 & 15] + u[h >> 24 & 15] + u[h >> 20 & 15] + u[h >> 16 & 15] + u[h >> 12 & 15] + u[h >> 8 & 15] + u[h >> 4 & 15] + u[15 & h] + u[r >> 28 & 15] + u[r >> 24 & 15] + u[r >> 20 & 15] + u[r >> 16 & 15] + u[r >> 12 & 15] + u[r >> 8 & 15] + u[r >> 4 & 15] + u[15 & r] + u[s >> 28 & 15] + u[s >> 24 & 15] + u[s >> 20 & 15] + u[s >> 16 & 15] + u[s >> 12 & 15] + u[s >> 8 & 15] + u[s >> 4 & 15] + u[15 & s] + u[e >> 28 & 15] + u[e >> 24 & 15] + u[e >> 20 & 15] + u[e >> 16 & 15] + u[e >> 12 & 15] + u[e >> 8 & 15] + u[e >> 4 & 15] + u[15 & e] + u[n >> 28 & 15] + u[n >> 24 & 15] + u[n >> 20 & 15] + u[n >> 16 & 15] + u[n >> 12 & 15] + u[n >> 8 & 15] + u[n >> 4 & 15] + u[15 & n];return this.is224 || (a += u[o >> 28 & 15] + u[o >> 24 & 15] + u[o >> 20 & 15] + u[o >> 16 & 15] + u[o >> 12 & 15] + u[o >> 8 & 15] + u[o >> 4 & 15] + u[15 & o]), a;}, t.prototype.toString = t.prototype.hex, t.prototype.digest = function () {this.finalize();var t = this.h0,i = this.h1,h = this.h2,r = this.h3,s = this.h4,e = this.h5,n = this.h6,o = this.h7,a = [t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, 255 & i, h >> 24 & 255, h >> 16 & 255, h >> 8 & 255, 255 & h, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, s >> 24 & 255, s >> 16 & 255, s >> 8 & 255, 255 & s, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, 255 & n];return this.is224 || a.push(o >> 24 & 255, o >> 16 & 255, o >> 8 & 255, 255 & o), a;}, t.prototype.array = t.prototype.digest, t.prototype.arrayBuffer = function () {this.finalize();var t = new ArrayBuffer(this.is224 ? 28 : 32),i = new DataView(t);return i.setUint32(0, this.h0), i.setUint32(4, this.h1), i.setUint32(8, this.h2), i.setUint32(12, this.h3), i.setUint32(16, this.h4), i.setUint32(20, this.h5), i.setUint32(24, this.h6), this.is224 || i.setUint32(28, this.h7), t;}, i.prototype = new t(), i.prototype.finalize = function () {if (t.prototype.finalize.call(this), this.inner) {this.inner = !1;var i = this.array();t.call(this, this.is224, this.sharedMemory), this.update(this.oKeyPad), this.update(i), t.prototype.finalize.call(this);}};var B = w();B.sha256 = B, B.sha224 = w(!0), B.sha256.hmac = _(), B.sha224.hmac = _(!0), o ? module.exports = B : (s.sha256 = B.sha256, s.sha224 = B.sha224, a && !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {return B;}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)));}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/node-libs-browser/mock/process.js */ 320), __webpack_require__(/*! (webpack)/buildin/global.js */ 3)))

/***/ }),

/***/ 320:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 321);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 321:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 320)))

/***/ }),

/***/ 322:
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagestwo/common/vendor.js.map