import React, {useState} from 'react';
import { useRouter } from "next/router";
import axios from "axios";

const RegisterForm = (props) => {
  const router = useRouter()
  const [state , setState] = useState({
    email : "",
    password : "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    const {id , value} = e.target
    setState(prevState => ({
      ...prevState,
      [id] : value
    }))
  }

  const sendDetailsToServer = async () => {
    if(state.email.length && state.password.length) {
      // TODO return an error here to render

      const payload={
        "email":state.email,
        "password":state.password,
      }
      await axios.post('http://localhost:3001'+'/users', payload)
        .then(function (response) {
          if(response.status === 201){
            setState(prevState => ({
              ...prevState,
              'successMessage' : 'Registration successful. Redirecting to home page..'
            }))
            localStorage.setItem('token', response.data.token)
            router.push('/')
            // TODO return an error here to render
            //  props.showError(null)
          } else{
            // TODO return an error here to render
            //   props.showError("Some error ocurred");

          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // TODO return an error here to render
      //  props.showError('Please enter valid username and password')
    }
  }

  const handleSubmitClick = (e) => {

    e.preventDefault();
    console.log('state.password', state.password, 'state.confirmPassword', state.confirmPassword)
    if(state.password === state.confirmPassword) {
      sendDetailsToServer()
    } else {
      // TODO return an error here to render
      //  props.showError('Passwords do not match');
    }
  }

  return(
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email"
                 className="form-control"
                 id="email"
                 aria-describedby="emailHelp"
                 placeholder="Enter email"
                 value={state.email}
                 onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password"
                 className="form-control"
                 id="password"
                 placeholder="Password"
                 value={state.password}
                 onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input type="password"
                 className="form-control"
                 id="confirmPassword"
                 placeholder="Confirm Password"
                 value={state.confirmPassword}
                 onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Register
        </button>
      </form>
    </div>
  )
}
export default RegisterForm