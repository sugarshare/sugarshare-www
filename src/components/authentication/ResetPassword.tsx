import React, { useState } from 'react';
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

import AuthenticationForm from 'components/authentication/AuthenticationForm';

interface ResetPasswordState {
  email: string;
}

const INITIAL_STATE: ResetPasswordState = {
  email: '',
};

export default function ResetPassword() {
  const [resetPasswordState, setResetPasswordState] = useState<ResetPasswordState>(INITIAL_STATE);

  const handleChange = (prop: keyof ResetPasswordState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setResetPasswordState({
      ...resetPasswordState,
      [prop]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO
  };

  return (
    <AuthenticationForm handleSubmit={handleSubmit}>
      <TextField
        variant='outlined'
        id='email'
        type='email'
        label='Email'
        helperText='We will send you a link to reset your password'
        value={resetPasswordState.email}
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

      <Button
        variant='contained'
        type='submit'
        size='large'
        fullWidth
        sx={{
          marginY: 2,
          borderRadius: 2,
        }}
      >
        Submit
      </Button>

      <Typography variant='caption'>
        Create an account instead?&nbsp;
        <Link href='/signup' color='inherit' title='Sign up'>Sign up</Link>
        .
      </Typography>
    </AuthenticationForm>
  );
}
