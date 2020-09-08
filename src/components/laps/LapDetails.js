import React from 'react';

import Checkbox from '../Checkbox';
import { getPace } from '../../../utils/getPace';

const LapDetails = (lapActive, lapNo, lapTime, lapDistance) => {

  const lapPace = getPace(lapTime, lapDistance)

  const testID = `lap-no-${lapNo}`

  return (
    <div key={lapNo}>
      <div className='flex-container' testid={testID}>
        <div className='child' id='lap-no'>{lapNo} </div>
        <div className='child' id='is-active'><Checkbox checked={lapActive}></Checkbox></div>
        <div className='child' id='lap-time'>{lapTime}</div>
        <div className='child' id='lap-distance'>{lapDistance}</div>
        <div className='child' id='lap-pace'>{lapPace}</div>
      </div>
    </div>
  )
}

export default LapDetails;
