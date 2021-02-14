import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidation } from "../../validation/login";

import { useRouter } from 'next/router'
import { userLogin } from '../../api/user';

const LoginForm = () => {
  const methods = useForm({
    resolver: yupResolver(loginValidation),
    mode: "onBlur",
    reValidateMode: "onChange"
  });

  const email = methods.watch('email')
  const password = methods.watch('password')
  const hasNoErrors = Object.keys(methods.errors).length === 0;
  const canContinue = hasNoErrors && email && password;
  const {register, handleSubmit, errors,} = methods;

  const router = useRouter()
  const [state , setState] = useState({
    email : '',
    password : '',
    successMessage: null,
    error: ''
  })

  const resetServerError = () => {
    showError(null)
  }

  const showError = (msg) => {
    setState(prevState => ({
      ...prevState,
      error : msg
    }))
  }

  const sendDetailsToServer = async () => {
    resetServerError()

    try {
      const payload = { email, password,}

      const logInResp = await userLogin(payload)

      if (logInResp.status === 200) {
        setState(prevState => ({
          ...prevState,
          'successMessage': 'Login successful. Redirecting to home page..'
        }))
        await router.push('/runs-main')
      } else {
        if (logInResp.response.status) {
          showError(logInResp.response.data.error.message);
        }
      }
    } catch (e) {
      showError('Sorry, something went wrong')
    }
  }

  const handleSubmitClick = async (e) => {
    await sendDetailsToServer(e)
  }

  const redirectToLogin = async () => {
    await router.push('/register');
  }

  return(
    <div className='card col-12 col-lg-4 login-card mt-2 hv-center'>
      <form onSubmit={handleSubmit(handleSubmitClick)}>
        <div className='form-group text-left'>
          <label htmlFor='exampleInputEmail1'>Email address</label>
          <input className='form-control'
                 data-testid='email-input'
                 id='email'
                 name='email'
                 aria-describedby='emailHelp'
                 placeholder='Enter email'
                 onChange={resetServerError}
                 ref={register}
          />
          <small id='emailHelp' className='form-text text-muted'>We'll never share your email with anyone else.</small>
          <div className='alert alert-danger mt-2' style={{display: errors.email ? 'block' : 'none' }} role='alert'>
            {errors.email && errors.email.message}
          </div>
        </div>
        <div className='form-group text-left'>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input type='password'
                 className='form-control'
                 id='password'
                 data-testid='password-input'
                 name='password'
                 placeholder='Password'
                 onChange={resetServerError}
                 ref={register}
          />
        </div>
        <div className='alert alert-danger mt-2' style={{display: errors.password ? 'block' : 'none' }} role='alert'>
          {errors.password && errors.password.message}
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          name='login'
          disabled={!canContinue}
        >
          Login
        </button>
      </form>
      <div className='alert alert-success mt-2' style={{display: state.successMessage ? 'block' : 'none' }} role='alert'>
        {state.successMessage}
      </div>
      <div className='alert alert-danger mt-2' style={{display: state.error ? 'block' : 'none' }} role='alert'>
        {state.error}
      </div>
      <div className='mt-2'>
        <span>Don't have an account? </span>
        <span className='loginText' onClick={() => redirectToLogin()}>sign up here</span>
      </div>
    </div>
  )
}
export default LoginForm