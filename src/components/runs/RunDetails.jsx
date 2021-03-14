import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import Laps from '../laps/Laps';
import EditRun from './EditRun';
import moment from "moment";

const RunDetails = ({run}) => {
  return (
    <Container className="run-container">
      <Row className='flex-table run-row-header' key={run._id}>
        <Col>
            {run.description}
        </Col>
        <Col
          xs={4}> {moment(run.runDate).format('DD/MM/YYYY')}
        </Col>
        <Col className="col-2-run-header"
          xs={2}>
          <EditRun key={run._id} run={run}/>
        </Col>
      </Row>
      <Laps >{run._id}</Laps>
    </Container>
  )
}

export default RunDetails;
