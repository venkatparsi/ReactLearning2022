import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { showAddNote } from '../../../appUiReducerSlice';
import { addNote } from '../noteReducerSlice';
import Button from '@mui/material/Button';
import { Paper } from "@mui/material";
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
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { addSubject,setSelectedSubject} from '../subjectReducerSlice';
import { addBook,setSelectedBook} from '../bookReducerSlice';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ContentState, convertToRaw } from 'draft-js';
import noteService from '../noteService';
import Snackbar from '@mui/material/Snackbar';


const AddNoteForm = ({ showAddNoteForm,showAlertNotification }) => {
	//let id= useField('text','id','Id');
	const  [title, setTitle] = useState('');
	const [about, setAbout] = useState('');
	const [editorState, setEditorState] = useState(
		() => EditorState.createEmpty(),
	  );

	  let _contentState = ContentState.createFromText('Sample content state');
	  const raw = convertToRaw(_contentState)
	  const [contentState, setContentState] = useState(raw) // ContentState JSON

	  const [id, setId] = useState('');
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
	const [order, setOrder] = useState();
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();

	const hideForm = () => {
		dispatch(showAddNote(false))
	}

	
const saveBook = (type,formData) => {
	const momentNow = moment();
    if (type === 'book') {
        console.log(" ----> dispatching add ",type);
        var bookRelatedPayload ={
            title: formData.get('title'),
            about: formData.get('about'),
			content: formData.get('content'),
			parent:formData.get('parent'),
            createdDate: momentNow.format('DD-MMM-yyyy HH-mm'),
            id:formData.get('id'),
            createdBy: formData.get('createdBy'),
            type:formData.get('type')
        }
        var resultPromise = noteService.add(type,bookRelatedPayload)
        resultPromise.then(response => {
            console.log("       Saved "+type+": ---->",response);
            if(response.isDuplicateFound) {
                dispatch(setSelectedBook(response.data))
                console.log("ID value is",response.data[0].id)
                setId(response.data[0].id);
                setAbout(response.data[0].about);
                setTitle(response.data[0].title);		
				setContent(response.data[0].content);
				setParent(response.data[0].parent);		
                if(response.data[0].createdBy)
                    setCreatedBy(response.data[0].createdBy);
                if(response.data[0].createdDate)
                	setCreatedDate(response.data[0].createdDate);				
            }else{
                dispatch(addBook(response.data))
                alert("Successfully saved .",type);
            }
            })
        console.log(" <---- dispatching add "+type+" end.")
        
    }else{
		console.log("invalid artifact type passed. not saving");
	}

}

	const handleSubmit = (event) => {
		console.log("---->Submitting Form data for:",type);
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const momentNow = moment();
		var addPayload = {
			title: formData.get('title'),
			about: formData.get('about'),
			content: formData.get('content'),
			link: formData.get('link'),
			dd: formData.get('dd'),
			hh: formData.get('hh'),
			mm: formData.get('mm'),
			type: formData.get('type'),
			tags: formData.get('tags'),
			createdDate: momentNow.format('DD-MMM-yyyy HH-mm'),
			id:formData.get('id'),
			createdBy: formData.get('createdBy')
		}
		console.log("      Payload type,val->",addPayload.type,addPayload);

		if (type === 'note') {
			console.log(" ----> dispatching add note.");
			dispatch(
				addNote(addPayload)
			);			
			console.log(" <---- dispatching add note.")
			setCreatedDate(addPayload.createdDate)
		}
		else if (type === 'book'){ saveBook('book',formData)}
		else if (type === 'subject') {
			console.log(" ----> Starting add subject db service.");
			var subjectRelatedPayload ={
				title: formData.get('title'),
			    about: formData.get('about'),
				createdDate: momentNow.format('DD-MMM-yyyy HH-mm'),
				id:formData.get('id'),
				createdBy: formData.get('createdBy'),
				type:formData.get('type')
			}
			var resultPromise = noteService.add('subject',subjectRelatedPayload)
			resultPromise.then(response => {
				console.log("      <--- End Saved Subject in db: ---->",response);
				if(response.isDuplicateFound) {
					dispatch(setSelectedSubject(response.data))
					console.log("Found duplicate subject ID value is",response.data[0].id)
					setId(response.data[0].id);
					setAbout(response.data[0].about);
					setTitle(response.data[0].title);					
					if(response.data[0].createdBy)
						setCreatedBy(response.data[0].createdBy);
					if(response.data[0].createdDate)
					setCreatedDate(response.data[0].createdDate);				
				}else{
					dispatch(addSubject(response.data))
					alert("<---Successfully saved Subject locally.");
				}
				})
			//console.log("    ----->", subjectRelatedPayload);
			console.log(" <---- Ending add subject.")
			
		}
		console.log("<----Submitting form end")
	};

	const handleSnackBarClose = (event)=> {

	}
	const handleBookChange = (event) => {
			setBook(event.target.value);
	};

	const handleSubjectChange = (event) => {
		if(type=='book'){
			setParent(event.target.value)
		}
		setSubject(event.target.value);
	};

	const handleParentChange = (event) => {
		setParent(event.target.value);
	};

	const handleSectionChange = (event) => {
		setSection(event.target.value);
	};

	const isNotRequiredForArtifact = (ele) => {
		//console.log("item,subject:->", ele, ":", type)
		if (type === 'subject') {
			if (ele === 'dd' || ele ==='mm' || ele==='hh' || ele=='tags' || ele=='link'
		|| ele === 'parent' || ele==='content' || ele=='order') return true; 
			
		}
		if (type === 'book') {
			if (ele === 'dd' || ele ==='mm' || ele==='hh' || ele=='tags' || ele=='link' || ele=='order'
		 ) return true; 
			
		}
	}

	useEffect(() => {


	});

	var subjects = useSelector(({subjects}) => {
		    //console.log("Subjects are ....:",subjects);
			return subjects;
	})

	return (
		<Container component="main" maxWidth="xs" sx={{ padding: "5px" }}
			style={{ display: showAddNoteForm ? "block" : "none" }}>
				
				<Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        message="Note archived"
      />

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
									//console.log("Radio:", event.target.value);
									setType(event.target.value)
								}}
							>
								<FormControlLabel  value="note" control={<Radio />} label="Note" />
								<FormControlLabel value="section" control={<Radio />} label="Section" />
								<FormControlLabel  value="book" control={<Radio />} label="Book" />
								<FormControlLabel  value="subject" control={<Radio />} label="Subject" />

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
								{subjects.subjects.map(item =>
          								<MenuItem key={item.value} value={item.title}>{item.title}</MenuItem>
        						)}
								
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

						<TextField style={{ display: isNotRequiredForArtifact('parent') ? 'none' : '' }}
							margin="normal" 
							disabled
							id="parent"
							label="Parent"
							name="parent"							
							fullWidth
							value={parent}
							onChange={(event) => setParent(event.target.value)}
						/>

						<TextField 
							margin="normal"
							required
							fullWidth
							id="title"
							label="Title/Name"
							name="title"
							autoFocus
							value={title}
							onChange={(event) => setTitle(event.target.value)}
						/>
						<TextField style={{ display: isNotRequiredForArtifact('about') ? 'none' : '' }}
							margin="normal"
							required
							fullWidth
							id="about"
							label="About"
							name="about"
							value={about}
							onChange={(event) => setAbout(event.target.value)}
						/>
						<TextField style={{ display: isNotRequiredForArtifact('content') ? 'none' : '' }}
							margin="normal"
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
						<TextField style={{ display: isNotRequiredForArtifact('link') ? 'none' : '' }}
							margin="normal"
							fullWidth
							id="link"
							label="Media Url"
							name="link"
							autoComplete="link"
							value={link}
							onChange={(event) => setLink(event.target.value)}
						/>
					
					   <TextField style={{ display: isNotRequiredForArtifact('order') ? 'none' : '' }}
							margin="normal"
							fullWidth
							id="order"
							label="Order"
							name="order"
							value={order}
							onChange={(event) => setOrder(event.target.value)}
						/>
					

						<Grid container style={{ display: isNotRequiredForArtifact('dd') ? 'none' : '' }}
							direction="row"
							justifyContent="flex-start"
							alignItems="flex-start"
							sx={{ my: 1 }}
							columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

							<Grid item xs={4}>
								<TextField style={{ display: isNotRequiredForArtifact('dd') ? 'none' : '' }}
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
								<TextField style={{ display: isNotRequiredForArtifact('hh') ? 'none' : '' }}
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
								<TextField style={{ display: isNotRequiredForArtifact('mm') ? 'none' : '' }}
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

						<TextField style={{ display: isNotRequiredForArtifact('tags') ? 'none' : '' }}
							margin="normal"
							id="tag"
							label="Tags"
							name="tags"
							autoComplete="tags"
							fullWidth
							value={tags}
							onChange={(event) => setTags(event.target.value)}
						/>

						<TextField style={{ display: isNotRequiredForArtifact('id') ? 'none' : '' }}
							margin="normal"
							id="id"
							label="Id"
							name={id.name}
							fullWidth
							disabled
							value={id}
							onChange={id.onChange}
						/>

						<TextField style={{ display: isNotRequiredForArtifact('createdDate') ? 'none' : '' }}
							margin="normal"
							id="tag"
							label="Created Date"
							name="createdDate"
							fullWidth
							disabled
							value={createdDate}
							onChange={(event) => setCreatedDate(event.target.value)}
						/>

						<TextField style={{ display: isNotRequiredForArtifact('createdBy') ? 'none' : '' }}
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
							>SaveAs</Button>
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