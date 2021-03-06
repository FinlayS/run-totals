const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Lap = require('../models/lap')
const Run = require('../models/run')
const getErrorMessage = require('../utils/handleErrors')


const jwtSecret = process.env.JWT_SECRET

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    index:true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  },
  tokens:[{
    token: {
      type: String,
      required: true
    }
  }]
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, jwtSecret)

  user.tokens = user.tokens.concat({ token })

  try {
    await user.save()
  } catch(e) {
     return getErrorMessage(e)
  }

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  const errorMessage = {'error': {'message':'Please enter a valid email and password'}}

  if (!user) {
    return errorMessage
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return errorMessage
  }

  return user
}

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
   user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

userSchema.pre('remove', async function (next) {
  const user = this

  await Run.deleteMany({ owner: user._id})
  await Lap.deleteMany({ owner: user._id})
  next()
})

const User = mongoose.model('User', userSchema )

module.exports = User
