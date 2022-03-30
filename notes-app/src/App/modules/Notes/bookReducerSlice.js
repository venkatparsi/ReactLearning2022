
import { createSlice } from '@reduxjs/toolkit';
import { checkDuplicateExists} from '../../../shared/utils/utils'

const addBookDef = (state, action) => {
    var artifact = "books";
	console.log("    ---> starting addBook state change:",state,action);
	var newState = null;
	var artifactAlreadyExists = checkDuplicateExists(state,action,"books","title");
	if(artifactAlreadyExists==null){
	    let newItems = state[artifact].concat(action.payload);
		newState = {"book":newItems,selectedBook:state.selectedBook}
		console.log("    <--ending add"+artifact+" state change: New Item ADDED:",newState)
    	return newState;
      }		
	else{
		console.log("   <--ending "+artifact+" state change: (already exists) SO NOT ADDED");
		return state;	
	}

}

const setBooksDef = (state,action) => {
	var newState = [...action.payload]
	return newState;
}


const setSelectedBookDef= (state,action) =>{
	//not modifying the state.subjects.. only selectedSubject is new.
   var newState = {"books":state.books, slectedBook:action.payload}
   console.log("Set selected book ...",newState)
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
	
	books:[
		{ id: 1,
		  title: 'React Reciepes', 
		  about: "Learn React interactively and precisely in timely fashion",
		  sections:[{
			  notes:[{
				  
			  }]
		  }]		 	
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

