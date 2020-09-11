import React, { useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import { deleteRun } from '../../routers/api/runs';
import RunContext from '../../context/runContext';

import Laps from '../laps/Laps';
import RunSummary from './RunSummary';

const RunDetails = ({run}) => {

  const {dispatch} = useContext(RunContext)

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
        dispatch({type: 'REMOVE_RUN', _id: run._id})
      }
    }
  }

  return (
    <Container>
      <Row className='run-row' key={run._id}>
        <Col> {run.description}</Col>
        <Col xs={4}> {run.date}</Col>
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
      <RunSummary id={run._id}/>
    </Container>
  )
}

export default RunDetails;
