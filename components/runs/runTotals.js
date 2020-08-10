import React from 'react';
import {getRunLaps} from "../../utils/getRunLaps";
import {getLapTotals} from "../../utils/getTotals";
import {getPace} from "../../utils/getPace";

const RunTotals = (id) => {

  const runLaps = getRunLaps(id.id)
  const lapTimesAndDistances = getLapTotals(runLaps)
  const totalPace = getPace(
    lapTimesAndDistances.totalTime,
    lapTimesAndDistances.totalDistance
  )

  const activePace = getPace(
    lapTimesAndDistances.activeTime,
    lapTimesAndDistances.activeDistance
  )

  return (
    <div>
      <style jsx>{`
      table {
        padding-top: 30px;
        }
        th {
          background: LightPink;
          width: 150px;
          max-width: 150px;
          text-align: center;
        }
          td {
          width: 150px;
          max-width: 150px;
          text-align: center;
        }
      `}</style>

        <table id="lapTotals">
          <tbody>
          <tr>
            <th></th>
            <th>Total</th>
            <th>Active</th>
          </tr>
          <tr>
            <td>Time</td>
            <td>{lapTimesAndDistances.totalTime}</td>
            <td>{lapTimesAndDistances.activeTime}</td>
          </tr>
          <tr>
            <td>Dist</td>
            <td>{lapTimesAndDistances.totalDistance} Miles</td>
            <td>{lapTimesAndDistances.activeDistance} Miles</td>
          </tr>
          <tr>
            <td>Pace</td>
            <td>{totalPace}</td>
            <td>{activePace}</td>
          </tr>
          </tbody>
        </table>
    </div>
  )
}

export default RunTotals;
