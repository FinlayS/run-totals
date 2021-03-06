import React, { useContext, useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import NumberFormat from "react-number-format";
import moment from "moment";

import { deleteRun, patchRun } from "../../api/runs"
import RunContext from "../../context/runContext";
import { EditIcon, BinIcon, CloseIcon, SaveIcon } from "../../../public/icons/icons";

const EditRun = ({ run }) => {
  const { dispatchRuns } = useContext(RunContext)
  const [description, setDescription] = useState(run.description)
  const [date, setDate] = useState(moment(run.runDate).format("DD/MM/YY"))
  const [runId] = useState(run._id)
  const [show, setShow] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false)
  const [saveLoader, setSaveLoader] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editRun = async () => {
    setSaveLoader(true)
    const runDate = moment(date, "DD/MM/YY").valueOf()
    let run
    try {
      run = await patchRun({ description, runDate }, runId)
    } catch (e) {
      console.log(e.data)
    }
    if (run) {
      const _id = run._id
      dispatchRuns(
        {
          type: "EDIT_RUN",
          description,
          runDate,
          _id
        })
      dispatchRuns(
        {
          type: "SORT_RUNS",
        })
      setShow(false)
    }
    setSaveLoader(false)
  }

  const removeRun = async () => {
    let r = confirm("Confirm you wish to delete this run");
    if (r === true) {
      setDeleteLoader(true)
      let response
      try {
        response = await deleteRun(run._id)
      } catch (e) {
        console.log(e.data)
      }
      if (response) {
        dispatchRuns(
          {
            type: "REMOVE_RUN",
            _id: run._id
          })
      }
      setDeleteLoader(false)
    }
  }

  return (
    <>
      <button
        className="btn btn-link"
        data-toggle="tooltip"
        data-placement="right"
        title="Edit Run"
        onClick={ handleShow }>
        <EditIcon/>
      </button>
      <Modal show={ show } onHide={ handleClose }
      >
        <Modal.Header
          data-testid="edit-run-modal"
        >
          <Modal.Title>Edit this run</Modal.Title>
          <Button
            variant="secondary"
            data-testid="edit-run-close-button"
            size={ "sm" }
            onClick={ handleClose }
          >
            <CloseIcon/>
          </Button>
        </Modal.Header>

        <Modal.Body>
          <Row className="form-row">
            <Col className="col-9">
              <label htmlFor="runDescription">Describe your run</label>
              <input
                type="text"
                className="input-group"
                id="runDescription"
                data-testid="edit-run-description-input"
                value={ description }
                onChange={ (e) => setDescription(e.target.value) }
              />
            </Col>

            <Col className="center-self">
              <label htmlFor="runDate">Date</label>
              <NumberFormat
                format="##/##/##"
                placeholder="DD/MM/YY"
                mask={ ["D", "D", "M", "M", "Y", "Y"] }
                className="input-group center-text"
                id="runDate"
                data-testid="edit-run-date-input"
                value={ date }
                onChange={ (e) => setDate(e.target.value) }
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            data-testid="edit-run-delete-button"
            disabled={!!saveLoader}
            onClick={ removeRun }
          >
            { deleteLoader && (
              <div
                className="loader"
                data-testid="loader"
              />
            )}
            {deleteLoader}
            {!deleteLoader && <>
              <BinIcon/>
              &nbsp; Delete Run
            </>}
          </Button>
          <Button
            variant="success"
            type="submit"
            data-testid="edit-run-save-button"
            disabled={!!deleteLoader}
            onClick={ editRun }
          >
            { saveLoader && (
              <div
                className="loader"
                data-testid="loader"
              />
            )}
            {saveLoader}
            {!saveLoader && <>
              <SaveIcon/>
              &nbsp; Save
            </>}
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default EditRun
