import {addTimes} from "./add-times";
import allLaps from "../data/laps"

let totalTime;
let totalDistance = 0;

export function getTotals() {
  allLaps.laps.forEach((lap) => {
    totalTime = addTimes(totalTime, lap.lapTime);
    totalDistance = totalDistance + lap.lapDistance
  });
  return { totalTime, totalDistance }
}
