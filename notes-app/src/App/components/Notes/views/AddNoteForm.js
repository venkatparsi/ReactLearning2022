import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../noteReducer';

const AddNoteForm = () => {
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

	return (
		<div>
		<form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
			<label className='sr-only'>Name</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add Note...'
				value={value}
				onChange={(event) => setValue(event.target.value)}
			></input>

			<button type='submit' className='btn btn-primary mb-2'>
				Submit
			</button>
			<button type='button' className='btn btn-primary mb-2'>
				Cancel
			</button>
		</form>
		</div>
	);
};

export default AddNoteForm;