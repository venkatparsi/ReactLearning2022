import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import routeConstants from '../../../shared/constants/routes';
import Navbar from "./Navbar";
import VideoContainer from "./VideoContainer/VideoContainer";
import FixedPanel from "./FixedPanel/FixedPanel";
import ScrollablePanel from './ScrollablePanel/ScrollablePanel';

const {
  LOGIN,
  DASHBOARD,
  LISTING,
  PROFILE,
} = routeConstants;

console.log("Route Constants",routeConstants)

const navItems = [LOGIN, DASHBOARD, LISTING, PROFILE];
console.log("Nav Items",navItems)


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
    
      <VideoContainer></VideoContainer>
      <VideoContainer></VideoContainer>
      <VideoContainer></VideoContainer>
      <VideoContainer></VideoContainer>
      </ScrollablePanel>
    </>
);

}

export default App;
