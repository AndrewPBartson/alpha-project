import { configureStore } from '@reduxjs/toolkit'
import treeDataReducer from '../features/tree-data/treeDataSlice'
import fileDataReducer from '../features/file-data/fileDataSlice'
import themeReducer from '../features/theme/themeSlice'
import projectsReducer from '../features/projects/projectsSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    treeData: treeDataReducer,
    fileData: fileDataReducer,
    theme: themeReducer,
    projects: projectsReducer,
    auth: authReducer,
  },
  devTools: {
    name: 'starlight-warrior', // name of instance in Redux DevTools
  },
})
