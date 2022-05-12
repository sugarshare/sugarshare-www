import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Navigation from 'components/Navigation';
import AuthenticationClient from 'libs/authentication';
import { NoCurrentUserError } from 'libs/errors';


export default function UserAccount() {
  const navigate = useNavigate();

  const handleDeleteAccount = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      await AuthenticationClient.deleteUser();
      navigate('/?isdeleted=true');
    } catch (error) {
      if (error instanceof NoCurrentUserError) {
        // An error is thrown by the lib if user is not logged in
      } else {
        console.error(error);
      }
    }
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
    </Container>
  );
}
