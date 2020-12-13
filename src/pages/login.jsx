import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/account/LoginForm'

const Login = () => {
  return (
    <div>
      <Header authed={false}/>
      <div>
        <h3 className='login-title'>Log in to existing account</h3>
        <div className='container d-flex align-items-center flex-column'>
          <LoginForm/>
        </div>
      </div>
    </div>
  )
}

export default Login
