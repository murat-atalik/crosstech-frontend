import TASK_TYPES from 'action-types/task';

const initialState = {
  postData: {},
  isFetching: false,
  isError: false,
  errorMsg: '',
};

const getTask = (state = initialState, action = {}) => {
  switch (action.type) {
    case TASK_TYPES.FETCH_GET_TASK_START:
      return { ...state, isFetching: true, isError: false, isFetched: false };
    case TASK_TYPES.FETCH_GET_TASK_SUCCESS:
      return {
        ...state,
        postData: action.payload,
        isFetching: false,
        isError: false,
      };
    case TASK_TYPES.FETCH_GET_TASK_ERROR:
      return {
        ...state,
        isError: true,
        errorMsg: action.payload,
        isFetching: false,
      };
    case TASK_TYPES.CLEAR_GET_TASK_ERROR:
      return {
        ...state,
        isError: false,
        errorMsg: '',
        isFetching: false,
      };
    default:
      return state;
  }
};
export default getTask;
