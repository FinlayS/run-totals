import {addTimes} from "./add-times";
import {timeInSeconds} from "./timeInSeconds";

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
  const totalTimeSecs = (timeInSeconds(totalTime))
  let activeTimeSeconds = (timeInSeconds(activeTime))
  activeDistance = activeDistance.round(2);
  totalDistance = totalDistance.round(2)
  return { totalTime, totalDistance, totalTimeSecs, activeTime, activeDistance, activeTimeSeconds }
}

export function toSeconds(h, m, s) {
  h = parseInt(h) || 0;
  m = parseInt(m) || 0;
  s = parseInt(s) || 0;
  return h * 3600 + m * 60 + s;
}