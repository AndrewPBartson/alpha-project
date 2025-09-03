const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const {
  jsonFileNames,
  opmlFileNames,
} = require('../../controllers/filesController')

const fixedDirPath = path.join(__dirname, '../../data/json_fixed/')

const opmlDirPath = path.join(__dirname, '../../data/opml/')

// @route   GET api/file_list/json
// @desc    fetch list of json files
// @access  Public

router.get('/json', jsonFileNames)

// @route   GET api/file_list/opml
// @desc    fetch list of opml files
// @access  Public

router.get('/opml', opmlFileNames)

module.exports = router
