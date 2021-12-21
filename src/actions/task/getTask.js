import TASK_TYPES from 'action-types/task';
import axios from 'axios';

export const fetchGetTaskStart = () => ({
  type: TASK_TYPES.FETCH_GET_TASK_START,
});

export const fetchGetTaskSuccess = (post) => ({
  type: TASK_TYPES.FETCH_GET_TASK_SUCCESS,
  payload: post,
});

export const fetchGetTaskError = (err) => ({
  type: TASK_TYPES.FETCH_GET_TASK_ERROR,
  payload: err,
});
export const clearGetTaskError = () => ({
  type: TASK_TYPES.CLEAR_GET_TASK_ERROR,
});
export const fetchGetTaskInfo = (id) => async (dispatch) => {
  dispatch(fetchGetTaskStart());
  axios
    .get(`http://localhost:5000/api/task/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then((response) => {
      dispatch(fetchGetTaskSuccess(response.data.payload));
    })
    .catch((err) => {
      dispatch(fetchGetTaskError(err.response.data.error));
    });
};
