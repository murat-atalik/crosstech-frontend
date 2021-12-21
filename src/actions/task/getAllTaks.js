import TASK_TYPES from 'action-types/task';
import axios from 'axios';

export const fetchGetAllTasksStart = () => ({
  type: TASK_TYPES.FETCH_GET_ALL_START,
});

export const fetchGetAllTasksSuccess = (post) => ({
  type: TASK_TYPES.FETCH_GET_ALL_SUCCESS,
  payload: post,
});

export const fetchGetAllTasksError = (err) => ({
  type: TASK_TYPES.FETCH_GET_ALL_ERROR,
  payload: err,
});

export const fetchGetAllTasksInfo = () => async (dispatch) => {
  dispatch(fetchGetAllTasksStart());
  axios
    .get('http://localhost:5000/api/task', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then((response) => {
      dispatch(fetchGetAllTasksSuccess(response.data.payload));
    });
};
