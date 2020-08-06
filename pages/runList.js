import React from 'react';
import {getRunList} from "../utils/getRuns";
import RunListItem from "./runListItem";

const RunList = () => {
  const allRuns = getRunList()

  return (
    <div>
      {allRuns.map(({id, description, date}) => (
        RunListItem(id, description, date)
      ))}
    </div>
  )
}
export default RunList;
