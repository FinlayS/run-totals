import React from 'react';
import Container from 'react-bootstrap/Container';
import Header from '../components/header';
import RegisterForm from '../components/account/registerForm'

const Register = () => {
  return (
    <div>
      <Header/>
      <h3>Register</h3>
      <div>
        <Container className="container">
          <RegisterForm/>
        </Container>
      </div>
    </div>
  )
}

export default Register
