import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './App/components/Notes/noteReducer'
import appUiReducer from './App/components/AppUiReducer'

export default configureStore({
  reducer: {
        notes:noteReducer,
        appUi:appUiReducer
  },
})
