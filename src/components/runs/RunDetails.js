import React, {useContext} from 'react';
import RunContext from "../../context/runContext";
import { deleteRun } from "../../routers/api/runs";


const RunDetails = ({ run }) => {

  const { dispatch } =useContext(RunContext)

  const removeRun = async() => {
    let r = confirm("Confirm you wish to delete this run");
    if (r === true) {
      let response
      try {
        response = await deleteRun(run._id)
      } catch (e) {
        console.log(e.data)
      }
      if (response) {
        dispatch({ type: 'REMOVE_RUN', _id: run._id })
      }
    }
  }

  return (
    <div key={run._id}>
      <div className="text-title">
        <div >{run.description}</div>
        <div >{run.date}</div>
        <button class="btn btn-link"
                data-toggle="tooltip"
                data-placement="left"
                title="Delete Run"
                onClick={removeRun}
        >x</button>
      </div>
    </div>
  )
}

export default RunDetails;
