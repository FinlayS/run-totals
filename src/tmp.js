// server.js
require('dotenv').config()

const express = require('express')
require('./db/mongoose')
const next = require('next')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production' //true false
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler() //part of next config
const cors = require('cors')

const userRouter = require('./routers/user')
const runRouter = require('./routers/runs')
const lapRouter = require('./routers/laps')

nextApp.prepare().then(() => {
  // express code here
  const app = express()
  app.use(cors())
   app.use(express.json());
  // app.use(bodyParser.urlencoded({ extended: true }));
  app.use(userRouter, runRouter, lapRouter)
  app.get('*', (req,res) => {
    return handle(req,res) // for all the react stuff
  })
  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`ready at http://localhost:${PORT}`)
  })
})