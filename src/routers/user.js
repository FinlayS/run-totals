const express = require('express')
const router = new express.Router()
const auth = require('../middleware/authentication')
const User = require('../models/user')

router.post('/users', async (req, res) => {
  let token
  const user = new User(req.body)

  try {
    token = await user.generateAuthToken()

    if(!token.errors) {
      res.status(201).send({ user, token })
    } else {
      return  res.status(400).send(token.errors)
    }
  } catch (e) {
    return res.status(500)
  }
})

router.post('/users/login', async (req, res) =>{
  let user, token
  try {
    user = await User.findByCredentials(req.body.email, req.body.password)

    if (!user.error) {
      token = await user.generateAuthToken()
    } else {
      throw new Error(user)
    }

    res.send({ user, token })

  } catch (e) {
    return res.status(401).send(user)
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'age', 'email', 'password']
  const isValidOperation = updates.every((update ) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'invalid update' })
  }

  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()

    res.send(req.user)
  } catch(e) {
    return res.status(400).send(e)
  }
})

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch(e) {
    res.status(500).send()
  }
})

module.exports = router
