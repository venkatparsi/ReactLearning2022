import React,  { Component } from 'react'
import './header-component.css'
import {Link} from 'react-router-dom'
import {ReactComponent as Logo} from '../../../assets/crown.svg'
import CreativeDenLoogo from '../../../assets/creative-den.png'
//higher oreder component.lets to modify the redux
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/CartIcon.component'
import store from '../../../redux/store';
import { setCurrentUser } from '../../../redux/user/user.actions'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import {
    getAuth,
    signOut
    
  } from 'firebase/auth';

 class Header extends Component  { 
    
    constructor(){      
        super();
       // console.log("Header constructed");      
        this.state = {currentUser:null};
    }

  // Signs-out of Friendly Chat.
  async signOutUser () {
     // console.log("Start Signing out...");
      await signOut(getAuth());   
      store.dispatch(setCurrentUser(null));   
     // console.log("End Signing out...");    
  }  
  componentDidMount(){
     // console.log("Header mounting() State  is:",this.state);
    //  console.log("Header mounting() Props  is:",this.props);
  }
  
   render(){
   
   // console.log("Header render(): props:",this.props);
  //  console.log("Header render(): state:",this.state);
    var currentUser = this.props.currentUser;
    var hidden = this.props.hidden;
    return (
        <div className='header'>
           
            <Link className='logo-container'  to="/">
                <img src={CreativeDenLoogo} width="200" height="85" alt="Creative Den" />                       
            </Link>   
        

            <div className='options'>            
            <Link  className='option' to='/shop'>SHOP</Link>
            {
                    !currentUser ? 
                <Link  className='option' to='/mydata'>MYDATA</Link>
                : null
            }
                {
                    currentUser ? 
                    <span style={{fontWeight:600}}>Hi {currentUser.displayName}</span> : null
                }
                {
                    currentUser ?
                    <div className='option' onClick={this.signOutUser}> SIGN OUT</div>
                    :
                    <Link className='option' to='/signin'>SIGN IN</Link>
                }
                <CartIcon/>

            </div>
            {
                hidden? null : <CartDropdown />
            }
         
                 
        </div>
    )}
}

//Connect is a higher order function.. or wrapper function which returns
// the object required for export.. with mashing up some properties.
const mapStateToProps = ({user:{currentUser}, cart:{hidden}}) => ({    
    currentUser,
    hidden    
})
export default connect(mapStateToProps)(Header);
