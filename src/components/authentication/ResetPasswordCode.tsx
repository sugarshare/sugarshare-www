import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import AuthenticationForm from 'components/authentication/AuthenticationForm';
import AuthenticationClient from 'libs/authentication';
import {
  UserNotFoundException,
  InvalidPasswordException,
  CodeMismatchException,
  ExpiredCodeException,
  LimitExceededException,
} from 'libs/errors';

interface ResetPasswordCodeState {
  email: string;
  code: string;
  newPassword: string;
  showPassword: boolean;
  isLoading: boolean;
}

const INITIAL_STATE: ResetPasswordCodeState = {
  email: '',
  code: '',
  newPassword: '',
  showPassword: false,
  isLoading: false,
};

const INITIAL_ERROR_STATE = {
  isCodeError: false,
  isPasswordError: false,
  isMaximumAttemptsExceededError: false,
};

export default function ResetPasswordCode() {
  const [searchParams, setSearchParams] = useSearchParams();
  const emailParameter = searchParams.get('email');

  const [state, setState] = useState<ResetPasswordCodeState>({
    ...INITIAL_STATE,
    email: emailParameter ?? '',
  });

  const [errorState, setErrorState] = useState(INITIAL_ERROR_STATE);

  const navigate = useNavigate();

  const handleChange = (prop: keyof ResetPasswordCodeState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (prop === 'code') {
      // When in code error state, reset error when user updates the code
      setErrorState({
        ...errorState,
        isCodeError: false,
      });
    } else if (prop === 'newPassword' && errorState.isPasswordError) {
      // When in password error state, help user by showing when password is valid
      setErrorState({
        ...errorState,
        isPasswordError: !AuthenticationClient.isPasswordValid(event.target.value),
      });
    }

    setState({
      ...state,
      [prop]: event.target.value,
    });
  };

  const handleShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!AuthenticationClient.isPasswordValid(state.newPassword)) {
      setErrorState({
        ...errorState,
        isPasswordError: true,
      });
      return;
    }

    setErrorState(INITIAL_ERROR_STATE);
    setState({
      ...state,
      isLoading: true,
    });

    const { email, code, newPassword } = state;
    try {
      await AuthenticationClient.resetPasswordCode({ email, code, newPassword });
      navigate(`/login?email=${email}&ispasswordreset=true`);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        navigate(`/login?email=${email}&ispasswordreset=true`);
      } else if (error instanceof InvalidPasswordException) {
        setErrorState({
          ...errorState,
          isPasswordError: true,
        });
      } else if (error instanceof CodeMismatchException || error instanceof ExpiredCodeException) {
        setErrorState({
          ...errorState,
          isCodeError: true,
        });
      } else if (error instanceof LimitExceededException) {
        setErrorState({
          ...errorState,
          isMaximumAttemptsExceededError: true,
        });
      } else {
        console.error(error);
      }
    } finally {
      setState({
        ...state,
        isLoading: false,
      });
    }
  };

  return (
    <AuthenticationForm handleSubmit={handleSubmit}>
      <TextField
        variant='outlined'
        id='email'
        type='email'
        label='Email'
        value={state.email}
        onChange={handleChange('email')}
        error={errorState.isMaximumAttemptsExceededError}
        margin='normal'
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        variant='outlined'
        id='code'
        type='text'
        label='Reset code'
        value={state.code}
        onChange={handleChange('code')}
        error={errorState.isCodeError || errorState.isMaximumAttemptsExceededError}
        helperText={
          errorState.isCodeError
            ? 'This code is expired or invalid. Please try again to reset your password.'
            : errorState.isMaximumAttemptsExceededError
              ? null
              : 'We sent a password reset code to your email inbox'
        }
        margin='normal'
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <MarkEmailUnreadIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        variant='outlined'
        id='password'
        type={state.showPassword ? 'text' : 'password'}
        label='New password'
        value={state.newPassword}
        onChange={handleChange('newPassword')}
        error={errorState.isPasswordError || errorState.isMaximumAttemptsExceededError}
        helperText={
          errorState.isMaximumAttemptsExceededError
            ? 'Maximum number of attempts exceeded. Please wait and retry later.'
            : 'Must be 8 characters long at least'
        }
        margin='normal'
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <LockIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        variant='contained'
        type='submit'
        size='large'
        fullWidth
        loading={state.isLoading}
        sx={{
          marginY: 2,
          borderRadius: 2,
        }}
      >
        Submit
      </LoadingButton>

      <Typography variant='caption'>
        Create an account instead?&nbsp;
        <Link href='/signup' color='inherit' title='Sign up'>Sign up</Link>
        .
      </Typography>
    </AuthenticationForm>
  );
}
