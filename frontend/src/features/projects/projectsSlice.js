import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../firebase/init'

import {
  createProject_FS,
  fetchAllProjects_FS,
  updateProject_FS,
  deleteProject_FS,
} from '../../firebase/firestoreProjects'

const initialState = {
  projects: [],
  mode: 'create', // or 'edit'
  currentProjectId: null,
  viewingProjectId: null,
  status: 'idle',
  error: null, // for read-only view
}

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, thunkAPI) => {
    return await fetchAllProjects_FS()
  }
)

export const saveProject = createAsyncThunk(
  'projects/saveProject',
  async (projectData, thunkAPI) => {
    return await createProject_FS(projectData)
  }
)

export const saveProjectUpdate = createAsyncThunk(
  'projects/saveProjectUpdate',
  async ({ id, updates }, thunkAPI) => {
    await updateProject_FS(id, updates)
    return { id, updates }
  }
)

export const removeProject = createAsyncThunk(
  'projects/removeProject',
  async (id, thunkAPI) => {
    await deleteProject_FS(id)
    return id
  }
)

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setMode(state, action) {
      state.mode = action.payload // 'create' or 'edit'
    },
    setCurrentProject(state, action) {
      state.currentProjectId = action.payload // string or null
    },
    setViewingProject(state, action) {
      state.viewingProjectId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.projects = action.payload
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(saveProject.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(saveProject.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.projects.push(action.payload)
      })
      .addCase(saveProject.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(saveProjectUpdate.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(saveProjectUpdate.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { id, updates } = action.payload
        const index = state.projects.findIndex((p) => p.id === id)
        if (index !== -1) {
          state.projects[index] = {
            ...state.projects[index],
            ...updates,
          }
        }
      })
      .addCase(saveProjectUpdate.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(removeProject.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const id = action.payload
        state.projects = state.projects.filter((p) => p.id !== id)

        if (state.currentProjectId === id) state.currentProjectId = null
        if (state.viewingProjectId === id) state.viewingProjectId = null
      })
      .addCase(removeProject.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { setMode, setCurrentProject, setViewingProject } =
  projectsSlice.actions

export default projectsSlice.reducer
