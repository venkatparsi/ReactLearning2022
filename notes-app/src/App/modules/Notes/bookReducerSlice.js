
import { createSlice } from '@reduxjs/toolkit';
import { nextItemId } from '../../../shared/utils/utils'

const addBookDef = (state, action) => {
	console.log("--->addBook:",state);
	var newState = state.concat({...action.payload,id:nextItemId(state)})	
	console.log("<---addBook after adding:",newState);
    return newState;
}

const setBooksDef = (state,action) => {
	var newState = [...action.payload]
	return newState;
}

export const subjectSlice = createSlice({
	name: 'books',
	initialState: [
		{ id: 1,
		  title: 'React Reciepes', 
		  about: "Learn React interactively and precisely in timely fashion",
		  sections:[{
			  notes:[{
				  
			  }]
		  }]		 	
		}
	],
	reducers: {
		setBooks: setBooksDef,
		addBook: addBookDef		
	}
});


export const { addBook,setBooks } = subjectSlice.actions;

export default subjectSlice.reducer;

