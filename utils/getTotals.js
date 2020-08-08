import {addTimes} from "./addTimes";

Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}

export function getLapTotals(laps) {
  let activeTime = "";
  let totalTime = "";
  let activeDistance = 0;
  let totalDistance = 0;
  laps.forEach((lap) => {
    if (lap.lapActive === true) {
      activeTime = addTimes(activeTime, lap.lapTime);
      activeDistance = activeDistance + lap.lapDistance;
    }
    totalTime = addTimes(totalTime, lap.lapTime);
    totalDistance = totalDistance + lap.lapDistance;
  });
  activeDistance = activeDistance.round(2);
  totalDistance = totalDistance.round(2)
  return { totalDistance, totalTime, activeTime, activeDistance }
}

export function toSeconds(h, m, s) {
  h = parseInt(h) || 0;
  m = parseInt(m) || 0;
  s = parseInt(s) || 0;
  return h * 3600 + m * 60 + s;
}