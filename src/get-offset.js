export default function(elm) {
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
