import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from '../actions/types';

const intialState = {
  profile: null,
  profiles: null,
  isLoading: false
};

export default function(state = intialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case GET_PROFILE:
      return {
        ...state,
        isLoading: false,
        profile: action.payload
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}