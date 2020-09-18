export function timeInSeconds (time) {
  let times = [0, 0, 0];
  let max = times.length;

  let a = (time || '').split(':');

  for (let i = 0; i < max; i++) {
    a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
  }

  for (let i = 0; i < max; i++) {
    times[i] = a[i]
  }

 return  (times[0] * 3600 + times[1] * 60 + times[2]);
}
