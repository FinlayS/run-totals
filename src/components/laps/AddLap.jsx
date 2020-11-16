import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import NumberFormat from "react-number-format";

import { getLaps, postLap } from '../../api/laps'
import { timeInputFormat } from "../../utils/timeInputFormat";
import LapContext from '../../context/lapContext';

const AddLap = (id) => {
  const run_id = id.children[1]
  const {laps, dispatchLaps} = useContext(LapContext)
  const [runId] = useState(run_id)
  const [, setLapNo] = useState('')
  const [lapActive, setLapActive] = useState(false)
  const [lapTime, setLapTime] = useState('')
  const [lapDistance, setLapDistance] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addLap = async (e) => {
    const nextLap = laps.length + 1
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
      dispatchLaps(
        {
          type: 'ADD_LAP',
          _id,
          runId,
          lapNo: nextLap,
          lapActive,
          lapTime,
          lapDistance
        }
      )
      const laps = await getLaps(runId)
      dispatchLaps(
        {
          type: 'POPULATE_LAPS',
          laps
        })
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
            <Col className='col-md-1 mb-1 md-form'>
              <label htmlFor='lapNo'>Lap</label>
              <input
                type='text'
                className='input-group'
                id='lapNo'
                value={laps.length + 1}
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
              <NumberFormat
                format={timeInputFormat}
                placeholder="hh:mm:ss"
                mask={['h', 'h', 'm', 'm', 's', 's']}
                className='input-group'
                id='time'
                value={lapTime}
                onChange={(e) => setLapTime(e.target.value)}
              />
            </Col>

            <Col className='col-md-3 mb-3 md-form'>
              <label htmlFor='distance'>Distance</label>
              <NumberFormat
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
