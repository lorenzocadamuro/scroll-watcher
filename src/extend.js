export default function(base, object) {
  base = typeof base === 'object' ? base : {};
  object = typeof object === 'object' ? object : {};

  for (var key in base) {
    if (key in object) {
      base[key] = object[key];
    }
  }

  return base;
};
