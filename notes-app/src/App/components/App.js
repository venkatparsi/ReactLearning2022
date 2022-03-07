import React from "react";

import "./App.css";
import routeConstants from "../../shared/constants/routes";
import Navbar from "./Navbar";
import VideoContainer from "./VideoContainer/VideoContainer";
import FixedPanel from "./FixedPanel/FixedPanel";
import ScrollablePanel from "./ScrollablePanel/ScrollablePanel";
import { createStore } from "redux";
import noteReducer from "./Notes/noteReducer";
import { useSelector, useDispatch } from "react-redux";
import NoteList from "./Notes/views/NoteList";
import NotesActionsBar from "./Notes/views/NotesActions";
/******* NAVIGATION RELATED */
import { Routes, Route } from "react-router-dom";
import AddNoteForm from "./Notes/views/AddNoteForm";
import { useTranslation } from "react-i18next";

const { LOGIN, DASHBOARD, LISTING, PROFILE } = routeConstants;

//console.log("Route Constants", routeConstants);
const navItems = [LOGIN, DASHBOARD, LISTING, PROFILE];
//console.log("Nav Items", navItems);

/***********************APP STATE **********/

const notesStore = createStore(noteReducer);

/**************************** */
function App() {
  const Styles = {
    maxHeight: "250px",
  };

    //Calling t and i18n method from useTranslation hook 
    const { t, i18n } = useTranslation();
    
  //Creating a method to change the language onChnage from select box
  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value
    i18n.changeLanguage(languageValue);
  }

  const showAddNoteForm = useSelector((state) => state.appUi.showAddNote.payload);
  //const showSectionForm = useSelector((state)=> state.appUi.showSectionForm.payload);
  //console.log("ShowAddForm value",showAddNoteForm)
  return (
    <>
      <FixedPanel style={Styles}>
        <Navbar navItems={navItems} />      
   
        <Routes>
          <Route exact path={LOGIN.route} element=""></Route>
          <Route path={DASHBOARD.route}></Route>
          <Route path={LISTING.route}></Route>
          <Route path={PROFILE.route}></Route>
        </Routes>
      </FixedPanel>
      <ScrollablePanel>
        <div style={{ marginTop: "100px" }}>
          <NotesActionsBar></NotesActionsBar>
          <AddNoteForm showAddNoteForm={showAddNoteForm}></AddNoteForm>
            <div style={{height:"30px"}}></div>
            <ScrollablePanel height="30vh">
              <VideoContainer></VideoContainer>
            </ScrollablePanel>
            <ScrollablePanel height="50vh">
            <NoteList></NoteList>           
            </ScrollablePanel>
         
        </div>
      </ScrollablePanel>
    </>
  );
}

export default App;
