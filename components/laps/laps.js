import React from 'react';
import {getRunLaps} from "../../utils/getRunLaps";
import LapDetails from "./lapDetails";

const Laps = (id) => {

  const runLaps = getRunLaps(id.id)

  return (
    <div>
      <div className="flex-table">
        <th className="child">Lap</th>
        <th className="child">Act?</th>
        <th className="child">Time</th>
        <th className="child">Dist</th>
        <th className="child">Pace</th>
      </div>
      {runLaps.map(({lapActive, lapNo, lapTime, lapDistance}) => (
      LapDetails(lapActive, lapNo, lapTime, lapDistance)
      ))}
    </div>
  )
}

export default Laps;
