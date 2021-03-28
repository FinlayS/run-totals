import React, { useContext, useState } from 'react';
import Container from "react-bootstrap/Container";
import { Button, Modal, Row, Col } from "react-bootstrap";
import NumberFormat from "react-number-format";

import { getLaps, postLap } from "../../api/laps"
import { timeInputFormat } from "../../utils/timeInputFormat";
import LapContext from "../../context/lapContext";
import { CloseIcon, SaveIcon } from "../../../public/icons/icons";

const AddLap = (id) => {
  const run_id = id.children[1]
  const {laps, dispatchLaps} = useContext(LapContext)
  const [runId] = useState(run_id)
  const [, setLapNo] = useState("")
  const [lapActive, setLapActive] = useState(false)
  const [lapTime, setLapTime] = useState("")
  const [lapDistance, setLapDistance] = useState("");
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
          type: "ADD_LAP",
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
          type: "POPULATE_LAPS",
          laps
        })
      setLapNo("")
      setLapActive(false)
      setLapTime("")
      setLapDistance("")
    }
  }

  return (
    <>
      <Container>
        <Button variant="primary" onClick={handleShow}>
          + lap
        </Button>
      </Container>
      <Modal show={ show } onHide={ handleClose }>
        <Modal.Header>
          <Modal.Title>Add a new lap</Modal.Title>
          <Button
            variant="secondary"
            size={ "sm" }
            onClick={ handleClose }
          >
            <CloseIcon/>
          </Button>
        </Modal.Header>

        <Modal.Body>
          <Row className="form-row">
            <Col className="col-md-3 center-text">
              <label htmlFor="lapNo">Lap</label>
              <div>
              <input
                type="text"
                className="input-group-lap center-text"
                id="lapNo"
                value={laps.length + 1}
                disabled
              />
                </div>
            </Col>

            <Col className="col-md-3">
              <label htmlFor="active">Active?</label>
              <input
                type="checkbox"
                className="form-check margin-unset center-text"
                id="active"
                value={lapActive}
                onChange={(e) => setLapActive(e.target.checked)}
              />
            </Col>

            <Col className="col-md-3 center-text">
              <label htmlFor="time">Time</label>
              <NumberFormat
                format={timeInputFormat}
                placeholder="hh:mm:ss"
                mask={["h", "h", "m", "m", "s", "s"]}
                className="input-group"
                id="time"
                value={lapTime}
                onChange={(e) => setLapTime(e.target.value)}
              />
            </Col>

            <Col className="col-md-3 center-text">
              <label htmlFor="distance">Distance</label>
              <NumberFormat
                className="input-group"
                id="distance"
                value={lapDistance}
                onChange={(e) => setLapDistance(e.target.value)}
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="success"
            onClick={addLap}
            type="submit"
          >
            <SaveIcon/>
            &nbsp; Save
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default AddLap
