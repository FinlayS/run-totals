import axios from 'axios'
import { getUrl } from './utils'

export const userLogout = async () => {
  try {
    await axios.post(getUrl('/users/logout'),
      {},
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
  } catch (e) {
    console.log(e.data)
  }
}

export const userLogin = async (payload) => {
  let response
  try {
    response = await axios.post(getUrl('/users/login'), {...payload})
  } catch(e) {
    console.log(e.data)
  }
  localStorage.setItem('token', response.data.token)
  return response
}

export const userRegister = async (payload) => {
  let response
  try {
    response = await axios.post(getUrl('/users'), {...payload})
  } catch(e) {
    console.log(e.data)
  }
  localStorage.setItem('token', response.data.token)
  return response
}
