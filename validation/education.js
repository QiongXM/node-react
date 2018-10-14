const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  // Because validator.isEmpty requires a string value, an empty value needs to be converted to an empty string
  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

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

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
