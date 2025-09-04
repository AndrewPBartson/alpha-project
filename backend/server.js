const express = require('express')
// const mongoose = require('mongoose')
// const db = require('../config/keys_dev').mongoURI
const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js')
var cors = require('cors')
const { exec } = require('child_process')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
// const userRoutes = require('./routes/api/userRoutes')
const convertRoutes = require('./routes/api/convertRoutes')
const dataRoutes = require('./routes/api/dataRoutes')
const demoRoutes = require('./routes/api/demoRoutes')
const filesRoutes = require('./routes/api/filesRoutes')
const fixJsonData = require('./dataFactory/reformatJson')

const app = express()
const port = process.env.PORT || 5470
app.use(morgan('tiny'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// mongoose
//   .connect(db)
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log(err))

app.use('/api/convert', convertRoutes)
app.use('/api/data', dataRoutes)
app.use('/api/demo', demoRoutes)
app.use('/api/file_list', filesRoutes)

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
app.get('/', (req, res) => {
  res.status(200).json('test')
})

app.get('/open-mindmap', (req, res) => {
  const filePath = `"C:\\Users\\cloud\\code\\Alpha_Project\\alpha_mmap\\alpha_mindmap.mmap"` // adjust path
  exec(`start "" ${filePath}`, (err) => {
    if (err) {
      res.status(500).send('File may already be open')
    } else {
      res.send('File opened')
    }
  })
})

// converts opml to prelim json and then to fixed json
app.get('/opml_to_json', (req, res) => {
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

        // ===================
        // Dynamically read prelim JSON from file
        fs.readFile(prelimFilePath, 'utf8', (readErr, prelimData) => {
          if (readErr) {
            console.error(readErr)
            res.status(500).send('Server Error - reading prelim JSON')
            return
          }
          const prelimJson = JSON.parse(prelimData)
          // 3) convert preliminary json to fixed json
          const fixedJson = fixJsonData(prelimJson)

          fs.writeFile(
            fixedFilePath,
            JSON.stringify(fixedJson),
            (fixedWriteErr) => {
              if (fixedWriteErr) {
                console.error(fixedWriteErr)
                res.status(500).send('Server Error - writing fixed json')
                return
              }
              console.log('fixed JSON saved')
              // 3) Send fixed json as response
              res.status(200).json(fixedJson)
            }
          )
        })
      })
    })
  })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
