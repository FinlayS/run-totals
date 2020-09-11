import React, { useEffect, useReducer } from 'react';
import { ContextDevTool } from 'react-context-devtool';
import Container from 'react-bootstrap/Container';

import { getRuns } from '../routers/api/runs';
import runReducer from '../reducers/runReducers';
import RunContext from '../context/runContext';

import RunList from '../components/runs/RunList';
import Header from '../components/Header';
import AddRun from '../components/runs/AddRun';

const RunTotalsForm = () => {
  const [runs, dispatch] = useReducer(runReducer, [])

  useEffect(() => {
    async function fetchData() {
      const runs = await getRuns()

      if (runs) {
        dispatch(
          {
            type: 'POPULATE_RUNS',
            runs
          })
      }
    }

    fetchData().then(() => {
      console.log('got the runs')
    });
    return () => {
      console.log('RunTotalsForm unmounts')
    }
  }, [])

  return (
    <RunContext.Provider value={{runs, dispatch}}>
      <ContextDevTool context={RunContext} id='runs' displayName='Run Context'/>
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
