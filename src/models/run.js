const mongoose = require('mongoose')

const Run = mongoose.model('Run', {
  description: {
    type: String
  },
  date: {
    type: String
  }
})

module.exports = Run