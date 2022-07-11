import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Button from '@mui/material/Button';
import { Paper } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import AddCardIcon from '@mui/icons-material/AddCard';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

import { useDispatch, useSelector } from 'react-redux';
import { addSubject, setSelectedSubject } from '../subjectReducerSlice';
import { addBook, setBooks, setSelectedBook } from '../bookReducerSlice';
import { addChapter, setChapters, setSelectedChapter } from '../chapterReducerSlice';
import { showAddNote } from '../../../appUiReducerSlice';
import { addNote } from '../noteReducerSlice';

import noteService from '../noteService';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import Stack from '@mui/material/Stack';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import PreviewIcon from '@mui/icons-material/Preview';
import addNoteFormData from '../metadata/addNoteFormData.json'
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../../components/TabPanel/TabPanel';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddCommentIcon from '@mui/icons-material/AddComment';
import QuizIcon from '@mui/icons-material/Quiz';
import isFloat from 'validator/lib/isFloat';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isEmail from 'validator/lib/isEmail'
import { isDate } from 'moment-timezone';
import { width } from '@mui/system';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ConfirmationDialog from './SubjectConfirmationDialog';
import SubjectList from './SubjectList';
import { SignalCellularNullTwoTone } from '@mui/icons-material';
import BookList from './BookList';


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

	const [showAddNewForm, setShowAddNewForm] = React.useState(false)

	// go/state
	const [state, setState] = React.useState(SignalCellularNullTwoTone);

	const artifactTypes = [
		'Books',
		'Chapter',
		'Section',
		'Note',
		'Subjects'
	];

	var books = useSelector(({ books }) => {
		return books;
	})

	var chapters = useSelector(({ chapters }) => {
		return chapters;
	})


	var subjects = useSelector(({ subjects }) => {
		//	console.log("SUBJECTS:",subjects)
		return subjects;
	})


	const loadBooks = (subjectId) => {
		var booksPromise = noteService.getAllWithParent("books", subjectId);
		console.log("NewState Books Promise:", booksPromise)
		booksPromise.then((result) => {
			console.log("BOOKS RESULT", result.data);
			//console.log("NewState:-------------------------------->",newState)
			dispatch(setBooks(result.data))
			//setState(newState)
		})

	}

	const loadArtifact = (artifactType, parentId, dispatchFunction) => {
		var artifactPromise = noteService.getAllWithParent(artifactType, parentId);
		console.log("NewState " + artifactType + " Promise:", artifactPromise)
		artifactPromise.then((result) => {
			console.log(artifactType + " RESULT", result.data);
			//console.log("NewState:-------------------------------->",newState)
			dispatchFunction(result.data)
			//setState(newState)
		})
	}



	const handleBookChange = (item) => {
		console.log("BOOK CHANGED:", item)
		dispatch(setSelectedBook(item))
	}

	const handleChapterChange = (item) => {
		console.log("CHAPTER CHANGED:", item)
		dispatch(setSelectedChapter(item))
	}

	const handleSubjectChange = (event) => {
		var subjectId = event.target.value;
		console.log("SUBJECT CHANGED:", subjectId)
		loadBooks(subjectId)
	}


	const saveArtifact = (artifactType, artifactPayload, dispatchFunction) => {
		console.log("----> dispatching add ", artifactType);
		var resultPromise = noteService.add(artifactType, artifactPayload)
		resultPromise.then(response => {
			console.log("    ---->  Saved " + artifactType + ": ---->", response);
			if (response.isDuplicateFound) {
				alert("       Duplicate Found.", type);
			} else {
				dispatch(dispatchFunction(response.data))
				alert("   Successfully saved.", type);
			}
		})
		console.log(" <---- dispatching add " + type + " end.")
	}

	const saveBook = (type, formData) => {
		const momentNow = moment();
		if (type === 'book') {
			console.log("----> dispatching add ", type);
			var bookRelatedPayload = {
				title: formData.get('title'),
				about: formData.get('about'),
				content: formData.get('content'),
				parent: formData.get('subject'),
				createdDate: momentNow.format('DD-MMM-yyyy HH-mm'),
				id: formData.get('id'),
				createdBy: 'venkat.parsi',
				type: 'book'
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

	const saveNote = (type, formData) => {
		const momentNow = moment();
		if (type === 'note' || type === "notes") {
			console.log(" ----> dispatching add ", type);
			var noteRelatedPayload = {
				title: formData.get('title'),
				about: formData.get('about'),
				content: formData.get('content'),
				parent: formData.get('subject'),
				createdDate: momentNow.format('DD-MMM-yyyy HH-mm'),
				id: formData.get('id'),
				createdBy: 'venkat.parsi',
				type: 'note'
			}
			console.log("Before calling noteservice add..........>")
			var resultPromise = noteService.add("notes", noteRelatedPayload)
			console.log("After callling noteservice add ............>")
			resultPromise.then(response => {
				console.log("       Saved " + type + ": ---->", response);
				if (response.isDuplicateFound) {
					//dispatch(setSelectedNote(response.data))
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
					dispatch(addNote(response.data))
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
			type: state['type'],
			tags: formData.get('tags'),
			createdDate: momentNow.format('DD-MMM-yyyy HH-mm'),
			id: formData.get('id'),
			createdBy: formData.get('createdBy')
		}
		console.log("      Payload type,val->", addPayload.type, addPayload);
		if (formData.get('title'))
			if (state['type'] === 'book') { saveBook('book', formData) }
			else if (state['type'] === 'note') { saveNote('note', formData) }
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

	const setSelectedValue = (event) => {
		state['selected' + event.target.name] = event.target.value;
	}

	const hideForm = () => {
		dispatch(showAddNote(false))
	}

	const getMediaType = (fileTypeData) => {
		console.log(fileTypeData)
		let fileType = fileTypeData.substr(fileTypeData.search(":") + 1, (fileTypeData.search(";") - (fileTypeData.search(":") + 1)));
		console.log(fileType);


	}

	const imageUploaded = (e) => {
		e.preventDefault();

		var reader = new FileReader();
		console.log("next");

		reader.onload = function () {
			imageBase64Stringsep = reader.result;
			getMediaType(reader.result.substring(0, reader.result.search(";") + 1));
			let base64String = reader.result.replace("data:", "")
				.replace(/^.+,/, "");
			// alert(imageBase64Stringsep);
			console.log("DATA", reader.result, imageBase64Stringsep);
			setState({ ...state, ['mediaData']: base64String.substring(0, 20) });

			//data:image/png;base64,
		}
		reader.readAsDataURL(e.target.files[0]);
	}

	const hideForArtifact = (ele) => {
		//console.log("field,state:->", ele, ":", state)
		if (state.type === 'subject') {
			if (ele === 'dd' || ele === 'mm' || ele === 'hh' || ele === 'tags' || ele === 'link'
				|| ele === 'parent' || ele === 'content' || ele === 'order' || ele === 'book'
				|| ele === 'chapter' || ele === 'section' || ele === 'file' || ele === 'mediatype')
				return true;

		}
		else if (state.type === 'book') {
			if (ele === 'dd' || ele === 'mm' || ele === 'hh' || ele === 'tags' || ele === 'link'
				|| ele === 'parent' || ele === 'content' || ele === 'order'
				|| ele === 'chapter' || ele === 'section')
				return true;

		}
		else if (state.type === 'chapter') {
			if (ele === 'dd' || ele === 'mm' || ele === 'hh' || ele === 'tags' || ele === 'link'
				|| ele === 'parent' || ele === 'content' || ele === 'section' || ele === 'subject')
				return true;

		}
		else if (state.type === 'section') {
			if (ele === 'dd' || ele === 'mm' || ele === 'hh' || ele === 'tags' || ele === 'link'
				|| ele === 'parent' || ele === 'content' || ele === 'order' ||
				ele === 'section' || ele === 'subject')
				return true;

		}
		else if (state.type === 'note') {
			if (ele === 'dd' || ele === 'mm' || ele === 'hh' || ele === 'tags' || ele === 'link'
				|| ele === 'parent' || ele === 'order' ||
				ele === 'subject' || ele === 'book')
				return true;

		}

	}

	const stateChangeHandler = (event) => {
		//console.log("stateChangeHandler:", event.target.name, event.target.value);
		var targetName = event.target.name;
		var currentTargetState = state[targetName]
		//console.log("State:", state)
		//console.log("stateChangeHandler:", targetName, event.target.value);
		//console.log("current targetState:", currentTargetState, { ...currentTargetState, value: event.target.value })
		setState({ ...state, [event.target.name]: { ...currentTargetState, value: event.target.value } });
		//console.log("after change current targetState:", currentTargetState,"<---")
	};

	const stateChangeCustomFieldsHandler = (name, value) => {
		//console.log("stateChangeCustomFieldsHandler", name, value);
		//console.log("OLD STATE",state[name]);
		state[name] = value;
		setState({ ...state });
		//console.log("NEW STATE",state);		
	};



	var stateChangeWithPreAndPostHandler = function (preHandler, postHandler, postHandler2) {
		return function (event) {
			preHandler && preHandler(event)
			var currentTargetState = state[event.target.name]
			console.log("targetName,currentTargetState", event.target.name, currentTargetState)
			var newState = { ...state };
			newState[event.target.name].value = event.target.value;
			setState(newState)
			//setState({ ...state, [event.target.name]: { ...currentTargetState, value: event.target.value } });
			console.log("after setting state:targetName,currentTargetState", event.target.name, currentTargetState)
			postHandler && postHandler(event);
			postHandler2 && postHandler2(event);
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
		console.log("TARGET VALUE", target)
		//trim will fail on integer value.. so skip it.
		if (typeof (target.value) === "number") return true;
		return (target.value?.trim().length === 0)
	}

	function checkPropertyExist(obj, propertyName) {
		var exist = false;
		//console.log("Keys are:",propertyName,Object.keys(obj))
		for (var index in Object.keys(obj)) {
			//console.log("Key is :",Object.keys(obj)[index])
			if (Object.keys(obj)[index] === propertyName) {
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
			if (checkPropertyExist(x, "dataType")) {
				let dataType = state[event.target.name].dataType;
				let dataTypeValidation = false;
				console.log("Datatype is", dataType)
				if (dataType === "number") {
					dataTypeValidation = isFloat(event.target.value);
					if (dataTypeValidation === false) {
						updateState(event.target.name, "isValid", false);
						updateState(event.target.name, "errorHelperText", "invalid datatype");
						return;
					}
					else {
						updateState(event.target.name, "isValid", true);
						updateState(event.target.name, "errorHelperText", state[event.target.name].defaultHelperText);
						console.log("Required datatype validation success", state[event.target.name])
					}
				}
				else if (dataType === "email") {
					dataTypeValidation = isEmail(event.target.value.trim());
					if (dataTypeValidation === false) {
						updateState(event.target.name, "isValid", false);
						updateState(event.target.name, "errorHelperText", "invalid email");
						return;
					}
					else {
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


	var dynamicContentFields = addNoteFormData.uiFields;
	useEffect(() => {
		setState(addNoteFormData);
		//console.log("useEffect()->The STATE:", state)
		dynamicContentFields = addNoteFormData.uiFields;
		//console.log("useEffect()->Dynamic content fields:", dynamicContentFields);
	})

	const getDynamicField = (fieldName) => {
		const keys = dynamicContentFields.keys();
		for (let x of keys) {
			if (dynamicContentFields[x].name === fieldName) {
				return dynamicContentFields[x]
			}
		}
		console.log("Dynamic Filed not found:", fieldName);
		return null;
	}
	const createDynamicField = (fieldName) => {
		var field = getDynamicField(fieldName);
		if (field != null)
			return <FormControl fullWidth style={{ display: hideForArtifact(fieldName) ? 'none' : '' }}>
				<TextField margin="normal"
					id={field.id}
					label={field.label}
					name={field.name}
					fullWidth
					helperText={state[field.name]?.errorHelperText}
					value={state[field.name]?.value}
					onChange={stateChangeWithPreAndPostHandler(validateField)}
					error={(state[field.name]?.isDirty) && state[field.name]?.isValid === false}
					onBlur={() => { state[field.name].isDirty = true }}
				></TextField>
			</FormControl>
	}

	return (
		<Container component="main" maxWidth="xs" sx={{ padding: "5px" }}
			style={{ display: showAddNoteForm ? "block" : "none" }}>

			<Stack direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: 4, width: '100%', bgcolor: 'background.paper' }}>
				<ConfirmationDialog appState={state} />
				<IconButton color="primary" aria-label="directions" onClick={() => { setShowAddNewForm('showAddNew'); console.log("state", state); }}>
					<AddCardIcon />
				</IconButton>
				<IconButton color="primary" aria-label="directions" onClick={() => { setShowAddNewForm('showBookmarks'); console.log("state", state); }}>
					<FolderSpecialIcon />
				</IconButton>
				<IconButton color="primary" aria-label="directions" onClick={() => { setShowAddNewForm('showSearchResults'); console.log("state", state); }}>
					<TravelExploreIcon />
				</IconButton>
				<IconButton color="primary" aria-label="directions" onClick={() => { setShowAddNewForm('showCurrentBook'); console.log("state", state); }}>
					<MenuBookIcon />
				</IconButton>

			</Stack>
			<Paper elevation={1} style={{ display: showAddNewForm == 'showBookmarks' ? "block" : "none" }}>
				<Tabs name='bookMarksTab' style={{ width: '95%' }}
					value={state['showBookmarksTab']}
					aria-label="icon tabs example"
				>
					<Tab icon={<FolderSpecialIcon />} id="allBookMarks" value={"allBookMarks"} aria-label="person"
						onClick={() => stateChangeCustomFieldsHandler('showBookmarksTab', 'allBookMarks')}
					/>


				</Tabs>

				<TabPanel value={state['showBookmarksTab']} name="allBookMarks" index={"allBookMarks"}>
					Bookmarks
				</TabPanel>
			</Paper>
			<Paper elevation={1} style={{ display: showAddNewForm == 'showSearchResults' ? "block" : "none" }}>
				<Tabs name='artifactTab' style={{ width: '95%' }}
					value={state['showSearchResultsTab']}
					aria-label="icon tabs example"
				>

					<Tab icon={<TravelExploreIcon />} aria-label="search result tab" value={"allSearchResults"}
						onClick={() => stateChangeCustomFieldsHandler('showSearchResultsTab', 'allSearchResults')}
					/>


				</Tabs>
				<TabPanel value={state['showSearchResultsTab']} index={"allSearchResults"}>
					Results
				</TabPanel>
			</Paper>
			<Paper elevation={1} style={{ display: showAddNewForm == 'showAddNew' ? "block" : "none" }}>
				<Box
					sx={{
						marginTop: 1,
						display: 'inline',
						flexDirection: 'column',
						alignItems: 'center',
						padding: '10px',
						width: 380
					}}
				>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0 }}>

						<Stack >
							<h6> {state.addArtifactTypeTab === 'commentsTab' ? 'Create Comments for ' + `${state.type}` + `: ${state["selected" + state.type]}` : ' '}
								{state.addArtifactTypeTab === 'artifactsTab' ? 'Create Artifact ' + `${state.type}` : ' '}
								{state.addArtifactTypeTab === 'scratchTab' ? 'Display All  ' + `${state.type}` + 's' : ''}
								{state.addArtifactTypeTab === 'quizTab' ? 'Create Question for ' + `${state.type}` + `: ${state["selected" + state.type]}` : ' '}
							</h6>
							<ToggleButtonGroup
								color="primary"
								name="newType"
								id="newType"
								value={state['type']}
								exclusive
								onChange={(e) => stateChangeCustomFieldsHandler("type", e.target.value)}
							>
								<ToggleButton value="note" name="newType" >Note</ToggleButton>
								<ToggleButton value="section" name="newType" >Sect</ToggleButton>
								<ToggleButton value="chapter" name="newType" >Chap</ToggleButton>
								<ToggleButton value="book" name="newType" >Book</ToggleButton>
								<ToggleButton value="subject" name="newType" >Subj</ToggleButton>
							</ToggleButtonGroup>
							Current Selected: {`${state["selected" + state.type]}`}
						</Stack>


						<gosubjectui>
							<FormControl sx={{ m: 1 }} variant="standard"
								style={{ display: hideForArtifact('subject') ? 'none' : '' }}>
								<InputLabel id="demo-simple-select-helper-label">Subject</InputLabel>
								<Select
									labelId="demo-simple-select-helper-label"
									id="subject"
									name="subject"
									label="Subject"
									width="50%"
									required
									helperText={state?.subject?.errorHelperText}
									value={state["subject"]?.value}
									onChange={stateChangeWithPreAndPostHandler(validateField, setSelectedValue, handleSubjectChange)}
								>
									<MenuItem value="none" selected>
										<em>None</em>
									</MenuItem>
									{subjects.items.map(item =>
										<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
									)}
								</Select>
								<FormHelperText>Select Subject</FormHelperText>
							</FormControl>
						</gosubjectui>
						<FormControl sx={{ m: 1 }} variant="standard"
							style={{ display: hideForArtifact('book') ? 'none' : '' }}>
							<InputLabel id="demo-simple-select-helper-label">Book</InputLabel>
							<Select
								labelId="demo-simple-select-helper-label"
								id="book"
								name="book"
								label="Book"
								onChange={(event) => handleBookChange(event.target.value)}
							>
								<MenuItem value="none" selected>
									<em>None</em>
								</MenuItem>
								{books.items.map(item =>
									<MenuItem key={item?.id} value={item}>{item?.title}</MenuItem>
								)
								}
							</Select>
							<FormHelperText>Select Book</FormHelperText>
						</FormControl>

						<FormControl sx={{ m: 1 }} variant="standard"
							style={{ display: hideForArtifact('chapter') ? 'none' : '' }}>
							<InputLabel id="chapter-label">Chapter</InputLabel>
							<Select
								labelId="chapter-label"
								id="chapter"
								name="chapter"
								label="Chapter"
								onChange={(event) => handleChapterChange(event.target.value)}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{chapters.items.map(item =>
									<MenuItem key={item?.id} value={item}>{item?.title}</MenuItem>
								)
								}
							</Select>
							<FormHelperText>Select Chapter</FormHelperText>
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
							<FormHelperText>Select section</FormHelperText>
						</FormControl>

						<Tabs name='artifactTab' style={{ width: '95%' }}
							value={state['addArtifactTypeTab']}
							aria-label="icon tabs example"
						>
							<Tab icon={<FormatListBulletedIcon />}
								value={"displayItemTab"}
								aria-label="view"
								onClick={() => stateChangeCustomFieldsHandler('addArtifactTypeTab', 'displayItemTab')}
								style={{ minWidth: "50px" }}
							/>
							<Tab icon={<AddCircleOutlineIcon />}
								value={"artifactsTab"}
								onClick={() => stateChangeCustomFieldsHandler('addArtifactTypeTab', 'artifactsTab')}
								aria-label="artifactTree"
								style={{ minWidth: "50px" }}>
							</Tab>
							<Tab icon={<AddCommentIcon />}
								aria-label="favorite"
								value={"commentsTab"}
								onClick={() => stateChangeCustomFieldsHandler('addArtifactTypeTab', 'commentsTab')}
								style={{ minWidth: "50px" }}
							/>
							<Tab icon={<QuizIcon />} aria-label="favorite"
								value={"quizTab"}
								onClick={() => stateChangeCustomFieldsHandler('addArtifactTypeTab', 'quizTab')}
								style={{ minWidth: "50px" }}
							/>
							<Tab icon={<AccountTreeIcon />}
								value={"scratchTab"}
								aria-label="favorite"
								onClick={() => stateChangeCustomFieldsHandler('addArtifactTypeTab', 'scratchTab')}
								style={{ minWidth: "50px" }}
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
							<FormControl fullWidth style={{ display: hideForArtifact('parent') ? 'none' : '' }}>
								<TextField
									margin="normal"
									disabled
									id="parent"
									label="Parent"
									name="parent"
									fullWidth
									value={state['parent']}
									onChange={stateChangeHandler}
								/>
							</FormControl>
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
									helperText={state["title"]?.errorHelperText}
									value={state?.title?.value}
									onChange={stateChangeWithPreAndPostHandler(validateField)}
									error={(state["title"]?.isDirty) && state["title"]?.isValid === false}
									onBlur={() => state["title"].isDirty = true}
								/>
							</FormControl>
							<goaboutui>
								{createDynamicField("about")}
							</goaboutui>
							<gocontrolui>
								<FormControl fullWidth style={{ display: hideForArtifact('content') ? 'none' : '' }}>
									<TextField
										margin="normal"
										id="standard-multiline-flexible"
										label="Content"
										variant="outlined"
										multiline
										fullWidth
										rows={4}
										name="content"
										helperText={state?.content?.errorHelperText}
										value={state?.content?.value}
										onChange={stateChangeWithPreAndPostHandler(validateField)}
										error={(state?.content?.isDirty) && state?.content?.isValid === false}
										onBlur={() => state.content.isDirty = true}
									/>
								</FormControl>
							</gocontrolui>
							<golinkui>
								<FormControl fullWidth>
									<TextField style={{ display: hideForArtifact('link') ? 'none' : '' }}
										margin="normal"
										fullWidth
										id="link"
										label="Media Url"
										name="link"
										helperText={state?.link?.errorHelperText}
										value={state?.link?.value}
										onChange={stateChangeWithPreAndPostHandler(validateField)}
										error={(state?.link?.isDirty) && state?.link?.isValid === false}
										onBlur={() => state.link.isDirty = true}
									/>
								</FormControl>
							</golinkui>
							<TextField style={{ display: hideForArtifact('mediatype') ? 'none' : '' }}
								margin="normal"
								fullWidth
								id="mediatype"
								label="Media Type"
								disabled
								name="mediatype"
								helperText={state?.mediatype?.errorHelperText}
								value={state["mediatype"]?.value}
								onChange={stateChangeWithPreAndPostHandler(validateField)}
								error={(state?.mediatype?.isDirty) && state?.mediatype?.isValid === false}
								onBlur={() => state.mediatype.isDirty = true}
							/>
							<gofileui>
								<FormControl margin="normal" label="media" fullWidth
									style={{ display: hideForArtifact('file') ? 'none' : '' }}>
									<input type="file"
										name="mediacontent"
										id="mediacontent"
										onChange={stateChangeWithPreAndPostHandler(validateField, imageUploaded)}
									/>
								</FormControl>
							</gofileui>

							<TextField style={{ display: hideForArtifact('order') ? 'none' : '' }}
								margin="normal"
								fullWidth
								id="order"
								label="Order"
								name="order"
								value={state['order']?.value}
								onChange={stateChangeWithPreAndPostHandler(validateField)}
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
										id="dd"
										label="Days:dd"
										name="dd"
										autoComplete=""
										value={state['dd']}
										onChange={stateChangeHandler}
									/>
								</Grid>
								<Grid item xs={4}>
									<TextField style={{ display: hideForArtifact('hh') ? 'none' : '' }}
										margin="normal"
										id="hh"
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
										id="mm"
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
											<a href='whatsapp://send?text=Hello&phone=918886406677&attachment=c://users/downloads/abc.pdf'>
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
						<TabPanel value={state['addArtifactTypeTab']} index={"commentsTab"}>
							<div>
								<div><pre>{JSON.stringify(state, null, 4)}</pre></div>
							</div>
						</TabPanel>
						<TabPanel value={state['addArtifactTypeTab']} index={"quizTab"}>
							Questions
						</TabPanel>

						<TabPanel value={state['addArtifactTypeTab']} index={"displayItemTab"}>
							{
								state["type"] === "subject" ? <SubjectList></SubjectList> : ''
							}
							{
								state["type"] === "book" ? <BookList></BookList> : ''
							}
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
					</Box>
				</Box>
			</Paper>

		</Container >

	);
};

export default AddNoteForm;