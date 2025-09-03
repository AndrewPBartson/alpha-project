const fs = require('fs')
const path = require('path')

const fixedDirPath = path.join(__dirname, '../data/json_fixed/')

const opmlDirPath = path.join(__dirname, '../data/opml/')

const jsonFileNames = (req, res) => {
  const fileList = fs.readdirSync(fixedDirPath)
  res.status(200).json(fileList)
}

const opmlFileNames = (req, res) => {
  const fileList = fs.readdirSync(opmlDirPath)
  res.status(200).json(fileList)
}

module.exports = {
  jsonFileNames,
  opmlFileNames,
}
