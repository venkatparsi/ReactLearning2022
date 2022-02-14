import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import routeConstants from '../../../shared/constants/routes';

const {
  LOGIN,
  DASHBOARD,
  LISTING,
  PROFILE,
} = routeConstants;

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h1>App Component</h1>
      <ul className="App-nav-list">
        <li className="App-nav-item">
          <Link to={LOGIN.route}>{LOGIN.name}</Link>
        </li>
        <li className="App-nav-item">
          <Link to={DASHBOARD.route}>{DASHBOARD.name}</Link>
        </li>
        <li className="App-nav-item">
          <Link to={LISTING.route}>{LISTING.name}</Link>
        </li>
        <li className="App-nav-item">
          <Link to={PROFILE.route}>{PROFILE.name}</Link>
        </li>
      </ul>
      <Routes>
        <Route exact path={LOGIN.route}>
          <h1>{LOGIN.name}</h1>
        </Route>
        <Route path={DASHBOARD.route}>
          <h1>{DASHBOARD.name}</h1>
        </Route>
        <Route path={LISTING.route}>
          <h1>{LISTING.name}</h1>
        </Route>
        <Route path={PROFILE.route}>
          <h1>{PROFILE.name}</h1>
        </Route>
      </Routes>
    </div>
  </BrowserRouter>
);

}

export default App;
