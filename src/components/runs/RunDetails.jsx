import React, { useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import { deleteRun } from '../../api/runs';
import RunContext from '../../context/runContext';

import Laps from '../laps/Laps';
import moment from "moment";

const RunDetails = ({run}) => {

  const { dispatchRuns } = useContext(RunContext)

  const removeRun = async () => {
    let r = confirm('Confirm you wish to delete this run');
    if (r === true) {
      let response
      try {
        response = await deleteRun(run._id)
      } catch (e) {
        console.log(e.data)
      }
      if (response) {
        dispatchRuns({type: 'REMOVE_RUN', _id: run._id})
      }
    }
  }

  return (
    <Container>
      <Row className='run-row' key={run._id}>
        <Col> {run.description}</Col>
        <Col xs={4}> {moment(run.runDate).format('DD/MM/YYYY')}</Col>
        <Col xs={2}>
          <button
            className='btn btn-link'
            data-toggle='tooltip'
            data-placement='right'
            title='Delete Run'
            onClick={removeRun}
          >x
          </button>
        </Col>
      </Row>
      <Laps >{run._id}</Laps>
    </Container>
  )
}

export default RunDetails;
