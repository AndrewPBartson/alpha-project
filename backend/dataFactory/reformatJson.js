const fs = require('fs').promises
let { nanoid } = require('nanoid')

const fixJsonData = (data) => {
  console.log('fixJsonData()')
  // data is json object, not opml object
  let data_body = data.opml.body
  let final_results = []
  final_results[0] = {
    text: data.opml.head[0].title[0],
    styles: '',
    link: '',
    id: nanoid(4),
    outline: [],
    level: 0,
  }

  data_body[0].outline.forEach((item, idx) => {
    // for every item in data_body, create a new level
    final_results[0].outline.push(createLevel(item, 1))
  })
  console.log('final_results', final_results)
  return final_results
}

// recursive function to create a new nested level
const createLevel = (old_item, level) => {
  // construct base item
  let valid_text = ''
  if (old_item && old_item.$) {
    valid_text = old_item.$.text
  }
  let new_item = {
    text: valid_text,
    styles: '',
    link: '',
    id: nanoid(4),
    level: level,
  }
  // if old_item has outline, add outline to new_item
  // and build out new_item.outline using createLevel
  if (old_item.outline) {
    new_item.outline = []
    old_item.outline.forEach((item) => {
      new_item.outline.push(createLevel(item, level + 1))
    })
  }
  return new_item
}

const xmlToJson = (params) => {}

module.exports = fixJsonData
