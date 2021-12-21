import TASK_TYPES from 'action-types/task';

const initialState = {
  isFetching: false,
  isError: '',
};

const deleteTask = (state = initialState, action = {}) => {
  switch (action.type) {
    case TASK_TYPES.FETCH_DELETE_TASK_START:
      return { ...state, isFetching: true, isError: '' };
    case TASK_TYPES.FETCH_DELETE_TASK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: '',
      };
    case TASK_TYPES.FETCH_DELETE_TASK_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    default:
      return state;
  }
};
export default deleteTask;
