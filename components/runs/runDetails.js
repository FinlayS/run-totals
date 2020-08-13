import React from 'react';
import RunTotals from "./runTotals";
import Laps from "../laps/laps";
import Container from "react-bootstrap/Container";

const RunDetails = (id, description, date) => {
  return (
    <div>
      <style jsx>{`
        .flex-container {
        display: flex;
        justify-content: space-between;
        background-color: DodgerBlue;
      }s
      `}
      </style>
      <div className="flex-container">
        <div class="child">{description}</div>
        <div class="child">{date}</div>
      </div>
      <Container className="container">
        <Laps id={id}></Laps>
        <RunTotals id={id}></RunTotals>
      </Container>


    </div>
  )
}

export default RunDetails;
