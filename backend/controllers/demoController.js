// takes filename for .txt file but don't include .txt extension
// I need a version of this controller that opens a json file (project_notes.json) and returns the content

const fs = require('fs')
const path = require('path')

const readFileDemo = (req, res) => {
  console.log('req.body', req.body)
  demoFilePath = path.join(__dirname, '../data/text/')

  fs.readFile(demoFilePath + 'start.txt', 'utf8', (error1, data1) => {
    console.log('data1', data1)
    // 2nd read file depends on 1st read file
    fs.readFile(demoFilePath + data1 + '.txt', 'utf8', (error2, data2) => {
      console.log('data2', data2)
      // console.log('error2', error2)
      fs.readFile(demoFilePath + 'append.txt', 'utf8', (error, data3) => {
        console.log('data3', data3)
        fs.writeFile(
          demoFilePath + 'output.txt',
          `${data2}\n\n${data3}\n\nDate created ${new Date()}`,
          (error4, data4) => {
            res.status(200).json({ readFileDemo: data4 })
          }
        )
      })
    })
  })

  console.log('reading file...')
  // // let fileName = req.body.fileName
  // let fileName = 'indistractable'
  // const jsonData = require(`../data/json_fixed/${fileName}.json`)
}

module.exports = {
  readFileDemo,
}
