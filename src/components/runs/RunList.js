import React, {useContext} from "react";
import RunDetails from "../../components/runs/RunDetails";
import RunContext from "../../context/runContext";

const RunList = () => {

  const { runs } = useContext(RunContext)

  return (
    runs.map((run) => (
      <RunDetails key={run._id} run={run}/>
    ))
  )
}

export default RunList
