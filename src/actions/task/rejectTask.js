import TASK_TYPES from 'action-types/task';
import axios from 'axios';
import { toast } from 'react-toastify';

import { fetchGetAllTasksInfo } from './getAllTaks';
import { fetchGetMyTasksInfo } from './getMyTasks';
import { fetchGetPendingTasksTasksInfo } from './getPendingTasks';
import { fetchGetTaskInfo } from './getTask';

export const fetchRejectTaskStart = () => ({
  type: TASK_TYPES.FETCH_REJECT_TASK_START,
});

export const fetchRejectTaskSuccess = () => ({
  type: TASK_TYPES.FETCH_REJECT_TASK_SUCCESS,
});

export const fetchRejectTaskError = (err) => ({
  type: TASK_TYPES.FETCH_REJECT_TASK_ERROR,
  payload: err,
});

export const fetchRejectTaskInfo = (id) => async (dispatch) => {
  dispatch(fetchRejectTaskStart());
  axios
    .get(`http://localhost:5000/api/task/reject/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
    })
    .then(() => {
      dispatch(fetchRejectTaskSuccess());
      toast.success('Task rejected.', {
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
