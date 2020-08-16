require('dotenv').config()
const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const runRouter = require('./routers/runs')
const lapRouter = require('./routers/laps')

const app = express()
const port = process.env.PORT || 3001
// const serviceUnavailable = process.env.SERVICE_UNAVAILABLE

// app.use((req, res, next) => {
//  console.log(serviceUnavailable)
//  if (!serviceUnavailable == true)  {
//   next()
//  } else {
//   res.send('Service unavailable')
//  }
// })

// app.use((req, res, next) => {
//  console.log(req.method, req.path)
//  next()
// })

app.use(express.json())
app.use(userRouter, runRouter, lapRouter)

app.listen(port, () => {
 console.log('Server is up on port', + port)
})
