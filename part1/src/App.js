import React, { useState, useEffect } from 'react'
import NotesService from './services/NotesService'
import Note from './components/Note'
import Notification from './components/Notification'
import './index.css'

const App = () => {
 
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    console.log('effect')
    NotesService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    NotesService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
    //setNewNote('')
  }

  const toggleImportanceOf = (id) => {
        console.log(`importance of ${id} needs to be toggled`)
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

    NotesService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
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


  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = 
          showAll ? notes
                  : notes.filter(note => note.important === true)



  return (
    <>
     <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
        <ul>
          {notesToShow.map(note => 
            <Note key={note.id} note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}/> 
           )}
        </ul>
        <form onSubmit={addNote}>
          <input value={newNote}
           onChange={handleNoteChange}/>
          <button type="submit">save</button>
        </form>
      </div>
      <Footer />
      </>
  )
}

const Button = (props) => {
  console.log(props);
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

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