import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';

import AuthenticationForm from 'components/authentication/AuthenticationForm';
import AuthenticationClient from 'libs/authentication';
import { UserNotFoundException, InvalidParameterException } from 'libs/errors';

interface ResetPasswordState {
  email: string;
  isLoading: boolean;
}

const INITIAL_STATE: ResetPasswordState = {
  email: '',
  isLoading: false,
};

export default function ResetPassword() {
  const [resetPasswordState, setResetPasswordState] = useState<ResetPasswordState>(INITIAL_STATE);

  const navigate = useNavigate();

  const handleChange = (prop: keyof ResetPasswordState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setResetPasswordState({
      ...resetPasswordState,
      [prop]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO
    setResetPasswordState({
      ...resetPasswordState,
      isLoading: true,
    });

    const { email } = resetPasswordState;
    try {
      await AuthenticationClient.resetPassword({ email });
      navigate(`/newpassword?email=${email}`);
    } catch (error) {
      if (error instanceof UserNotFoundException || error instanceof InvalidParameterException) {
        navigate(`/newpassword?email=${email}`);
      } else {
        console.error(error);
      }
    } finally {
      setResetPasswordState({
        ...resetPasswordState,
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
        value={resetPasswordState.email}
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
        loading={resetPasswordState.isLoading}
        loadingPosition='end'
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
