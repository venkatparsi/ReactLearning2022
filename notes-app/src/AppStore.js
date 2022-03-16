import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './App/modules/Notes/noteReducerSlice'
import appUiReducer from './App/appUiReducerSlice'

export default configureStore({
  reducer: {
        notes:noteReducer,
        appUi:appUiReducer
  },
})
