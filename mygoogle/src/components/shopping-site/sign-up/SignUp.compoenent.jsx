import React from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-botton/CustomButton.component'
import store from '../../../redux/store'
import { setCurrentUser } from '../../../redux/user/user.actions'

import {auth,createUserProfileDocument,createUserWithEmail} from '../../../firebase/firebase.utils.latest.js'

import './sign-up.styles.scss'

class SignUp extends React.Component{
constructor(){
    super();

    this.state= {
        displayName:'testing',
            email:'testing @gmail.com',
            password:'testing',
            confirmPassword:'testing'
    }
 }

 handleChange = event => {
     const {name,value} = event.target;
     this.setState({ [name]: value });
 }

  handleSubmit = async event => {
      event.preventDefault();
      const {displayName,email,password,confirmPassword} = this.state;

      if(password!== confirmPassword){
          alert("passwords dont match");
          return;
      }
      try{
          console.log("Start Signup Auth With Email: displayName",displayName);
           console.log("End Signup Auth With Email:",auth);
          console.log("Creating Profiledoc With displayName:",{displayName});
          
           
          var {user} = await createUserWithEmail(email,password,displayName);
          store.dispatch(setCurrentUser(user));
          await createUserProfileDocument(auth,{displayName});
          console.log("User created with give email..",user);
          this.setState({
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
          });
         
      }catch(error){
          console.error("Error while email registration.");
      }

  }

 render() {
     const {displayName,email,password,confirmPassword} = this.state;
     console.log("The state is:",this.state)
     return(
         <div className='sign-up'>
             <h2 className='title'> I do not have a account</h2>
             <span>Sign up with you email and password</span>
             <form className='sign-up-form' onSubmit={this.handleSubmit}>
                <FormInput type='text'
                name='displayName'
                value = {displayName}
                onChange= {this.handleChange}
                label='Display Name'
                required>

                </FormInput>
                <FormInput type='email'
                name='email'
                value = {email}
                onChange= {this.handleChange}
                label='Email '
                required>
                </FormInput>

                <FormInput type='password'
                name='password'
                value = {password}
                onChange= {this.handleChange}
                label='Password'
                required>
                </FormInput>

                <FormInput type='password'
                name='confirmPassword'
                value = {confirmPassword}
                onChange= {this.handleChange}
                label='Confirm Passwor'
                required>
                </FormInput>

                <CustomButton type='submit' onClick={this.handleSubmit}>SIGN UP</CustomButton>


             </form>
         </div>
     )
 }


}
   
export default SignUp;
