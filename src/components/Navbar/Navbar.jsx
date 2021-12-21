import './navbar.scss';

import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { signinLogout } from 'actions/auth/signin';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signIn = useSelector((state) => state.signIn);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const openMenu = Boolean(menuAnchor);
  const [accountAnchor, setAccountAnchor] = useState(null);
  const openAccount = Boolean(accountAnchor);

  const handleMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleAccount = (event) => {
    setAccountAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleCloseAccount = () => {
    setAccountAnchor(null);
  };

  const signOut = () => {
    handleCloseAccount();
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
    <div className="navbar">
      <AppBar position="static">
        <Toolbar className="navbar-container">
          <div className="navbar-container-menu">
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={menuAnchor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={openMenu}
              onClose={handleCloseMenu}
            >
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  navigate('/all-tasks');
                }}
              >
                All Tasks
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  navigate('/my-tasks');
                }}
              >
                My Tasks
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  navigate('/department-tasks');
                }}
              >
                Department Tasks
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  navigate('/create-task');
                }}
              >
                Create Task
              </MenuItem>
            </Menu>
            <Typography variant="h5">Crosstech</Typography>
          </div>
          <div className="navbar-container-account">
            <Typography variant="h5">{signIn.name}</Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleAccount}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={accountAnchor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={openAccount}
              onClose={handleCloseAccount}
            >
              <MenuItem onClick={signOut}>Sign Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
