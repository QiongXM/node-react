import { CLEAR_ERRORS } from './types.js';

const clearErrors = errors => ({
  type: CLEAR_ERRORS,
  payload: errors
});

export default clearErrors;
