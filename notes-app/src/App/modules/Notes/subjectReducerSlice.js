
import { createSlice } from '@reduxjs/toolkit';
import { checkDuplicateExists } from '../../../shared/utils/utils'
import noteService from './noteService';

export const initializeSubjects = () => {
	console.log("-->initializeSubjects")
	return async dispatch => {
	  const subjects = await noteService.getAll('subjects')
	  dispatch(setSubjects(subjects))
	  console.log("<--initializeSubjects",subjects)
	}
  }
  

const subjectExists =(state,action) =>{
	return checkDuplicateExists(state,action,'subjects','title');
}

const addSubjectDef = (state, action,) => {
	console.log("    ---> starting addSubject state change:",state,action);
	var newState = null;
	var subjectAlreadyExists = subjectExists(state,action);
	if(subjectAlreadyExists==null){
	    let newSubjects = state.subjects.concat(action.payload);
		newState = {"subjects":newSubjects,selectedSubject:state.selectedSubject}
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
   var newState = {"subjects":state.subjects, slectedSubject:action.payload}
   console.log("Set selected subject def...",newState)
   return newState;
}

const setSubjectsDef = (state,action) =>
{
	console.log("Setting subjects:",state,action.payload)
	var newState = {"subjects":action.payload,"selectedSubject":state.selectedSubject}
	console.log("Setting subjects NEW STATE:",newState)
	return newState;
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
		subjects:[{ id: 2,
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

