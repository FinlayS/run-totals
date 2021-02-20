import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';

import { registerValidation } from "../../validation/register";
import { userRegister } from '../../api/user';

const RegisterForm = () => {
  const methods = useForm({
    resolver: yupResolver(registerValidation),
    mode: "onBlur",
    reValidateMode: "onChange"
  });

  const email = methods.watch('email')
  const password = methods.watch('password')
  const confirmPassword = methods.watch('confirmPassword')
  const hasNoErrors = Object.keys(methods.errors).length === 0;
  const canContinue = hasNoErrors && email && password && confirmPassword;
  const { register, handleSubmit, errors } = methods;

  const router = useRouter()
  const [state , setState] = useState({
    email : '',
    password : '',
    confirmPassword: '',
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
      const regResp = await userRegister({ email, password })

        if(regResp.status === 201){
          setState(prevState => ({
            ...prevState,
            'successMessage' : 'Registration successful. Redirecting to home page..'
          }))
          await router.push('/runs-main')
        } else{
          if (regResp.response.status) {
            showError(regResp.response.data.error.message);
          }
        }
    } catch (e) {
      showError('Sorry, something went wrong')
    }
  }

  const handleSubmitClick = async (e) => {
    if(password === confirmPassword) {
      await sendDetailsToServer(e)
    } else {
      showError('Passwords do not match');
    }
  }

  const redirectToLogin = async () => {
    await router.push('/login');
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
          <div className='alert alert-danger mt-2'
               style={{display: errors.email ? 'block' : 'none' }}
               role='alert'>
            {errors.email && errors.email.message}
          </div>
        </div>
        <div className='form-group text-left'>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input type='password'
                 data-testid='password-input'
                 className='form-control'
                 id='password'
                 name='password'
                 placeholder='Enter password'
                 onChange={resetServerError}
                 ref={register}
          />
        </div>
        <div className='alert alert-danger mt-2'
             style={{display: errors.password ? 'block' : 'none' }}
             role='alert'>
          {errors.password && errors.password.message}
        </div>
        <div className='form-group text-left'>
          <label htmlFor='exampleInputPassword1'>Confirm Password</label>
          <input type='password'
                 data-testid='confirmPassword-input'
                 className='form-control'
                 id='confirmPassword'
                 name='confirmPassword'
                 placeholder='Confirm password'
                 onChange={resetServerError}
                 ref={register}
          />
        </div>
        <div className='alert alert-danger mt-2'
             style={{display: errors.confirmPassword ? 'block' : 'none' }}
             role='alert'>
          {errors.confirmPassword && errors.confirmPassword.message}
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          name='register'
          disabled={!canContinue}
        >
          Register
        </button>
      </form>
      <div className='alert alert-success mt-2'
           style={{display: state.successMessage ? 'block' : 'none' }}
           role='alert'>
        {state.successMessage}
      </div>
      <div className='alert alert-danger mt-2'
           style={{display: state.error ? 'block' : 'none' }}
           role='alert'>
        {state.error}
      </div>
      <div className='mt-2'>
        <span>Already have an account? </span>
        <span className='loginText' onClick={() => redirectToLogin()}>Login here</span>
      </div>

    </div>
  )
}
export default RegisterForm