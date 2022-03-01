
import { createSlice } from '@reduxjs/toolkit';
import { nextItemId } from '../../../shared/utils/utils'

const addNoteDef = (state, action) => {
	console.log("--->addNote:",state);
	var newState = state.concat({...action.payload,id:nextItemId(state)})	
	console.log("<---addNote after adding:",newState);
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

export const noteSlice = createSlice({
	name: 'note',
	initialState: [
		{ id: 1, title: 'note1', completed: false },
		{ id: 2, title: 'note2', completed: false },
		{ id: 3, title: 'note3', completed: true },
		{ id: 4, title: 'note4', completed: false },
		{ id: 5, title: 'note5', completed: false },
	],
	reducers: {
		addNote:addNoteDef,
        updateNote: updateNoteDef,
        deleteNote: deleteNoteDef

	}
});


export const { addNote,updateNote,deleteNote } = noteSlice.actions;

export default noteSlice.reducer;
