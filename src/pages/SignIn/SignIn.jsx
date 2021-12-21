import './signIn.scss';

import { Button, TextField } from '@mui/material';
import { fetchSigninInfo } from 'actions/auth/signin';
import validate from 'helpers/signinHelper';
import useValidation from 'hooks/useValidation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignIn = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signin = useSelector((state) => state.signIn);
  const [values, setValues] = useState({ email: '' });

  const validateForm = (value) => {
    if (!signin.isSignedIn && !signin.isFetching) {
      dispatch(fetchSigninInfo(value));
    }
  };

  const { handleSubmit, handleChange, errors } = useValidation(
    validateForm,
    validate,
    values
  );

  useEffect(() => {
    if (signin.isSignedIn) {
      navigate('/all-tasks');
    }
  }, [navigate, signin.isSignedIn]);

  return (
    <div className="sign-in-container">
      <div className="sign-in">
        <div className="sign-in-title">
          <h2>SIGN IN</h2>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            helperText={errors.emailMsg}
            error={errors.emailErr}
            variant="outlined"
            className="sign-in-email-input"
            type="text"
            name="email"
            value={values.email}
            placeholder="example@example.com"
            onChange={(e) => {
              setValues({
                ...values,
                email: e.target.value,
              });
              handleChange();
            }}
          />
          <TextField
            variant="outlined"
            type="password"
            placeholder="••••••••"
            className="sign-in-password-input"
            disabled
          />
          <Button type="submit" variant="contained" className="sign-in-button">
            SIGN IN
          </Button>
          <div className="sign-in-signup">
            <p>
              Don`t have an account? <em>Sign up</em>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
