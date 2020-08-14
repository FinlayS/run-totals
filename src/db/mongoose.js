const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/run-totals', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

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

const Run = mongoose.model('Run', {
  description: {
    type: String
  },
  date: {
    type: String
  }
})

const r = new Run({
  description: "Run saved in database",
  date: "13/08/2020"
})

const l = new Lap({
  runId:  mongoose.Types.ObjectId("5f368c67a65f903481274157"),
  lapActive: false,
  lapNo: {type: [String], index: true},
  lapTime: "00:09:08",
  lapDistance: 0.52
})

l.save().then(() => {
  console.log(l)
}).catch((error) => {
  console.log("error", error)
})