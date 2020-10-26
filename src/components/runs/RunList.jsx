import React, { useContext } from 'react';

import RunContext from '../../context/runContext';

import RunDetails from './RunDetails';

const RunList = () => {

  const { runs } = useContext(RunContext)

  return (
    runs.map((run) => (
      <RunDetails key={run._id} run={run}/>
    ))
  )
}

export default RunList
