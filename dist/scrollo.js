(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Scrollo = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/lorenzocadamuro/Workplace/lorenzocadamuro/scrollo/src/extend":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (base, object) {
  base = (typeof base === 'undefined' ? 'undefined' : _typeof(base)) === 'object' ? base : {};
  object = (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' ? object : {};

  for (var key in base) {
    if (key in object) {
      base[key] = object[key];
    }
  }

  return base;
};

;
module.exports = exports['default'];

},{}],"/Users/lorenzocadamuro/Workplace/lorenzocadamuro/scrollo/src/get-offset":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (elm) {
  var offset = {
    x: null,
    y: null
  };

  if (elm instanceof Element) {
    offset.x = 0;
    offset.y = 0;

    while (elm) {
      offset.x += elm.offsetLeft;
      offset.y += elm.offsetTop;
      elm = elm.offsetParent;
    }
  }

  return offset;
};

;
module.exports = exports["default"];

},{}],1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scrollo = function () {
  function Scrollo(elm, config) {
    _classCallCheck(this, Scrollo);

    this.elm = elm instanceof Element ? elm : null;

    this._status = {
      isAlive: false,
      aliveScroll: 0,
      aliveProgress: 0,
      isActive: false,
      activeScroll: 0,
      activeProgress: 0,
      outerScroll: 0
    };

    this._data = {
      height: 0,
      offsetTop: 0,
      maxAliveScroll: 0,
      maxActiveScroll: 0
    };

    this._config = extend({
      persist: false,
      autoStart: true,
      onInitialize: null,
      onBeforeUpdate: null,
      onUpdate: null,
      onEnter: null,
      onActive: null,
      onFocus: null,
      onInactive: null,
      onLeave: null
    }, config);

    this._trigger = this._trigger.bind(this);
    this.update = this.update.bind(this);

    if (this.elm) {
      if (typeof this._config.onInitialize === 'function') {
        this._config.onInitialize(this._status, this._data, this);
      }

      if (this._config.autoStart === true) {
        this.start();
      }
    }
  }

  _createClass(Scrollo, [{
    key: 'update',
    value: function update(force) {
      if (!this.elm) return;

      if (typeof this._config.onBeforeUpdate === 'function') {
        this._config.onBeforeUpdate(this._status, this._data, this);
      }

      this._data.height = this.elm.offsetHeight;
      this._data.offsetTop = getOffset(this.elm).y;
      this._data.maxAliveScroll = Math.max(this._data.height + window.innerHeight, 0);
      this._data.maxActiveScroll = Math.max(this._data.height - window.innerHeight, 0);

      if (typeof this._config.onUpdate === 'function') {
        this._config.onUpdate(this._status, this._data, this);
      }

      this._trigger(force);
    }
  }, {
    key: 'start',
    value: function start() {
      if (!this.elm) return;

      this.update(true);

      window.addEventListener('resize', this.update, false);
      window.addEventListener('scroll', this._trigger, false);
    }
  }, {
    key: 'stop',
    value: function stop() {
      window.removeEventListener('resize', this.update, false);
      window.removeEventListener('scroll', this._trigger, false);
    }
  }, {
    key: '_trigger',
    value: function _trigger(force) {
      force = force === true ? true : false;

      if (!this.elm) return;

      var s = this._status,
          d = this._data,
          c = this._config;

      s.outerScroll = window.pageYOffset;
      s.aliveScroll = s.outerScroll - d.offsetTop + window.innerHeight;
      s.aliveProgress = s.aliveScroll / d.maxAliveScroll;
      s.activeScroll = d.maxActiveScroll > 0 ? s.outerScroll - d.offsetTop : 0;
      s.activeProgress = d.maxActiveScroll > 0 ? (s.outerScroll - d.offsetTop) / d.maxActiveScroll : 0;

      var isAlive = s.aliveProgress > 0 && s.aliveProgress <= 1,
          isActive = s.activeProgress > 0 && s.activeProgress <= 1;

      if (!c.persist) {
        s.aliveScroll = Math.min(Math.max(s.aliveScroll, 0), d.maxAliveScroll);
        s.aliveProgress = Math.min(Math.max(s.aliveProgress, 0), 1);
        s.activeScroll = Math.min(Math.max(s.aliveScroll, 0), d.maxActiveScroll);
        s.activeProgress = Math.min(Math.max(s.activeProgress, 0), 1);
      }

      // on enter
      if ((force || !s.isAlive) && isAlive) {
        s.isAlive = true;
        if (typeof c.onEnter === 'function') {
          c.onEnter(s, d, this);
        }
      }

      // on active
      if ((force || !s.isActive) && isActive) {
        s.isActive = true;
        if (typeof c.onActive === 'function') {
          c.onActive(s, d, this);
        }
      }

      // on focus
      if (typeof c.onFocus === 'function' && (force || c.persist || s.isAlive)) {
        c.onFocus(s, d, this);
      }

      // on innactive
      if ((force || s.isActive) && !isActive) {
        s.isActive = false;
        if (typeof c.onInactive === 'function') {
          c.onInactive(s, d, this);
        }
      }

      // on leave
      if ((force || s.isAlive) && !isAlive) {
        s.isAlive = false;
        if (typeof c.onLeave === 'function') {
          c.onLeave(s, d, this);
        }
      }
    }
  }]);

  return Scrollo;
}();

exports.default = Scrollo;
module.exports = exports['default'];

},{}]},{},[1])(1)
});