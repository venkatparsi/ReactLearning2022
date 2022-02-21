import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './App/components/Notes/noteReducer'
export default configureStore({
  reducer: {
        notes:noteReducer,
  },
})

