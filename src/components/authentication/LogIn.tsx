import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import NotificationSnackbar from 'components/NotificationSnackbar';
import AuthenticationForm from 'components/authentication/AuthenticationForm';
import AuthenticationClient from 'libs/authentication';
import {
  UserNotFoundException,
  UserNotConfirmedException,
  NotAuthorizedException,
} from 'libs/errors';

interface LogInState {
  email: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
}

const INITIAL_STATE: LogInState = {
  email: '',
  password: '',
  showPassword: false,
  isLoading: false,
};

const INITIAL_ERROR_STATE = {
  isEmailError: false,
  isPasswordError: false,
  emailMessage: '',
  passwordMessage: '',
};

export default function LogIn() {
  const [searchParams, setSearchParams] = useSearchParams();
  const emailParameter = searchParams.get('email');
  const isPasswordReset = searchParams.get('ispasswordreset');

  const [state, setState] = useState<LogInState>({
    ...INITIAL_STATE,
    email: emailParameter ?? '',
  });

  const [errorState, setErrorState] = useState(INITIAL_ERROR_STATE);

  const handleChange = (prop: keyof LogInState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorState(INITIAL_ERROR_STATE);

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

    setErrorState(INITIAL_ERROR_STATE);
    setState({
      ...state,
      isLoading: true,
    });

    const { email, password } = state;
    try {
      const user = await AuthenticationClient.logIn({ email, password });
    } catch (error) {
      if (error instanceof UserNotConfirmedException) {
        setErrorState({
          ...errorState,
          isEmailError: true,
          emailMessage: 'We need to confirm your email. Please check your inbox for a confirmation link.',
        });
      } else if (error instanceof UserNotFoundException || error instanceof NotAuthorizedException) {
        setErrorState({
          ...errorState,
          isEmailError: true,
          isPasswordError: true,
          emailMessage: '',
          passwordMessage: 'Email and/or password is incorrect.',
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
        error={errorState.isEmailError}
        helperText={errorState.isEmailError && errorState.emailMessage}
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
        id='password'
        type={state.showPassword ? 'text' : 'password'}
        label='Password'
        value={state.password}
        onChange={handleChange('password')}
        error={errorState.isPasswordError}
        helperText={errorState.isPasswordError && errorState.passwordMessage}
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

      <Typography variant='caption' sx={{ marginY: 2 }}>
        <Link href='/resetpassword' color='inherit' title='Forgot your password'>Forgot your password?</Link>
      </Typography>

      <LoadingButton
        variant='contained'
        type='submit'
        size='large'
        fullWidth
        loading={state.isLoading}
        sx={{
          marginY: 2,
          marginTop: 'auto',
          borderRadius: 2,
        }}
      >
        Log In
      </LoadingButton>

      <Typography variant='caption'>
        Create an account instead?&nbsp;
        <Link href='/signup' color='inherit' title='Sign up'>Sign up</Link>
        .
      </Typography>

      {isPasswordReset && <NotificationSnackbar message='Your password has been reset successfully!' />}
    </AuthenticationForm>
  );
}
