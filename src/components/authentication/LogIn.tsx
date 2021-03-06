import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

import NotificationSnackbar from 'components/NotificationSnackbar';
import AuthenticationForm from 'components/authentication/AuthenticationForm';
import AuthenticationClient from 'libs/authentication';
import {
  UserNotFoundException,
  UserNotConfirmedException,
  NotAuthorizedException,
  NetworkError,
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
  isNetworkError: false,
  emailMessage: '',
  passwordMessage: '',
};

export default function LogIn() {
  const [searchParams] = useSearchParams();
  const emailParameter = searchParams.get('email');
  const isPasswordReset = searchParams.get('ispasswordreset');
  const context = searchParams.get('context');
  const redirectUri = searchParams.get('redirect_uri');

  const [state, setState] = useState<LogInState>({
    ...INITIAL_STATE,
    email: emailParameter ?? '',
  });

  const [errorState, setErrorState] = useState(INITIAL_ERROR_STATE);
  const [resendConfirmation, setResendConfirmation] = useState(false);

  const navigate = useNavigate();

  const handleChange = (prop: keyof LogInState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorState(INITIAL_ERROR_STATE);

    setState((prevState) => ({
      ...prevState,
      [prop]: event.target.value,
    }));
  };

  const handleShowPassword = () => {
    setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleResendConfirmation = async () => {
    const { email } = state;

    try {
      await AuthenticationClient.resendConfirmationEmail({ email });
    } catch (error) {
      if (error instanceof NetworkError) {
        setErrorState((prevState) => ({
          ...prevState,
          isNetworkError: true,
        }));
      } else {
        console.error(error);
      }
    } finally {
      setResendConfirmation(false);
      setErrorState(INITIAL_ERROR_STATE);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorState(INITIAL_ERROR_STATE);
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const { email, password } = state;
    try {
      // User credentials are stored automatically
      const tokens = await AuthenticationClient.logIn({ email, password });

      if (context === 'extension' && redirectUri) {
        const params = {
          a: tokens?.accessToken ?? '',
          r: tokens?.refreshToken ?? '',
          i: tokens?.idToken ?? '',
        };

        const url = new URL('', redirectUri);
        Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

        window.location.href = url.href;
      } else if (redirectUri) {
        navigate(redirectUri, { replace: true });
      } else {
        navigate('/');
      }
    } catch (error) {
      if (error instanceof UserNotConfirmedException) {
        setResendConfirmation(true);
        setErrorState((prevState) => ({
          ...prevState,
          isEmailError: true,
          emailMessage: 'We need to confirm your email. Please check your inbox for a confirmation link.',
        }));
      } else if (error instanceof UserNotFoundException || error instanceof NotAuthorizedException) {
        setErrorState((prevState) => ({
          ...prevState,
          isEmailError: true,
          isPasswordError: true,
          emailMessage: '',
          passwordMessage: 'Incorrect email and/or password',
        }));
      } else if (error instanceof NetworkError) {
        setErrorState((prevState) => ({
          ...prevState,
          isNetworkError: true,
        }));
      } else {
        console.error(error);
      }
    } finally {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
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
        <Link href='/resetpassword' color='inherit'>Forgot your password?</Link>
      </Typography>

      {
        resendConfirmation && (
          <Button
            variant='text'
            size='small'
            onClick={handleResendConfirmation}
            sx={{ marginY: 2 }}
          >
            Resend confirmation link?
          </Button>
        )
      }

      <LoadingButton
        variant='contained'
        type='submit'
        size='large'
        fullWidth
        endIcon={<LoginIcon />}
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
      {errorState.isNetworkError && <NotificationSnackbar message='Something is wrong with the network. Please check your internet connection.' severity='error' />}
    </AuthenticationForm>
  );
}
