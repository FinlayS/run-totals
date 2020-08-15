const mongoose = require('mongoose')
const Run = require('../models/run')

mongoose.connect('mongodb://127.0.0.1:27017/run-totals', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const r = new Run({
  description: "Server started",
  date: new Date()
})

r.save().then(() => {
  console.log(r)
}).catch((error) => {
  console.log("error", error)
})
