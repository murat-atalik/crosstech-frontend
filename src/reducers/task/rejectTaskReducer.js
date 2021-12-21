import TASK_TYPES from 'action-types/task';

const initialState = {
  isFetching: false,
  isError: '',
};

const rejectTask = (state = initialState, action = {}) => {
  switch (action.type) {
    case TASK_TYPES.FETCH_COMPLETE_START:
      return { ...state, isFetching: true, isError: '' };
    case TASK_TYPES.FETCH_COMPLETE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isError: '',
      };
    case TASK_TYPES.FETCH_COMPLETE_ERROR:
      return { ...state, isError: action.payload, isFetching: false };
    default:
      return state;
  }
};
export default rejectTask;
