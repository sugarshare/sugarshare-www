/* eslint-disable react/jsx-one-expression-per-line */

import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import NotificationSnackbar from 'components/NotificationSnackbar';
import AuthenticationBase from 'components/authentication/AuthenticationBase';

import AuthenticationClient from 'libs/authentication';
import { InvalidParameterException, LimitExceededException, NetworkError } from 'libs/errors';
import { parseTier, getPriceId } from 'libs/subscription';

import settings from 'settings';

interface SignUpConfirmationState {
  email: string;
  priceId: string | null;
  isLoading: boolean;
}

const INITIAL_STATE: SignUpConfirmationState = {
  email: '',
  priceId: null,
  isLoading: false,
};

const INITIAL_ERROR_STATE = {
  isUserAlreadyConfirmed: false,
  isMaximumAttemptsExceededError: false,
  isNetworkError: false,
};

export default function SignUpConfirmation() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const tier = parseTier(searchParams.get('tier'));
  const isYearly = searchParams.get('yearly') === 'true';

  const [state, setState] = useState<SignUpConfirmationState>({
    ...INITIAL_STATE,
    ...(tier && { priceId: getPriceId(tier, isYearly) }),
    email,
  });
  const [errorState, setErrorState] = useState(INITIAL_ERROR_STATE);
  const [resendConfirmation, setResendConfirmation] = useState(false);

  const handleResendConfirmation = async () => {
    try {
      await AuthenticationClient.resendConfirmationEmail({ email: state.email });
      setResendConfirmation(true);
    } catch (error) {
      if (error instanceof InvalidParameterException) {
        setErrorState((prevState) => ({
          ...prevState,
          isUserAlreadyConfirmed: true,
        }));
      } else if (error instanceof LimitExceededException) {
        setErrorState((prevState) => ({
          ...prevState,
          isMaximumAttemptsExceededError: true,
        }));
      } else if (error instanceof NetworkError) {
        setErrorState((prevState) => ({
          ...prevState,
          isNetworkError: true,
        }));
      } else {
        // Noop
      }
    } finally {
      setTimeout(() => setResendConfirmation(false), 3000);

      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  return (
    <AuthenticationBase>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'no-wrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Typography variant='body1' sx={{ marginY: 2 }}>
          A confirmation link has been sent to your email <strong>{state.email}</strong>.
          <br />
          <br />
          Glad to have you on board 🥳🎉!
        </Typography>

        {
          state.priceId && (
            <Box
              component='form'
              action={`https://${settings.apiDomainName}/subscription/create-checkout-session`}
              method='POST'
              onSubmit={() => {
                setState((prevState) => ({
                  ...prevState,
                  isLoading: true,
                }));
              }}
              sx={{ width: '100%' }}
            >
              <Input type='hidden' name='priceId' value={state.priceId} />
              <Input type='hidden' name='email' value={state.email} />
              <Input type='hidden' name='cancelUrl' value={window.location.href} />

              <LoadingButton
                variant='contained'
                type='submit'
                size='large'
                fullWidth
                loading={state.isLoading}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  marginY: 2,
                  borderRadius: 2,
                }}
              >
                Continue to subscription
              </LoadingButton>
            </Box>
          )
        }

        <Button variant='text' size='small' onClick={handleResendConfirmation}>Resend confirmation link?</Button>
      </Box>

      {resendConfirmation && <NotificationSnackbar message='A new confirmation link has been sent to your email' />}
      {errorState.isUserAlreadyConfirmed && <NotificationSnackbar message='Your email is already confirmed' />}
      {errorState.isMaximumAttemptsExceededError && <NotificationSnackbar message='Attempt limit exceeded, please try after some time.' severity='error' />}
      {errorState.isNetworkError && <NotificationSnackbar message='Something is wrong with the network. Please check your internet connection.' severity='error' />}
    </AuthenticationBase>
  );
}
