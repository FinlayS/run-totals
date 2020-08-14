require('dotenv')
const express = require('express')

const app = express()
// const port = process.env.PORT || 3001
const port = 3001

app.use(express.json())

app.post('/users', (req, res) => {
 console.log(req.body)
 res.send('testing you')
})

app.listen(port, () => {
 console.log('Server is up on port', + port)
})