import React from 'react'
import LeftGapRightLayout from '../../../components/layouts/left-gap-right/left-gap-right.component'
import SignIn
 from '../../../components/shopping-site/sign-in/SignIn.component'
 import SignUp from '../../../components/shopping-site/sign-up/SignUp.compoenent'
import './sign-in-and-signup.style.css'

const SignInAndSignUp = () => {
    return (       
        <LeftGapRightLayout>
            <SignIn />
            <SignUp />
        </LeftGapRightLayout>       
    )
}

export default SignInAndSignUp
