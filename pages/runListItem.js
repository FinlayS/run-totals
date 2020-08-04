import React from 'react';
import RunLapTotals from "./runLapItems";

const RunListItem = ( id, description, date ) => (
  <div>
      <h2>Run {id }, Date {date}, Description {description}</h2>
    <RunLapTotals id={id}></RunLapTotals>
  </div>
);

export default RunListItem;