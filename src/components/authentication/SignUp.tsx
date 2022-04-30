import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import AuthenticationForm from 'components/authentication/AuthenticationForm';
import { SUBSCRIPTIONS } from 'components/Subscription';
import { SubscriptionLevel } from 'components/SubscriptionTile';

interface SignUpState {
  subscriptionLevel: SubscriptionLevel;
  email: string;
  password: string;
  showPassword: boolean;
}

const PASSWORD_PATTERN = /.{8,}/; // At least 8 of any characters except newline

const INITIAL_STATE: SignUpState = {
  subscriptionLevel: SubscriptionLevel.STANDARD,
  email: '',
  password: '',
  showPassword: false,
};

export default function SignUp() {
  const [signUpState, setSignUpState] = useState<SignUpState>(INITIAL_STATE);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleChange = (prop: keyof SignUpState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // When in password error state, help user by showing when password is valid
    if (prop === 'password' && !isPasswordValid) {
      setIsPasswordValid(PASSWORD_PATTERN.test(event.target.value));
    }

    setSignUpState({
      ...signUpState,
      [prop]: event.target.value,
    });
  };

  const handleShowPassword = () => {
    setSignUpState({
      ...signUpState,
      showPassword: !signUpState.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!PASSWORD_PATTERN.test(signUpState.password)) {
      setIsPasswordValid(false);
      return;
    }

    setIsPasswordValid(true);
  };

  return (
    <AuthenticationForm handleSubmit={handleSubmit}>
      <TextField
        select
        id='plan'
        label='Plan'
        value={signUpState.subscriptionLevel}
        onChange={handleChange('subscriptionLevel')}
        margin='normal'
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <CardMembershipIcon />
            </InputAdornment>
          ),
        }}
      >
        {
          Object.keys(SUBSCRIPTIONS).map((plan) => (
            <MenuItem key={plan} value={plan}>{plan}</MenuItem>
          ))
        }
      </TextField>
      <TextField
        variant='outlined'
        id='email'
        type='email'
        label='Email'
        value={signUpState.email}
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
        type={signUpState.showPassword ? 'text' : 'password'}
        label='Password'
        value={signUpState.password}
        onChange={handleChange('password')}
        error={!isPasswordValid}
        helperText='Must be 8 characters long at least'
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
                {signUpState.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography variant='caption' sx={{ marginY: 2 }}>
        By creating an account, you agree to our&nbsp;
        <Link href='/terms' target='_blank' color='inherit' title='Terms of Service' aria-label='go to terms of service'>Terms</Link>
        &nbsp;and&nbsp;
        <Link href='/privacy' target='_blank' color='inherit' title='Privacy policy' aria-label='go to privacy policy'>Privacy Policy</Link>
        .
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
        Sign up
      </Button>

      <Typography variant='caption'>
        Already have an account?&nbsp;
        <Link href='/login' color='inherit' title='Log in'>Log in</Link>
        .
      </Typography>
    </AuthenticationForm>
  );
}
