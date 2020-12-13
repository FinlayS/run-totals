import React from 'react';
import { useForm } from "react-hook-form";

import Header from '../components/Header';
import  yupResolver  from "@hookform/resolvers/yup";
import { validationSchema } from "../validation/login";
import LoginForm from '../components/account/LoginForm'



const Login = () => {

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched"
  })

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
