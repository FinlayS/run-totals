import axios from "axios";
import {getUrl} from "./utils";

export const getRuns = async () => {
  let response
  try {
    response = await axios.get(getUrl('/runs'),
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
  } catch (e) {
    console.log(e.data)
  }
  return response.data
}