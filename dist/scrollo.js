(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Scrollo = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};exports.default=function(e,o){e="object"===("undefined"==typeof e?"undefined":_typeof(e))?e:{},o="object"===("undefined"==typeof o?"undefined":_typeof(o))?o:{};for(var t in e)t in o&&(e[t]=o[t]);return e},module.exports=exports.default;
},{}],2:[function(_dereq_,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(e){var t={x:null,y:null};if(e instanceof Element)for(t.x=0,t.y=0;e;)t.x+=e.offsetLeft,t.y+=e.offsetTop,e=e.offsetParent;return t},module.exports=exports.default;
},{}],3:[function(_dereq_,module,exports){
"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),_extend=_dereq_("./extend"),_extend2=_interopRequireDefault(_extend),_getOffset=_dereq_("./get-offset"),_getOffset2=_interopRequireDefault(_getOffset),Scrollo=function(){function t(e,i){_classCallCheck(this,t),this.elm=e instanceof Element?e:null,this._status={isAlive:!1,aliveScroll:0,aliveProgress:0,isActive:!1,activeScroll:0,activeProgress:0,outerScroll:0},this._data={height:0,offsetTop:0,maxAliveScroll:0,maxActiveScroll:0},this._config=(0,_extend2.default)({persist:!1,autoStart:!0,onInitialize:null,onBeforeUpdate:null,onUpdate:null,onEnter:null,onActive:null,onFocus:null,onInactive:null,onLeave:null},i),this._trigger=this._trigger.bind(this),this.update=this.update.bind(this),this.elm&&("function"==typeof this._config.onInitialize&&this._config.onInitialize(this._status,this._data,this),this._config.autoStart===!0&&this.start())}return _createClass(t,[{key:"update",value:function(t){this.elm&&("function"==typeof this._config.onBeforeUpdate&&this._config.onBeforeUpdate(this._status,this._data,this),this._data.height=this.elm.offsetHeight,this._data.offsetTop=(0,_getOffset2.default)(this.elm).y,this._data.maxAliveScroll=Math.max(this._data.height+window.innerHeight,0),this._data.maxActiveScroll=Math.max(this._data.height-window.innerHeight,0),"function"==typeof this._config.onUpdate&&this._config.onUpdate(this._status,this._data,this),this._trigger(t))}},{key:"start",value:function(){this.elm&&(this.update(!0),window.addEventListener("resize",this.update,!1),window.addEventListener("scroll",this._trigger,!1))}},{key:"stop",value:function(){window.removeEventListener("resize",this.update,!1),window.removeEventListener("scroll",this._trigger,!1)}},{key:"_trigger",value:function(t){if(t=t===!0,this.elm){var e=this._status,i=this._data,o=this._config;e.outerScroll=window.pageYOffset,e.aliveScroll=e.outerScroll-i.offsetTop+window.innerHeight,e.aliveProgress=e.aliveScroll/i.maxAliveScroll,e.activeScroll=i.maxActiveScroll>0?e.outerScroll-i.offsetTop:0,e.activeProgress=i.maxActiveScroll>0?(e.outerScroll-i.offsetTop)/i.maxActiveScroll:0;var s=e.aliveProgress>0&&e.aliveProgress<=1,n=e.activeProgress>0&&e.activeProgress<=1;o.persist||(e.aliveScroll=Math.min(Math.max(e.aliveScroll,0),i.maxAliveScroll),e.aliveProgress=Math.min(Math.max(e.aliveProgress,0),1),e.activeScroll=Math.min(Math.max(e.aliveScroll,0),i.maxActiveScroll),e.activeProgress=Math.min(Math.max(e.activeProgress,0),1)),!t&&e.isAlive||!s||(e.isAlive=!0,"function"==typeof o.onEnter&&o.onEnter(e,i,this)),!t&&e.isActive||!n||(e.isActive=!0,"function"==typeof o.onActive&&o.onActive(e,i,this)),"function"==typeof o.onFocus&&(t||o.persist||e.isAlive)&&o.onFocus(e,i,this),!t&&!e.isActive||n||(e.isActive=!1,"function"==typeof o.onInactive&&o.onInactive(e,i,this)),!t&&!e.isAlive||s||(e.isAlive=!1,"function"==typeof o.onLeave&&o.onLeave(e,i,this))}}}]),t}();exports.default=Scrollo,module.exports=exports.default;
},{"./extend":1,"./get-offset":2}]},{},[3])(3)
});