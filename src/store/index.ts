import { configureStore } from '@reduxjs/toolkit'
import drawerReducer from './sliceDrawer'
import usersReducer from './sliceUsers'

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    users: usersReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
