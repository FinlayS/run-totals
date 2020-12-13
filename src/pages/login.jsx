import React from 'react';
import { useForm } from "react-hook-form";

import Header from '../components/Header';
import { validationSchema } from "../validation/login";
import LoginForm from '../components/account/LoginForm'

const methods = useForm({
  validationSchema,
  mode: "onTouched"
})

const Login = () => {
  return (
    <div>
      <Header authed={false}/>
      <div>
        <h3 className='login-title'>Log in to existing account</h3>
        <div className='container d-flex align-items-center flex-column'>
          <LoginForm methods={methods}/>
        </div>
      </div>
    </div>
  )
}

export default Login
