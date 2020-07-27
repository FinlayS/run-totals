import {addTimes} from "./add-times";
import allLaps from "../data/laps"




export function getTotals() {
  let td = 0;
  let totalTime = "";
  let totalDistance = 0;
  allLaps.laps.forEach((lap) => {
    totalTime = addTimes(totalTime, lap.lapTime);
    td = td + lap.lapDistance;
    totalDistance = td.toFixed(2);
  });
  console.log('tt', totalTime)
  return { totalTime, totalDistance }
}

export function getPace() {

}

export   function toSeconds(h, m, s) {
  h = parseInt(h) || 0;
  m = parseInt(m) || 0;
  s = parseInt(s) || 0;
  return h * 3600 + m * 60 + s;
}