import React, { useContext, useState } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import NumberFormat from "react-number-format";
import moment from 'moment';

import { postRun } from '../../api/runs'
import RunContext from '../../context/runContext';
import {CloseIcon, SaveIcon} from "../../../public/icons/icons";

const AddRun = () => {
  const today = moment().format('DD/MM/YY')
  const {dispatchRuns} = useContext(RunContext)
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(today)
  const [, setId] = useState('')
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addRun = async (e) => {

    const runDate = moment(date, 'DD/MM/YY').valueOf()

    let run
    e.preventDefault()

    try {
      run = await postRun({description, runDate})
    } catch (e) {
      console.log(e.data)
    }
    if (run) {
      const _id = run._id
      dispatchRuns(
        {
          type: 'ADD_RUN',
          description,
          runDate,
          _id
        })
      setDescription('')
      setId('')
      setDate(today)
      setShow(false)
    }
  }

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Add run
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add a new run</Modal.Title>
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

            <Col className='center-self'>
              <label htmlFor='runDate'>Date</label>
              <NumberFormat
                format="##/##/##"
                placeholder="DD/MM/YY"
                mask={['D', 'D', 'M', 'M', 'Y', 'Y']}
                className='input-group center-text'
                id='runDate'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='success'
            type='submit'
            onClick={addRun} >
            <SaveIcon/>
            &nbsp; Save
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default AddRun
