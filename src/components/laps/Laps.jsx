import React, { useEffect, useReducer } from 'react';

import { getLaps } from '../../api/laps';
import { getLapTotals } from '../../utils/getTotals';

import LapDetails from './LapDetails';
import AddLap from './AddLap';
import lapReducer from "../../reducers/lapReducer";
import LapContext from "../../context/lapContext";
import { ContextDevTool } from "react-context-devtool";

let allTotals;

const Laps = (id) => {
  const [laps, dispatchLaps] = useReducer(lapReducer, [])
  const runId = id.children

  allTotals = getLapTotals(laps)

  useEffect(() => {
    async function fetchData() {
      const allLaps = await getLaps(runId)
      if (allLaps) {
        dispatchLaps(
          {
            type: 'POPULATE_LAPS',
            laps: allLaps
          })
      }
    }

    fetchData().then()
  }, [])

  console.log(allTotals.totalPace)

  return (
    <LapContext.Provider value={{laps, dispatchLaps}}>
      <ContextDevTool context={LapContext} id='laps' displayName='Lap Context'/>
      <div>
        <div className='flex-table'>
          <div className='child'>Lap</div>
          <div className='child'>Act?</div>
          <div className='child'>Time</div>
          <div className='child'>Dist</div>
          <div className='child'>Pace</div>
          <div className='child-wide'/>
        </div>
        {laps.map(({runId, _id, lapActive, lapNo, lapTime, lapDistance}) => (
          LapDetails(runId, _id, lapActive, lapNo, lapTime, lapDistance, dispatchLaps)
        ))}
        <AddLap> {runId} </AddLap>
      </div>
      {allTotals.totalPace && (
        <div>
          <table id='lapTotals'>
            <tbody>
            <tr className="lbc">
              <th/>
              <th>Total</th>
              <th>Active</th>
            </tr>
            <tr>
              <td className="lct">Time:</td>
              <td className="co">{allTotals.totalTime}</td>
              <td className="yg">{allTotals.activeTime}</td>
            </tr>
            <tr>
              <td className="lct">Dist:</td>
              <td className="co">{allTotals.totalDistance} Miles</td>
              <td className="yg">{allTotals.activeDistance} Miles</td>
            </tr>
            <tr>
              <td className="lct">Pace:</td>
              <td className="co">{allTotals.totalPace}</td>
              <td className="yg">{allTotals.activePace}</td>
            </tr>
            </tbody>
          </table>
        </div>)
      }
    </LapContext.Provider>
  )
}

export default Laps;
