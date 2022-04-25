
import { createSlice } from '@reduxjs/toolkit';
import { checkDuplicateExists} from '../../../shared/utils/utils'

const addChapterDef = (state, action) => {
    var artifact = "chapter";
	console.log("    ---> starting addBook state change:",state,action);
	var newState = null;
	var artifactAlreadyExists = checkDuplicateExists(state,action,"chapters","title");
	if(artifactAlreadyExists==null){
	    let newItems = state[artifact].concat(action.payload);
		newState = {"items":newItems,selectedBook:state.selectedBook}
		console.log("    <--ending add"+artifact+" state change: New Item ADDED:",newState)
    	return newState;
      }		
	else{
		console.log("   <--ending "+artifact+" state change: (already exists) SO NOT ADDED");
		return state;	
	}

}

const setChaptersDef = (state,action) => {
	var newState = {"items":action.payload,"selectedChapter":state.selectedChapter}
	console.log("SETTING_BOOKS______...",action.payload)	
	console.log("Setting books NEW STATE:",newState)
	return newState;	
}


const setSelectedChapterDef= (state,action) =>{
	//not modifying the state.subjects.. only selectedSubject is new.
   var newState = {"items":state.items, selectedChapter:action.payload}
   console.log("Set selected chapter ...:",newState)
   return newState;
}

export const chapterSlice = createSlice({
	name: 'chapters',
	initialState: {
		selectedChapter: {
			id:1,
			title:'Installing React',
			about:'System Setup with nodejs,npm,vscode',
			type:'chapter'
		},
	
	items:[
		{ id: 1,
		  title: 'Installing react', 
		  about: "Learn React interactively and precisely in timely fashion"		 	 	
		}
	]},
	reducers: {
		setChapters: setChaptersDef,
		addChapter: addChapterDef,
		setSelectedChapter: setSelectedChapterDef		
	}
});


export const { addChapter,setChapters,setSelectedChapter } = chapterSlice.actions;

export default chapterSlice.reducer;

