const mongoose = require('mongoose')

const Lap = mongoose.model('Lap', {
  runId: {
    type: Object,
    required: true,
  },
  runId: {
    type: Boolean,
    default: false,
    required: true,
  },
  lapNo: {
    type: Number,
    required: true,
  },
  lapTime: {
    type: String,
    required: true,
    trim: true,
  },
  lapDistance: {
    type: Number,
    required: true,
  }
})

module.exports = Lap
