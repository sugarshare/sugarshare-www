import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Navigation from 'components/Navigation';
import ConfirmationDialog from 'components/ConfirmationDialog';

import AuthenticationClient from 'libs/authentication';
import { NoCurrentUserError } from 'libs/errors';

import settings from 'settings';

 interface UserAccountState {
  email: string;
  password: string;
  showPassword: boolean;
  isDeleteAccountConfirmationDialogOpen: boolean;
  isDeleteAccountConfirmed: boolean;
  isLoading: boolean;
}

const INITIAL_STATE: UserAccountState = {
  email: '',
  password: '',
  showPassword: false,
  isDeleteAccountConfirmationDialogOpen: false,
  isDeleteAccountConfirmed: false,
  isLoading: false,
};

const INITIAL_ERROR_STATE = {
  isEmailError: false,
  isPasswordError: false,
  isNetworkError: false,
};

export default function UserAccount() {
  const [state, setState] = useState<UserAccountState>(INITIAL_STATE);

  const navigate = useNavigate();

  const handleDeleteAccountConfirmationDialogResult = (result: boolean): React.MouseEventHandler<HTMLButtonElement> => (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setState((curr) => ({ ...curr, isDeleteAccountConfirmationDialogOpen: false, isDeleteAccountConfirmed: result }));
  };

  const handleDeleteAccount = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    // Open confirmation dialog. The user input will be used to check if account should be deleted
    setState((curr) => ({
      ...curr,
      isDeleteAccountConfirmationDialogOpen: true,
    }));
  };

  const handleLogOut = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      await AuthenticationClient.signOut();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(
    () => {
      AuthenticationClient.getUser()
        .then((user) => {
          setState((curr) => ({
            ...curr,
            email: user.getUsername(),
          }));
        })
        .catch(() => {
          // In case user is not logged in
          navigate('/login?redirect_uri=/account');
        });
    },
    [
      // TODO check if user changed or logged in with different account
    ],
  );

  useEffect(
    () => {
      if (state.isDeleteAccountConfirmed) {
        AuthenticationClient.deleteUser()
          .then(() => {
            navigate('/?isdeleted=true');
          })
          .catch((error) => {
            if (error instanceof NoCurrentUserError) {
              // An error is thrown by the lib if user is not logged in
            } else {
              console.log(error);
            }
          });
      }
    },
    [
      state.isDeleteAccountConfirmed,
    ],
  );


  return (
    <Container maxWidth='lg'>
      <Navigation />

      <Box
        sx={{
          marginY: 4,
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'no-wrap',
          // alignItems: 'center',
        }}
      >
        <Button
          variant='outlined'
          color='warning'
          onClick={handleLogOut}
          sx={{
            marginY: 1,
          }}
        >
          Log out
        </Button>
        <Button
          variant='outlined'
          color='error'
          onClick={handleDeleteAccount}
          sx={{
            marginY: 1,
          }}
        >
          Delete account
        </Button>
      </Box>

      <ConfirmationDialog
        title='Your account is about to be deleted'
        description={`We would love to hear your feedback at ${settings.defaultEmailAddress}`}
        open={state.isDeleteAccountConfirmationDialogOpen}
        handleClose={handleDeleteAccountConfirmationDialogResult}
      />

    </Container>
  );
}
