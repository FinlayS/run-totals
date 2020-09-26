import axios from 'axios';
import { getUrl } from './utils';

export const getLaps = async (id) => {
  let response
  try {
    response = await axios.get(getUrl(`/laps/?runId=${id}`),
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
  } catch (e) {
    console.log(e.data)
  }
  if (!response) {
    return
  }
  return response.data
}

export const postLap = async (data) => {
  let response
  try {
    response = await axios.post(getUrl('/laps'),
      {
        runId: data.runId,
        lapNo: data.lapNo,
        lapActive: data.lapActive,
        lapTime: data.lapTime,
        lapDistance: data.lapDistance
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

export const editLap = async (id, data) => {
  let response
  try {
    response = await axios.patch(getUrl(`/laps/${id}`),
      {
        lapActive: data.lapActive,
        lapTime: data.lapTime,
        lapDistance: data.lapDistance
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