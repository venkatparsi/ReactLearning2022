import { createSlice } from '@reduxjs/toolkit';
import { checkDuplicateExists } from '../../../shared/utils/utils'
import noteService from './noteService';

  
const subjectExists =(state,action) =>{
	return checkDuplicateExists(state,action,'items','title');
}

const addSubjectDef = (state, action,) => {
	var stateObj = JSON.stringify(state);
	console.log("    ---> starting addSubject state change:",stateObj,"Action payload:",action);
	var newState = null;
	var subjectAlreadyExists = subjectExists(state,action);
	if(subjectAlreadyExists==null){
	    let newSubjects = state.items.concat(action.payload);
		newState = {"items":newSubjects,selectedSubject:state.selectedSubject}
		console.log("    <--ending addSubject state change: New Subject ADDED:",newState)
    	return newState;
      }		
	else{
		console.log("   <--ending addSubject state change: (already exists) SO NOT ADDED");
		return state;	
	}
}

const setSelectedSubjectDef= (state,action) =>{
	//not modifying the state.subjects.. only selectedSubject is new.
   var newState = {"items":state.items, selectedSubject:action.payload}
   console.log("Set selected subject def...",newState)
   return newState;
}

const setSubjectsDef = (state,action) =>
{
	console.log("Setting subjects:",JSON.stringify(state),action.payload)
	var newState = {"items":action.payload,"selectedSubject":state.selectedSubject}
	console.log("Setting subjects NEW STATE:",newState)
	return newState;
}

const updateSubjectDef = (state,action) => {
	console.log("--->updateSubject entering:",action);
    var newState = state.map( item => {
        if( item.id === action.payload.id ) return  action.payload; 
        else { return item; }    
     });
	 console.log("<---updateNote after updating:",newState);
     return newState;
}  


export const initializeSubjects = () => {
	console.log("-->initializeSubjects")
	return async dispatch => {
	  const subjects = await noteService.getAll('subjects')
	  dispatch(setSubjects(subjects))
	  console.log("<--initializeSubjects",subjects)
	}
  }

export const subjectSlice = createSlice({
	name: 'subjects',
	initialState: {
		selectedSubject: {
			id:1,
			title:'Sanskrit',
			about:'test',
			type:'subject'
		},
		items:[{ id: 1,
		  title: 'English', 
		  about: "Learn English language interactively and precisely in timely fashion",
		  type:'subject'		  		 	
		}]
	},
	reducers: {	
		initializeSubjects:initializeSubjects,
		addSubject: addSubjectDef,
		setSubjects: setSubjectsDef,		
		setSelectedSubject: setSelectedSubjectDef
	}
});


export const { addSubject,setSubjects, setSelectedSubject } = subjectSlice.actions;

export default subjectSlice.reducer;

