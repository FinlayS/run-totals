import React, { useEffect, useReducer, useState } from "react";
import { ContextDevTool } from "react-context-devtool";

import { getLaps } from "../../api/laps";
import { getLapTotals } from "../../utils/getTotals";

import LapDetails from "./LapDetails";
import AddLap from "./AddLap";
import lapReducer from "../../reducers/lapReducer";
import LapContext from "../../context/lapContext";
import { CollapseIcon, ExpandIcon } from "../../../public/icons/icons";

let allTotals;

const Laps = (id) => {
  const [laps, dispatchLaps] = useReducer(lapReducer, [])
  const [showLaps, setShowLaps] = useState( false);
  const runId = id.children

  allTotals = getLapTotals(laps)

  const toggleShowLaps = () => setShowLaps(!showLaps);

  useEffect(() => {
    async function fetchData() {
      const allLaps = await getLaps(runId)
      if (allLaps) {
        dispatchLaps(
          {
            type: "POPULATE_LAPS",
            laps: allLaps
          })
      } else {
        setShowLaps(true)
      }
    }

    fetchData().then()
  }, [])

  return (
    <LapContext.Provider value={ { laps, dispatchLaps } }>
      <ContextDevTool context={ LapContext } id="laps" displayName="Lap Context"/>
      { showLaps && (
      <div>
        <div className="flex-table">
          <div className="child">Lap</div>
          <div className="child">Act?</div>
          <div className="child">Time</div>
          <div className="child">Dist</div>
          <div className="child">Pace</div>
          <div className="child-wide"/>
        </div>
        { laps &&  (
          laps.map(({ runId, _id, lapActive, lapNo, lapTime, lapDistance }) => (
            LapDetails(runId, _id, lapActive, lapNo, lapTime, lapDistance, dispatchLaps)
          ))
        ) }
        <AddLap> { runId } </AddLap>
      </div>
      )}
      { allTotals.totalPace && (
        <div>
          <table id="lapTotals">
            <tbody>
            <tr className="background-lemon">
              <th/>
              <th>Total</th>
              <th>Active</th>
              <th>
                <button
                  className="btn btn-bold"
                  data-toggle="tooltip"
                  data-placement="right"
                  onClick={ toggleShowLaps }
                  type="submit"
                >
                  Laps &nbsp;
                  { showLaps ? <CollapseIcon/> : <ExpandIcon/>}
                </button>
              </th>
            </tr>
            <tr>
              <td className="text-lemon">Time:</td>
              <td className="text-coral">{allTotals.totalTime}</td>
              <td className="text-green">{allTotals.activeTime}</td>
            </tr>
            <tr>
              <td className="text-lemon">Dist:</td>
              <td className="text-coral">{allTotals.totalDistance} Miles</td>
              <td className="text-green">{allTotals.activeDistance} Miles</td>
            </tr>
            <tr>
              <td className="text-lemon">Pace:</td>
              <td className="text-coral">{allTotals.totalPace}</td>
              <td className="text-green">{allTotals.activePace}</td>
            </tr>
            </tbody>
          </table>
        </div>)
      }
    </LapContext.Provider>
  )
}

export default Laps;
