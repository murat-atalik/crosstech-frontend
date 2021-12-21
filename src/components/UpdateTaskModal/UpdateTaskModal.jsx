import './updateTaskModal.scss';

import { Button, Modal, TextField } from '@mui/material';
import { fetchGetTaskInfo } from 'actions/task/getTask';
import { fetchUpdateTaskInfo } from 'actions/task/updateTask';
import validate from 'helpers/updateTaskHelper';
import useValidation from 'hooks/useValidation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UpdateTaskModal = function ({ open, closeModal, task, isDetails }) {
  const signin = useSelector((state) => state.signIn);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    title: task.title,
    description: task.description,
  });

  const handleClose = () => {
    closeModal();
    console.log('task :>> ', task);
    setValues({ title: task.title, description: task.description });
  };

  const validateForm = (value) => {
    if (signin.isSignedIn) {
      dispatch(fetchUpdateTaskInfo(task.id, value));
      console.log('isDetails :>> ', isDetails);
      if (isDetails) {
        console.log('object');
        dispatch(fetchGetTaskInfo(task.id));
      }
      handleClose();
    }
  };

  const { handleSubmit, handleChange, errors } = useValidation(
    validateForm,
    validate,
    values
  );

  const handleForm = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    handleChange();
  };

  useEffect(() => {
    setValues({ title: task.title, description: task.description });
  }, [task.description, task.title]);

  return (
    <div>
      <Modal
        className="confirm-modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="update-task-container">
          <div className="update-task-container-inner">
            <div className="update-task-container-title">
              <h1>UPDATE TASK</h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="update-task-container-form"
            >
              <TextField
                className="update-task-container-form-input"
                fullWidth
                helperText={errors.titleMsg}
                error={errors.titleErr}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                onChange={handleForm}
                value={values.title}
                name="title"
              />
              <TextField
                className="update-task-container-form-textarea"
                fullWidth
                helperText={errors.descriptionMsg}
                error={errors.descriptionErr}
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={values.description}
                variant="outlined"
                onChange={handleForm}
                name="description"
              />
              <div className="update-task-container-form-buttons">
                <Button
                  className="update-task-container-form-button"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Update Task
                </Button>
                <Button
                  className="update-task-container-form-button"
                  type="button"
                  variant="contained"
                  color="error"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateTaskModal;
