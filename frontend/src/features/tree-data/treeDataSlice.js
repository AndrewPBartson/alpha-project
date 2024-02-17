import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  treeData: [],
  status: 'idle',
  error: null,
}

// Async thunk to fetch data from the API
export const fetchTreeData = createAsyncThunk('data/fetchData', async () => {
  const response = await axios.get('http://localhost:5470/json')
  return response.data
})

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
