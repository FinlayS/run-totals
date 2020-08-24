import React from 'react';
import Header from '../components/header';
import RegisterForm from '../components/account/registerForm'

const Register = () => {
  return (
    <div>
      <Header/>
      <div>
        <h3 className="login-title">Sign up for a new account</h3>
        <div className="container d-flex align-items-center flex-column">
          <RegisterForm/>
        </div>

      </div>
    </div>
  )
}

export default Register
