import './actionType.scss';

import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Menu, MenuItem } from '@mui/material';
import { fetchCompleteTaskInfo } from 'actions/task/completeTask';
import { fetchDeleteTaskInfo } from 'actions/task/deleteTask';
import { fetchRejectTaskInfo } from 'actions/task/rejectTask';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import UpdateTaskModal from 'components/UpdateTaskModal/UpdateTaskModal';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialModalState = {
  complete: false,
  reject: false,
  delete: false,
  update: false,
};
const ActionType = function ({ task, isDetails }) {
  const signIn = useSelector((state) => state.signIn);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(initialModalState);
  const [title, setTitle] = useState('');

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const openModal = (name) => {
    const toggle = { [name]: true };
    setOpen({ ...initialModalState, ...toggle });
    handleClose();
  };

  const closeModal = () => {
    setOpen({ ...initialModalState });
  };

  const openDeleteModal = () => {
    openModal('delete');
    setTitle('The task will be deleted. Are you sure?');
  };

  const openRejectModal = () => {
    openModal('reject');
    setTitle('The task will be rejected. Are you sure?');
  };

  const openCompleteModal = () => {
    openModal('complete');
    setTitle('The task will be completed. Are you sure?');
  };

  const openUpdateModal = () => {
    openModal('update');
  };

  const handleTaskDetail = () => {
    navigate(`/task/${task.id}`);
  };
  if (isDetails && task.status !== 0) {
    return <div />;
  }
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
        className="action-type-button"
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!isDetails && (
          <MenuItem
            className="action-type-button-actions"
            onClick={handleTaskDetail}
          >
            <VisibilityIcon />
            <p> Inspect</p>
          </MenuItem>
        )}

        {Number(signIn.userId) === task?.user?.id && task.status === 0 && (
          <MenuItem
            className="action-type-button-actions"
            onClick={openUpdateModal}
          >
            <EditIcon />
            <p>Edit</p>
          </MenuItem>
        )}

        {Number(signIn.department) === task?.assignedDepartment &&
          task.status === 0 && (
            <MenuItem
              className="action-type-button-actions"
              name="complete"
              onClick={openCompleteModal}
            >
              <DoneIcon />
              <p>Complete</p>
            </MenuItem>
          )}

        {Number(signIn.userId) === task?.user?.id && task.status === 0 && (
          <MenuItem
            className="action-type-button-actions"
            name="delete"
            onClick={openDeleteModal}
          >
            <DeleteIcon />
            <p>Delete</p>
          </MenuItem>
        )}

        {Number(signIn.department) === task?.assignedDepartment &&
          task.status === 0 && (
            <MenuItem
              className="action-type-button-actions"
              name="reject"
              onClick={openRejectModal}
            >
              <ClearIcon />
              <p>Reject</p>
            </MenuItem>
          )}
      </Menu>

      <ConfirmModal
        open={open.complete}
        closeModal={closeModal}
        callback={fetchCompleteTaskInfo}
        title={title}
        id={task.id}
        isDetails={isDetails}
      />
      <ConfirmModal
        open={open.delete}
        closeModal={closeModal}
        callback={fetchDeleteTaskInfo}
        title={title}
        id={task.id}
        isDetails={isDetails}
      />
      <ConfirmModal
        open={open.reject}
        closeModal={closeModal}
        callback={fetchRejectTaskInfo}
        title={title}
        id={task.id}
        isDetails={isDetails}
      />
      <UpdateTaskModal
        open={open.update}
        closeModal={closeModal}
        task={task}
        isDetails={isDetails}
      />
    </div>
  );
};

export default ActionType;
