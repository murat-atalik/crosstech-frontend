import './allTasks.scss';

import { fetchGetAllTasksInfo } from 'actions/task/getAllTaks';
import Navbar from 'components/Navbar/Navbar';
import Sidebar from 'components/Sidebar/Sidebar';
import TableList from 'components/TableList/TableList';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AllTasks = function () {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.getAllTasks);

  useEffect(() => {
    if (
      !allTasks.isFetching &&
      allTasks.postData.length === 0 &&
      !allTasks.isFetched
    ) {
      dispatch(fetchGetAllTasksInfo());
    }
  }, [
    allTasks.isFetched,
    allTasks.isFetching,
    allTasks.postData.length,
    dispatch,
  ]);

  return (
    <div className="page-container">
      <Sidebar />
      <Navbar />
      <div className="all-tasks">
        <TableList tasks={allTasks.postData} title="ALL TASKS" />
      </div>
    </div>
  );
};

export default AllTasks;
