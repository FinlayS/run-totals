import React, { useEffect, useReducer } from 'react';
import { ContextDevTool } from 'react-context-devtool';

import { getLaps } from "../../routers/api/laps";
import runReducer from "../../reducers/runReducers";
import RunContext from "../../context/runContext";

import LapDetails from "./lapDetails";
import AddLap from "./AddLap";

const Laps = (id) => {
  const [laps, dispatch] = useReducer(runReducer, [])
  const runId = id.children

  useEffect(() => {
    async function fetchData() {
      const laps = await getLaps(runId)

      if (laps) {
        dispatch(
          {
            type: 'POPULATE_LAPS',
            laps
          })
      }
    }

    fetchData().then(() => {
      console.log("got the laps", laps)
    });
    return () => {
      console.log('laps unmounts')
    }
  }, [])


  return (
    <RunContext.Provider value={{laps, dispatch}}>
      <ContextDevTool context={RunContext} id="laps" displayName="Lap Context"/>
      <div>
        <div className="flex-table">
          <div className="child">Lap</div>
          <div className="child">Act?</div>
          <div className="child">Time</div>
          <div className="child">Dist</div>
          <div className="child">Pace</div>
        </div>
        {laps.map(({lapActive, lapNo, lapTime, lapDistance}) => (
          LapDetails(lapActive, lapNo, lapTime, lapDistance)
        ))}
        <AddLap> {runId} </AddLap>
      </div>
    </RunContext.Provider>
  )
}

export default Laps;
