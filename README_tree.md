# Creating and Using Nested Data

This application processes and displays a specific type of nested data: non-binary tree data.

This app performs several conversions of non-binary tree data. This type of data is like an outline in which the top level node can have any number of sub-nodes (aka branches). Each sub-node can have zero or more sub-nodes. The conversions are recursive and can handle any branching pattern. This app requires that each node consists of a set of named attributes with string values. I will refer to this data format as nested tree json.

This project displays converted data as a set of clickable elements, comparable to file explorer.

## React front end

The user interface has the following main components -

- DataPanel - a React component that displays one of the available json files. This component knows how to display the json in a nested clickable tree.

- Control Panel -

  - FileSelector for JSON

    - Under construction
    - will have select option list of a set of JSON files on the backend (currently list is hard coded)
    - has a button to load the selected JSON file into the DataPanel (currently file name is hardcoded)

  - FileSelector for OPML

    - Under construction
    - will have a select option list of OPML files on the backend (currently list is hard coded)
    - has a button to convert the OPML file to nested tree json (currently file name is hard coded)

## Express back end

The backend has several APIs -

### API for converting opml to json

- Step 1 - Convert opml to json and save to file. The structure of the resulting json data is not very useable.
- Step 2 - Refactor preliminary version of json to nested tree json so it can be displayed in expandable/collapsible React components. Save the refactored json to file.
  Status - Tested with Postman

### API for loading data for viewing

### Express routes and controllers

#### Messy file conversion route in server.js

- GET - /opml_to_json
  - Status - works as expected in Postman

#### convertRoutes

- POST - /api/convert/refactor_opml
  - not working
- POST - /api/convert/refactor_json
  - not working

#### dataRoutes

- POST /api/data/json

  - Status - works as expected in Postman, accepts fileName in req.body

#### filesRoutes

- GET /api/file_list/opml
  - Status - works as expected in Postman
- GET - /api/file_list/json
  - Status - works as expected in Postman

#### demoRoutes - /api/demo

- POST - /read

#### userRoutes - /api/demo

- POST - /register - no controller

## Proof of Concept - convert opml to nested tree json

1 - In Mind Manager application -

- Save your Mind Manager file (with extension .mmap) in backend/data/mmap/
- Export .mmap file in OPML format (with extension .opml) and save in backend/data/opml

2 - Edit server.js

- In server.js, the file name must be hard coded during development

3 - Call the backend from Postman using this URL -

- GET localhost:5470/opml_to_json
- Result -

3 - The other routes that are supposed to convert OPML to fixed version of JSON are broken. For example -

- localhost:5470/api/convert/refactor_json

### How to obtain .opml data

Most of the data in this app was originally derived from .mmap data from Mind Manager, a proprietary mind mapping application. The .mmap file must be exported as .opml which is Outline Processor Markup Language, an XML format. Unfortunately the conversion from .mmap to .opml requires proprietary software that is not easily bolted on to this app. Therefore this app doesn't provide methods for converting from .mmap to .opml data.

next question for chat gpt

Let's refactor backend server.js into separate modules.

## old todo list

1. Create form(s) that submit selected filename. Filename is selected with radio button.

2. Add filenames to redux store. Map filenames to radio buttons.

3. When .opml file is converted to json, list of json files is refreshed.
