
const action = (type, payload = {}) => ({ type, payload });

export const noteActionTypes ={
    NEW_NOTE:'NEW_NOTE',
    TOGGLE_IMPORTANCE:"TOGGLE_IMPORTANCE",
    DELETE_NOTE:"DELETE_NOTE",
    UPDATE_NOTE:"UPDATE_NOTE",
    GET_ALL_NOTES:"GET_ALL_NOTES",
    REMOVE_ALL_NOTES:"REMOVE_ALL_NOTES",
    GET_NOTE:"GET_NOTE"
}

export const notesActionCreator = (type,payload) =>{
    switch (type){
        case noteActionTypes.NEW_NOTE : 
        return {
            type: noteActionTypes.NEW_NOTE,
            payload: payload
        } 
        case noteActionTypes.TOGGLE_IMPORTANCE :
            return{
                type:noteActionTypes.TOGGLE_IMPORTANCE,
                payload: payload
            }
        case noteActionTypes.DELETE_NOTE :
            return{
                    type:noteActionTypes.DELETE_NOTE,
                    payload: payload
                }
        case noteActionTypes.UPDATE_NOTE:
                return{
                    type: noteActionTypes.UPDATE_NOTE,
                    payload: payload
            }
            case noteActionTypes.GET_ALL_NOTES:
                return{
                    type: noteActionTypes.GET_ALL_NOTES,
                    payload: payload
            }
            case noteActionTypes.REMOVE_ALL_NOTES:
                return{
                    type: noteActionTypes.REMOVE_ALL_NOTES,
                    payload: payload
            }           
    }
}
