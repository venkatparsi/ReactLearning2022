
import { createSlice } from '@reduxjs/toolkit';
import { nextItemId } from '../../../shared/utils/utils'

const addSubjectDef = (state, action) => {
	console.log("--->addSubject:",state);
	var newState = state.concat({...action.payload,id:nextItemId(state)})	
	console.log("<---addSubject after adding:",newState);
    return newState;
}

const setSubjectsDef = (state,action) => {
	var newState = [...action.payload]
	return newState;
}

export const subjectSlice = createSlice({
	name: 'subject',
	initialState: [
		{ id: 1,
		  title: 'English', 
		  about: "Language"
		 },		
	],
	reducers: {
		setSubjects: 	setSubjectsDef,
		addSubject: addSubjectDef
	}
});


export const { addSubject,setSubjects } = subjectSlice.actions;

export default subjectSlice.reducer;

