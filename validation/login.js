const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Because validator.isEmpty requires a string value, an empty value needs to be converted to an empty string
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  //Check for valid email
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid!';
  }

  // Check for empty email
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required!';
  }

  // Check for empty password
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
