import React, { useEffect, useReducer, useState } from 'react';
import { ContextDevTool } from 'react-context-devtool';

import { getLaps } from '../../routers/api/laps';
import { getLapTotals } from '../../../utils/getTotals';
import runReducer from '../../reducers/runReducers';
import RunContext from '../../context/runContext';

import LapDetails from './LapDetails';
import AddLap from './AddLap';
let allTotals, allLaps

const Laps = (id) => {
  const [laps, dispatch] = useReducer(runReducer, [])
  const [, setTotals] =useState({})
  const runId = id.children

  const refreshRunTotalsOnChange  = async () => {
    if (laps && laps!==allLaps) {
      allTotals = await getLapTotals(laps)
      return allTotals
    }
  }

  useEffect(() => {
    async function fetchData() {
      const allLaps = await getLaps(runId)
      if (allLaps) {
         allTotals = await getLapTotals(allLaps)
        dispatch(
          {
            type: 'POPULATE_LAPS',
            laps: allLaps
          })
        setTotals(allTotals)
      }
    }

    fetchData().then()
  }, [])

  refreshRunTotalsOnChange().then()

  return (
    <RunContext.Provider value={{laps, dispatch}}>
      <ContextDevTool context={RunContext} id='laps' displayName='Lap Context'/>
      <div>
        <div className='flex-table'>
          <div className='child'>Lap</div>
          <div className='child'>Act?</div>
          <div className='child'>Time</div>
          <div className='child'>Dist</div>
          <div className='child'>Pace</div>
        </div>
        {laps.map(({runId, _id, lapActive, lapNo, lapTime, lapDistance}) => (
          LapDetails(runId, _id, lapActive, lapNo, lapTime, lapDistance)
        ))}
        <AddLap> {runId} </AddLap>
      </div>
      {allTotals && (
        <div>
          <style jsx>{`
      table {
        padding-top: 30px;
        }
        th {
          background: LightPink;
          width: 150px;
          max-width: 150px;
          text-align: left;
          font-weight: bold;
        }
          td {
          width: 150px;
          max-width: 150px;
          text-align: left;
          font-weight: bold;
          color: grey;
        }
      `}</style>
          <table id='lapTotals'>
            <tbody>
            <tr>
              <th></th>
              <th>Total</th>
              <th>Active</th>
            </tr>
            <tr>
              <td>Time:</td>
              <td>{allTotals.totalTime}</td>
              <td>{allTotals.activeTime}</td>
            </tr>
            <tr>
              <td>Dist:</td>
              <td>{allTotals.totalDistance} Miles</td>
              <td>{allTotals.activeDistance} Miles</td>
            </tr>
            <tr>
              <td>Pace:</td>
              <td>{allTotals.totalPace}</td>
              <td>{allTotals.activePace}</td>
            </tr>
            </tbody>
          </table>
        </div>)
      }
    </RunContext.Provider>
  )
}

export default Laps;
