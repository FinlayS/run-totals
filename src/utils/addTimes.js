export function addTimes (startTime, endTime) {
  let times = [0, 0, 0];
  let max = times.length;

  let a = (startTime || '').split(':');
  let b = (endTime || '').split(':');

  // normalize time values
  for (let i = 0; i < max; i++) {
    a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
    b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
  }

  // store time values
  for (let i = 0; i < max; i++) {
    times[i] = a[i] + b[i]
  }

  let hours = times[0];
  let minutes = times[1];
  let seconds = times[2];

  if (seconds >= 60) {
    const m = (seconds / 60) << 0;
    minutes += m;
    seconds -= 60 * m
  }

  if (minutes >= 60) {
    const h = (minutes / 60) << 0;
    hours += h;
    minutes -= 60 * h
  }

  return  ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
}
