import React, {useEffect, useReducer} from "react";
import Container from 'react-bootstrap/Container';
import runReducer from "../reducers/runReducers";
import { ContextDevTool } from 'react-context-devtool';
import RunContext from "../context/runContext";
import { getRuns } from "../routers/api/runs";
import RunList from "../components/runs/RunList";
import Header from "../components/header";
import AddRun from "../components/runs/AddRun";

const RunTotalsForm =  () => {
  const [runs, dispatch] = useReducer(runReducer, [])

  useEffect(() => {
    async function fetchData() {
      const runs =  await getRuns()

      if (runs) {
        dispatch({type: 'POPULATE_RUNS', runs})
      }
    }
    fetchData().then(() => {console.log("got the runs", runs)});
    return () => {
      console.log('RunTotalsForm unmounts')
    }
  }, [])

  return (
    <RunContext.Provider value={{runs, dispatch}}>
      <ContextDevTool context={RunContext} id="runs" displayName="Run Context" />
      <Header/>
      <h3>Runs</h3>
      <div>
      <Container>
      <RunList/>
      </Container>
        <AddRun/>
      </div>
    </RunContext.Provider>
  )
}

export default RunTotalsForm
