import allRuns from '../data/runs'

export function getRunList() {
  let data = [];
  allRuns.runs.forEach((run) => {
    data.push({
      id:run.id,
      description:run.description,
      date:run.date
    })
  })
  return data
}