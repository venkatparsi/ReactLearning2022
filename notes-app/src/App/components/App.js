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
import Note from "./Notes/views/Note";
import NotesActionsBar from "./Notes/views/NotesActions";

/******* NAVIGATION RELATED */
import { Routes, Route } from "react-router-dom";
import AddNoteForm from "./Notes/views/AddNoteForm";
const { LOGIN, DASHBOARD, LISTING, PROFILE } = routeConstants;

console.log("Route Constants", routeConstants);
const navItems = [LOGIN, DASHBOARD, LISTING, PROFILE];
console.log("Nav Items", navItems);

/***********************APP STATE **********/

const notesStore = createStore(noteReducer);

/**************************** */

function App() {
  const Styles = {
    maxHeight: "250px",
  };

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
          <AddNoteForm></AddNoteForm>
            <div style={{height:"30px"}}></div>
            <ScrollablePanel height="30vh">
              <VideoContainer></VideoContainer>
            </ScrollablePanel>
            <ScrollablePanel height="50vh">
            <Note section="true" num="1" title=""></Note>
            <Note></Note>
            <Note></Note>
            <Note></Note>
            <Note></Note>
            <Note></Note>
            <Note></Note>
            <Note></Note>
            <Note></Note>
            <Note></Note>
            <Note></Note>
            <Note></Note>
            <Note></Note>
            <Note></Note>
            <Note></Note>
            <Note></Note>
            <Note></Note>
            value <Note></Note>
            <Note></Note>
            </ScrollablePanel>
         
        </div>
      </ScrollablePanel>
    </>
  );
}

export default App;
