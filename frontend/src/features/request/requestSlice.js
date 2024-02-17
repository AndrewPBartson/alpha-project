import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  json: [],
  jsonFiles: [],
  omplFiles: [],
  status: 'idle',
  error: null,
}

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {},
})

export const {} = requestSlice.actions

export default requestSlice.reducer
