import React, {useContext, useState} from 'react';

import { getPace } from '../../../utils/getPace';
import { editLap } from "../../routers/api/laps";
import RunContext from "../../context/runContext";

const LapDetails = (_id, lapActive, lapNo, lapTime, lapDistance) => {

  const {laps, dispatch} = useContext(RunContext)
  const lapPace = getPace(lapTime, lapDistance)

  const testID = `lap-no-${lapNo}`

  const updateActiveStatus = async () => {
    let response

    try {
      response = await editLap(_id,{
        lapActive: !lapActive,
      })
    } catch (e) {
      console.log(e.data)
    }
    if (response) {
      // dispatch({
      //   type: 'EDIT_LAP_STATUS',
      //    _id,
      //   lapActive: !lapActive
      // })
    }
  }

  return (
    <div key={lapNo}>
      <div className='flex-container' testid={testID}>
        <div className='child' id='lap-no'>{lapNo} </div>
        <div className='child' id='is-active'>
          <input
            name="is-active"
            type="checkbox"
            defaultChecked={lapActive}
            onClick={updateActiveStatus} />
        </div>
        <div className='child' id='lap-time'>{lapTime}</div>
        <div className='child' id='lap-distance'>{lapDistance}</div>
        <div className='child' id='lap-pace'>{lapPace}</div>
      </div>
    </div>
  )
}

export default LapDetails;
