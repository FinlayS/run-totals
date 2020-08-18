import React from 'react';
import {getRunLaps} from "../../../utils/getRunLaps";
import LapDetails from "./lapDetails";

const Laps = (id) => {

  const runLaps = getRunLaps(id.id)

  return (
    <div>
      <div className="flex-table">
        <div className="child">Lap</div>
        <div className="child">Act?</div>
        <div className="child">Time</div>
        <div className="child">Dist</div>
        <div className="child">Pace</div>
      </div>
      {runLaps.map(({lapActive, lapNo, lapTime, lapDistance}) => (
      LapDetails(lapActive, lapNo, lapTime, lapDistance)
      ))}
    </div>
  )
}

export default Laps;
