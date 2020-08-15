require('dotenv').config()
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Run = require('./models/run')
const Lap = require('./models/lap')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

/**
 * Users
 */
app.post('/users', async (req, res) => {
 const user = new User(req.body)
 try {
  await user.save()
  res.status(201).send(user)
 } catch (e) {
  res.status(400).send(e)
 }
})

app.get('/users', async (req, res) => {
 try {
  const users = await User.find({})
  res.send(users)
 } catch (e) {
  res.status(500).send(e)
 }
})

app.get('/users/:id', async (req, res) => {
 const _id = req.params.id
 try {
 const user = await User.findById(_id)
 if (!user) {
  return res.status(404).send()
 }
 res.send(user)
 } catch (e) {
  res.status(500).send()
 }
})

app.patch('/users/:id', async (req, res) => {
 const updates = Object.keys(req.body)
 const allowedUpdates = ["name", , "age", "email", "password"]
 const isValidOperation = updates.every((update ) => allowedUpdates.includes(update))
 if (!isValidOperation) {
  return res.status(400).send({ error: "invalid update" })
 }
 try {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!user) {
   return res.status(404).send()
  }
  res.send(user)
 } catch(e) {
  return res.status(400).send(e)
 }
})

app.delete('/users/:id', async (req, res) => {
 try {
  const user = await User.findByIdAndDelete(req.params.id)
  if (!user) {
   return res.status(404).send()
  }
  res.send(user)
 } catch(e) {
  res.status(500).send()
 }
})

/**
 * Laps
 */
app.post('/laps', async (req, res) => {
 const lap = new Lap(req.body)
 try {
  await lap.save()
  res.status(201).send(lap)
 } catch (e) {
  res.status(400).send(e)
 }
})

app.get('/laps/:id', async (req, res) => {
 const _id = req.params.id
 try {
  const lap = await Lap.findById(_id)
  if (!lap) {
   return res.status(404).send()
  }
  res.send(lap)
 } catch (e) {
  res.status(500).send()
 }
})

app.get('/laps/:id?', async (req, res) => {
const query = req.query.runId
 try {
  const laps = await Lap.find({runId: query})
  if (laps.length < 1) {
   return res.status(404).send()
  }
  res.send(laps)
 } catch (e) {
  res.status(500).send()
 }
})

app.patch('/laps/:id', async (req, res) => {
 const updates = Object.keys(req.body)
 const allowedUpdates = ["runId", , "runId", "lapNo", "lapTime", "lapDistance"]
 const isValidOperation = updates.every((update ) => allowedUpdates.includes(update))
 if (!isValidOperation) {
  return res.status(400).send({ error: "invalid update" })
 }
 try {
  const lap = await Lap.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!lap) {
   return res.status(404).send()
  }
  res.send(lap)
 } catch(e) {
  return res.status(400).send(e)
 }
})

app.delete('/laps/:id', async (req, res) => {
 try {
  const lap = await Lap.findByIdAndDelete(req.params.id)
  if (!lap) {
   return res.status(404).send()
  }
  res.send(lap)
 } catch(e) {
  res.status(500).send()
 }
})

/**
 * Runs
 */
app.post('/runs', async (req, res) => {
 const run = new Run(req.body)
 try {
  await run.save()
  res.status(201).send(run)
 } catch (e) {
  res.status(400).send(e)
 }
})

app.get('/runs', async (req, res) => {
 try {
  const runs = await Run.find({})
  res.send(runs)
 } catch (e) {
  res.status(500).send()
 }
})

app.get('/runs/:id', async  (req, res) => {
 const _id = req.params.id
 try {
  const run = await Run.findById(_id)
  if (!run) {
   return res.status(404).send()
  }
  res.send(run)
 } catch (e) {
  res.status(500).send()
 }
})

app.patch('/runs/:id', async (req, res) => {
 const updates = Object.keys(req.body)
 const allowedUpdates = ["description", , "date"]
 const isValidOperation = updates.every((update ) => allowedUpdates.includes(update))
 if (!isValidOperation) {
  return res.status(400).send({ error: "invalid update" })
 }
 try {
  const run = await Run.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!run) {
   return res.status(404).send()
  }
  res.send(run)
 } catch(e) {
  return res.status(400).send(e)
 }
})

app.delete('/runs/:id', async (req, res) => {
 try {
  const run = await Run.findByIdAndDelete(req.params.id)
  if (!run) {
   return res.status(404).send()
  }
  res.send(run)
 } catch(e) {
  res.status(500).send()
 }
})

app.listen(port, () => {
 console.log('Server is up on port', + port)
})
