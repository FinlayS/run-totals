require('dotenv')
const express = require('express')

const app = express()
// const port = process.env.PORT || 3001
const port = 3001

app.post('/users', (req, res) => {
 res.send('testing')
})

app.listen(port, () => {
 console.log('Server is up on port', + port)
})