# Alpha Project

Consists of backend and frontend, each with their own README file.

## The Big Picture

### Backend

#### Data factory

- does the conversion so that data from a outline file so that the frontend can display it as html.

### Frontend

#### JSON Viewer

Allows user to select and view a json file that is in "tree" format

#### Status

- Inherent limitation: the .mmap file must be exported manually into OPML format.
  The current method is -

- Improvements needed:
  - Currently the name of the opml file to convert is hard coded in backend/server.js. Instead there should be a UI element to select the opml to convert.
  - When a new .opml file is added to backend/data/opml, the opml file should be automatically converted and saved in json_fixed folder.
