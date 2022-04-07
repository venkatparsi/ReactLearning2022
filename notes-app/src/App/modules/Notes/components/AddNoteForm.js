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
import { addSubject, setSelectedSubject } from '../subjectReducerSlice';
import { addBook, setSelectedBook } from '../bookReducerSlice';
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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../../components/TabPanel/TabPanel';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddCommentIcon from '@mui/icons-material/AddComment';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import QuizIcon from '@mui/icons-material/Quiz';
import isFloat from 'validator/lib/isFloat';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isEmail from 'validator/lib/isEmail'
import { isDate } from 'moment-timezone';
import { width } from '@mui/system';
const AddNoteForm = ({ showAddNoteForm, showAlertNotification }) => {
	//let id= useField('text','id','Id');
	const [title, setTitle] = useState('');
	const [about, setAbout] = useState('');
	const fields = ['title', 'about', 'content']

	let imageBase64Stringsep = "";

	const [id, setId] = useState('');
	const [type, setType] = useState('');
	const [content, setContent] = useState('');
	const [parent, setParent] = useState('');
	const [createdDate, setCreatedDate] = useState('');
	const [createdBy, setCreatedBy] = useState('venkat.r.parsi');
	const [order, setOrder] = useState();
	const [open, setOpen] = React.useState(false);
	const dispatch = useDispatch();

	const hideForm = () => {
		dispatch(showAddNote(false))
	}

	const imageUploaded = (e) => {
		e.preventDefault();

		var reader = new FileReader();
		console.log("next");

		reader.onload = function () {
			let base64String = reader.result.replace("data:", "")
				.replace(/^.+,/, "");
			imageBase64Stringsep = base64String;
			// alert(imageBase64Stringsep);
			console.log(base64String);
			setState({ ...state, ['imageUrl']: base64String.substring(0, 20) });
		}
		reader.readAsDataURL(e.target.files[0]);
	}

	const saveBook = (type, formData) => {
		const momentNow = moment();
		if (type === 'book') {
			console.log(" ----> dispatching add ", type);
			var bookRelatedPayload = {
				title: formData.get('title'),
				about: formData.get('about'),
				content: formData.get('content'),
				parent: formData.get('subject'),
				createdDate: momentNow.format('DD-MMM-yyyy HH-mm'),
				id: formData.get('id'),
				createdBy: formData.get('createdBy'),
				type: formData.get('type')
			}
			var resultPromise = noteService.add(type, bookRelatedPayload)
			resultPromise.then(response => {
				console.log("       Saved " + type + ": ---->", response);
				if (response.isDuplicateFound) {
					dispatch(setSelectedBook(response.data))
					console.log("ID value is", response.data[0].id)
					setId(response.data[0].id);
					setAbout(response.data[0].about);
					setTitle(response.data[0].title);
					setContent(response.data[0].content);
					setParent(response.data[0].parent);
					if (response.data[0].createdBy)
						setCreatedBy(response.data[0].createdBy);
					if (response.data[0].createdDate)
						setCreatedDate(response.data[0].createdDate);
				} else {
					dispatch(addBook(response.data))
					alert("Successfully saved .", type);
				}
			})
			console.log(" <---- dispatching add " + type + " end.")

		} else {
			console.log("invalid artifact type passed. not saving");
		}

	}

	const handleSubmit = (event) => {
		console.log("---->Submitting Form data for:", type);
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
			id: formData.get('id'),
			createdBy: formData.get('createdBy')
		}
		console.log("      Payload type,val->", addPayload.type, addPayload);
		if (formData.get('title'))
			if (state['type'] === 'note') {
				console.log(" ----> dispatching add note.");
				dispatch(
					addNote(addPayload)
				);
				console.log(" <---- dispatching add note.")
				setCreatedDate(addPayload.createdDate)
			}
			else if (state['type'] === 'book') { saveBook('book', formData) }
			else if (state['type'] === 'subject') {
				console.log(" ----> Starting add subject db service.");
				var subjectRelatedPayload = {
					title: formData.get('title'),
					about: formData.get('about'),
					createdDate: momentNow.format('DD-MMM-yyyy HH-mm'),
					id: formData.get('id'),
					createdBy: formData.get('createdBy'),
					type: formData.get('type')
				}
				var resultPromise = noteService.add('subject', subjectRelatedPayload)
				resultPromise.then(response => {
					console.log("      <--- End Saved Subject in db: ---->", response);
					if (response.isDuplicateFound) {
						dispatch(setSelectedSubject(response.data))
						console.log("Found duplicate subject ID value is", response.data[0].id)
						setId(response.data[0].id);
						setAbout(response.data[0].about);
						setTitle(response.data[0].title);
						if (response.data[0].createdBy)
							setCreatedBy(response.data[0].createdBy);
						if (response.data[0].createdDate)
							setCreatedDate(response.data[0].createdDate);
					} else {
						dispatch(addSubject(response.data))
						alert("<---Successfully saved Subject locally.");
					}
				})
				//console.log("    ----->", subjectRelatedPayload);
				console.log(" <---- Ending add subject.")

			}
		console.log("<----Submitting form end")
	};

	const handleSnackBarClose = (event) => {

	}
	const handleBookChange = (event) => {
		//setBook(event.target.value);
	};

	const handleSubjectChange = (event) => {
		if (state['type'] === 'book') {
			state['parent'] = (event.target.value)
		}
		//setSubject(event.target.value);
	};

	const validateSubject = (event) => {

	}


	const hideForArtifact = (ele) => {
		//console.log("field,state:->", ele, ":", state)
		if (state.type === 'subject') {
			if (ele === 'dd' || ele === 'mm' || ele === 'hh' || ele === 'tags' || ele === 'link'
				|| ele === 'parent' || ele === 'content' || ele === 'order' || ele === 'book'
				|| ele === 'subject' || ele === 'chapter' || ele === 'section')
				return true;

		}
		else if (state.type === 'book') {
			if (ele === 'dd' || ele === 'mm' || ele === 'hh' || ele === 'tags' || ele === 'link'
				|| ele === 'parent' || ele === 'content' || ele === 'order' || ele === 'book'
				|| ele === 'chapter' || ele === 'section')
				return true;

		}
		else if (state.type === 'chapter') {
			if (ele === 'dd' || ele === 'mm' || ele === 'hh' || ele === 'tags' || ele === 'link'
				|| ele === 'parent' || ele === 'content' || ele === 'order' ||
				ele === 'chapter' || ele === 'section')
				return true;

		}
		else if (state.type === 'section') {
			if (ele === 'dd' || ele === 'mm' || ele === 'hh' || ele === 'tags' || ele === 'link'
				|| ele === 'parent' || ele === 'content' || ele === 'order' ||
				ele === 'section')
				return true;

		}
	}

	var subjects = useSelector(({ subjects }) => {
		//console.log("Subjects are ....:",subjects);
		return subjects;
	})

	// go/state
	const [state, setState] = React.useState(
		{
			type: "note",
			addArtifactTypeTab: "artifactsTab",
			subject: "",
			chapter: "",
			section: "",
			book: "",
			title: {
				value: "",
				isValid: false,
				isDirty: false,
				defaultHelperText: "(Required)",
				errorHelperText: "(Required)",
				maxLength: 80,
				minLength: 5,
				dataType: 'string'
			},
			about: {
				value: "",
				isValid: false,
				isDirty: false,
				defaultHelperText: "(Required)",
				errorHelperText: "(Required)",
				maxLength: 80,
				minLength: 10,
				dataType: 'string'
			},
			content: {
				value: "",
				isValid: false,
				isDirty: false,
				defaultHelperText: "(Required)",
				errorHelperText: "(Required)",
				maxLength: 600,
				minLength: 10,
				dataType: 'string'
			},
			link: {
				value: "",
				isValid: false,
				isDirty: false,
				defaultHelperText: "(Required)",
				errorHelperText: "(Required)",
				maxLength: 600,
				minLength: 10,
				dataType: 'string'
			},
			mediatype: {
				value: "",
				isValid: false,
				isDirty: false,
				defaultHelperText: "(audio/video/image/doc)",
				errorHelperText: "(audio/video/image/doc)",
				maxLength: 40,
				dataType: 'string'
			},
			mediacontent: {
				value: "",
				isValid: false,
				isDirty: false,
				defaultHelperText: "(audio/video/image/doc)",
				errorHelperText: "(audio/video/image/doc)",
				maxLength: 40,
				dataType: 'string'
			},
			subject: {
				value: "",
				isValid: false,
				isDirty: false,
				defaultHelperText: "(Select Subject)",
				errorHelperText: "(Select Subject)",
				maxLength: 40,
				dataType: 'string'
			}

			
		});

	const stateChangeHandler = (event) => {
		//console.log("event.target.onChange2", event.target);
		var currentTargetState = state[event.target.name]
		setState({ ...state, [event.target.name]: { ...currentTargetState, value: event.target.value } });
	};
	const stateChangeCustomFieldsHandler = (name, value) => {
		//console.log("event.target.onChange2", event.target);
		setState({ ...state, [name]: value });
	};

	var stateChangeWithPreAndPostHandler = function (preHandler, postHandler) {
		return function (event) {
			preHandler && preHandler(event)
			var currentTargetState = state[event.target.name]
			setState({ ...state, [event.target.name]: { ...currentTargetState, value: event.target.value } });
			postHandler && postHandler(event);
		};
	};

	var updateState = function (fieldName, attributeName, value) {
		var currentTargetState = state[fieldName];
		//console.log("CurrentTargetState", currentTargetState)
		var newOBj = { [attributeName]: value }
		//console.log("New dynamic object:", newOBj)
		currentTargetState[attributeName] = value;
		setState({
			...state,
			[fieldName]: { ...currentTargetState }
		});
		currentTargetState = state[fieldName];
		//console.log("CurrentTargetStateNew", currentTargetState)
	}

	const isEmpty = (target) => {
		return (target.value.trim().length === 0)
	}

	function checkPropertyExist(obj,propertyName) {
		var exist = false;
		//console.log("Keys are:",propertyName,Object.keys(obj))
		  for (var index in Object.keys(obj)) {
			  //console.log("Key is :",Object.keys(obj)[index])
			if (Object.keys(obj)[index]===propertyName ) {
				exist = true;
				break;
			}
		  }
		  return exist;
		}

	const validateField = (event) => {
		console.log("Validate Field called.", event.target.value)
		if (isEmpty(event.target)) {
			if (state[event.target.name].required) {
				var name = event.target.name;
				console.log("Required validation failed", state[name])
				updateState(name, "isValid", false);
				updateState(name, "errorHelperText", "Cannot be blank text");
			}
		}
		else {
			var x = state[event.target.name];	
			if(checkPropertyExist(x,"dataType"))
			{
				let dataType = state[event.target.name].dataType ;
			    let dataTypeValidation = false;
				console.log("Datatype is",dataType)			
				if(dataType==="number"){
					dataTypeValidation = isFloat(event.target.value);
					if(dataTypeValidation===false){
						updateState(event.target.name, "isValid", false);
				        updateState(event.target.name, "errorHelperText", "invalid datatype");
						return;
					}
					 else{
						updateState(event.target.name, "isValid", true);
						updateState(event.target.name, "errorHelperText", state[event.target.name].defaultHelperText);
						console.log("Required datatype validation success", state[event.target.name])
					 }
				}
				else if(dataType==="email"){
					dataTypeValidation = isEmail(event.target.value.trim());
					if(dataTypeValidation===false){
						updateState(event.target.name, "isValid", false);
				        updateState(event.target.name, "errorHelperText", "invalid email");
						return;
					}
					 else{
						updateState(event.target.name, "isValid", true);
						updateState(event.target.name, "errorHelperText", state[event.target.name].defaultHelperText);
						console.log("email validation success", state[event.target.name])
					 }
				}
			}
			 if ((state[event.target.name].maxLength) && event.target.value.trim().length > state[event.target.name].maxLength) {
				updateState(event.target.name, "isValid", false);
				updateState(event.target.name, "errorHelperText", "#" + event.target.value.trim().length + " chars of Max (" +
					state[event.target.name].maxLength + ")");
			}
			else if ((state[event.target.name].minLength) && event.target.value.trim().length < state[event.target.name].minLength) {
				updateState(event.target.name, "isValid", false);
				updateState(event.target.name, "errorHelperText", "Min chars (" +
					state[event.target.name].minLength + ")");
			}
			else {
				updateState(event.target.name, "isValid", true);
				updateState(event.target.name, "errorHelperText", state[event.target.name].defaultHelperText);
				console.log("Required validation success", state[event.target.name])
			}

		}
	}

	

	return (
		<Container component="main" maxWidth="xs" sx={{ padding: "5px" }}
			style={{ display: showAddNoteForm ? "block" : "none" }}>

			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleSnackBarClose}
				message="Note archived"
			/>

			<Paper
				component="form"
				sx={{ marginTop: 4, p: '4px 2px', display: 'flex', alignItems: 'center', width: '100%' }}
			>
				<IconButton sx={{ p: '2px' }} aria-label="menu">
					<MenuIcon />
				</IconButton>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder="Search Title"
					inputProps={{ 'aria-label': 'search google maps' }}
				/>
				<IconButton type="button" sx={{ p: '2px' }} aria-label="search">
					<SearchIcon />
				</IconButton>
				<Divider sx={{ height: 48, m: 0.5 }} orientation="vertical" />
				<IconButton color="primary" sx={{ p: '2px' }} aria-label="directions">
					<DirectionsIcon />
				</IconButton>
			</Paper>


			<Paper elevation={1}>
				<Box
					sx={{
						marginTop: 1,
						display: 'inline',
						flexDirection: 'column',
						alignItems: 'center',
						padding: '10px',
					    width:380
					}}
				>
					<Box component="form" 				
					
					onSubmit={handleSubmit} noValidate sx={{ mt: 0 }}>
						<div>
							<div><pre>{JSON.stringify(state, null, 4)}</pre></div>
						</div>

						<Tabs name='artifactTab' style={{ width: '95%' }}
							value={state['addArtifactTypeTab']}
							aria-label="icon tabs example"
						>
							<Tab icon={<AccountTreeIcon />}
								value={"artifactsTab"}
								onClick={() => stateChangeCustomFieldsHandler('addArtifactTypeTab', 'artifactsTab')}
								name="artifactsTab"
								aria-label="artifactTree" >
							</Tab>
							<Tab icon={<AddCommentIcon />}
								value={"commentsTab"}
								aria-label="favorite"
								onClick={() => stateChangeCustomFieldsHandler('addArtifactTypeTab', 'commentsTab')}
							/>
							<Tab icon={<QuizIcon />} aria-label="favorite"
								value={"quizTab"}
								onClick={() => stateChangeCustomFieldsHandler('addArtifactTypeTab', 'quizTab')}
							/>
							<Tab icon={<BookmarksIcon />} aria-label="person"
								value={"favouritesTab"}
								onClick={() => stateChangeCustomFieldsHandler('addArtifactTypeTab', 'favouritesTab')}
							/>
						</Tabs>

						<TabPanel sx={{
									margin: "normal",
									width: 180,
									whiteSpace: "nowrap",
									overflow: "hidden",
									textOverflow: "ellipsis"
								}} 
								value={state['addArtifactTypeTab']} 
								index={"artifactsTab"}>
							<FormControl style={{ padding: '10px', margin: "10px" }}>
								<FormLabel id="artifactLabel">Choose Artifact</FormLabel>
								<RadioGroup row required
									aria-labelledby="demo-radio-buttons-group-label"
									defaultValue="note"
									name="type"
									onChange={stateChangeHandler}
								>

									<FormControlLabel value="note" control={<Radio />} label="Note" />
									<FormControlLabel value="section" control={<Radio />} label="Section" />
									<FormControlLabel value="chapter" control={<Radio />} label="chapter" />
									<FormControlLabel value="book" control={<Radio />} label="Book" />
									<FormControlLabel value="subject" control={<Radio />} label="Subject" />

								</RadioGroup>
							</FormControl>
							<gosubjectui></gosubjectui>
							<FormControl sx={{ m: 1 }} variant="standard"
								style={{ display: hideForArtifact('subject') ? 'none' : '' }}>
								<InputLabel id="demo-simple-select-helper-label">Subject</InputLabel>
								<Select
									labelId="demo-simple-select-helper-label"
									id="subject"
									name="subject"									
									label="Subject"
									required
									helperText={state.subject.errorHelperText}
									value={state.subject.value}
									onChange={stateChangeWithPreAndPostHandler(validateField)}
									onChange2={stateChangeWithPreAndPostHandler(validateSubject,
										 handleSubjectChange)}
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
							<FormControl sx={{ m: 1 }} variant="standard"
								style={{ display: hideForArtifact('book') ? 'none' : '' }}>
								<InputLabel id="demo-simple-select-helper-label">Book</InputLabel>
								<Select
									labelId="demo-simple-select-helper-label"
									id="book"
									name="book"
									value={state["book"]}
									label="Book"
									onChange={stateChangeWithPreAndPostHandler(handleBookChange)}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									<MenuItem key="Todos" value={10}>Todos</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
								<FormHelperText>Select or Default Book</FormHelperText>
							</FormControl>
							<FormControl sx={{ m: 1 }} variant="standard"
								style={{ display: hideForArtifact('section') ? 'none' : '' }}>
								<InputLabel id="section-label">Section</InputLabel>
								<Select
									labelId="section-label"
									id="section"
									name="section"
									value={state['section']}
									label="Section"
									onChange={stateChangeHandler}
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

							<FormControl sx={{ m: 1 }} variant="standard"
								style={{ display: hideForArtifact('chapter') ? 'none' : '' }}>
								<InputLabel id="chapter-label">Chapter</InputLabel>
								<Select
									labelId="chapter-label"
									id="chapter"
									name="chapter"
									value={state['chapter']}
									label="Chapter"
									onChange={stateChangeHandler}
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

							<TextField style={{ display: hideForArtifact('parent') ? 'none' : '' }}
								margin="normal"
								disabled
								id="parent"
								label="Parent"
								name="parent"
								fullWidth
								value={state['parent']}
								onChange={stateChangeHandler}
							/>


						<FormControl fullWidth >
							<TextField
								InputProps={{
									endAdornment: (
										<IconButton>
											<SearchOutlined />
										</IconButton>
									),
								}}								
								margin="normal"																
								id="title"
								label="Title/Name"
								name="title"	
								fullWidth
								autoFocus
								required
								helperText={state.title.errorHelperText}
								value={state.title.value}
								onChange={stateChangeWithPreAndPostHandler(validateField)}
								error={(state.title.isDirty) && state.title.isValid === false}
								onBlur={() => state.title.isDirty = true}
							/>
						
						</FormControl>
						   <goaboutui>
							<TextField style={{ display: hideForArtifact('about') ? 'none' : '' }}
								margin="normal"
								required
								fullWidth
								id="about"
								name="about"
								label="About"
								helperText={state.about.errorHelperText}
								value={state.about.value}
								onChange={stateChangeWithPreAndPostHandler(validateField)}
								error={(state.about.isDirty) && state.about.isValid === false}
								onBlur={() => state.about.isDirty = true}
							/>
							</goaboutui>
							<TextField style={{ display: hideForArtifact('content') ? 'none' : '' }}
								margin="normal"
								id="standard-multiline-flexible"
								label="Content"
								variant="outlined"
								multiline
								fullWidth
								rows={4}
								name="content"
								helperText={state.content.errorHelperText}
								value={state.content.value}
								onChange={stateChangeWithPreAndPostHandler(validateField)}
								error={(state.content.isDirty) && state.content.isValid === false}
								onBlur={() => state.content.isDirty = true}								
							/>
							<golinkui>
							<TextField style={{ display: hideForArtifact('link') ? 'none' : '' }}
								margin="normal"
								fullWidth
								id="link"
								label="Media Url"
								name="link"								
								helperText={state.link.errorHelperText}
								value={state.link.value}
								onChange={stateChangeWithPreAndPostHandler(validateField)}
								error={(state.link.isDirty) && state.link.isValid === false}
								onBlur={() => state.link.isDirty = true}			
							/>
							</golinkui>
							<TextField style={{ display: hideForArtifact('mediatype') ? 'none' : '' }}
								margin="normal"
								fullWidth
								id="mediatype"
								label="Media Type"
								disabled
								name="mediatype"
								helperText={state.mediatype.errorHelperText}
								value={state.mediatype.value}
								onChange={stateChangeWithPreAndPostHandler(validateField)}
								error={(state.mediatype.isDirty) && state.mediatype.isValid === false}
								onBlur={() => state.mediatype.isDirty = true}	
							/>
							<gofileui></gofileui>
							<FormControl margin="normal" label="media"fullWidth>
							<input type="file" 
								name="mediacontent" 
								id="mediacontent"								
								onChange={stateChangeWithPreAndPostHandler(validateField,imageUploaded)}									
								/>
							</FormControl>

							<TextField style={{ display: hideForArtifact('order') ? 'none' : '' }}
								margin="normal"
								fullWidth
								id="order"
								label="Order"
								name="order"
								value={state['order']}
								onChange={stateChangeHandler}
							/>


							<Grid container style={{ display: hideForArtifact('dd') ? 'none' : '' }}
								direction="row"
								justifyContent="flex-start"
								alignItems="flex-start"
								sx={{ my: 1 }}
								columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

								<Grid item xs={4}>
									<TextField style={{ display: hideForArtifact('dd') ? 'none' : '' }}
										margin="normal"
										id="link"
										label="Days:dd"
										name="dd"
										autoComplete=""										
										value={state['mediatypdde']}
										onChange={stateChangeHandler}
									/>
								</Grid>
								<Grid item xs={4}>
									<TextField style={{ display: hideForArtifact('hh') ? 'none' : '' }}
										margin="normal"
										id="link"
										label="Hour:hh"
										name="hh"
										autoComplete=""										
										value={state['hh']}
										onChange={stateChangeHandler}
									/>
								</Grid>
								<Grid item xs={4}>
									<TextField style={{ display: hideForArtifact('mm') ? 'none' : '' }}
										margin="normal"
										id="link"
										label="Min:mm"
										name="mm"
										autoComplete=""										
										value={state['mm']}
										onChange={stateChangeHandler}
									/>
								</Grid>
							</Grid>

							<TextField style={{ display: hideForArtifact('tags') ? 'none' : '' }}
								margin="normal"
								id="tag"
								label="Tags"
								name="tags"
								autoComplete="tags"
								fullWidth
								value={state['tags']}
								onChange={stateChangeHandler}
							/>

							<TextField style={{ display: hideForArtifact('id') ? 'none' : '' }}
								margin="normal"
								id="id"
								label="Id"
								name={id.name}
								fullWidth
								disabled
								value={state['id']}
								onChange={stateChangeHandler}
							/>

							<TextField style={{ display: hideForArtifact('createdDate') ? 'none' : '' }}
								margin="normal"
								id="tag"
								label="Created Date"
								name="createdDate"
								fullWidth
								disabled
								value={state['createdDate']}
								onChange={stateChangeHandler}
							/>

							<TextField style={{ display: hideForArtifact('createdBy') ? 'none' : '' }}
								InputProps={{
									endAdornment: (
										<Box>
											<a href='whatsapp://send?text=Hello&phone=918886406677'>
												<WhatsAppIcon />
											</a>
											<a href="tel:+918886406677">
												<PhoneIcon />
											</a>

											<a href="sms:8886406677" > SMS</a>
										</Box>
									),
								}}
								margin="normal"
								required
								id="tag"
								label="Created By"
								name="createdBy"
								autoComplete="createdBy"
								disabled
								fullWidth
								value={state['createdBy']}
								onChange={stateChangeHandler}
							/>

						</TabPanel>
						<TabPanel value={state['addArtifactTypeTab']} index={1}>
							Commetns
						</TabPanel>
						<TabPanel value={state['addArtifactTypeTab']} index={2}>
							Questions
						</TabPanel>



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

						<Grid container
							direction="row"
							justifyContent="space-evenly"
							alignItems="flex-start"
							spacing={2}>
							<Box borderRadius="50%" style={{ backgroundColor: "magenta" }}>
								<IconButton aria-label="delete" size="large">
									<DeleteIcon fontSize="inherit" />
								</IconButton>
							</Box>
						</Grid>

					</Box>


				</Box>
			</Paper>
		</Container >

	);
};

export default AddNoteForm;