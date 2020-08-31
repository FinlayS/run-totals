import React, {useEffect, useReducer} from "react";
import Container from 'react-bootstrap/Container';
import runReducer from "../reducers/runReducers";
import RunContext from "../context/runContext";
import { getRuns } from "../routers/api/runs";
import RunDetails from "../components/runs/runDetails";
import Header from "../components/header";

const RunTotalsForm =  () => {
  const [runs, dispatch] = useReducer(runReducer, [])

  useEffect(() => {
    async function fetchData() {
      const runs =  await getRuns()

      if (runs) {
        dispatch({type: 'POPULATE_RUNS', runs})
      }
    }
    fetchData().then(() => {console.log("got the runs")});
    return () => {
      console.log('RunTotalsForm unmounts')
    }
  }, [])

  return (
    <RunContext.Provider value={{runs, dispatch}}>
      <Header/>
      <h3>Runs</h3>
      <div>
      <Container>
        {runs.map(({_id, description, date}) => (
          RunDetails(_id, description, date)
        ))}
      </Container>
      </div>
    </RunContext.Provider>
  )

}

export default RunTotalsForm
