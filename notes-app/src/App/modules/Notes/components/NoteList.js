import React from 'react'
import { useSelector } from 'react-redux'
import Note from './Note'
import Section from './Section'

const NoteList = () => {
    //const notes = useSelector()
    const notesStore = useSelector((state) => state.notes);
    console.log("State,notes:-->",JSON.stringify(notesStore))
    // since `notes` is an array, we can loop over it    
  return <ul className="note-list">{
   notesStore.items.map(note => {
     return (<Note key={note.id} note={note} />)
  })
}
   
</ul>
}

export default NoteList;