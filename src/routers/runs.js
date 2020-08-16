const express = require('express')
const router = new express.Router()
const Run = require('../models/run')

router.post('/runs', async (req, res) => {
  const run = new Run(req.body)
  try {
    await run.save()
    res.status(201).send(run)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/runs', async (req, res) => {
  try {
    const runs = await Run.find({})
    res.send(runs)
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/runs/:id', async  (req, res) => {
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

router.patch('/runs/:id', async (req, res) => {
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

router.delete('/runs/:id', async (req, res) => {
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

module.exports = router
