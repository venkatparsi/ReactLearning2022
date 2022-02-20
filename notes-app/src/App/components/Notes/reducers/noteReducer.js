import { noteActionTypes,notesActionCreator } from "../noteActions";


function nextItemId(appStore) {
    const maxId = appStore.reduce((maxId, storeItem) => Math.max(storeItem.id, maxId), -1)
    return maxId + 1
  }


const noteReducer = (state = [], action) => {
    
    switch(action.type){
        case noteActionTypes.NEW_NOTE:
            // Use an auto-incrementing numeric ID 
            return state.concat(
                {   ...action.payload,
                    id:nextItemId(state)
                });
        case noteActionTypes.UPDATE_NOTE:
            /*var newState =  Object.values(state); // [...state]
            var updatableNote = state.find((n) => { n.id === action.data.id });
            updatableNote.important = !updatableNote.important;*/            
            var newState = state.map( note => {
               if( note.id !== action.payload.id ) return  note; 
               else { note.importance = !note.importance; 
                      return note;
              }    
            });
            return newState;          
        default: return state;
  }
}
export default noteReducer;