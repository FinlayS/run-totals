import React, {useEffect, useReducer} from 'react';
import { getLaps } from '../../routers/api/laps';
import { getLapTotals } from '../../../utils/getTotals';
import runReducer from '../../reducers/runReducers';
import RunContext from '../../context/runContext';
import { ContextDevTool } from 'react-context-devtool';

const RunSummary = (id) => {
  const [totals, dispatch] = useReducer(runReducer, [])
  let lapTimesAndDistances

  useEffect(() => {
    async function fetchData() {
      const runLaps = await getLaps(id.id)
      lapTimesAndDistances = await getLapTotals(runLaps)
    }

    fetchData().then(() => {
      if (lapTimesAndDistances) {
        dispatch(
          {
            type: 'POPULATE_TOTALS',
            totals: lapTimesAndDistances
          })
      }
    });
    return () => {
      console.log('RunTotalsForm unmounts')
    }
  }, [])

  return (
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

      <RunContext.Provider value={{totals, dispatch}}>
        <ContextDevTool context={RunContext} id='totals' displayName='Totals Context'/>
        <table id='lapTotals'>
          <tbody>
          <tr>
            <th></th>
            <th>Total</th>
            <th>Active</th>
          </tr>
          <tr>
            <td>Time:</td>
            <td>{totals.totalTime}</td>
            <td>{totals.activeTime}</td>
          </tr>
          <tr>
            <td>Dist:</td>
            <td>{totals.totalDistance} Miles</td>
            <td>{totals.activeDistance} Miles</td>
          </tr>
          <tr>
            <td>Pace:</td>
            <td>{totals.totalPace}</td>
            <td>{totals.activePace}</td>
          </tr>
          </tbody>
        </table>
      </RunContext.Provider>
    </div>

  )
}

export default RunSummary
