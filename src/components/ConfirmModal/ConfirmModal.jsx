import './confirmModal.scss';

import { Button, Modal } from '@mui/material';
import { fetchGetTaskInfo } from 'actions/task/getTask';
import React from 'react';
import { useDispatch } from 'react-redux';

const ConfirmModal = function ({
  open,
  closeModal,
  title,
  callback,
  id,
  isDetails,
}) {
  const handleClose = () => {
    closeModal();
  };

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(callback(id));
    if (isDetails) {
      dispatch(fetchGetTaskInfo(id));
    }
    handleClose();
  };

  return (
    <div>
      <Modal
        className="confirm-modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="confirm-modal-container">
          <div className="confirm-modal-container-header">
            <p>PLEASE CONFIRM YOUR ACTION!</p>
          </div>
          <div className="confirm-modal-container-body">
            <div>
              <p>{title}</p>
            </div>
            <div className="confirm-modal-container-buttons">
              <Button type="button" variant="contained" onClick={handleClick}>
                Confirm
              </Button>
              <Button
                type="button"
                variant="contained"
                color="error"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
