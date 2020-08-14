const mongoose = require('mongoose')

const Lap = mongoose.model('Lap', {
  runId: {
    type: Object
  },
  lapActive: {
    type: Boolean
  },
  lapNo: {
    type: Object
  },
  lapTime: {
    type: String
  },
  lapDistance: {
    type: Number
  }
})

module.exports = Lap