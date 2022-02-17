import React, { Component } from 'react'
import './sign-in.style.scss'
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-botton/CustomButton.component';
  

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,  
    signInWithEmailAndPassword
  } from 'firebase/auth';




export default class SignIn extends Component {
    constructor(props){
        super (props);

        this.state = {
            email:'',
            password:''
        }
    }

  // Signs-in Friendly Chat.
 async signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    console.log("===== Start of signin....");
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
    console.log("===== End of signin....");
  }
  
  handleSubmit = async event => {
    event.preventDefault();
    const {email,password} = this.state;
    try{
      await signInWithEmailAndPassword(getAuth(),email,password);
      this.setState ({email:'',password:''});
    }catch(error){
      console.log(error);
    }

}


    handleChange = event => {
        const {value,name} = event.target;
        this.setState({[name] : value})
    }
    render() {
        return (
            
            <div className='sign-in' style={{marginLeft:'3rem'}}>
                <h2> I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>

                    <FormInput name="email" type="email"
                        required value={this.state.email}
                        onChange={this.handleChange}
                        label='Email'
                         />
                
                    <FormInput name="password" type="password" required 
                        onChange={this.handleChange}
                        value={this.state.password}
                            label='Password'
                        />
                   
                    <CustomButton type='button' onClick={this.handleSubmit}> Sign In</CustomButton> &nbsp;
                    <CustomButton type='button' onClick={this.signIn}>Sign In With Google</CustomButton>
                </form>
                
            </div>
        )
    }
}
