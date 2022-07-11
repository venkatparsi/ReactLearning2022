import React from "react";

import "./App.css";
import routeConstants from "../shared/constants/routes";
import Navbar from "./components/Navbar/Navbar";
import VideoContainer from "./components/VideoContainer/VideoContainer";
import FixedPanel from "./components/FixedPanel/FixedPanel";
import ScrollablePanel from "./components/ScrollablePanel/ScrollablePanel";
import { createStore } from "redux";
import noteReducer from "./modules/Notes/noteReducerSlice";
import { setNotes } from "./modules/Notes/noteReducerSlice";
import { useSelector, useDispatch } from "react-redux";
import NoteList from "./modules/Notes/components/NoteList";
/******* NAVIGATION RELATED */
import { Routes, Route } from "react-router-dom";
import AddNoteForm from "./modules/Notes/components/AddNoteForm";
import { useTranslation } from "react-i18next";

import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
//import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import PrimarySearchAppBar from "./components/AppNavBar/PrimarySearchAppBar";
import noteService from './modules/Notes/noteService'
import { useEffect } from "react";
import Chapter from "./modules/Notes/components/chapter";
import { setSubjects,initializeSubjects } from "./modules/Notes/subjectReducerSlice";



const { LOGIN, DASHBOARD, LISTING, PROFILE } = routeConstants;


//console.log("Route Constants", routeConstants);
const navItems = [LOGIN, DASHBOARD, LISTING, PROFILE];
//console.log("Nav Items", navItems);

/***********************APP STATE **********/

const notesStore = createStore(noteReducer);

/**************************** */


function isLocalFile(url){

}

function isImgLink(url) {
  if(typeof url !== 'string') return false;
  return(url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
}

function App() {
  const Styles = {
    maxHeight: "250px",
    display:"none"
  };

  var player;
  var API_KEY = "AIzaSyBYQstDec_qcO2wh8Nm8Beu1oBF41MpW2o";

  const dispatch = useDispatch()

  const api_key = process.env.REACT_APP_API_KEY;
  console.log("API KEY",api_key)

  var theme = createTheme();
    //Calling t and i18n method from useTranslation hook 
    const { t, i18n } = useTranslation();
    
  //Creating a method to change the language onChnage from select box
  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value
    i18n.changeLanguage(languageValue);
  }

  const showAddNoteForm = useSelector((state) => state.appUi.showAddNote.payload);
  const videoLink = useSelector((state) => state.appUi.videoLink);
  var books = useSelector(({ books }) => {
		return books;
	})

  var chapters = useSelector(({ chapters }) => {
		return chapters;
	})
    var selectedBook = books['selectedBook']?.title;
    var selectedChapter = chapters['selectedChapter']?.title;

  console.log("Books-------------------------------------:",JSON.stringify(books))
  useEffect(() => {
    noteService
     .getAll("notes")
      .then(response => {
        console.log("Recievd notes: ---->",response.data)
       dispatch(setNotes(response.data))        
      })
     noteService.getAll("subjects").then(response => {
      console.log("Recievd subjects: ---->",response.data)
      dispatch(setSubjects(response.data))
    }); 
  }, [])

  return (          
     <Container component="main" maxWidth="xs" >
    <PrimarySearchAppBar > </PrimarySearchAppBar>     
      <ScrollablePanel width="">
        <div style={{ marginTop: "30px" }}>   
          
          <AddNoteForm showAddNoteForm={showAddNoteForm}></AddNoteForm>
            <div style={{height:"30px"}}></div>
            <ScrollablePanel height="30vh" width="">
              <VideoContainer link={videoLink}></VideoContainer>
            </ScrollablePanel>
            <ScrollablePanel height="60vh" width="">
            <NoteList></NoteList>           
            </ScrollablePanel>         
        </div>
      </ScrollablePanel>
    </Container>    
  );
}

export default App;
