import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Button, Modal, Row, Col } from 'react-bootstrap';

import { postLap } from '../../routers/api/laps'
import RunContext from '../../context/runContext';

const AddLap = (id) => {
  const run_id = id.children[1]
  const {dispatch} = useContext(RunContext)
  const [runId] = useState(run_id)
  const [lapNo, setLapNo] = useState('')
  const [lapActive, setLapActive] = useState(false)
  const [lapTime, setLapTime] = useState('')
  const [lapDistance, setLapDistance] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const laps = useContext(RunContext)
  const nextLap = laps.laps.length +1


  const addLap = async (e) => {
    let lap
    e.preventDefault()

    try {
      lap = await postLap(
        {
          runId,
          lapNo: nextLap,
          lapActive,
          lapTime,
          lapDistance
        })
    } catch (e) {
      console.log(e.data)
    }
    if (lap) {
      const _id = lap._id
      dispatch(
        {
          type: 'ADD_LAP',
          _id,
          runId,
          lapNo: nextLap,
          lapActive,
          lapTime,
          lapDistance}
          )
      setLapNo('')
      setLapActive(false)
      setLapTime('')
      setLapDistance('')

    }
  }

  return (
    <>
      <Container>
        <Button variant='primary' onClick={handleShow}>
          + lap
        </Button>
      </Container>

      <Modal show={show}
             onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a new lap</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className='form-row'>
            <Col className='col-md-3 mb-3 md-form'>
              <label htmlFor='lapNo'>Lap No</label>
              <input
                type='text'
                className='input-group'
                id='lapNo'
                value={nextLap}
                disabled
              />
            </Col>

            <Col className='col-md-3 mb-1 md-form'>
              <label htmlFor='active'>Active?</label>
              <input
                type='checkbox'
                className='form-check'
                id='active'
                value={lapActive}
                onChange={(e) => setLapActive(e.target.checked)}
              />
            </Col>

            <Col className='col-md-3 mb-3 md-form'>
              <label htmlFor='time'>Time</label>
              <input
                type='text'
                className='input-group'
                id='time'
                value={lapTime}
                onChange={(e) => setLapTime(e.target.value)}
              />
            </Col>

            <Col className='col-md-3 mb-3 md-form'>
              <label htmlFor='distance'>Distance</label>
              <input
                type='number'
                className='input-group'
                id='distance'
                value={lapDistance}
                onChange={(e) => setLapDistance(e.target.value)}
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={addLap} type='submit'>
            Add
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default AddLap
