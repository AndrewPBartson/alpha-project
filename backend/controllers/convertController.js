const fs = require('fs').promises
const path = require('path')
const xml2js = require('xml2js')
const fixJsonData = require('../dataFactory/reformatJson')

// create file paths - * fs needs path to root *

// creating file paths needs to be in a function that is called when the request is made
// that's because the user needs to select the file to view or convert
// the user should see the default file when the page loads, but
// can select another file to view or convert
const opmlFilePath = path.join(
  __dirname,
  '../data/opml/love_power_here_now.opml'
)

const prelimFilePath = path.join(
  __dirname,
  '../data/json_prelim/love_power_here_now_prelim.json'
)

const fixedFilePath = path.join(
  __dirname,
  '../data/json_fixed/love_power_here_now.json'
)

const refactorJson = async (req, res) => {
  // let fixedJson = fixJsonData(prelimJson)

  await fs.readFile(prelimFilePath, 'utf8', (readErr, prelimData) => {
    if (readErr) {
      console.error(readErr)
      res.status(500).send('Server Error - reading prelim JSON')
      return
    }
    const prelimJson = JSON.parse(prelimData)
    // 3) convert preliminary json to fixed json
    const fixedJson = fixJsonData(prelimJson)

    fs.writeFile(fixedFilePath, JSON.stringify(fixedJson), (err) => {
      if (err) {
        console.error(err)
        res.status(500).send('Internal Server Error - writing file')
        return
      }
      // console.log('JSON saved')
      // res.json(result)
    }).then(res.json(fixedJson))
  })
}
// converts opml to prelim json and then to fixed json
const refactorOpml = async (req, res) => {
  console.log('test refactorOpml')
  console.log('opmlFilePath:', opmlFilePath)
  // fs requires path to root of project
  // 1) read OPML (XML) file
  await fs
    .readFile(opmlFilePath, 'utf8', (err, data) => {
      console.log('start readFile')
      if (err) {
        console.error(err)
        res.status(500).send('Server Error - reading OPML')
        return
      }
    })
    .then((data) => {
      // convert OPML data to preliminary json
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
          return fixJsonData(prelimJson)
        }).then((data) => {})
        //   fs.writeFile(fixedFilePath, JSON.stringify(data), (err) => {
        //     if (err) {
        //       console.error(err)
        //       res.status(500).send('Server Error - writing fixed json')
        //       return
        //     }
        //     console.log('fixed JSON saved')
        //     // 3) Send fixed json as response
        //     res.status(200).json(fixedJson)
        //   })
        // })
      })
    })
}

module.exports = {
  refactorJson,
  refactorOpml,
}
