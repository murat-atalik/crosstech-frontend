import './sidebar.scss';

import { ExitToApp } from '@mui/icons-material';
import { Button } from '@mui/material';
import { signinLogout } from 'actions/auth/signin';
import avatar from 'assets/avatar.png';
import CustomLink from 'components/CustomLink/CustomLink';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Sidebar = function () {
  const user = useSelector((state) => state.signIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    dispatch(signinLogout());
    localStorage.clear();
    navigate('/');
    toast.success('Logged out.', {
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
  };

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-title">
          <img src={avatar} alt="avatar" className="sidebar-account-img" />
          <h2>{user.name}</h2>
        </div>
        <hr className="sidebar-linebreak" />
        <nav>
          <CustomLink to="/all-tasks" className="sidebar-link">
            All Tasks
          </CustomLink>
          <CustomLink to="/my-tasks" className="sidebar-link">
            My Tasks
          </CustomLink>
          <CustomLink to="/department-tasks" className="sidebar-link">
            Department Tasks
          </CustomLink>
          <CustomLink to="/create-task" className="sidebar-link">
            Create Task
          </CustomLink>
        </nav>
        <Button
          type="button"
          variant="contained"
          className="sign-out-button"
          onClick={signOut}
        >
          <ExitToApp fontSize="small" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
