/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Post, PostFilter } from 'types'

// Define a type for the slice state
interface PostsState {
  filter: PostFilter
  detailOpened: boolean
  postDetail: Post | undefined
}

// Define the initial state using that type
const initialState: PostsState = {
  filter: {
    title: null,
    authorId: null
  },
  detailOpened: false,
  postDetail: undefined
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostFilter: (state, action: PayloadAction<PostFilter>) => {
      state.filter = action.payload
    },
    openPostDetail: (state) => {
      state.detailOpened = true
    },
    closePostDetail: (state) => {
      state.detailOpened = false
    },
    setPostDetail: (state, action: PayloadAction<Post | undefined>) => {
      state.postDetail = action.payload
    }
  }
})

export const { setPostFilter, openPostDetail, closePostDetail, setPostDetail } = postsSlice.actions

export default postsSlice.reducer
