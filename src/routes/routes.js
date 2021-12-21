import AllTasks from 'pages/AllTasks/AllTasks';
import CreateTask from 'pages/CreateTask/CreateTask';
import DepartmentTasks from 'pages/DepartmentTasks/DepartmentTasks';
import MyTasks from 'pages/MyTasks/MyTasks';
import TaskDetails from 'pages/TaskDetails/TaskDetails';

const routes = [
  { path: '/all-tasks', component: AllTasks },
  { path: '/my-tasks', component: MyTasks },
  { path: '/department-tasks', component: DepartmentTasks },
  { path: '/create-task', component: CreateTask },
  { path: '/task/:id', component: TaskDetails },
];
export default routes;
