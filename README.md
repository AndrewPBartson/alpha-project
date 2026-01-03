# Alpha Project

Consists of backend and frontend, each with their own README file.

## The Big Picture

### Backend

#### Data factory

- does several conversions starting with an outline file (.opml) and producing a json file that is specially formatted.

### Frontend

#### JSON Viewer

The user interface is built in React and allows the user to select and view a json file that is in "tree" format.

#### Source of outline data (opml)

A file in a proprietary format (.mmap) is manually exported from MindManager software (by Mindjet) as an Outline Processor Markup Language (.opml) file.

#### Status

- Decisions are needed about access to the advanced features. Random users should not be able to write files. One option is to lock access to certain features. Another option is to move the advanced features to a separate secure project.

- Problem:

  - Currently opml files are manually converted by hardcoding the name of the opml file to convert (manually). This is inefficient and needs to be improved.

  Potential solution -

  - There is an "Update files" button that initiates a check of the opml files to determine if each one has .json version. If any json versions are missing, the opml conversion process should be executed.
