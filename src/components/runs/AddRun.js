import React, {useContext, useState} from 'react';
import {Button, Modal, Row, Col, Container} from 'react-bootstrap';
import NumberFormat from "react-number-format";
import moment from 'moment';

import {postRun} from '../../routers/api/runs'
import RunContext from '../../context/runContext';

const AddRun = () => {
  const today = moment().format('DD/MM/YY')
  const {dispatch} = useContext(RunContext)
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(today)
  const [id, setId] = useState('')
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
      dispatch(
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
        <Modal.Header closeButton>
          <Modal.Title>Add a new run</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className='form-row'>
            <Col className='col-md-8 mb-3 md-form'>
              <label htmlFor='runDescription'>Describe your run</label>
              <input
                type='text'
                className='input-group'
                id='runDescription'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>

            <Col className='col-md-4 mb-1 md-form'>
              <label htmlFor='runDate'>Date</label>
              <NumberFormat
                format="##/##/##"
                placeholder="DD/MM/YY"
                mask={['D', 'D', 'M', 'M', 'Y', 'Y']}
                className='input-group'
                id='runDate'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={addRun} type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default AddRun
