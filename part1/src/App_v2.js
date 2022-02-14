import React, { useState, useEffect ,useRef} from 'react'
import NotesService from './services/NotesService'
import Note from './components/Note'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import NoteForm from './components/NoteForm'
import './index.css'
import  Counter from './components/Counter'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import NotesReducer from './actions/NotesReducer'

import CounterReducer from './actions/CounterReducer'
const store = createStore(CounterReducer)

const notesStore = createStore(NotesReducer)

const App = () => {
 
  const [notes, setNotes] = useState([])
  const noteFormRef = useRef()  
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  

  useEffect(() => {
    console.log('effect')
    NotesService
    .getAll()
    .then(initialNotes => {
      notesStore.dispatch({
        type: 'SET_NOTES',
        data: initialNotes
      })
      //notesStore.
    })
  }, [])

  console.log('render', notes.length, 'notes')

  const addNote = (noteObject) => {
    //noteFormRef.current.toggleVisibility()
    console.log("NoteStore is:",notesStore.getState())
    NotesService
      .create(noteObject)
      .then(returnedNote => {
        console.log("dispathing new note..",returnedNote)
        //setNotes(notes.concat(returnedNote))
        notesStore.dispatch({
          type: 'NEW_NOTE',
          data: {...returnedNote}
        })
        
      })
  }

  const addNoteEvent = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    console.log("NoteStore is:",notesStore.getState())
    noteObject = {
      
    }
    NotesService
      .create(noteObject)
      .then(returnedNote => {
        console.log("dispathing new note..",returnedNote)
        
        
      })
  }


  const toggleImportanceOf = (id) => {
        console.log(`importance of ${id} needs to be toggled`)
        const note = notesStore.getState().find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

    NotesService
      .update(id, changedNote)
      .then(returnedNote => {
        notesStore.dispatch({
          type: 'TOGGLE_IMPORTANCE',
          data: {...returnedNote}
        })
        //setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error =>{
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !==id))
      })
  }

  const notesToShow = 
          showAll ? notesStore.getState()
                  : notesStore.getState().filter(note => note.important === true)
 
const noteForm = () => (
  <Togglable buttonLabel='Add New note' ref={noteFormRef}>
    {/* NoteForm createNote={addNote} />*/} 
    <form onSubmit={addNote}>
        <input name="note" /> 
        <button type="submit">add</button>
      </form>
  </Togglable>
)

  return (
    <>
   
   
     <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        <div>
        {noteForm()}
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
       
      </div>
        <ul>
          {console.log("Notes to show",notesToShow)}
          {notesToShow.map(note => 
            <Note key={note.id} note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}/> 
           )}
        </ul>  
      </div>      
      <Footer />
      </>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

notesStore.subscribe(() => {
  const storeNow = notesStore.getState()
  console.log(notesStore,"Rendering the app now");
  renderApp();
})

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, @AyushConsulting: 2022</em>
    </div>
  )
}

export default App