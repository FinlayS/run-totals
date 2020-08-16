const express = require('express')
const router = new express.Router()
const Lap = require('../models/lap')

router.post('/laps', async (req, res) => {
  const lap = new Lap(req.body)

  try {
    await lap.save()
    res.status(201).send(lap)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/laps/:id', async (req, res) => {
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

router.get('/laps/:id?', async (req, res) => {
  const query = req.query.runId

  try {
    const laps = await Lap.find({runId: query})
    if (laps.length < 1) {
      return res.status(404).send()
    }

    res.send(laps)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/laps/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["runId", , "runId", "lapNo", "lapTime", "lapDistance"]
  const isValidOperation = updates.every((update ) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid update" })
  }

  try {
    const lap = await Lap.findById(req.params.id)

    updates.forEach((update) => lap[update] = req.body[update])
    await lap.save()

    if (!lap) {
      return res.status(404).send()
    }

    res.send(lap)
  } catch(e) {
    return res.status(400).send(e)
  }
})

router.delete('/laps/:id', async (req, res) => {
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

module.exports = router
