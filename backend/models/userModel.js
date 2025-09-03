// This model should exactly match the model in the account-api/models/userModel.js file.

const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, 'Please provide your name'],
      required: true,
    },
    email: {
      type: String,
      // required: [true, 'Please provide your email'],
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // required: [true, 'Please add a password'],
    },
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    superpower: {
      type: String,
    },
    timezone: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    // drivers: [],
    // routes: [],
  },
  {
    // adds createdAt and updatedAt fields:
    timestamps: true,
  }
)

module.exports = User = mongoose.model('users', UserSchema)
// in mongodb, the collection is called 'users' but in
// exports it's called 'User"
