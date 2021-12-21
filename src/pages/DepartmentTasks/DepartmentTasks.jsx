import './departmentTasks.scss';

import { fetchGetPendingTasksTasksInfo } from 'actions/task/getPendingTasks';
import Navbar from 'components/Navbar/Navbar';
import Sidebar from 'components/Sidebar/Sidebar';
import TableList from 'components/TableList/TableList';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DepartmentTasks = function () {
  const dispatch = useDispatch();
  const pendingTasks = useSelector((state) => state.getPendingTasks);

  useEffect(() => {
    if (!pendingTasks.isFetching && pendingTasks.postData.length === 0) {
      dispatch(fetchGetPendingTasksTasksInfo());
    }
  }, [pendingTasks.isFetching, pendingTasks.postData.length, dispatch]);

  return (
    <div className="page-container">
      <Sidebar />
      <Navbar />
      <div className="department-tasks">
        <TableList tasks={pendingTasks.postData} title="DEPARTMENT TASKS" />
      </div>
    </div>
  );
};

export default DepartmentTasks;
