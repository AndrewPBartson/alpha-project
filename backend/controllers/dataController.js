const fetchJsonByName = (req, res) => {
  console.log('req.body', req.body)
  let fileName
  if (!req.body.fileName) {
    fileName = 'indistractable'
  } else {
    fileName = req.body.fileName
  }
  const jsonData = require(`../data/json_fixed/${fileName}`)
  res.status(200).json(jsonData)
}

module.exports = {
  fetchJsonByName,
}
