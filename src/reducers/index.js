import { combineReducers } from 'redux';

import SignInReducer from './auth/signInReducer';
import CompleteTaskReducer from './task/completeTaskReducer';
import CreateTaskReducer from './task/createTaskReducer';
import DeleteTaskReducer from './task/deleteTaskReducer';
import GetAllTasksReducer from './task/getAllTasksReducer';
import GetMyTasksReducer from './task/getMyTasksReducer';
import GetPendingTasksReducer from './task/getPendingTasksReducer';
import GetTaskReducer from './task/getTaskReducer';
import RejectTaskReducer from './task/rejectTaskReducer';
import UpdateTaskReducer from './task/updateTaskReducer';

export default combineReducers({
  signIn: SignInReducer,
  completeTask: CompleteTaskReducer,
  createTask: CreateTaskReducer,
  deleteTask: DeleteTaskReducer,
  getAllTasks: GetAllTasksReducer,
  getMyTasks: GetMyTasksReducer,
  getPendingTasks: GetPendingTasksReducer,
  getTask: GetTaskReducer,
  rejectTask: RejectTaskReducer,
  updateTask: UpdateTaskReducer,
});
