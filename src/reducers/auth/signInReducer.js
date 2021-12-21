import AUTH_TYPES from 'action-types/auth';

const initialState = {
  isFetching: false,
  isError: '',
  isSignedIn: localStorage.getItem('isSignedin') === 'true',
  email: localStorage.getItem('email'),
  name: localStorage.getItem('name'),
  department: localStorage.getItem('department'),
  userId: localStorage.getItem('userId'),
};

const signIn = (state = initialState, action = {}) => {
  switch (action.type) {
    case AUTH_TYPES.FETCH_SIGNIN_START:
      return { ...state, isFetching: true, isError: '' };
    case AUTH_TYPES.FETCH_SIGNIN_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
        department: action.payload.department,
        isFetching: false,
        isError: '',
        isSignedIn: true,
        userId: action.payload.id,
      };
    case AUTH_TYPES.FETCH_SIGNIN_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    case AUTH_TYPES.SIGNIN_LOG_OUT:
      return {
        ...state,
        email: '',
        name: '',
        department: '',
        isFetching: false,
        isError: '',
        isSignedIn: false,
      };
    default:
      return state;
  }
};
export default signIn;
