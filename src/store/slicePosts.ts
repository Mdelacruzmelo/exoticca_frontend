/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PostFilter } from 'types'

// Define a type for the slice state
interface PostsState {
  filter: PostFilter
}

// Define the initial state using that type
const initialState: PostsState = {
  filter: {
    title: null,
    authorId: null
  }
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostFilter: (state, action: PayloadAction<PostFilter>) => {
      state.filter = action.payload
    }
  }
})

export const { setPostFilter } = postsSlice.actions

export default postsSlice.reducer
