import { LOGIN_USER } from './types';
import { LOGOUT_USER, FORGOTLOGIN_USER } from './types';
import { LOGIN_VALUE } from './types';
import { INITIALIZE_USER, UPDATE_PASSWORD } from './types';
import axios from 'axios';
import Swal from 'sweetalert2';

export const loginUser = (email, password) => {
  let data = {
    email,
    password
  };
  return dispatch => {
    axios
      .post('https://pastquestions.xyz/api/v1/auth/login', data)
      .then(res => {
        dispatch({
          type: LOGIN_USER,
          payload: res.data.data
        });
      })
      .catch(err => console.log(err, 'i am err'));
  };
};

export const loginValue = payload => {
  return dispatch => {
    dispatch({
      type: LOGIN_VALUE,
      payload: payload
    });
  };
};

export const logoutUser = () => {
  return dispatch => {
    window.location.replace('/');
    localStorage.clear();
    dispatch({
      type: LOGOUT_USER,
      payload: true
    });
  };
};

export const initializeUser = () => {
  return dispatch => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (token && user) {
      dispatch({
        type: INITIALIZE_USER,
        payload: JSON.parse(token),
        payload1: JSON.parse(user)
      });
    }
  };
};

export const forgotloginUser = email => {
  let data = {
    email
  };
  return dispatch => {
    axios
      .post('https://pastquestions.xyz/api/v1/auth/reset', data)
      .then(res => {
        dispatch({
          type: FORGOTLOGIN_USER,
          payload: res.data.message
        });
        Swal.fire({
          type: 'success',
          text: res.data ? res.data.message : 'Link Sent To Email'
        });
      })
      .catch(err => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.response
            ? err.response.data.message
            : 'Something went wrong',
          confirmButtonText: 'Ok'
        });
      });
  };
};

export const updatePassword = (
  old_password,
  new_password,
  new_password_confirmation,
  id
) => {
  let data = {
    old_password,
    new_password,
    new_password_confirmation,
    id
  };

  return dispatch => {
    axios
      .post('https://pastquestions.xyz/api/v1/auth/change', data)
      .then(res => {
        dispatch({
          type: UPDATE_PASSWORD,
          payload: res.data
        });
        Swal.fire({
          type: 'success',
          text: res.data ? res.data.message : 'Password Updated Successfully'
        });
      })
      .catch(err => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err.response
            ? err.response.data.message
            : 'Something went wrong',
          confirmButtonText: 'Ok'
        });
      });
  };
};
