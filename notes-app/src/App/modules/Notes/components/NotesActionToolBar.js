import { Stack ,Button} from '@mui/material';
import { useDispatch } from 'react-redux';
import { showAddNote } from '../../../appUiReducerSlice';
import { FormattedMessage } from 'react-intl';
import { useTranslation,Trans } from 'react-i18next';
var dispatch;

const showAddNoteForm = () => {
    console.log("-->ShowAddNoteForm");
    dispatch(showAddNote(true));
    console.log("<--ShowAddNoteForm");
}
const NotesActionsBar =() => {
     dispatch = useDispatch();
     const {t} = useTranslation();

    return(
       <Stack direction="row" spacing={2} marginBottom={0}>            
             <Button variant="contained"
             onClick={showAddNoteForm}>
                 <FormattedMessage   id="Home.addArtifact"  defaultMessage=" Add Note" />
                 </Button>
        </Stack>
    )
}
export default NotesActionsBar;