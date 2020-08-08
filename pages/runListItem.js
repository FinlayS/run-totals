import React from 'react';
import RunLapTotals from "./runLapTotals";
import RunLaps from "./runLaps";

const RunListItem = (id, description, date) => {
  return (
    <div>
      <h2>Run {id}, Date {date}, Description {description}</h2>
      <RunLaps id={id}></RunLaps>
      <RunLapTotals id={id}></RunLapTotals>
    </div>
  )
}

export default RunListItem;
