import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  json: [],
  status: 'idle',
  error: null,
}

const jsonSlice = createSlice({
  name: 'json',
  initialState,
  reducers: {},
})

export const {} = jsonSlice.actions

export default jsonSlice.reducer
