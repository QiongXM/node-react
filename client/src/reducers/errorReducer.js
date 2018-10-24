import { GET_REGISTER_ERRORS } from '../actions/types.js';
import { GET_LOGIN_ERRORS } from '../actions/types.js';
import { GET_PROFILE_ERRORS } from '../actions/types.js';
import { CLEAR_ERRORS } from '../actions/types.js';

const initialState = {
  registerErrors: {},
  loginErrors: {},
  profileErrors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REGISTER_ERRORS:
      return {
        ...state,
        registerErrors: action.payload
      };
    case GET_LOGIN_ERRORS:
      return {
        ...state,
        loginErrors: action.payload
      };
    case GET_PROFILE_ERRORS:
      return {
        ...state,
        profileErrors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        registerErrors: action.payload,
        loginErrors: action.payload,
        profileErrors: action.payload
      };
    default:
      return state;
  }
}
