import React, {useContext, useState} from "react";
import RunContext from "../../context/runContext";
import { postRun } from '../../routers/api/runs'

const AddRun = () => {
  const {dispatch} = useContext(RunContext)
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  const addRun = async(e) => {
    let run
    e.preventDefault()
    try {
      run = await postRun({description, date})
    } catch (e) {
      console.log(e.data)
    }
    if (run) {
    dispatch({type: 'ADD_RUN', description, date})
    setDescription('')
    setDate('')
    }
  }

  return (
    <form onSubmit={addRun}>
      <input value={description} onChange={(e) => setDescription(e.target.value)}/>
      <textarea value={date} onChange={(e) => setDate(e.target.value)}></textarea>
      <button>add run</button>
    </form>
  )
}

export default AddRun
