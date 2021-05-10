import React, { useContext, useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import NumberFormat from "react-number-format";
import moment from "moment";

import { postRun } from "../../api/runs"
import RunContext from "../../context/runContext";
import { CloseIcon, SaveIcon } from "../../../public/icons/icons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { runValidation } from "../../validation/run";

const AddRun = () => {
  const methods = useForm({
    resolver: yupResolver(runValidation),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { date: moment().format("DD/MM/YY") }
  });

  const { dispatchRuns } = useContext(RunContext)
  const [show, setShow] = useState(false);

  const description = methods.watch("description")
  const date = methods.watch("date")
  const hasNoErrors = Object.keys(methods.errors).length === 0;
  const { register, handleSubmit, errors, control } = methods;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addRun = async () => {

    const runDate = moment(date, "DD/MM/YY").valueOf()

    let run
    try {
      run = await postRun({ description, runDate })
    } catch (e) {
      console.log(e.data)
    }
    if (run) {
      const _id = run._id
      dispatchRuns(
        {
          type: "ADD_RUN",
          description,
          runDate,
          _id
        })
      setShow(false)
    }
  }

  return (
    <>
      <Button variant="primary" onClick={ handleShow }>
        Add run
      </Button>
      <Modal show={ show } onHide={ handleClose }>
        <Modal.Header
          data-testid="add-run-modal"
        >
          <Modal.Title>Add a new run</Modal.Title>
          <Button
            variant="secondary"
            data-testid="add-run-close-button"
            size={ "sm" }
            onClick={ handleClose }
          >
            <CloseIcon/>
          </Button>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={ handleSubmit(addRun) }>
            <Row className="form-row">
              <Col className="col-9">
                <label htmlFor="runDescription">Describe your run</label>
                <input
                  type="text"
                  className="input-group"
                  id="runDescription"
                  data-testid="add-run-description-input"
                  name="description"
                  ref={ register }
                />
              </Col>
              <Col className="center-self">
                <label htmlFor="runDate">Date</label>
                <Controller as={
                  <NumberFormat
                    format="##/##/##"
                    placeholder="DD/MM/YY"
                    mask={ ["D", "D", "M", "M", "Y", "Y"] }
                    className="input-group center-text"
                    id="runDate"
                    data-testid="add-run-date-input"
                  />
                } name="date" control={ control }
                />

              </Col>
            </Row>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <div className="alert alert-danger"
               style={ { display: errors.description || errors.date ? "block" : "none" } }
               role="alert">
            { errors.description && errors.description.message
            || errors.date && errors.date.message
            }
          </div>
          <div>
          <Button
            variant="success"
            type="button"
            data-testid="add-run-save-button"
            onClick={ handleSubmit(addRun) }
            disabled={!hasNoErrors}
          >
            <SaveIcon/>
            &nbsp; Save
          </Button>
          </div>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default AddRun
