
import React from 'react';
import Header from './components/shopping-site/header/header-component'
import FixedIconMenuBar from './components/fixed-icon-menu-bar/FixedIconMenuBar.component.jsx';
import  HomePage  from './pages/HomePage'
import  menuData from './data/menu-data.json'
import MyDataPage from './pages/mydata/MyDataPage';
import ShopPage from './pages/shopping-site/ShopPage.component';
import SignInAndSignUp from './pages/shopping-site/sign-in-sign-up/sign-in-and-sign-up.component';
import Muchhata from './pages/muchhata/muchhata.page';
import { Switch, Route,Redirect } from 'react-router-dom';

import {auth,createUserProfileDocument} from './firebase/firebase.utils.latest'
import {connect} from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'
import {onAuthStateChanged,signInWithEmailAndPassword} from 'firebase/auth';
import './App.css';
import store from './redux/store'

class App extends React.Component  {  


  unsubscribeFromAuth = null;
  componentWillUnmount(){    
    this.unsubscribeFromAuth();
  }

// Initialize firebase auth
initFirebaseAuth() {
  const {setCurrentUser} = this.props;
  
  // Listen to auth state changes.
  console.log("Start Initilizing the firebase auth onAuthStateChanged");

  this.unsubscribeFromAuth = onAuthStateChanged(auth, async user => {
   
    console.log("**** Start Auth State Changed User:******",user);
    if(user!==null){
      console.log("User Exists");
      const {displayName,email,photoURL,emailVerified} = user;
      console.log( "displayName,email,photoURL,emailVerified" ,displayName,email,photoURL,emailVerified);
      console.log("End Setting user state after signin ..",user)
      setCurrentUser(user);
    }else{
      console.log("End Setting user state after signin as null");
      setCurrentUser(user);
    }    
    console.log("******* End Auth State Changed ********");
  });
  console.log("End Initilizing of firebase auth onAuthStateChanged done.");
}


  componentDidMount(){
    console.log("::::::Calling firebase auth init...",this.props);
    this.initFirebaseAuth();
    console.log("::::::End of firebase auth init...");
   
  }

 
  

 render(){
  const myData = menuData;
  return (
    
    <div className="App">
      {/**<Header />         */}     
      <Header />
      <FixedIconMenuBar  menuData={myData} />        
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/myData" component={MyDataPage} />   
        <Route exact path='/shop'  component={ShopPage}   />
        <Route exact path='/signin'   
         render={()=> this.props.currentUser? (<Redirect to='/'/> )
          : ( <SignInAndSignUp/>)
         }
         />
        <Route exact path='/muchhata'  component={Muchhata}   />
      </Switch>      
    </div>
  );
 }
  
}
const mapStateToProps = ({user}) => ({
  currentUser : user.currentUser
})
const mapDispathToProps = dispatch => ({
  setCurrentUser: user => dispatch (setCurrentUser(user))
})
export default connect(mapStateToProps,mapDispathToProps)(App) ;
