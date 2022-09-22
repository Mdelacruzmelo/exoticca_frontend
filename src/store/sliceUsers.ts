/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from 'types'

// Define a type for the slice state
interface UsersState {
  list: User[]
}

// Define the initial state using that type
const initialState: UsersState = {
  list: []
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.list = action.payload
    }
  }
})

export const { setUsers } = usersSlice.actions

export default usersSlice.reducer
