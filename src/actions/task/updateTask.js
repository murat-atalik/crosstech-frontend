import TASK_TYPES from 'action-types/task';
import axios from 'axios';
import { toast } from 'react-toastify';

import { fetchGetAllTasksInfo } from './getAllTaks';
import { fetchGetMyTasksInfo } from './getMyTasks';
import { fetchGetPendingTasksTasksInfo } from './getPendingTasks';
import { fetchGetTaskInfo } from './getTask';

export const fetchUpdateTaskStart = () => ({
  type: TASK_TYPES.FETCH_UPDATE_TASK_START,
});

export const fetchUpdateTaskSuccess = () => ({
  type: TASK_TYPES.FETCH_UPDATE_TASK_SUCCESS,
});

export const fetchUpdateTaskError = (err) => ({
  type: TASK_TYPES.FETCH_UPDATE_TASK_ERROR,
  payload: err,
});

export const fetchUpdateTaskInfo = (id, data) => async (dispatch) => {
  dispatch(fetchUpdateTaskStart());
  axios
    .put(`http://localhost:5000/api/task/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then(() => {
      dispatch(fetchUpdateTaskSuccess());
      toast.success('Task updated.', {
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
