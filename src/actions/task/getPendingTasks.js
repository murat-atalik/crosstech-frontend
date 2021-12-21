import TASK_TYPES from 'action-types/task';
import axios from 'axios';

export const fetchGetPendingTasksTasksStart = () => ({
  type: TASK_TYPES.FETCH_GET_PENDING_TASKS_START,
});

export const fetchGetPendingTasksTasksSuccess = (post) => ({
  type: TASK_TYPES.FETCH_GET_PENDING_TASKS_SUCCESS,
  payload: post,
});

export const fetchGetPendingTasksTasksError = (err) => ({
  type: TASK_TYPES.FETCH_GET_PENDING_TASKS_ERROR,
  payload: err,
});

export const fetchGetPendingTasksTasksInfo = () => async (dispatch) => {
  dispatch(fetchGetPendingTasksTasksStart());
  axios
    .get('http://localhost:5000/api/task/pendings', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then((response) => {
      dispatch(fetchGetPendingTasksTasksSuccess(response.data.payload));
    });
};
