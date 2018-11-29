import { CLEAR_ERRORS } from './types.js';

const clearErrors = () => ({
  type: CLEAR_ERRORS,
  payload: {}
});

export default clearErrors;
