const express = require('express')
const router = express.Router()
const { readFileDemo } = require('../../controllers/demoController')

// @route   POST api/data/json
// @desc    return json from specified file
// @access  Public

router.post('/read', readFileDemo)

module.exports = router
