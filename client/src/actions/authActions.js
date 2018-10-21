import axios from 'axios';
import { GET_REGISTER_ERRORS } from './types';
import { GET_LOGIN_ERRORS } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import setCurrentUser from './setCurrentUser';

// Register User
export const registerUser = (userdata, history) => dispatch => {
  axios
    .post('/api/users/register', userdata)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_REGISTER_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userdata => dispatch => {
  axios
    .post('/api/users/login', userdata)
    .then(res => {
      const { token } = res.data;

      // Save to local storage
      localStorage.setItem('jwtToken', token);

      //Set token to auth header
      setAuthToken(token);

      //Decode token to get user data
      const decoded = jwtDecode(token);

      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_LOGIN_ERRORS,
        payload: err.response.data
      })
    );
};
