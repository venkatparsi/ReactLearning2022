
import { createSlice } from '@reduxjs/toolkit';
import { nextItemId } from '../../../shared/utils/utils'


const addArtifactDef = (state,action) =>{
   if(action.payload.type==='note'){
	return addNoteDef = (state, action)
   }else if(action.apyload.type==='subject'){
	return addSubjectDef = (state, action);
   }
}

const addNoteDef = (state, action) => {
	console.log("--->addNote:",state);
	var newState = state.notes.concat({...action.payload,id:nextItemId(state.notes)})	
	console.log("<---addNote after adding:",newState);
    return newState;
}

const addSubjectDef = (state, action) => {
	console.log("--->addSubject:",state);
	var newState = state.concat({...action.payload,id:nextItemId(state)})	
	console.log("<---addSubject after adding:",newState);
    return newState;
}

const updateNoteDef = (state,action) => {
	console.log("--->updateNote entering:",action);
    var newState = state.map( note => {
        if( note.id !== action.payload.id ) return  note; 
        else { note.importance = !note.importance; 
               return note;
       }    
     });
	 console.log("<---updateNote after updating:",newState);
     return newState;
}  

const deleteNoteDef = (state,action) => {

}

const setNotesDef = (state,action) => {
	var newState = action.payload
	return newState;
}

export const noteSlice = createSlice({
	name: 'note',
	initialState: {
		"notes": [{ id: 1,
		  title: 'Section 1: First thing to do', 
		  about: "need to do it",
	      dd: 1, hh:2, mm:12,
		 }],	
		 "subjects": ["english","telugu","maths"]	
	},
	reducers: {
		setNotes: 	setNotesDef,
		addNote:	addNoteDef,
        updateNote: updateNoteDef,
        deleteNote: deleteNoteDef,
		addSubject: addSubjectDef
	}
});


export const { addNote,updateNote,deleteNote,setNotes } = noteSlice.actions;

export default noteSlice.reducer;

