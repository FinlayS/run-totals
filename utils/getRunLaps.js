import allRuns from "../data/runs"

export function getRunLaps(id) {
  let l = [];
  allRuns.runs.forEach((run) => {
    if (id === run.id) {
      l = run.laps
    }
  })
  return l
}