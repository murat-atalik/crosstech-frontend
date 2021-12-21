import TASK_TYPES from 'action-types/task';
import axios from 'axios';
import { toast } from 'react-toastify';

import { fetchGetAllTasksInfo } from './getAllTaks';
import { fetchGetMyTasksInfo } from './getMyTasks';
import { fetchGetPendingTasksTasksInfo } from './getPendingTasks';
import { fetchGetTaskInfo } from './getTask';

export const fetchCompleteTaskStart = () => ({
  type: TASK_TYPES.FETCH_COMPLETE_TASK_START,
});

export const fetchCompleteTaskSuccess = () => ({
  type: TASK_TYPES.FETCH_COMPLETE_TASK_SUCCESS,
});

export const fetchCompleteTaskError = (err) => ({
  type: TASK_TYPES.FETCH_COMPLETE_TASK_ERROR,
  payload: err,
});

export const fetchCompleteTaskInfo = (id) => async (dispatch) => {
  dispatch(fetchCompleteTaskStart());
  axios
    .get(`http://localhost:5000/api/task/complete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then((response) => {
      dispatch(fetchCompleteTaskSuccess(response.data.payload));
      toast.success('Task completed.', {
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
      dispatch(fetchGetTaskInfo(id));
    });
};
