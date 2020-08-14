import React from 'react';
import Checkbox from '../checkbox';
import {getPace} from "../../utils/getPace";

const LapDetails = (lapActive, lapNo, lapTime, lapDistance) => {

  const lapPace = getPace(lapTime, lapDistance)

  return (
    <div>
      <div className="flex-container">
        <div className="child">{lapNo}</div>
        <div className="child"><Checkbox checked={lapActive}></Checkbox></div>
        <div className="child">{lapTime}</div>
        <div className="child">{lapDistance}</div>
        <div className="child">{lapPace}</div>
      </div>
    </div>
  )
}

export default LapDetails;
