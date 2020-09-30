import React from 'react';

import { editLap, getLaps } from "../../routers/api/laps";
import { getPace } from '../../../utils/getPace';

const LapDetails = (runId, _id, lapActive, lapNo, lapTime, lapDistance, dispatchLaps) => {
  const lapPace = getPace(lapTime, lapDistance)

  const testID = `lap-no-${lapNo}`

  let changedLapActiveStatus = lapActive
  const updateActiveStatus = async () => {

    let response
    try {
      response = await editLap(_id,{
        lapActive: !changedLapActiveStatus,
      })
      await getLaps(runId)
    } catch (e) {
      console.log(e.data)
    }
    if (response) {
      changedLapActiveStatus = response.lapActive
      const laps = await getLaps(runId)
      dispatchLaps(
        {
          type: 'POPULATE_LAPS',
          laps
        })
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
            onClick={updateActiveStatus}
          />
        </div>
        <div className='child' id='lap-time'>{lapTime}</div>
        <div className='child' id='lap-distance'>{lapDistance}</div>
        <div className='child' id='lap-pace'>{lapPace}</div>
      </div>
    </div>
  )
}

export default LapDetails;
