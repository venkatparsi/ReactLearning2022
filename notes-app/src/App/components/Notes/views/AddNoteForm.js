import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showAddNote } from '../../AppUiReducer';
import { addNote } from '../noteReducer';

const AddNoteForm = ({ showAddNoteForm }) => {
	const [value, setValue] = useState('');
	const [about, setDesc] = useState('');
	const [link, setLink] = useState('');
	const [dd, setDD] = useState('');
	const [hh, setHH] = useState('');
	const [mm, setMM] = useState('');
	const [section, setSection] = useState('');

	const dispatch = useDispatch();
	const onSubmit = (event) => {
		console.log("-->Submitting form")
		event.preventDefault();
		if (value) {
			dispatch(
				addNote({
					title: value,
					about: about,
					link: link,
					dd: dd,
					hh: hh,
					mm: mm,
					section: section
				})
			);
		}
	};

	const hideForm = () => {
		dispatch(dispatch(showAddNote(false)))
	}

	return (
		<div className='container bg-grey br-1 br-round m-1' style={{ display: showAddNoteForm ? "block" : "none" }}>
			<form onSubmit={onSubmit} >
				<div className="mb-3 mt-3">
					<label htmlFor="note" className="form-label">Title:</label>
					<input type="text" className="form-control" placeholder="Enter  title..."
						name="note"
						value={value}
						onChange={(event) => setValue(event.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="about" className="form-label">About:</label>
					<input type="text" className="form-control" id="about"
						placeholder="Enter About"
						value={about}
						onChange={(event) => setDesc(event.target.value)} />
				</div>
				<div className="mb-3">
					<label htmlFor="link" className="form-label">Link:</label>
					<input type="text" className="form-control" id="link"
						placeholder="Enter Link"
						value={link}
						onChange={(event) => setLink(event.target.value)} />
				</div>
				<div className="mb-3">
					<label htmlFor="Duration" className="form-label">Duration:</label>
					<div className='row'>
						<div className='col-4'>
							<input
							type="number" min="0" max="99" 
							onKeyUp={(event)=> { if(parseInt(event.target.value)>99){ event.target.value =99; return false; }}}
							
							  id="dd" className="form-control"
								maxLength="2"
								placeholder="dd"
								min="0" max="99"
								value={dd}
								onChange={(event) => setDD(event.target.value)} />
						</div>
						<div className='col-4'>
							<input
								type="number" min="0" max="23"
								onKeyUp={(event) => { if (parseInt(event.target.value) > 23) { event.target.value = 23; return false; } }}
								id="hh"
								className="form-control"
								placeholder="hh"
								value={hh}
								onChange={(event) => setHH(event.target.value)} />
						</div>
						<div className='col-4'>
							<input
								type="number" min="0" max="59"
								onKeyUp={(event) => { if (parseInt(event.target.value) > 59) { event.target.value = 59; return false; } }}
								id="mm" className="form-control"
								placeholder="mm"
								value={mm}
								onChange={(event) => setMM(event.target.value)} />
						</div>

					</div>
				</div>
				<div className="form-check mb-3">
					<label className="form-check-label">
						<input className="form-check-input" type="checkbox"
							value={section} onChange={(event) => setSection(event.target.checked)}
							name="section" /> Section  </label>
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