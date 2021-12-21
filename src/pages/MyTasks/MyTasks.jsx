import './myTasks.scss';

import { fetchGetMyTasksInfo } from 'actions/task/getMyTasks';
import Navbar from 'components/Navbar/Navbar';
import Sidebar from 'components/Sidebar/Sidebar';
import TableList from 'components/TableList/TableList';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MyTasks = function () {
  const dispatch = useDispatch();
  const myTasks = useSelector((state) => state.getMyTasks);

  useEffect(() => {
    if (
      !myTasks.isFetching &&
      myTasks.postData.length === 0 &&
      !myTasks.isFetched
    ) {
      dispatch(fetchGetMyTasksInfo());
    }
  }, [
    myTasks.isFetching,
    myTasks.postData.length,
    dispatch,
    myTasks.isFetched,
  ]);

  return (
    <div className="page-container">
      <Sidebar />
      <Navbar />
      <div className="my-tasks">
        <TableList tasks={myTasks.postData} title="MY TASKS" />
      </div>
    </div>
  );
};

export default MyTasks;
