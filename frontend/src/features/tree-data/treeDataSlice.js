import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  treeData: [],
  status: 'idle',
  error: null,
}

// Async thunk to fetch data from the API
export const fetchTreeData = createAsyncThunk(
  'treeData/fetchData',
  async (fileName, { rejectWithValue }) => {
    try {
      console.log('fileName: ', fileName)
      const response = await axios.post(
        'http://localhost:5470/api/data/json',
        fileName
      )
      // The value we return becomes the `fulfilled` action payload
      return response.data
    } catch (err) {
      console.error('fetchTreeData error:', err)
      return rejectWithValue('Failed to load tree data')
    }
  }
)

export const treeDataSlice = createSlice({
  name: 'treeData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreeData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTreeData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.treeData = action.payload
      })
      .addCase(fetchTreeData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default treeDataSlice.reducer
