import React from 'react';
import RunTotals from "./runTotals";
import Laps from "../laps/laps";

const RunDetails = (id, description, date) => {
  return (
    <div>
      <h2>Run {id}, Date {date}, Description {description}</h2>
      <Laps id={id}></Laps>
      <RunTotals id={id}></RunTotals>
    </div>
  )
}

export default RunDetails;
