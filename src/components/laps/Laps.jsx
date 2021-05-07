import React, { useEffect, useReducer, useState } from "react";
import { ContextDevTool } from "react-context-devtool";
import { Accordion, Button } from "react-bootstrap";

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
  const [showLaps, setShowLaps] = useState(false);
  const runId = id.children
  let defaultToggleState

  allTotals = getLapTotals(laps)

  !!allTotals.totalPace ? defaultToggleState = "1" : defaultToggleState = "0"

  const toggleShowLaps = () => {
    setShowLaps(!showLaps)
  };

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
      <Accordion defaultActiveKey={ defaultToggleState }>
        <Accordion.Toggle
          className="toggle-btn btn-bold btn-sm"
          data-placement="right"
          as={ Button }
          variant="link"
          data-testid="expand-collapse-toggle"
          eventKey={ defaultToggleState }
          onClick={ toggleShowLaps }
        >
          { showLaps ? <CollapseIcon/> : <ExpandIcon/> }
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={ defaultToggleState }>
          <div>
            <div className="flex-table">
              <div className="child">Lap</div>
              <div className="child">Act?</div>
              <div className="child">Time</div>
              <div className="child">Dist</div>
              <div className="child">Pace</div>
              <div className="child-wide"/>
            </div>
            { laps && (
              laps.map(({ runId, _id, lapActive, lapNo, lapTime, lapDistance }) => (
                LapDetails(runId, _id, lapActive, lapNo, lapTime, lapDistance, dispatchLaps)
              ))
            ) }
            <AddLap> { runId } </AddLap>
          </div>
        </Accordion.Collapse>
      </Accordion>
      { allTotals.totalPace && (
        <div>
          <table id="lapTotals">
            <tbody>
            <tr className="background-lemon">
              <th/>
              <th>Total</th>
              <th>Active</th>
            </tr>
            <tr>
              <td className="text-lemon">Time:</td>
              <td className="text-coral" data-testid="total-time">{ allTotals.totalTime }</td>
              <td className="text-green" data-testid="active-time">{ allTotals.activeTime }</td>
            </tr>
            <tr>
              <td className="text-lemon">Dist:</td>
              <td className="text-coral" data-testid="total-distance">{ allTotals.totalDistance } Miles</td>
              <td className="text-green" data-testid="active-distance">{ allTotals.activeDistance } Miles</td>
            </tr>
            <tr>
              <td className="text-lemon">Pace:</td>
              <td className="text-coral" data-testid="total-pace">{ allTotals.totalPace }</td>
              <td className="text-green" data-testid="active-pace">{ allTotals.activePace }</td>
            </tr>
            </tbody>
          </table>
        </div>)
      }
    </LapContext.Provider>
  )
}

export default Laps;
