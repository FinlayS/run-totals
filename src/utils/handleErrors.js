const getErrorMessage = (err) => {
  if (err) {
    const {errors, code} = err;
    if(code) {
      switch (code) {
        case 11000:
          return {'errors': {'error': {'message':'Email is already registered'}}}
        default:
          return "Sorry, an unexpected db error occurred"
      }
    } else {
      if(errors.password) {
        return {'errors': {'error': { 'message': errors.password.properties.message }}}
      }
    }
  }
}

module.exports = getErrorMessage
