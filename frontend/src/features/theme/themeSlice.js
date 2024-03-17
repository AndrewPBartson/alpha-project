import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state) => {
      console.log('setTheme:', state.theme)
      if (state.theme === 'dark') {
        state.theme = 'light'
      } else {
        state.theme = 'dark'
      }
    },
  },
  extraReducers: () => {},
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer
