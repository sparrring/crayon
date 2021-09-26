/* External dependencies */
import { configureStore } from '@reduxjs/toolkit'

/* Internal dependencies */
import counterReducer from 'Features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
