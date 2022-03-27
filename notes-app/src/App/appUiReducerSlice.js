import { createSlice } from '@reduxjs/toolkit';

const showAddNoteDef = (state, action) => {
	console.log("--->showAddNote:",state);
    //var showAddNote
	var newState = {...state, showAddNote:action};
	console.log("<---showAddNote after setting:",newState);
    return newState;
}

const setVideoLinkDef = (state,action) =>{
	console.log("--->setVideoLink:",state);
	var newState = {...state, videoLink:action.payload};
	console.log("<--- setVideoLink",newState);
	return newState;
}

export const appUiSlice = createSlice({
	name: 'appUi',
	initialState:{
		 showAddNote: false,
		 videoLink: ""		  	
    },
	reducers: {
		showAddNote: showAddNoteDef ,    
		setVideoLink: setVideoLinkDef   
	}
});

export const { showAddNote,setVideoLink } = appUiSlice.actions;

export default appUiSlice.reducer; 