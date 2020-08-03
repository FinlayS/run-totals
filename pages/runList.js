import React from 'react';
import {getRunList} from "../utils/getRuns";
import RunListItem from "./runListItem";

const RunList = () => {
    const allRuns = getRunList()

    return (
      <div>
        <div>
          <h2>I've rendered this much at least</h2>
        </div>
          {allRuns.map(({ id, description, date }) => (
            RunListItem(id, description, date)
            // <ul >
            //   <h3>Run date {date} Description {description}</h3>
            // </ul>
          ))}
      </div>
    )
}
export default RunList;
