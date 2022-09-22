/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface DrawerState {
  opened: boolean
}

// Define the initial state using that type
const initialState: DrawerState = {
  opened: false
}

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggle: (state) => {
      state.opened = !state.opened
    },
    open: (state) => {
      state.opened = true
    },
    close: (state) => {
      state.opened = false
    }
  }
})

export const { toggle, open, close } = drawerSlice.actions

export default drawerSlice.reducer
