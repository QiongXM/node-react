const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  // Because validator.isEmpty requires a string value, an empty value needs to be converted to an empty string
  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.to = !isEmpty(data.to) ? data.to : '';

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

  // Check if From Date starts after To Date
  if (data.to === '') {
    if (validator.isAfter(data.from, new Date().toString())) {
      errors.from = 'The From Date should not start after the To Date';
    }
  } else {
    if (validator.isAfter(data.from, data.to)) {
      errors.to = 'The To Date should not start before the From Date';
    }
  }

  // Check if From Date starts after today
  if (validator.isAfter(data.from, new Date().toString())) {
    errors.from = 'The From Date should not start after today';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
