import React, { useState } from 'react';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { showAddNote } from '../../../appUiReducerSlice';
import { addNote } from '../noteReducerSlice';
import Button from '@mui/material/Button';
import { Paper } from "@mui/material";
import { useTranslation, Trans } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import InputLabel from '@mui/material/InputLabel';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { addSubject} from '../subjectReducerSlice';
import noteService from '../noteService';

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
	const [about, setAbout] = useState('');
	const [link, setLink] = useState('');
	const [dd, setDD] = useState('');
	const [hh, setHH] = useState('');
	const [mm, setMM] = useState('');
	const [type, setType] = useState('');
	const [book, setBook] = useState('');
	const [content, setContent] = useState('');
	const [tags, setTags] = useState('');
	const [subject, setSubject] = useState('');
	const [parent, setParent] = useState('');
	const [section, setSection] = useState('');
	const [createdDate, setCreatedDate] = useState('');
	const [createdBy, setCreatedBy] = useState('venkat.r.parsi');
	const [id,setId] = useState(0);
	const dispatch = useDispatch();

	const hideForm = () => {
		dispatch(showAddNote(false))
	}

	const handleSubmit = (event) => {
		console.log("---->Submitting Form data for:",type);
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const momentNow = moment();

		var addPayload = {
			title: data.get('title'),
			about: data.get('about'),
			content: data.get('content'),
			link: data.get('link'),
			dd: data.get('dd'),
			hh: data.get('hh'),
			mm: data.get('mm'),
			type: data.get('type'),
			tags: data.get('tags'),
			createdDate: momentNow.format('DD-MMM-yyyy HH-mm'),
			id:data.get('id'),
			createdBy: data.get('createdBy')
		}
		console.log("Payload type,val->",addPayload.type,addPayload);

		if (type === 'note') {
			console.log(" ----> dispatching add note.");
			dispatch(
				addNote(addPayload)
			);
			console.log("    ----->", addPayload);
			console.log(" <---- dispatching add note.")
			setCreatedDate(addPayload.createdDate)
		}
		if (type === 'subject') {
			console.log(" ----> dispatching add subject.");
			noteService.add("subject",addPayload,dispatch);
			console.log("    ----->", addPayload);
			console.log(" <---- dispatching add subjct end.")
			setCreatedDate(addPayload.createdDate)
		}
		console.log("<----Submitting form end")
	};

	const handleBookChange = (event) => {
		setBook(event.target.value);
	};

	const handleSubjectChange = (event) => {
		setSubject(event.target.value);
	};

	const handleParentChange = (event) => {
		setParent(event.target.value);
	};

	const handleSectionChange = (event) => {
		setSection(event.target.value);
	};

	const handleIdChange = (event) => {
		setId(event.target.value);
	};

	const checkVisibilityForArtifact = (ele) => {
		//console.log("item,subject:->", ele, ":", type)
		if (type === 'subject') {
			if (ele === 'dd' || ele ==='mm' || ele==='hh' || ele=='tags' || ele=='link'
		|| ele === 'parent' || ele =='about' || ele==='content') return true; //parent' || 'dd' || 'hh' || 'mm' || 'tags') return false;
			
		}
	}


	return (
		<Container component="main" maxWidth="xs" sx={{ padding: "5px" }}
			style={{ display: showAddNoteForm ? "block" : "none" }}>
				
			<Paper elevation={1}>
				<Box
					sx={{
						marginTop: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						padding: '10px'
					}}
				>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0 }}>
						<FormControl >
							<FormLabel id="demo-radio-buttons-group-label"></FormLabel>
							<RadioGroup row required style={{ padding: '0px', margin: "0px" }}
								aria-labelledby="demo-radio-buttons-group-label"
								defaultValue="note"
								name="type"
								onChange={(event) => {
									console.log("Radio:", event.target.value);
									setType(event.target.value)
								}}
							>
								<FormControlLabel value="note" control={<Radio />} label="Note" />
								<FormControlLabel value="section" control={<Radio />} label="Secti" />
								<FormControlLabel value="book" control={<Radio />} label="Book" />
								<FormControlLabel value="subject" control={<Radio />} label="Subj" />

							</RadioGroup>
						</FormControl>
						
						<FormControl sx={{ m: 1 }} variant="standard" style={{ display: type === 'note' || type === 'section' || type === 'subject' ? 'none' : '' }}>
							<InputLabel id="demo-simple-select-helper-label">Subject</InputLabel>
							<Select
								labelId="demo-simple-select-helper-label"
								id="demo-simple-select-helper"
								value={subject}
								label="Subject"
								onChange={handleSubjectChange}
							>
								<MenuItem value="none" selected>
									<em>None</em>
								</MenuItem>
								<MenuItem value="english">English</MenuItem>
								<MenuItem value="css">CSS</MenuItem>
								<MenuItem value="react">React</MenuItem>
								<MenuItem value="personal">Personal</MenuItem>
								{//this.props.items.map(item =>
          								//<MenuItem key={item.value} {...item} />
        						//)}
								}
							</Select>
							<FormHelperText>Select or Default Subject</FormHelperText>
						</FormControl>
						<FormControl sx={{ m: 1 }} variant="standard" style={{ display: type === 'book' || type === 'subject' ? 'none' : '' }}>
							<InputLabel id="demo-simple-select-helper-label">Book</InputLabel>
							<Select
								labelId="demo-simple-select-helper-label"
								id="demo-simple-select-helper"
								value={book}
								label="Book"
								onChange={handleBookChange}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Todos</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
							<FormHelperText>Select or Default Book</FormHelperText>
						</FormControl>
						<FormControl sx={{ m: 1 }} variant="standard" style={{ display: type === 'book' || type === 'section' || type === 'subject' ? 'none' : '' }}>
							<InputLabel id="demo-simple-select-helper-label">Section</InputLabel>
							<Select
								labelId="demo-simple-select-helper-label"
								id="demo-simple-select-helper"
								value={section}
								label="Section"
								onChange={handleSectionChange}
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

						<TextField style={{ display: checkVisibilityForArtifact('parent') ? 'none' : '' }}
							margin="normal" disabled="true"
							required
							id="subject"
							label="Parent"
							name="parent"
							autoComplete="parent"
							fullWidth
							value={tags}
							onChange={(event) => setParent(event.target.value)}
						/>

						<TextField 
							margin="normal"
							required
							fullWidth
							id="title"
							label="Title/Name"
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
							onChange={(event) => setAbout(event.target.value)}
						/>
						<TextField style={{ display: checkVisibilityForArtifact('content') ? 'none' : '' }}
							id="standard-multiline-flexible"
							label="Content"
							multiline
							fullWidth
							rows={4}
							name="content"
							value={content}
							onChange={(event) => setContent(event.target.value)}
							variant="outlined"
						/>
						<TextField style={{ display: checkVisibilityForArtifact('link') ? 'none' : '' }}
							margin="normal"
							fullWidth
							id="link"
							label="Media Url"
							name="link"
							autoComplete="link"
							value={link}
							onChange={(event) => setLink(event.target.value)}
						/>

						<input
							accept="image/*"
							style={{ display: 'none' }}
							id="raised-button-file"
							multiple
							type="file"
						/>
						<label htmlFor="raised-button-file" style={{ display: checkVisibilityForArtifact('link') ? 'none' : '' }}>
							<Button variant="contained" component="span">
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
								<TextField style={{ display: checkVisibilityForArtifact('dd') ? 'none' : '' }}
									margin="normal"
									id="link"
									label="Days:dd"
									name="dd"
									autoComplete=""
									autoFocus
									value={dd}
									onChange={(event) => setDD(event.target.value)}
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField style={{ display: checkVisibilityForArtifact('hh') ? 'none' : '' }}
									margin="normal"
									id="link"
									label="Hour:hh"
									name="hh"
									autoComplete=""
									autoFocus
									value={hh}
									onChange={(event) => setHH(event.target.value)}
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField style={{ display: checkVisibilityForArtifact('mm') ? 'none' : '' }}
									margin="normal"
									id="link"
									label="Min:mm"
									name="mm"
									autoComplete=""
									autoFocus
									value={mm}
									onChange={(event) => setMM(event.target.value)}
								/>
							</Grid>
						</Grid>

						<TextField style={{ display: checkVisibilityForArtifact('tags') ? 'none' : '' }}
							margin="normal"
							id="tag"
							label="Tags"
							name="tags"
							autoComplete="tags"
							fullWidth
							value={tags}
							onChange={(event) => setTags(event.target.value)}
						/>

						<TextField style={{ display: checkVisibilityForArtifact('id') ? 'none' : '' }}
							margin="normal"
							id="id"
							label="Id"
							name="id"
							fullWidth
							disabled
							value={id}
							onChange={(event) => setId(event.target.value)}
						/>

						<TextField style={{ display: checkVisibilityForArtifact('createdDate') ? 'none' : '' }}
							margin="normal"
							id="tag"
							label="Created Date"
							name="createdDate"
							fullWidth
							disabled
							value={createdDate}
							onChange={(event) => setCreatedDate(event.target.value)}
						/>

						<TextField style={{ display: checkVisibilityForArtifact('createdBy') ? 'none' : '' }}
							margin="normal"
							required
							id="tag"
							label="Created By"
							name="createdBy"
							autoComplete="createdBy"
							disabled
							fullWidth
							value={createdBy}
							onChange={(event) => setCreatedBy(event.target.value)}
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
							>Save</Button>
							<Button
								type="submit"
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								onClick={hideForm}
							>Cancel</Button>
						</Grid>
					</Box>


				</Box>
			</Paper>
		</Container>

	);
};

export default AddNoteForm;