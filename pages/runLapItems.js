import React from 'react';
import {getRunLaps} from "../utils/getRunLaps";
import {getLapTotals} from "../utils/get-totals";
import {getPace} from "../utils/get-pace";

const RunLapTotals = (id) => {

  const runLaps = getRunLaps(id.id)
  const lapTimesAndDistances = getLapTotals(runLaps)
  const totalPace = getPace(
    lapTimesAndDistances.totalTimeSecs,
    lapTimesAndDistances.totalDistance
  )

  const activePace = getPace(
    lapTimesAndDistances.activeTimeSeconds,
    lapTimesAndDistances.activeDistance
  )

  return (
    <div>
      <h4>
        <div>
        Time - (total/active) ({lapTimesAndDistances.totalTime} / {lapTimesAndDistances.activeTime})
        </div>
        <div>
        Dist - (total/active) ({lapTimesAndDistances.totalDistance} / {lapTimesAndDistances.activeDistance})
        </div>
        <div>
        Pace - (total/active) ({totalPace} / {activePace})
        </div>
      </h4>
    </div>
  )
}

export default RunLapTotals;
