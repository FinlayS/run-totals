const express = require('express')
const next = require('next')
require('./db/mongoose')
const cors = require('cors')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const userRouter = require('./routers/user')
const runRouter = require('./routers/runs')
const lapRouter = require('./routers/laps')

app.prepare().then(() => {
 const server = express()

 server.use(cors())
 server.use(express.json())
 server.use(userRouter, runRouter, lapRouter)
 server.all('*', (req, res) => {
  return handle(req, res)
 })
 server.listen(port,() => {
  console.log('Server is up on port', + port)
 })
})
