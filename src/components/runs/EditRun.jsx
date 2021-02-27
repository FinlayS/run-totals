import React, { useContext, useState } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import NumberFormat from "react-number-format";
import moment from 'moment';

import {getRun, postRun} from '../../api/runs'
import RunContext from '../../context/runContext';

const EditRun = ({run}) => {
  console.log("RDRDRD", run.date)
  const today = moment().format('DD/MM/YY')
  const {dispatchRuns} = useContext(RunContext)
  const [description, setDescription] = useState(run.description)
  const [date, setDate] = useState(moment(run.runDate).format('DD/MM/YY'))
  const [runId, setId] = useState(run._id)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



    // const addRun = async (e) => {
    //
    //   const runDate = moment(date, 'DD/MM/YY').valueOf()
    //
    //   let run
    //   e.preventDefault()
    //
    //   try {
    //     run = await postRun({description, runDate})
    //   } catch (e) {
    //     console.log(e.data)
    //   }
    //   if (run) {
    //     const _id = run._id
    //     dispatchRuns(
    //       {
    //         type: 'ADD_RUN',
    //         description,
    //         runDate,
    //         _id
    //       })
    //     setDescription('')
    //     setId('')
    //     setDate(today)
    //     setShow(false)
    //   }
    // }

  console.log("dddededededed",run._id)


  const editRun = async (e) => {
      console.log("RUUUUUUNNNNNN", e)
      const _id = run._id
      console.log(_id)
      let runToEdit
      try {
        runToEdit = await getRun(_id)
        console.log(runToEdit)
      } catch (e) {
        console.log(e.data)
      }
    }

    return (
      <>
        <Button variant='outline-dark' onClick={handleShow}>
          E
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit this run</Modal.Title>
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
            <Button variant='primary' onClick={editRun} type='submit'>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

      </>
    )
}

export default EditRun
