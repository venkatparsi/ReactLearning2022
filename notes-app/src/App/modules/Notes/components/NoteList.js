import React from 'react'
import { useSelector } from 'react-redux'
import Note from './Note'

const NoteList = () => {
    //const notes = useSelector()
    const store = useSelector((state) => state.notes);
    console.log("NoteList notes:-->",store.notes)
    // since `notes` is an array, we can loop over it
  const renderedListItems = store.notes.map(note => {
    return <Note key={note.id} note={note} />
  })

  
  return <ul className="note-list">{
    store.notes.map(note => {
     return <Note key={note.id} note={note} />
  })
}
   
</ul>
}

export default NoteList;