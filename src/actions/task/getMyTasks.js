import TASK_TYPES from 'action-types/task';
import axios from 'axios';

export const fetchGetMyTasksStart = () => ({
  type: TASK_TYPES.FETCH_GET_MY_TASKS_START,
});

export const fetchGetMyTasksSuccess = (post) => ({
  type: TASK_TYPES.FETCH_GET_MY_TASKS_SUCCESS,
  payload: post,
});

export const fetchGetMyTasksError = (err) => ({
  type: TASK_TYPES.FETCH_GET_MY_TASKS_ERROR,
  payload: err,
});

export const fetchGetMyTasksInfo = () => async (dispatch) => {
  dispatch(fetchGetMyTasksStart());
  axios
    .get('http://localhost:5000/api/task/my-tasks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then((response) => {
      dispatch(fetchGetMyTasksSuccess(response.data.payload));
    });
};
