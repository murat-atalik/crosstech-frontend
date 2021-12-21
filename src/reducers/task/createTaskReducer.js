import TASK_TYPES from 'action-types/task';

const initialState = {
  postData: [],
  isFetching: false,
  isError: '',
  isCreated: false,
};

const createTask = (state = initialState, action = {}) => {
  switch (action.type) {
    case TASK_TYPES.FETCH_CREATE_TASK_START:
      return { ...state, isFetching: true, isError: '', isCreated: false };
    case TASK_TYPES.FETCH_CREATE_TASK_SUCCESS:
      return {
        ...state,
        postData: action.payload,
        isFetching: false,
        isError: '',
        isCreated: true,
      };
    case TASK_TYPES.FETCH_CREATE_TASK_ERROR:
      return {
        ...state,
        isError: action.payload,
        isFetching: false,
        isCreated: false,
      };
    case TASK_TYPES.REDIRECT_CREATE_TASK:
      return {
        ...state,
        isCreated: false,
      };
    default:
      return state;
  }
};
export default createTask;
