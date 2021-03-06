import axios from 'axios';
import { getUrl } from './utils';

export const getRuns = async () => {
  let response
  try {
    response = await axios.get(getUrl('/runs'),
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

  } catch (e) {
    return e.response
  }
  return response.data
}

export const postRun = async (data) => {
  let response
  try {
    response = await axios.post(getUrl('/runs'),
      {
        description: data.description,
        runDate: data.runDate
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
  } catch (e) {
    console.log(e.data)
  }
  return response.data
}

export const patchRun = async (data, id) => {
  let response
  try {
    response = await axios.patch(getUrl(`/runs/${id}`),
      {
        description: data.description,
        runDate: data.runDate
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
  } catch (e) {
    console.log(e.data)
  }
  return response.data
}

export const deleteRun = async (id) => {
  let response
  try {
    response = await axios.delete(getUrl(`/runs/${id}`),
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
  } catch (e) {
    console.log(e.data)
  }
  return response.data
}
