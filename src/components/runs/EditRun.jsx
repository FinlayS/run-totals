import React, { useContext, useState } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import NumberFormat from "react-number-format";
import moment from 'moment';

import { deleteRun, patchRun } from '../../api/runs'
import RunContext from '../../context/runContext';
import {EditIcon, BinIcon, CloseIcon, SaveIcon} from "../../../public/icons/icons";

const EditRun = ({ run }) => {
  const { dispatchRuns } = useContext(RunContext)
  const [description, setDescription] = useState(run.description)
  const [date, setDate] = useState(moment(run.runDate).format('DD/MM/YY'))
  const [runId] = useState(run._id)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editRun = async () => {
    const runDate = moment(date, 'DD/MM/YY').valueOf()
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
          type: 'EDIT_RUN',
          description,
          runDate,
          _id
        })
      dispatchRuns(
        {
          type: 'SORT_RUNS',
        })
      setShow(false)
    }
  }

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
    <>
      <button
        className='btn btn-link'
        data-toggle='tooltip'
        data-placement='right'
        title='Edit Run'
        onClick={handleShow}>
        <EditIcon/>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>

          <Modal.Title>Edit this run</Modal.Title>
          <Button
            variant='secondary'
            size={"sm"}
            onClick={handleClose}
          >
            <CloseIcon/>
          </Button>
        </Modal.Header>

        <Modal.Body>
          <Row className='form-row'>
            <Col className='col-9'>
              <label htmlFor='runDescription'>Describe your run</label>
              <input
                type='text'
                className='input-group'
                id='runDescription'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>

            <Col className='col'>
              <label htmlFor='runDate'>Date</label>
              <NumberFormat
                format="##/##/##"
                placeholder="DD/MM/YY"
                mask={['D', 'D', 'M', 'M', 'Y', 'Y']}
                className='input-group center'
                id='runDate'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='danger'
            onClick={removeRun}>
            <BinIcon/>
              &nbsp; Delete Run
          </Button>
          <Button
            variant='success'
            type='submit'
            onClick={editRun} >
            <SaveIcon/>
            &nbsp; Save
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default EditRun
