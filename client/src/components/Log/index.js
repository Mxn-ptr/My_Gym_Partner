import React, { useState } from 'react'
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export default function Log() {
  const [signUpModal, setSignUpModal] = useState(true);
  const [signInModal, setsignInModal] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setsignInModal(false);
      setSignUpModal(true);     
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setsignInModal(true);
    }
  }

  return (
      <div className="container">
        <div className="logo">
        <img src='./img/logo-banniere.png' alt="logo"/>
        </div>
        <div className='head-container'>
            <button className='top-button' onClick={handleModals} id="register">Sign Up</button>
            <button className='top-button' onClick={handleModals} id="login">Sign In</button>
        </div>
            {signUpModal && <SignUpForm/>}
            {signInModal && <SignInForm/>}
      </div>
  )
}
