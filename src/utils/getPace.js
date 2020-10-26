import { timeInSeconds } from './timeInSeconds'

export const getPace = (totalTime, totalDistance) => {
  if (totalTime && totalDistance) {
  let timeSeconds = timeInSeconds(totalTime)
  const pace = Math.round(timeSeconds / totalDistance)
  return (new Date(pace * 1000)
    .toISOString()
    .substr(11, 8))
  }
}