import TASK_TYPES from 'action-types/task';
import axios from 'axios';
import { toast } from 'react-toastify';

import { fetchGetAllTasksInfo } from './getAllTaks';
import { fetchGetMyTasksInfo } from './getMyTasks';
import { fetchGetPendingTasksTasksInfo } from './getPendingTasks';

export const fetchDeleteTaskStart = () => ({
  type: TASK_TYPES.FETCH_DELETE_TASK_START,
});

export const fetchDeleteTaskSuccess = () => ({
  type: TASK_TYPES.FETCH_DELETE_TASK_SUCCESS,
});

export const fetchDeleteTaskError = (err) => ({
  type: TASK_TYPES.FETCH_DELETE_TASK_ERROR,
  payload: err,
});

export const fetchDeleteTaskInfo = (id) => async (dispatch) => {
  dispatch(fetchDeleteTaskStart());
  axios
    .delete(`http://localhost:5000/api/task/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then(() => {
      dispatch(fetchDeleteTaskSuccess());
      toast.success('Task deleted.', {
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
