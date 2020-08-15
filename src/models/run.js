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
  }
})

module.exports = Run