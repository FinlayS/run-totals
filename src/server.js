const axios = require('axios');

let response;

module.exports = {
  getNasa: async () => {
    try {
      response = await axios.get(
        "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",

      );
    } catch (e) {
      console.log(e.response);
    }
    return response.data
  }

};