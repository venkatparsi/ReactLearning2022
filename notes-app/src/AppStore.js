import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './App/modules/Notes/noteReducerSlice'
import bookReducer from './App/modules/Notes/bookReducerSlice'
import appUiReducer from './App/appUiReducerSlice'
import subjectReducer from './App/modules/Notes/subjectReducerSlice'

export default configureStore({
  reducer: {
        notes:noteReducer,
        appUi:appUiReducer,
        book: bookReducer,
        subjects: subjectReducer
  },
})
