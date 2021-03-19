import React, {useEffect, useReducer} from "react";
import { ContextDevTool } from "react-context-devtool";
import Container from "react-bootstrap/Container";

import { getRuns } from "../api/runs";
import runReducer from "../reducers/runReducers";
import RunContext from "../context/runContext";

import RunList from "../components/runs/RunList";
import Header from "../components/Header";
import { useRouter } from "next/router"
import lapReducer from "../reducers/lapReducer";
import LapContext from "../context/lapContext";

const RunsMain = () => {
  const router = useRouter()

  const [runs, dispatchRuns] = useReducer(runReducer, [])
  const [laps, dispatchLaps] = useReducer(lapReducer, [])

  useEffect(() => {
    let runs
    async function fetchData() {

      try {
        runs = await getRuns()
        if(runs.status === 401) {
          localStorage.removeItem("token")
          await router.push("/login")
          return
        }
      } catch (e) {
        console.log(e)
      }

      if (runs) {
        dispatchRuns(
          {
            type: "POPULATE_RUNS",
            runs
          })
      }
    }
    fetchData().then()
  }, [])

  return (
    <RunContext.Provider value={{runs, dispatchRuns}}>
      <ContextDevTool context={RunContext} id="runs" displayName="Run Context"/>
      <LapContext.Provider value={{laps, dispatchLaps}}>
      <ContextDevTool context={LapContext} id="laps" displayName="Lap Context"/>
      <Header authed={true}/>
      <div className="background-grey">
        <Container >
          <RunList/>
        </Container>
      </div>
        </LapContext.Provider>
    </RunContext.Provider>
  )
}

export default RunsMain
