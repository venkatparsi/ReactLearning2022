import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import noteService from '../noteService';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchOutlined from '@mui/icons-material/SearchOutlined';

import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Paper } from "@mui/material";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, options, appState,...other} = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    appState['type']=event.target.value;
    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Select Artifact</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option.toLowerCase()}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function ConfirmationDialog({appState}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Dione');
  const options = [
    'Note',
    'Book',
    'Subject',
    'Chapter',
    'Title'
  ];
  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
   <>
     <Paper
				component="form"
				sx={{ marginTop: 0, p: '4px 2px', display: 'flex', alignItems: 'center', width: '100%' }}
			>
				<IconButton sx={{ p: '2px' }} aria-label="menu" onClick={handleClickListItem}>
					<ManageSearchIcon />
				</IconButton>
				
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder="Search Title"
					inputProps={{ 'aria-label': 'search google maps' }}
				/>
				<IconButton type="button" sx={{ p: '2px' }} aria-label="search">
					<SearchIcon />
				</IconButton>
				
			</Paper>
      <ConfirmationDialogRaw appState={appState}
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
          options={options}
        />
 </>
  );
}
