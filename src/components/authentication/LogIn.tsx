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

interface LogInState {
  email: string;
  password: string;
  showPassword: boolean;
}

const INITIAL_STATE: LogInState = {
  email: '',
  password: '',
  showPassword: false,
};

export default function LogIn() {
  const [logInState, setLogInState] = useState<LogInState>(INITIAL_STATE);

  const handleChange = (prop: keyof LogInState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogInState({
      ...logInState,
      [prop]: event.target.value,
    });
  };

  const handleShowPassword = () => {
    setLogInState({
      ...logInState,
      showPassword: !logInState.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
        value={logInState.email}
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
      <TextField
        variant='outlined'
        id='password'
        type={logInState.showPassword ? 'text' : 'password'}
        label='Password'
        value={logInState.password}
        onChange={handleChange('password')}
        // error={!isPasswordValid}
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
                {logInState.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography variant='caption' sx={{ marginY: 2 }}>
        <Link href='/resetpassword' color='inherit' title='Forgot your password'>Forgot your password?</Link>
      </Typography>

      <Button
        variant='contained'
        type='submit'
        size='large'
        fullWidth
        sx={{
          marginY: 2,
          marginTop: 'auto',
          borderRadius: 2,
        }}
      >
        Log In
      </Button>

      <Typography variant='caption'>
        Create an account instead?&nbsp;
        <Link href='/signup' color='inherit' title='Sign up'>Sign up</Link>
        .
      </Typography>
    </AuthenticationForm>
  );
}
