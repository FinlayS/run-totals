import React from 'react';
import {getRunLaps} from "../../utils/getRunLaps";
import LapDetails from "./lapDetails";

const Laps = (id) => {

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
      <div className="d-flex flex-row bd-highlight mb-3">
        <div className="p-ddd bd-highlight">Lap No</div>
        <div className="p-2 bd-highlight">Active?</div>
        <div className="p-2 bd-highlight">Time</div>
        <div className="p-2 bd-highlight">Distance</div>
        <div className="p-2 bd-highlight">Pace</div>
      </div>
      {runLaps.map(({lapActive, lapNo, lapTime, lapDistance}) => (
      LapDetails(lapActive, lapNo, lapTime, lapDistance)
      ))}
    </div>
  )
}

export default Laps;
