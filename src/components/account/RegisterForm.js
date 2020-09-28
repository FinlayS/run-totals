import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { userRegister } from '../../routers/api/user';

const RegisterForm = () => {
  const router = useRouter()
  const [state , setState] = useState({
    email : '',
    password : '',
    confirmPassword: '',
    successMessage: null,
    error: ''
  })

  const handleChange = (e) => {
    showError(null)
    const {id , value} = e.target
    setState(prevState => ({
      ...prevState,
      [id] : value
    }))
  }

  const showError = (msg) => {
    setState(prevState => ({
      ...prevState,
      error : msg
    }))
  }

  const sendDetailsToServer = async () => {
    try {
      if(state.email.length && state.password.length) {
        const payload={
          'email':state.email,
          'password':state.password,
        }
       const regResp = await userRegister( payload)
        if(regResp.status === 201){
          setState(prevState => ({
            ...prevState,
            'successMessage' : 'Registration successful. Redirecting to home page..'
          }))
          await router.push('/RunTotalsForm')
          showError(null)
        } else{
          showError(regResp.status, 'Some error occurred');
        }
      }
      return showError('Please enter valid username and password')
    }
    catch (e) {
      console.log(e)
    }
  }

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    if(state.password === state.confirmPassword) {
      await sendDetailsToServer()
    } else {
      console.log(state.password, state.confirmPassword)
      showError('Passwords do not match');
    }
  }

  const redirectToLogin = async () => {
    await router.push('/Login');
  }

  return(
    <div className='card col-12 col-lg-4 login-card mt-2 hv-center'>
      <form>
        <div className='form-group text-left'>
          <label htmlFor='exampleInputEmail1'>Email address</label>
          <input type='email'
                 className='form-control'
                 id='email'
                 aria-describedby='emailHelp'
                 placeholder='Enter email'
                 value={state.email}
                 onChange={handleChange}
          />
          <small id='emailHelp' className='form-text text-muted'>We'll never share your email with anyone else.</small>
        </div>
        <div className='form-group text-left'>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input type='password'
                 className='form-control'
                 id='password'
                 placeholder='Password'
                 value={state.password}
                 onChange={handleChange}
          />
        </div>
        <div className='form-group text-left'>
          <label htmlFor='exampleInputPassword1'>Confirm Password</label>
          <input type='password'
                 className='form-control'
                 id='confirmPassword'
                 placeholder='Confirm Password'
                 value={state.confirmPassword}
                 onChange={handleChange}
          />
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          onClick={handleSubmitClick}
        >
          Register
        </button>
      </form>
      <div className='alert alert-success mt-2' style={{display: state.successMessage ? 'block' : 'none' }} role='alert'>
        {state.successMessage}
      </div>
      <div className='alert alert-danger mt-2' style={{display: state.error ? 'block' : 'none' }} role='alert'>
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