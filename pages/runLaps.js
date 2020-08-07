import React from 'react';
import {getRunLaps} from "../utils/getRunLaps";
import RunLapList from "./runLapList";

const RunLaps = (id) => {

  const runLaps = getRunLaps(id.id)

  return (
    <div>
      <style jsx>{`
        th {
          background: LightPink;
          width: 150px;
          max-width: 150px;
          text-align: center;
        }
      `}</style>
      <table id="lapHeaders">
        <tbody>
        <tr>
          <th>Lap No</th>
          <th>Active?</th>
          <th>Time</th>
          <th>Distance</th>
          <th>Pace</th>
        </tr>
        </tbody>
        </table>
      {runLaps.map(({lapActive, lapNo, lapTime, lapDistance}) => (
      RunLapList(lapActive, lapNo, lapTime, lapDistance)
      ))}
    </div>
  )
}

export default RunLaps;
