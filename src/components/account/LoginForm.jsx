import React, { useState } from 'react';

import { useRouter } from 'next/router'
import { userLogin } from '../../api/user';

const LoginForm = () => {

  const router = useRouter()
  const [state , setState] = useState({
    email : '',
    password : '',
    successMessage: null,
    error: ''
  })

  const handleChange = (e) => {
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
        const logInResp = await userLogin(payload)
        if(logInResp.status === 200){
          showError(null)
          setState(prevState => ({
            ...prevState,
            'successMessage' : 'Login successful. Redirecting to home page..'
          }))
          await router.push('/runs-main')
        } else{
          showError(logInResp.status, 'Some error occurred');
        }
      }
      return showError('Please enter valid username and password')
    }
    catch (e) {
      showError('Invalid login')
    }
  }

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    await sendDetailsToServer()
  }

  const redirectToLogin = async () => {
    await router.push('/register');
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
        <button
          type='submit'
          className='btn btn-primary'
          onClick={handleSubmitClick}
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