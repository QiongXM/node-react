import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILE_ERRORS
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch({ type: PROFILE_LOADING });
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create user Profile
export const createUserProfile = (userProfileData, history) => dispatch => {
  axios
    .post('/api/profile', userProfileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_PROFILE_ERRORS,
        payload: err.response.data
      })
    );
};

export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});
