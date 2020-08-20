import React from 'react';
import Container from 'react-bootstrap/Container';
import Header from '../components/header';
import LoginForm from '../components/account/loginForm'

const Login = () => {
  return (
    <div>
      <Header/>
      <h3>Login</h3>
      <div>
        <Container  className="container">
          <LoginForm/>
        </Container>
      </div>
    </div>
  )
}

export default Login