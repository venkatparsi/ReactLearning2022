
import { createSlice } from '@reduxjs/toolkit';
import { nextItemId } from '../../../shared/utils/utils'
import noteService from './noteService';


const subjectExists =(state,action) =>{
	console.log("Checking subject exist state,action:",state,action)
	const subject = state.filter(element => element.title === action.payload.title);
	console.log("Subject found ?",subject);
	if(subject.length>0) return subject[0];
	else return null;

}

const addSubjectDef = (state, action) => {
	console.log("--->addSubject:",state,action);
	var newState = null;
	var newItem = null;
	var subjectAlreadyExists = subjectExists(state,action);
	if(subjectAlreadyExists==null){
		//var nextId = nextItemId(state);
		console.log("state:",state);
		//newItem = {...action.payload,id:nextId};
	    newState = state.concat(action.payload);
    	return newState;
      }		
	else{
		console.log("<--addSubject (already exists)",newState);
		return state;	
	}
}

const setSubjectsDef = (state,action) =>
{
	console.log("Setting subjects:",state,action.payload)
	var newState = [...action.payload];
	return newState;
}


export const subjectSlice = createSlice({
	name: 'subjects',
	initialState: [
		{ id: 1,
		  title: 'English', 
		  about: "Learn English language interactively and precisely in timely fashion"		  		 	
		}
	],
	reducers: {	
		addSubject: addSubjectDef,
		setSubjects: setSubjectsDef		
	}
});


export const { addSubject,setSubjects } = subjectSlice.actions;

export default subjectSlice.reducer;

