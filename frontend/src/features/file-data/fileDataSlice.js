import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  fileData: [],
  status: 'idle',
  error: null,
}

// Async thunk to fetch data from the API
export const fetchFileData = createAsyncThunk(
  'fileData/fetchData',
  async () => {
    const response = await axios.get('http://localhost:5470/listJsonFiles')
    return response.data
  }
)

const fileDataSlice = createSlice({
  name: 'fileData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFileData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchFileData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.treeData = action.payload
      })
      .addCase(fetchFileData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const {} = fileDataSlice.actions

export default fileDataSlice.reducer
