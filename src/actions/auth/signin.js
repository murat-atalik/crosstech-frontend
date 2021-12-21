import AUTH_TYPES from 'action-types/auth';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchSigninStart = () => ({
  type: AUTH_TYPES.FETCH_SIGNIN_START,
});

export const fetchSigninSuccess = (post) => ({
  type: AUTH_TYPES.FETCH_SIGNIN_SUCCESS,
  payload: post,
});

export const fetchSigninError = (err) => ({
  type: AUTH_TYPES.FETCH_SIGNIN_ERROR,
  payload: err,
});

export const signinLogout = () => ({
  type: AUTH_TYPES.SIGNIN_LOG_OUT,
});

export const fetchSigninInfo = (user) => async (dispatch) => {
  dispatch(fetchSigninStart());
  axios
    .post('http://localhost:5000/api/auth/login', user)
    .then((response) => {
      dispatch(fetchSigninSuccess(response.data.payload));
      toast.success('Login successful.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        closeButton: false,
      });
      localStorage.setItem('access-token', response.data.payload.jwtToken);
      localStorage.setItem('email', user.email);
      localStorage.setItem('name', response.data.payload.name);
      localStorage.setItem('department', response.data.payload.department);
      localStorage.setItem('isSignedin', true);
      localStorage.setItem('userId', response.data.payload.id);
    })
    .catch((err) => {
      dispatch(fetchSigninError(err));
      toast.error('Your email or password is incorrect.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        closeButton: false,
      });
    });
};
