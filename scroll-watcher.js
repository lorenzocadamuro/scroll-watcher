"use strict";

(function(root, factory) {
  // AMD && CommonJS support
  if (typeof define === 'function' && define['amd']) {
    define(function() { return factory; });
  } else if (typeof module !== 'undefined' && module['exports']) {
    module['exports'] = factory;
  } else if (typeof root !== 'undefined') {
    root['scrollWatcher'] = factory;
  }
})(this, function(elm, config) {
  var module = {};

  config = (function(config) {
    config = typeof config === 'object' ? config : {};

    var base = {
      persist: false,
      reInitOnResize: true,
      initialize: null,
      onEnter: null,
      onActive: null,
      onFocus: null,
      onInactive: null,
      onLeave: null
    };

    for (var key in base) {
      if (key in config) {
        base[key] = config[key];
      }
    }

    return base;
  })(config);

  var onResize = function(cb) {
    if (typeof cb === 'function') {
      var running = false,
          isRunning = false;

      cb = (function(cb) {
        return function() {
          cb();
          running = false;
        };
      })(cb);

      var fn = function(e) {
        if (!running) {
          running = true;

          if (window.requestAnimationFrame) {
            requestAnimationFrame(cb);
          } else {
            setTimeout(cb, 66);
          }
        }
      };

      var module = {
        start: function() {
          if (!isRunning) {
            isRunning = true;
            window.addEventListener('resize', fn, false);
          }
        },
        stop: function() {
          if (isRunning) {
            isRunning = false;
            window.removeEventListener('resize', fn);
          }
        }
      };

      module.start();

      return module;
    }
  };

  var onScroll = function(cb) {
    if (typeof cb === 'function') {
      var running = false,
          isRunning = false;

      cb = (function(cb) {
        return function() {
          cb();
          running = false;
        };
      })(cb);

      var fn = function(e) {
        if (!running) {
          running = true;

          if (window.requestAnimationFrame) {
            requestAnimationFrame(cb);
          } else {
            setTimeout(cb, 66);
          }
        }
      };

      var module = {
        start: function() {
          if (!isRunning) {
            isRunning = true;
            window.addEventListener('scroll', fn, false);
          }
        },
        stop: function() {
          if (isRunning) {
            isRunning = false;
            window.removeEventListener('scroll', fn);
          }
        }
      };

      module.start();

      return module;
    }
  };

  var getOffset = function(elm) {
    var offset = {
      x: null,
      y: null
    };

    if (elm && typeof elm === 'object' && elm.nodeType === 1) {
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

  if (elm && typeof elm === 'object' && elm.nodeType === 1) {
    module.elm = elm;
    module.isAlive = false;
    module.isActive = false;
    module.aliveProgress = 0;
    module.activeProgress = 0;

    module.data = {};
    module.data.height = 0;
    module.data.maxScroll = 0;
    module.data.offsetTop = 0;

    // set element height
    var initialize = function(force) {
      if (typeof config.initialize === 'function') {
        config.initialize(module);
      }

      module.data.height = elm.offsetHeight;
      module.data.offsetTop = getOffset(module.elm).y;
      module.data.maxScroll = module.data.height - window.innerHeight;

      trigger(force);
    };

    // active/disactive module according to the scroll position
    var trigger = function(force) {
      var aliveProgress = module.aliveProgress = (window.pageYOffset - module.data.offsetTop + window.innerHeight) / (module.data.height + window.innerHeight);
      var activeProgress = module.activeProgress = module.data.maxScroll > 0 ? (window.pageYOffset - module.data.offsetTop) / module.data.maxScroll : 0;

      if (!config.persist) {
        module.aliveProgress = Math.max(Math.min(module.aliveProgress, 1), 0);
        module.activeProgress = Math.max(Math.min(module.activeProgress, 1), 0);
      }

      // on enter
      if ((force || !module.isAlive) && aliveProgress >= 0 && aliveProgress <= 1) {
        module.isAlive = true;
        if (typeof config.onEnter === 'function') {
          config.onEnter(module);
        }
      }

      // on active
      if ((force || !module.isActive) && activeProgress >= 0 && activeProgress <= 1) {
        module.isActive = true;
        if (typeof config.onActive === 'function') {
          config.onActive(module);
        }
      }

      // on focus
      if (typeof config.onFocus === 'function' && (force || config.persist) || module.isAlive) {
        config.onFocus(module);
      }

      // on innactive
      if ((force || module.isActive) && (activeProgress < 0 || activeProgress > 1)) {
        module.isActive = false;
        if (typeof config.onInactive === 'function') {
          config.onInactive(module);
        }
      }

      // on leave
      if ((force || module.isAlive) && (aliveProgress < 0 || aliveProgress > 1)) {
        module.isAlive = false;
        if (typeof config.onLeave === 'function') {
          config.onLeave(module);
        }
      }
    };
  }

  var myResizeCtrl = null,
      myScrollCtrl = null;

  module.start = function() {
    if (module.elm) {
      if (myResizeCtrl && myScrollCtrl) {
        myResizeCtrl.start();
        myScrollCtrl.start();
      } else {
        if (config.reInitOnResize) {
          myResizeCtrl = onResize(initialize);
        } else {
          myResizeCtrl = onResize(trigger);
        }
        myScrollCtrl = onScroll(trigger);
      }

      initialize(true);
    }
  };

  module.stop = function() {
    if (module.elm) {
      if (myResizeCtrl && myScrollCtrl) {
        myResizeCtrl.stop();
        myScrollCtrl.stop();
      }
    }
  };

  module.start();

  return module;
});
