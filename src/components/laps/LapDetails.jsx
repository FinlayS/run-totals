import React from 'react';

import { patchLap, getLaps } from "../../api/laps";
import { getPace } from '../../utils/getPace';
import EditLap from "../laps/EditLap";

const LapDetails = (runId, _id, lapActive, lapNo, lapTime, lapDistance, dispatchLaps) => {
  const lapPace = getPace(lapTime, lapDistance)
  const testID = `lap-no-${lapNo}`

  const condColour = () => {
    return lapActive ? 'child yg' : 'child co'
  }

  let changedLapActiveStatus = lapActive
  const updateActiveStatus = async () => {

    let response
    try {
      response = await patchLap(_id,{
        lapActive: !changedLapActiveStatus,
      })
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
        <div className={ condColour() } id='lap-time'>{lapTime}</div>
        <div className={ condColour() } id='lap-distance'>{lapDistance}</div>
        <div className={ condColour() } id='lap-pace'>{lapPace}</div>
        <EditLap lap={{runId, _id, lapActive, lapNo, lapTime, lapDistance}}/>
      </div>
    </div>
  )
}

export default LapDetails;
