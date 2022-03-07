import { createSlice } from '@reduxjs/toolkit';

const showAddNoteDef = (state, action) => {
	console.log("--->showAddNote:",state);
    //var showAddNote
	var newState = {...state, showAddNote:action};
	console.log("<---showAddNote after setting:",newState);
    return newState;
}

const showAddSectionDef = (state, action) => {
	console.log("--->showAddSection:",state);
	var newState = {...state, showAddSection:action};
	console.log("<---showAddSection after setting:",newState);
    return newState;
}

export const appUiSlice = createSlice({
	name: 'appUi',
	initialState:{
		 showAddNote: false ,
		 showAddSection: false 	
    },
	reducers: {
		showAddNote: showAddNoteDef,
        showAddSection: showAddSectionDef
	}
});

export const { showAddNote,showAddSection } = appUiSlice.actions;

export default appUiSlice.reducer; 