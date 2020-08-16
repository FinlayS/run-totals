const express = require('express')
const router = new express.Router()
const auth = require('../middleware/authentication')
const Run = require('../models/run')

router.post('/runs', auth, async (req, res) => {
  const run = new Run({
    ...req.body,
    owner: req.user._id
  })

  try {
    await run.save()
    res.status(201).send(run)

  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/runs', auth, async (req, res) => {
  try {
    const runs = await Run.find({ owner: req.user._id })
    res.send(runs)

  } catch (e) {
    res.status(500).send()
  }
})

router.get('/runs/:id', auth, async  (req, res) => {
  const _id = req.params.id

  try {
    const run = await Run.findOne({ _id, owner: req.user._id })

    if (!run) {
      return res.status(404).send()
    }

    res.send(run)
  } catch (e) {
    res.status(500).send()
  }
})

router.patch('/runs/:id', auth, async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ["description", , "date"]
  const isValidOperation = updates.every((update ) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid update" })
  }

  try {
    const run = await Run.findOne({ _id, owner: req.user._id })

    if (!run) {
      return res.status(404).send()
    }

    updates.forEach((update) => run[update] = req.body[update])
    await run.save()

    res.send(run)
  } catch(e) {
    return res.status(400).send(e)
  }
})

router.delete('/runs/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const run = await Run.findOneAndDelete({ _id, owner: req.user._id })

    if (!run) {
      return res.status(404).send()
    }

    res.send(run)
  } catch(e) {
    res.status(500).send()
  }
})

module.exports = router
