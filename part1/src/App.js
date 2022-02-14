import React from "react";
import { createStore } from 'redux'

const noteReducer = (state = [], action) => {
    if (action.type === 'NEW_NOTE') {
      state.push(action.data)
      return state
    }  
    return state
  }

const store = createStore(noteReducer)


const App = () => (
<p>this is venkat</p>
)
export default App;