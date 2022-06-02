import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import AuthenticationClient from 'libs/authentication';
import { SubscriptionTier, getPriceId } from 'libs/subscription';
import { UsernameExistsException, InvalidPasswordException, NetworkError } from 'libs/errors';

import NotificationSnackbar from 'components/NotificationSnackbar';
import AuthenticationForm from 'components/authentication/AuthenticationForm';
import { SUBSCRIPTIONS } from 'components/Subscription';

import settings from 'settings';

interface SignUpState {
  email: string;
  password: string;
  subscriptionTier: SubscriptionTier;
  priceId: string | null;
  showPassword: boolean;
  isLoading: boolean;
}

const INITIAL_STATE: SignUpState = {
  email: '',
  password: '',
  subscriptionTier: SubscriptionTier.STANDARD,
  priceId: getPriceId(SubscriptionTier.STANDARD, false),
  showPassword: false,
  isLoading: false,
};

const INITIAL_ERROR_STATE = {
  isEmailError: false,
  isPasswordError: false,
  isNetworkError: false,
};

export default function SignUp() {
  const tier = searchParams.get('tier') as SubscriptionTier;
  const [searchParams, setSearchParams] = useSearchParams();
  const isYearly = searchParams.get('yearly') === 'true';

  const [errorState, setErrorState] = useState(INITIAL_ERROR_STATE);
  const [state, setState] = useState<SignUpState>({
    ...INITIAL_STATE,
    ...(tier && {
      subscriptionTier: tier,
      priceId: getPriceId(tier, isYearly),
    }),
  });

  const subscriptionFormRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handleChange = (prop: keyof SignUpState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (prop === 'email') {
      // When in email error state, reset when user edits email
      setErrorState((prevState) => ({
        ...prevState,
        isEmailError: false,
      }));
    } else if (prop === 'password' && errorState.isPasswordError) {
      // When in password error state, help user by showing when password becomes valid
      setErrorState((prevState) => ({
        ...prevState,
        isPasswordError: !AuthenticationClient.isPasswordValid(event.target.value),
      }));
    }

    setState((prevState) => ({
      ...prevState,
      [prop]: event.target.value,
    }));
  };

  const handleShowPassword = () => {
    setState((prevState) => ({
      ...prevState,
      showPassword: !state.showPassword,
    }));
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!AuthenticationClient.isPasswordValid(state.password)) {
      setErrorState((prevState) => ({
        ...prevState,
        isPasswordError: true,
      }));
      return;
    }

    setErrorState(INITIAL_ERROR_STATE);
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const { email, password, subscriptionTier } = state;
    try {
      const userSub = await AuthenticationClient.signUp({ email, password, subscriptionTier });

      if (!state.priceId) {
        navigate(userSub ? `/?user=${userSub}` : '/');
      } else {
        subscriptionFormRef.current!.submit();
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));

      if (error instanceof UsernameExistsException) {
        setErrorState((prevState) => ({
          ...prevState,
          isEmailError: true,
        }));
      } else if (error instanceof InvalidPasswordException) {
        setErrorState((prevState) => ({
          ...prevState,
          isPasswordError: true,
        }));
      } else if (error instanceof NetworkError) {
        setErrorState((prevState) => ({
          ...prevState,
          isNetworkError: true,
        }));
      } else {
        console.error(error);
      }
    }
  };

  useEffect(
    () => {
      setState((prevState) => ({
        ...prevState,
        priceId: getPriceId(state.subscriptionTier as SubscriptionTier, isYearly),
      }));

      setSearchParams(
        new URLSearchParams({
          tier: state.subscriptionTier,
          yearly: isYearly.toString(),
        }),
        { replace: true },
      );
    },
    [
      state.subscriptionTier,
    ],
  );

  return (
    <>
      <Box
        hidden
        component='form'
        action={`https://${settings.apiDomainName}/subscription/create-checkout-session`}
        method='POST'
        ref={subscriptionFormRef}
      >
        <Input type='hidden' name='email' value={state.email} />
        <Input type='hidden' name='priceId' value={state.priceId} />
      </Box>

      <AuthenticationForm handleSubmit={handleSubmit}>
        <TextField
          select
          id='plan'
          label='Plan'
          value={state.subscriptionTier}
          onChange={handleChange('subscriptionTier')}
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
          value={state.email}
          onChange={handleChange('email')}
          error={errorState.isEmailError}
          helperText={errorState.isEmailError && 'An account with this email already exists. Try to log in or reset your password instead.'}
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
                  {state.showPassword ? <VisibilityOff /> : <Visibility />}
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

        <LoadingButton
          variant='contained'
          type='submit'
          size='large'
          fullWidth
          endIcon={state.subscriptionTier === SubscriptionTier.FREE ? null : <ArrowForwardIcon />}
          loading={state.isLoading}
          sx={{
            marginY: 2,
            marginTop: 'auto',
            borderRadius: 2,
          }}
        >
          {state.subscriptionTier === SubscriptionTier.FREE ? 'Sign up' : 'Continue'}
        </LoadingButton>

        <Typography variant='caption'>
          Already have an account?&nbsp;
          <Link href='/login' color='inherit' title='Log in'>Log in</Link>
          .
        </Typography>

        {errorState.isNetworkError && <NotificationSnackbar message='Something is wrong with the network. Please check your internet connection.' severity='error' />}
      </AuthenticationForm>
    </>
  );
}
