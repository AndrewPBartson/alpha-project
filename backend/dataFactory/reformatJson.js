const fs = require('fs').promises
let { nanoid } = require('nanoid')

const fixJsonData = (data) => {
  // data is json object, not opml object
  let data_body = data.opml.body
  let final_results = []
  final_results[0] = {
    text: data.opml.head[0].title[0],
    styles: '',
    link: '',
    id: nanoid(4),
    outline: [],
  }

  data_body[0].outline.forEach((item, idx) => {
    // for every item in data_body, create a new level
    final_results[0].outline.push(createLevel(item))
  })
  return final_results
}

const createLevel = (old_item) => {
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
  }
  // if old_item has outline, add outline to new_item
  // and build out new_item.outline using createLevel
  if (old_item.outline) {
    new_item.outline = []
    old_item.outline.forEach((item) => {
      new_item.outline.push(createLevel(item))
    })
  }
  return new_item
}

module.exports = fixJsonData
