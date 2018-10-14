const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  // Because validator.isEmpty requires a string value, an empty value needs to be converted to an empty string
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  // Check for length of handle
  if (!validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = 'Handle needs to be 2 to 30 characters';
  }

  // Check for empty handle
  if (validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required!';
  }

  // Check for empty status
  if (validator.isEmpty(data.status)) {
    errors.status = 'Status is required!';
  }

  // Check for empty skills
  if (validator.isEmpty(data.skills)) {
    errors.skills = 'Skills are required!';
  }

  // Check if valid website url
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = 'not a valid URL';
    }
  }

  // Check if valid youtube url
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = 'not a valid URL';
    }
  }

  // Check if valid twitter url
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = 'not a valid URL';
    }
  }

  // Check if valid facebook url
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = 'not a valid URL';
    }
  }

  // Check if valid linkedin url
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = 'not a valid URL';
    }
  }

  // Check if valid instagram url
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = 'not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
