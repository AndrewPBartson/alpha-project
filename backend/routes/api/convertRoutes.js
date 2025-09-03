const express = require('express')
const router = express.Router()
const {
  refactorJson,
  refactorOpml,
} = require('../../controllers/convertController')

// @route   POST api/convert/refactor_json
// @desc    convert preliminary json to fixed json
// @access  Public

router.post('/refactor_json', refactorJson)
router.post('/refactor_opml', refactorOpml)

// router.post('/', xmlToJson)

module.exports = router
