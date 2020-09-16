const mongoose = require('mongoose')

const Run = mongoose.model('Run', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true,
    trim: true
  },
  runDate: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: 'User'
  }
})

module.exports = Run
