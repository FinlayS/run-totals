import React, { useContext, useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import NumberFormat from "react-number-format";

import { deleteLap, getLaps, patchLap } from "../../api/laps"
import { timeInputFormat } from "../../utils/timeInputFormat";
import LapContext from "../../context/lapContext";
import { EditIcon, BinIcon, CloseIcon, SaveIcon } from "../../../public/icons/icons";

const AddLap = ({ lap }) => {
  const { laps, dispatchLaps } = useContext(LapContext)
  const [lapActive, setLapActive] = useState(lap.lapActive)
  const [lapTime, setLapTime] = useState(lap.lapTime)
  const [lapDistance, setLapDistance] = useState(lap.lapDistance);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateLap = async () => {
    let response
    try {
      response = await patchLap(lap._id, {
        lapActive,
        lapTime,
        lapDistance
      })
    } catch (e) {
      console.log(e.data)
    }
    if (response) {
      const laps = await getLaps(lap.runId)
      dispatchLaps(
        {
          type: "POPULATE_LAPS",
          laps
        })
      setShow(false)
    }
  }

  const deleteCurrentLap = async () => {
    let r = confirm("Are you sure wish to delete this lap");
    if (r === true) {
      let response
      try {
        response = await deleteLap(lap._id)
      } catch (e) {
        console.log(e.data)
      }
      if (response) {
        const laps = await getLaps(lap.runId)
        dispatchLaps(
          {
            type: "POPULATE_LAPS",
            laps
          })
        setShow(false)
      }
    }
  }

  return (
    <>
      <button
        className="btn btn-link-white"
        data-toggle="tooltip"
        data-placement="right"
        title="Edit Lap"
        onClick={ handleShow }>
        <EditIcon/>
      </button>

      <Modal
        show={ show }
        onHide={ handleClose }
      >
        <Modal.Header>
          <Modal.Title>Edit lap</Modal.Title>
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
                  value={ lap.lapNo }
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
                defaultChecked={ lapActive }
                onChange={ (e) => setLapActive(e.target.checked) }
              />
            </Col>

            <Col className="col-md-3 center-text">
              <label htmlFor="time">Time</label>
              <NumberFormat
                format={ timeInputFormat }
                placeholder="hh:mm:ss"
                mask={ ["h", "h", "m", "m", "s", "s"] }
                className="input-group"
                id="time"
                value={ lapTime }
                onChange={ (e) => setLapTime(e.target.value) }
              />
            </Col>

            <Col className="col-md-3 center-text">
              <label htmlFor="distance">Distance</label>
              <NumberFormat
                type="number"
                className="input-group"
                id="distance"
                value={ lapDistance }
                onChange={ (e) => setLapDistance(e.target.value) }
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          { lap.lapNo === laps.length &&
          <Button
            variant="danger"
            onClick={ deleteCurrentLap }
          >
            <BinIcon/>
            &nbsp; Delete Lap
          </Button>
          }
          <Button
            variant="success"
            type="submit"
            onClick={ updateLap }>
            <SaveIcon/>
            &nbsp; Save
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default AddLap
