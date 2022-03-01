import { useDispatch } from 'react-redux';
import { showAddNote,showAddSection } from '../../../components/AppUiReducer';

var dispatch;


const showAddSectionForm = () => {
    console.log("-->ShowAddSectionForm");
    dispatch(showAddSection(true));
    console.log("<--ShowAddSectionForm");
}

const showAddNoteForm = () => {
    console.log("-->ShowAddNoteForm");
    dispatch(showAddNote(true));
    console.log("<--ShowAddNoteForm");
}
const NotesActionsBar =() => {
     dispatch = useDispatch();

    return(
        <div >
             <button className="btn btn-primary m-1" 
             onClick={showAddSectionForm}>
                 Add Section</button>
             <button className="btn btn-primary m-1" 
             onClick={showAddNoteForm}>
                 Add Note</button>
        </div>
    )
}
export default NotesActionsBar;