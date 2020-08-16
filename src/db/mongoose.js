const mongoose = require('mongoose')
const Run = require('../models/run')

mongoose.connect('mongodb://127.0.0.1:27017/run-totals', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

console.log('Server started')
