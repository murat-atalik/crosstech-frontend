import TASK_TYPES from 'action-types/task';

const initialState = {
  postData: [],
  isFetching: false,
  isError: '',
  isFetched: false,
};

const getPendingTasks = (state = initialState, action = {}) => {
  switch (action.type) {
    case TASK_TYPES.FETCH_GET_PENDING_TASKS_START:
      return { ...state, isFetching: true, isError: '', isFetched: false };
    case TASK_TYPES.FETCH_GET_PENDING_TASKS_SUCCESS:
      return {
        ...state,
        postData: action.payload,
        isFetching: false,
        isError: '',
        isFetched: true,
      };
    case TASK_TYPES.FETCH_GET_PENDING_TASKS_ERROR:
      return {
        ...state,
        isError: action.payload,
        isFetching: false,
        isFetched: true,
      };
    default:
      return state;
  }
};
export default getPendingTasks;
