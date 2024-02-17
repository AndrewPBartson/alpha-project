const express = require('express')
const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js')
var cors = require('cors')
const dataRoutes = require('./routes/api/dataRoutes')
const fixJsonData = require('./dataFactory/reformatJson')
const prelimJson = require('./data/json_prelim/love_power_here_now_prelim.json')

const app = express()
const port = process.env.PORT || 5470
app.use(cors())

// this route simply returns json
app.get('/json', (req, res) => {
  const jsonData = require('./data/json_fixed/love_power_here_now.json')
  res.json(jsonData)
})

// create file paths - * fs needs path to root *
const opmlFilePath = path.join(
  __dirname,
  './data/opml/love_power_here_now.opml'
)

const prelimFilePath = path.join(
  __dirname,
  './data/json_prelim/love_power_here_now_prelim.json'
)

const fixedFilePath = path.join(
  __dirname,
  './data/json_fixed/love_power_here_now.json'
)

const fixedDirPath = path.join(__dirname, './data/json_fixed/')

const opmlDirPath = path.join(__dirname, './data/opml/')

app.get('/listJsonFiles', (req, res) => {
  const fileList = fs.readdirSync(fixedDirPath)
  res.json(fileList)
})

app.get('/listOpmlFiles', (req, res) => {
  const fileList = fs.readdirSync(opmlDirPath)
  res.json(fileList)
})

// this route converts preliminary json to fixed json
app.get('/fixJson', (req, res) => {
  let fixedJson = fixJsonData(prelimJson)
  fs.writeFile(fixedFilePath, JSON.stringify(fixedJson), (err) => {
    if (err) {
      console.error(err)
      res.status(500).send('Internal Server Error - writing file')
      return
    }
    // console.log('JSON saved')
    // res.json(result)
  })
  res.json(fixedJson)
})

// this route converts OPML to preliminary json
app.get('/xmlToJson', (req, res) => {
  // fs requires path to root of project
  // 1) read OPML (XML) file
  fs.readFile(opmlFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      res.status(500).send('Server Error - reading OPML')
      return
    }
    // convert OPML ("data") to preliminary json
    xml2js.parseString(data, (xmlErr, result) => {
      if (xmlErr) {
        console.error(xmlErr)
        res.status(500).send('Server Error - parsing XML')
        return
      }
      console.log('OPML parsed')
      // 2) write preliminary json to file
      fs.writeFile(prelimFilePath, JSON.stringify(result), (err) => {
        if (err) {
          console.error(err)
          res.status(500).send('Server Error - writing prelim json')
          return
        }
        console.log('preliminary JSON saved')
        // 3) convert preliminary json to fixed json
        let fixedJson = fixJsonData(prelimJson)
        fs.writeFile(fixedFilePath, JSON.stringify(fixedJson), (err) => {
          if (err) {
            console.error(err)
            res.status(500).send('Server Error - writing fixed json')
            return
          }
          console.log('fixed JSON saved')
        })
        // 3) Send fixed json as response
        res.json(fixedJson)
      })
    })
  })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
