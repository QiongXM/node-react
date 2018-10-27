const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  // Because validator.isEmpty requires a string value, an empty value needs to be converted to an empty string
  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.to = !isEmpty(data.to) ? data.to : '';

  // Check for empty school field
  if (validator.isEmpty(data.school)) {
    errors.school = 'school is required!';
  }

  // Check for empty degree field
  if (validator.isEmpty(data.degree)) {
    errors.degree = 'Degree is required!';
  }

  // Check for empty field of study
  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study is required!';
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
