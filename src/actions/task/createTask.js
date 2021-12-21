import TASK_TYPES from 'action-types/task';
import axios from 'axios';
import { toast } from 'react-toastify';

import { fetchGetAllTasksInfo } from './getAllTaks';
import { fetchGetMyTasksInfo } from './getMyTasks';
import { fetchGetPendingTasksTasksInfo } from './getPendingTasks';

export const fetchCreateTaskStart = () => ({
  type: TASK_TYPES.FETCH_CREATE_TASK_START,
});

export const fetchCreateTaskSuccess = (post) => ({
  type: TASK_TYPES.FETCH_CREATE_TASK_SUCCESS,
  payload: post,
});

export const fetchCreateTaskError = (err) => ({
  type: TASK_TYPES.FETCH_CREATE_TASK_ERROR,
  payload: err,
});
export const redirectCreateTask = () => ({
  type: TASK_TYPES.REDIRECT_CREATE_TASK,
});

export const fetchCreateTaskInfo = (data) => async (dispatch) => {
  dispatch(fetchCreateTaskStart());
  axios
    .post('http://localhost:5000/api/task', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then((response) => {
      dispatch(fetchCreateTaskSuccess(response.data.payload));
      toast.success('Task created.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        closeButton: false,
      });
    })
    .finally(() => {
      dispatch(fetchGetAllTasksInfo());
      dispatch(fetchGetMyTasksInfo());
      dispatch(fetchGetPendingTasksTasksInfo());
    });
};
