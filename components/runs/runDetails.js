import React from 'react';
import RunTotals from "./runTotals";
import Laps from "../laps/laps";
import Container from "react-bootstrap/Container";

const RunDetails = (id, description, date) => {
  return (
    <div>
      <div className="text-title">
        <div >{description}</div>
        <div >{date}</div>
      </div>
      <Container className="container">
        <Laps id={id}></Laps>
        <RunTotals id={id}></RunTotals>
      </Container>
    </div>
  )
}

export default RunDetails;
