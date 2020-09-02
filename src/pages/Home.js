import React from 'react';
import Header from '../components/header';
import LoginForm from '../components/account/loginForm'

const Home = () => {
  return (
    <div>
      <Header/>
      <div>
        <h3 className="login-title">Login or create account to get started</h3>
        <div className="container d-flex align-items-center flex-column">
          <LoginForm/>
        </div>
      </div>
    </div>
  )
}

export default Home
