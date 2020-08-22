require('dotenv').config()
const express = require('express')
require('./db/mongoose')
const cors = require('cors')

const userRouter = require('./routers/user')
const runRouter = require('./routers/runs')
const lapRouter = require('./routers/laps')

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(userRouter, runRouter, lapRouter)

app.listen(port,() => {
 console.log('Server is up on port', + port)
})
