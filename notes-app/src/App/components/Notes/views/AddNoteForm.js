import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showAddNote } from '../../AppUiReducer';
import { addNote } from '../noteReducer';

const AddNoteForm = ({showAddNoteForm}) => {
	const [value, setValue] = useState('');
	const dispatch = useDispatch();

	const onSubmit = (event) => {
		console.log("-->Submitting form")
		event.preventDefault();
		if (value) {
			dispatch(
				addNote({
					title: value,
				})
			);
		}
	};	

	const hideForm= () => {
		dispatch( dispatch(showAddNote(false)))
	}	

	return (				
		<div className='container bg-grey br-1 br-round m-1' style={{display: showAddNoteForm ? "block":"none"}}>
			<form  onSubmit={onSubmit} >
			<div className="mb-3 mt-3">
				<label htmlFor="email" className="form-label">Note:</label>
				<input type="text" className="form-control" placeholder="Enter Note title..."
				 name="note"
				 value={value}
				 onChange={(event) => setValue(event.target.value)}
				 />
			</div>
			<div className="mb-3">
				<label htmlFor="pwd" className="form-label">Description:</label>
				<input type="text" className="form-control" id="pwd" placeholder="Enter Note Description" name="pswd"/>
			</div>
			<div className="form-check mb-3">
				<label className="form-check-label">
				<input className="form-check-input" type="checkbox" name="remember"/> Important  </label>
			</div>
			<button type="submit" className="btn btn-primary">Submit</button>
			<button type='button' className='btn btn-primary m-2' onClick={hideForm} >
				Cancel
			</button>
			</form>
		</div>
	);
};

export default AddNoteForm;