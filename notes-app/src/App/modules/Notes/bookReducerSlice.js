import { createSlice } from '@reduxjs/toolkit';
import { checkDuplicateExists} from '../../../shared/utils/utils'

const addBookDef = (state, action) => {
    var artifact = "books";
	console.log("    ---> starting addBook state change:",JSON.stringify(state),action);
	var newState = null;
	var artifactAlreadyExists = checkDuplicateExists(state,action,"items","title");
	if(artifactAlreadyExists==null){
	    let newItems = state.items.concat(action.payload);
		newState = {"items":newItems,selectedBook:state.selectedBook}
		console.log("    <--ending add"+artifact+" state change: New Item ADDED:",newState)
    	return newState;
      }		
	else{
		console.log("   <--ending "+artifact+" state change: (already exists) SO NOT ADDED");
		return state;	
	}
}

const setBooksDef = (state,action) => {
	var newState = {"items":action.payload,"selectedBook":state.selectedBook}
	console.log("SETTING_BOOKS______...",action.payload)	
	console.log("Setting books NEW STATE:",newState)
	return newState;	
}

const setSelectedBookDef= (state,action) =>{
	//not modifying the state.subjects.. only selectedSubject is new.
   var newState = {"items":state.items, selectedBook:action.payload}
   console.log("Set selected book ...:",newState)
   return newState;
}

export const bookSlice = createSlice({
	name: 'books',
	initialState: {
		selectedBook: {
			id:1,
			title:'Sanskrit',
			about:'test',
			type:'book'
		},
	
	items:[
		{ id: 1,
		  title: 'React Reciepes', 
		  about: "Learn React interactively and precisely in timely fashion"		 	 	
		}
	]},
	reducers: {
		setBooks: setBooksDef,
		addBook: addBookDef,
		setSelectedBook: setSelectedBookDef		
	}
});

export const { addBook,setBooks,setSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;

