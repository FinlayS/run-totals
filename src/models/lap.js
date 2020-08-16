const mongoose = require('mongoose')

const Lap = mongoose.model('Lap', {
  runId: {
    type: Object,
    required: true,
  },
  lapActive: {
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
  },
  owner: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: 'User'
  }
})

module.exports = Lap
