import axios from 'axios'

const getUrl = (url) => {
  if (process.env.NODE_ENV !== 'production') {
    const newUrl = `http://localhost:3001${url}`
    return newUrl
  }
  return url
}

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
    localStorage.removeItem("token")

  } catch (e) {
    console.log(e.data)
  }
}
