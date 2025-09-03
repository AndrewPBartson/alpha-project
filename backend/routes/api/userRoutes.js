const express = require('express')
const router = express.Router()

const User = require('../../models/userModel')

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => console.log('register'))

module.exports = router
