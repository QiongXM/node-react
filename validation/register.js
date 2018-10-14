const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Because validator.isEmpty requires a string value, an empty value needs to be converted to an empty string
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : '';

  // Check for length of name
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  // Check for empty name
  if (validator.isEmpty(data.name)) {
    errors.name = 'Name is required!';
  }

  //Check for valid email
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid!';
  }

  // Check for empty email
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required!';
  }

  // Check for length of password
  if (!validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be at least 8 characters';
  }

  // Check for empty password
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required!';
  }

  // Check if password matches confirm password
  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match!';
  }

  // Check for empty confirm password
  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm Password is required!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
