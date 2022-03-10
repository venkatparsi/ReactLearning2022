import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showAddNote } from '../../AppUiReducer';
import { addNote } from '../noteReducer';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { Paper } from "@mui/material";
import { useTranslation, Trans } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import InputLabel from '@mui/material/InputLabel';

import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
	'label + &': {
		marginTop: theme.spacing(3),
	},
	'& .MuiInputBase-input': {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 26px 10px 12px',
		textWrap: 'wrap',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:focus': {
			borderRadius: 4,
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
}));

const AddNoteForm = ({ showAddNoteForm }) => {
	const [value, setValue] = useState('');
	const [about, setDesc] = useState('');
	const [link, setLink] = useState('');
	const [dd, setDD] = useState('');
	const [hh, setHH] = useState('');
	const [mm, setMM] = useState('');
	const [section, setSection] = useState('');
	const [age, setAge] = useState('');
	const [content, setContent] = useState('');

	const { t } = useTranslation();

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
		dispatch(showAddNote(false))
	}


	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		});
	};

	const handleAgeChange = (event) => {
		setAge(event.target.value);
	};

	return (

		<Container component="main" maxWidth="xs" sx={{ padding: "5px" }} >
			<Paper elevation={1}>
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						padding: '10px'
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<AddIcon />
					</Avatar>



					<FormControl >
						<FormLabel id="demo-radio-buttons-group-label"></FormLabel>
						<RadioGroup row required
							aria-labelledby="demo-radio-buttons-group-label"
							defaultValue="note"
							name="radio-buttons-group"
						>

							<FormControlLabel value="note" control={<Radio />} label="Note" />
							<FormControlLabel value="section" control={<Radio />} label="Section" />
							<FormControlLabel value="book" control={<Radio />} label="Book" />

						</RadioGroup>
					</FormControl>

					<Grid >



					</Grid>

					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<FormControl sx={{ m: 1 }} variant="standard">
							<InputLabel id="demo-simple-select-helper-label">Book</InputLabel>
							<Select
								labelId="demo-simple-select-helper-label"
								id="demo-simple-select-helper"
								value={age}
								label="Book"
								onChange={handleAgeChange}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
							<FormHelperText>Select or Default Book</FormHelperText>
						</FormControl>
						<FormControl sx={{ m: 1 }} variant="standard">
							<InputLabel id="demo-simple-select-helper-label">Section</InputLabel>
							<Select
								labelId="demo-simple-select-helper-label"
								id="demo-simple-select-helper"
								value={age}
								label="Section"
								onChange={handleAgeChange}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
							<FormHelperText>Select or Default section</FormHelperText>
						</FormControl>
						
						<TextField
							margin="normal"
							required
							fullWidth
							id="title"
							label="Title"
							name="title"
							autoComplete="title"
							autoFocus
							value={value}
							onChange={(event) => setValue(event.target.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							id="about"
							label="About"
							name="about"
							autoComplete="about"
							
							value={about}
							onChange={(event) => setValue(event.target.value)}
						/>
						<TextField
							id="standard-multiline-flexible"
							label="Content"
							multiline
							fullWidth							
							rows={4}
							value={content}
							onChange={(event) => setContent(event.target.value)}
							variant="outlined"
						/>
						<TextField
							margin="normal"
							fullWidth
							id="link"
							label="Media Link"
							name="link"
							autoComplete="title"
							
							value={link}
							onChange={(event) => setValue(event.target.value)}
						/>

						<input
							accept="image/*"
							//	className={classes.input}
							style={{ display: 'none' }}
							id="raised-button-file"
							multiple
							type="file"
						/>
						<label htmlFor="raised-button-file">
							<Button variant="contained" component="span"
							//className={classes.button}
							>
								Upload
							</Button>
						</label>

						<Grid container
							direction="row"
							justifyContent="flex-start"
							alignItems="flex-start"
							sx={{ my: 1 }}
							columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

							<Grid item xs={4}>
								<TextField
									margin="normal"
									id="link"
									label="Days:dd"
									name="day"
									autoComplete="title"
									autoFocus
									value={link}
									onChange={(event) => setValue(event.target.value)}
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									margin="normal"
									id="link"
									label="Hour:hh"
									name="link"
									autoComplete="title"
									autoFocus
									value={link}
									onChange={(event) => setValue(event.target.value)}
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									margin="normal"
									id="link"
									label="Min:mm"
									name="link"
									autoComplete="title"
									autoFocus
									value={link}
									onChange={(event) => setValue(event.target.value)}
								/>
							</Grid>
						</Grid>

						<TextField
							margin="normal"
							required
							id="tag"
							label="Tag"
							name="tag"
							autoComplete="tag"
							fullWidth							
							value={value}						
							onChange={(event) => setValue(event.target.value)}
						/>

						<Grid container
							direction="row"
							justifyContent="space-evenly"
							alignItems="flex-start"

							spacing={2}>

							<Button
								type="submit"
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Save
							</Button>
							<Button
								type="submit"
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Cancel
							</Button>

						</Grid>
					

					</Box>


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
											id="hh"
											className="form-control"
											placeholder="hh"
											value={hh}
											onChange={(event) => setHH(event.target.value)} />
									</div>
									<div className='col-4'>
										<input
											type="number" min="0" max="59"
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
							<Stack direction="row" spacing={2} marginBottom={2}>
								<Button variant="contained" >Submit</Button>
								<Button variant="contained" className='mr-2' onClick={hideForm}>Cancel</Button>
							</Stack>
						</form>
					</div>
				</Box>
			</Paper>
		</Container>

	);
};

export default AddNoteForm;