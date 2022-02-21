import React from 'react';

import './App.css';
import routeConstants from '../../shared/constants/routes'
import Navbar from "./Navbar";
import VideoContainer from "./VideoContainer/VideoContainer";
import FixedPanel from "./FixedPanel/FixedPanel";
import ScrollablePanel from './ScrollablePanel/ScrollablePanel';
import {createStore} from 'redux';
import noteReducer from './Notes/noteReducer'
import { useSelector, useDispatch } from 'react-redux'

/******* NAVIGATION RELATED */
import {
  Routes,
  Route
} from "react-router-dom";
const {
  LOGIN,
  DASHBOARD,
  LISTING,
  PROFILE,
} = routeConstants;

console.log("Route Constants",routeConstants)
const navItems = [LOGIN, DASHBOARD, LISTING, PROFILE];
console.log("Nav Items",navItems)

/***********************APP STATE **********/

const notesStore = createStore(noteReducer);

/**************************** */

function App() {

  const Styles = {
    maxHeight:'250px'
  }

  return (    
    <>    
    <FixedPanel style={Styles}>
    <Navbar  navItems={navItems} />
      <Routes>
        <Route exact path={LOGIN.route} element=''>        
        </Route>
        <Route path={DASHBOARD.route}></Route>
        <Route path={LISTING.route}></Route>
        <Route path={PROFILE.route}></Route>
      </Routes>
      <VideoContainer></VideoContainer>
    </FixedPanel>
    <ScrollablePanel>    
     <Note></Note>
      </ScrollablePanel>
    </>
);

}

export default App;
