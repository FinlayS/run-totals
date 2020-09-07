import React, { useContext, useState } from "react";
import RunContext from "../../context/runContext";
import Container from 'react-bootstrap/Container';
import { postLap } from '../../routers/api/laps'
import { Button, Modal, Row, Col } from "react-bootstrap";

const AddLap = (id) => {
  const run_id = id.children[1]
  const {dispatch} = useContext(RunContext)
  const [runId, setRunId] = useState(run_id)
  const [lapNo, setLapNo] = useState('')
  const [active, setActive] = useState(false)
  const [lapTime, setLapTime] = useState('')
  const [lapDistance, setLapDistance] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addLap = async (e) => {
    let lap
    e.preventDefault()

    try {
      lap = await postLap({runId, lapNo, active, lapTime, lapDistance})
    } catch (e) {
      console.log(e.data)
    }
    if (lap) {
      const _id = lap._id
      dispatch({type: 'ADD_LAP', _id, runId, lapNo, active, lapTime, lapDistance})
      setRunId('')
      setLapNo('')
      setActive(false)
      setLapTime('')
      setLapDistance('')
      setShow(false)
    }
  }

  return (
    <>
      <Container>
        <Button variant="primary" onClick={handleShow}>
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
          <Row className="form-row">
            <Col className="col-md-3 mb-3 md-form">
              <label htmlFor="lapNo">Lap No</label>
              <input
                type="text"
                className="input-group"
                id="lapNo"
                value={lapNo}
                onChange={(e) => setLapNo(e.target.value)}
              />
            </Col>

            <Col className="col-md-3 mb-1 md-form">
              <label htmlFor="active">Active Lap?</label>
              <input
                type="checkbox"
                className="form-check"
                id="active"
                value={active}
                onChange={(e) => setActive(e.target.checked)}
              />
            </Col>

            <Col className="col-md-3 mb-3 md-form">
              <label htmlFor="time">Time</label>
              <input
                type="text"
                className="input-group"
                id="time"
                value={lapTime}
                onChange={(e) => setLapTime(e.target.value)}
              />
            </Col>

            <Col className="col-md-3 mb-3 md-form">
              <label htmlFor="distance">Distance</label>
              <input
                type="text"
                className="input-group"
                id="distance"
                value={lapDistance}
                onChange={(e) => setLapDistance(e.target.value)}
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addLap} type="submit">
            Save Changes
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default AddLap
