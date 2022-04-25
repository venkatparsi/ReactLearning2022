import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './App/modules/Notes/noteReducerSlice'
import bookReducer from './App/modules/Notes/bookReducerSlice'
import appUiReducer from './App/appUiReducerSlice'
import subjectReducer from './App/modules/Notes/subjectReducerSlice'
import chapterReducerSlice from './App/modules/Notes/chapterReducerSlice'

export default configureStore({
  reducer: {
        notes:noteReducer,
        appUi:appUiReducer,
        books: bookReducer,
        subjects: subjectReducer,
        chapters:chapterReducerSlice
  },
})
