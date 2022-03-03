import React from 'react'
import { useSelector } from 'react-redux'

import Note from './Note'

const NoteList = () => {
    //const notes = useSelector()
    const notes = useSelector((state) => state.notes);
    // since `notes` is an array, we can loop over it
  const renderedListItems = notes.map(note => {
    return <Note key={note.id} note={note} />
  })

  return <ul className="note-list">{renderedListItems}</ul>
}

export default NoteList;