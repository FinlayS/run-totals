import React from 'react';
import Checkbox from '../checkbox';
import {getPace} from "../../utils/getPace";

const LapDetails = (lapActive, lapNo, lapTime, lapDistance) => {

  const lapPace = getPace(lapTime, lapDistance)

  return (
    <div>
      <style jsx>{`
      td {
          width: 150px;
          max-width: 150px;
          text-align: center;
        }
      `}</style>
      <table id="lapDetails">
        <tbody>
        <tr>
          <td>{lapNo}</td>
          <td><Checkbox checked={lapActive}></Checkbox></td>
          <td>{lapTime}</td>
          <td>{lapDistance}</td>
          <td>{lapPace}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default LapDetails;
