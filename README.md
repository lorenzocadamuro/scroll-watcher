# Scroll-watcher
Detect the position of a DOM element compared to the viewport during page scrolling.

## Install

```sh
bower install scroll-watcher
```

## Use

By default **initialize** is called even on page-resize. To stop this behavior set **reInitOnResize** to **_false_**.

The callback **onFocus** is called during page scrolling. By default it is called only when element is visible on the viewport (_alive_) - set **persist** to **_true_** in order to call it even when the element is out from the viewport.

Element is _active_ when it is the only element present on the viewport.<br />
Element is _alive_ when a single part of it is visible on the viewport.

You can use **self._activeProgress_** and **self._aliveProgress_** to track the element position.

```javascript
var myScrollWatcher = scrollWatcher(elm, {
    persist: false,
    reInitOnResize: true,
    initialize: function(self) {},
    onEnter: function(self) {},
    onActive: function(self) {},
    onFocus: function(self) {},
    onInactive: function(self) {},
    onLeave: function(self) {}
});
```

## Methods

```javascript
// start watching - auto-called when it's created
myScrollWatcher.start();

// stop watching
myScrollWatcher.stop();
```

## Example

```javascript
var foo = document.getElementById('foo');

var myScrollWatcher = scrollWatcher(foo, {
    initialize: function(self) {
      foo.style.height = window.innerHeight * 3 + 'px';
    },
    onEnter: function(self) {
      foo.classList.add('alive');
    },
    onActive: function(self) {
      foo.classList.add('active');
    },
    onFocus: function(self) {
      foo.setAttribute('data-alive-progress', Math.floor(self.aliveProgress * 100));
      foo.setAttribute('data-active-progress', Math.floor(self.activeProgress * 100));
    },
    onInactive: function(self) {
      foo.classList.remove('active');
    },
    onLeave: function(self) {
      foo.classList.remove('alive');
    }
});
```
## Demo

[Try the example above](https://output.jsbin.com/lubizu)
