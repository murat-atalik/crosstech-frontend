import './taskDetails.scss';

import { clearGetTaskError, fetchGetTaskInfo } from 'actions/task/getTask';
import ActionType from 'components/ActionType/ActionType';
import Navbar from 'components/Navbar/Navbar';
import Sidebar from 'components/Sidebar/Sidebar';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const TaskDetails = function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getTask = useSelector((state) => state.getTask);

  useEffect(() => {
    dispatch(fetchGetTaskInfo(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (getTask.isError) {
      navigate('/all-tasks');
      dispatch(clearGetTaskError());
    }
  }, [dispatch, getTask.isError, id, navigate]);

  return (
    <div className="page-container">
      <Sidebar />
      <Navbar />
      <div className="task-detail">
        <div className="task-detail-container">
          <div className="task-detail-container-title">
            <h2>{getTask?.postData?.title}</h2>
            <div className="task-detail-container-title-action">
              <ActionType task={getTask.postData} isDetails />
            </div>
          </div>
          <div className="task-detail-container-body">
            <div className="task-detail-container-body-detail">
              <p className="task-detail-container-body-department">
                {(getTask?.postData?.assignedDepartment === 1 &&
                  'Human resources department') ||
                  (getTask?.postData?.assignedDepartment === 2 &&
                    'Sales Department') ||
                  (getTask?.postData?.assignedDepartment === 3 &&
                    'Marketing Department')}
              </p>
              <p className="task-detail-container-body-creator">
                Created by: {getTask?.postData?.user?.name}
              </p>
              <p className={`table-status-${getTask?.postData?.status}`}>
                {(getTask?.postData?.status === 0 && 'Pending') ||
                  (getTask?.postData?.status === 1 && 'Completed') ||
                  (getTask?.postData?.status === 2 && 'Rejected')}
              </p>
            </div>

            <div className="task-detail-container-body-description">
              <p>{getTask?.postData?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
