

const sendUserToServer = () => {
  if(state.email.length && state.password.length) {
    props.showError(null);
    const payload={
      "email":state.email,
      "password":state.password,
    }
    axios.post(API_BASE_URL+'/user/register', payload)
      .then(function (response) {
        if(response.status === 200){
          setState(prevState => ({
            ...prevState,
            'successMessage' : 'Registration successful. Redirecting to home page..'
          }))
          redirectToHome();
          props.showError(null)
        } else{
          props.showError("Some error ocurred");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    props.showError('Please enter valid username and password')
  }

}