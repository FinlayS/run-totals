import React from 'react';
import Container from 'react-bootstrap/Container';
import Runs from "../components/runs/runs";
import Header from "../components/header";

const Index = () => {
  return (
    <div>
      <Header/>
      <h3>Runs</h3>
      <div>
        <Container className="container">
          <Runs/>
        </Container>
      </div>
    </div>
  )
}

export default Index
