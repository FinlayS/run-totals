import React from 'react';
import {getRunList} from "../../utils/getRuns";
import RunDetails from "./runDetails";

const Runs = () => {
  const allRuns = getRunList()

  return (
    <div>
      {allRuns.map(({id, description, date}) => (
        RunDetails(id, description, date)
      ))}
    </div>
  )
}
export default Runs;
