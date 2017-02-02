import extend from './extend';
import getOffset from './get-offset';

class Scrollo {
  constructor(elm, config) {
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

  update(force) {
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

  start() {
    if (!this.elm) return;

    this.update(true);

    window.addEventListener('resize',this.update, false);
    window.addEventListener('scroll',this._trigger, false);
  }

  stop() {
    window.removeEventListener('resize',this.update, false);
    window.removeEventListener('scroll',this._trigger, false);
  }

  _trigger(force) {
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
    if (typeof c.onFocus === 'function' && ((force || c.persist) || s.isAlive)) {
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
}

export default Scrollo;
