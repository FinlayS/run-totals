import allRuns from "../data/runs"

export function getRunList() {
  let data = [];
  let id, description, date
  allRuns.runs.forEach((run) => {
    id = run.id
    description = run.description
    date = run.date
    data.push({id, description, date})
    console.log(run.id, run.description, run.date)
    console.log('id',id, 'desctip', description, 'date', date)
    console.log("DATA", data)
  })
  return data
}