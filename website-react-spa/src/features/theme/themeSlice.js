import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkmode: true,
  },
  reducers: {
    setDarkMode: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.darkmode = true
    },
    setLightMode: (state) => {
      state.darkmode = false
    },
  },
})

export const { setDarkMode, setLightMode } = themeSlice.actions

export default themeSlice.reducer
