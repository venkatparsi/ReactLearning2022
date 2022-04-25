
import { createSlice } from '@reduxjs/toolkit';
import { checkDuplicateExists } from '../../../shared/utils/utils'
import noteService from './noteService';

const noteExists =(state,action) =>{
	return checkDuplicateExists(state,action,'items','title');
}

const addNoteDef = (state, action,) => {
	var stateObj = JSON.stringify(state);
	console.log("    ---> starting addNote state change:",stateObj,action);
	var newState = null;
	var noteAlreadyExists = noteExists(state,action);
	if(noteAlreadyExists==null){
	    let newNotes = state.items.concat(action.payload);
		newState = {"items":newNotes,selectedNote:state.selectedNote}
		console.log("    <--ending addNote state change: New Note ADDED:",newState)
    	return newState;
      }		
	else{
		console.log("   <--ending addNote state change: (already exists) SO NOT ADDED");
		return state;	
	}
}


const setSelectedNoteDef= (state,action) =>{
	//not modifying the state.subjects.. only selectedSubject is new.
   var newState = {"items":state.items, selectedNote:action.payload}
   console.log("Set selected subject def...",newState)
   return newState;
}


const setNotesDef = (state,action) =>
{
	console.log("Setting notes:",JSON.stringify(state),action.payload)
	var newState = {"items":action.payload,"selectedNote":state.selectedNote}
	console.log("Setting notes NEW STATE:",newState)
	return newState;
}


const updateNoteDef = (state,action) => {
	console.log("--->updateNote entering:",action);
	var newState = state.map( item => {
        if( item.id === action.payload.id ) return  action.payload; 
        else { return item; }    
     });
	 console.log("<---updateNote after updating:",newState);
     return newState;
}  


export const initializeNotes = () => {
	console.log("-->initializeNotes")
	return async dispatch => {
	  const notes = await noteService.getAll('notes')
	  dispatch(setNotes(notes))
	  console.log("<--initializeNotes",notes)
	}
  }


export const noteSlice = createSlice({
	name: 'notes',
	initialState: 
	{
		selectedNote: {
			id:1,
			title:'Test Note',
			about:'test',
			type:'note'
		},
		items:[{ id: 1,
		  title: 'Test Note', 
		  about: "Learn English language interactively and precisely in timely fashion",
		  type:'note'		  		 	
		}]
	}		
	,
	reducers: {
		initializeNotes:initializeNotes,
		setNotes: 	setNotesDef,
		addNote:	addNoteDef,
        updateNote: updateNoteDef,
		setSelectedNote:setSelectedNoteDef        	
	}
});


export const { addNote,updateNote,deleteNote,setNotes } = noteSlice.actions;

export default noteSlice.reducer;

