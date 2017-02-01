# Scrollo
Detect the position of a DOM element compared to the viewport during page scrolling.

## Install

```sh
npm install scrollo
```

## Usage

Element is **alive** when a single part of it is visible on the viewport.<br />
Element is **active** when it is completely in the viewport.

```onFocus``` is called during page scrolling. By default it is called only when element is **alive** – set ```persist``` to ```true``` in order to call it even when the element is out from the viewport.

##### Status
- ```status.isAlive``` - true if is alive
- ```status.aliveScroll``` - alive scroll value
- ```status.aliveProgress``` - alive scroll value in percentage
- ```status.isActive``` - true if is active
- ```status.activeScroll``` - active scroll value
- ```status.activeProgress``` - active scroll value in percentage
- ```status.outerScroll``` - window scroll value

##### Data
- ```data.height``` - element height
- ```data.offsetTop``` - element top position relative to the document
- ```data.maxAliveScroll``` - max alive scroll value
- ```data.maxActiveScroll``` - max active scroll value

```javascript
var myScrollo = new Scrollo(elm, {
    persist: false,
    autoStart: true,
    onInitialize: (status, data, self) => {},
    onBeforeUpdate: (status, data, self) => {},
    onUpdate: (status, data, self) => {},
    onEnter: (status, data, self) => {},
    onActive: (status, data, self) => {},
    onFocus: (status, data, self) => {},
    onInactive: (status, data, self) => {},
    onLeave: (status, data, self) => {}
});
```

## Methods

```javascript
// start watching - auto-called when it's created
myScrollo.start();

// stop watching
myScrollo.stop();

// update data
myScrollo.update();
```
