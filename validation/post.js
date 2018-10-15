const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  // Because validator.isEmpty requires a string value, an empty value needs to be converted to an empty string
  data.text = !isEmpty(data.text) ? data.text : '';

  // Check for length of text
  if (!validator.isLength(data.text, { min: 10, max: 400 })) {
    errors.text = 'Post must be between 10 to 400 characters!';
  }

  // Check for empty text field
  if (validator.isEmpty(data.text)) {
    errors.text = 'Text is required!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
