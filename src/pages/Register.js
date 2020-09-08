import React from 'react';
import Header from '../components/Header';
import RegisterForm from '../components/account/RegisterForm'

const Register = () => {
  return (
    <div>
      <Header/>
      <div>
        <h3 className='login-title'>Sign up for a new account</h3>
        <div className='container d-flex align-items-center flex-column'>
          <RegisterForm/>
        </div>
      </div>
    </div>
  )
}

export default Register
