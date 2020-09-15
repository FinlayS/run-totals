const limit = (val, max) => {
  if (val.length === 1 && val[0] > max[0]) {
    val = '0' + val;
  }

  if (val.length === 2) {
    if (val > max) {
      val = max;
    }
  }

  return val;
}

export const timeInputFormat = (val) => {
  let hh = limit(val.substring(0, 2), '59');
  let mm = limit(val.substring(2, 4), '59');
  let ss = limit(val.substring(4, 6), '59');

  return hh + (mm.length ? ':' + mm : '') + (ss.length ? ':' + ss : '')
}