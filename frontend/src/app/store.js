import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import treeDataReducer from '../features/tree-data/treeDataSlice'
import fileDataReducer from '../features/file-data/fileDataSlice'
import themeReducer from '../features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    treeData: treeDataReducer,
    fileData: fileDataReducer,
    theme: themeReducer,
  },
})
