const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  // Because validator.isEmpty requires a string value, an empty value needs to be converted to an empty string
  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  // Check for empty title field
  if (validator.isEmpty(data.title)) {
    errors.title = 'Title is required!';
  }

  // Check for empty company field
  if (validator.isEmpty(data.company)) {
    errors.company = 'Company is required!';
  }

  // Check for empty from date field
  if (validator.isEmpty(data.from)) {
    errors.from = 'From date field is required!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
