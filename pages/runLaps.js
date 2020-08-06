import React from 'react';
import {getRunLaps} from "../utils/getRunLaps";
import RunLapList from "./runLapList";
const RunLaps = (id) => {

  const runLaps = getRunLaps(id.id)

  return (
    <div>
      {runLaps.map(({lapActive, lapNo, lapTime, lapDistance}) => (
      RunLapList(lapActive, lapNo, lapTime, lapDistance)
      ))}
    </div>
  )
}

export default RunLaps;
