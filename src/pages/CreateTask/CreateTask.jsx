import './createTask.scss';

import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  fetchCreateTaskInfo,
  redirectCreateTask,
} from 'actions/task/createTask';
import Navbar from 'components/Navbar/Navbar';
import Sidebar from 'components/Sidebar/Sidebar';
import validate from 'helpers/createTaskHelper';
import useValidation from 'hooks/useValidation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const newTask = {
  title: '',
  description: '',
  assignedDepartment: '',
};

const CreateTask = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createTask = useSelector((state) => state.createTask);
  const [values, setValues] = useState({ ...newTask });
  const signin = useSelector((state) => state.signIn);

  const validateForm = (value) => {
    if (signin.isSignedIn) {
      dispatch(fetchCreateTaskInfo(value));
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
    if (createTask.isCreated) {
      navigate(`/task/${createTask.postData.id}`);
      dispatch(redirectCreateTask());
    }
  }, [createTask.isCreated, createTask.postData.id, dispatch, navigate]);

  return (
    <div className="page-container">
      <Sidebar />
      <Navbar />
      <div className="create-task-container">
        <div className="create-task-container-inner">
          <div className="create-task-container-title">
            <h1>CREATE TASK</h1>
          </div>
          <form onSubmit={handleSubmit} className="create-task-container-form">
            <FormControl
              fullWidth
              error={errors.assignedDepartmentErr}
              className="create-task-container-form-input"
            >
              <InputLabel id="demo-simple-select-error-label">
                Assigned Department
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.assignedDepartment}
                onChange={handleForm}
                name="assignedDepartment"
                label="Assigned Department"
              >
                <MenuItem value={1}>Human resources department</MenuItem>
                <MenuItem value={2}>Sales Department</MenuItem>
                <MenuItem value={3}>Marketing Department </MenuItem>
              </Select>
              <FormHelperText>
                {errors.assignedDepartmentErr && errors.assignedDepartmentMsg}
              </FormHelperText>
            </FormControl>
            <TextField
              className="create-task-container-form-input"
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
              className="create-task-container-form-textarea"
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
            <Button
              className="create-task-container-form-button"
              type="submit"
              variant="contained"
              color="primary"
            >
              Create Task
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
