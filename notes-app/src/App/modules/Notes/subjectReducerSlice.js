
import { createSlice } from '@reduxjs/toolkit';
import { nextItemId } from '../../../shared/utils/utils'
import noteService from './noteService';
import { useDispatch } from 'react-redux';





export const initializeSubjects = () => {
	console.log("-->initializeSubjects")
	return async dispatch => {
	  const subjects = await noteService.getAll('subjects')
	  dispatch(setSubjects(subjects))
	  console.log("<--initializeSubjects",subjects)
	}
  }
  

const subjectExists =(state,action) =>{
	console.log("        Checking subject exist ",state,action)
	const subject = state.subjects.filter(element => element.title === action.payload.title);
	console.log("        Subject found ?",subject);
	if(subject.length>0) return subject[0];
	else return null;
}

const addSubjectDef = (state, action,) => {
	console.log("    --->addSubject:",state,action);
	var newState = null;
	var subjectAlreadyExists = subjectExists(state,action);
	if(subjectAlreadyExists==null){		
		//noteService.add('subject',action.payload);
	    let newSubjects = state.subjects.concat(action.payload);
		newState = {"subjects":newSubjects,selectedSubject:state.selectedSubject}
		console.log("New Subject state:",newState)
    	return newState;
      }		
	else{
		console.log("   <--addSubject (already exists) NOT ADDED");
		return state;	
	}
}

const setSelectedSubjectDef= (state,action) =>{
   var newState = {"subjects":state.subjects, slectedSubject:action.payload}
   console.log("Set selected subject def...",newState)
   return newState;
}

const setSubjectsDef = (state,action) =>
{
	console.log("Setting subjects:",state,action.payload)
	var newState = {"subjects":action.payload,"selectedSubject":state.selectedSubject}
	//var newState = [...action.payload];
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

