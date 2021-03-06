import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';

import NotificationSnackbar from 'components/NotificationSnackbar';
import AuthenticationForm from 'components/authentication/AuthenticationForm';
import AuthenticationClient from 'libs/authentication';
import { UserNotFoundException, InvalidParameterException, NetworkError } from 'libs/errors';

interface ResetPasswordState {
  email: string;
  isLoading: boolean;
}

const INITIAL_STATE: ResetPasswordState = {
  email: '',
  isLoading: false,
};

const INITIAL_ERROR_STATE = {
  isNetworkError: false,
};

export default function ResetPassword() {
  const [state, setState] = useState<ResetPasswordState>(INITIAL_STATE);
  const [errorState, setErrorState] = useState(INITIAL_ERROR_STATE);

  const navigate = useNavigate();

  const handleChange = (prop: keyof ResetPasswordState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [prop]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const { email } = state;
    try {
      await AuthenticationClient.resetPassword({ email });
      navigate(`/newpassword?email=${email}`);
    } catch (error) {
      if (error instanceof UserNotFoundException || error instanceof InvalidParameterException) {
        navigate(`/newpassword?email=${email}`);
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
        helperText='We will send you a link to reset your password'
        onChange={handleChange('email')}
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
        <Link href='/signup' color='inherit'>Sign up</Link>
        .
      </Typography>

      {errorState.isNetworkError && <NotificationSnackbar message='Something is wrong with the network. Please check your internet connection.' severity='error' />}
    </AuthenticationForm>
  );
}
