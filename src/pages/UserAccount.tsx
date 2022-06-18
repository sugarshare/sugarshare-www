import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import Navigation from 'components/Navigation';
import ConfirmationDialog from 'components/ConfirmationDialog';

import AuthenticationClient from 'libs/authentication';
import { NoCurrentUserError } from 'libs/errors';

import settings from 'settings';

 interface UserAccountState {
  email: string;
}

const INITIAL_STATE: UserAccountState = {
  email: '',
};

export default function UserAccount() {
  const [state, setState] = useState<UserAccountState>(INITIAL_STATE);
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);

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
        console.log(error);
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

  useEffect(
    () => {
      AuthenticationClient.getUser()
        .then((user) => {
          const { attributes: { email } } = user;
          setState((prevState) => ({
            ...prevState,
            email,
          }));
        })
        .catch(() => {
          // In case user is not logged in
          navigate('/login?redirect_uri=/account', { replace: true });
        });
    },
    [],
  );

  return (
    <Container maxWidth='lg'>
      <Navigation sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} />

      <Box sx={{ marginY: 4, display: 'flex' }}>
        <Drawer
          variant='permanent'
          sx={{
            flexShrink: 0,
            width: { xs: '10rem', md: '15rem' },
            '& .MuiDrawer-paper': {
              width: { xs: '10rem', md: '15rem' },
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem key='account' disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary='Account' />
                </ListItemButton>
              </ListItem>

              <ListItem key='files' disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary='My Files' />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <Box
          sx={{
            marginY: 4,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'no-wrap',
          }}
        >
          <Typography variant='h5'>Account</Typography>
          <Typography variant='subtitle1'>{state.email}</Typography>

          <Button
            variant='outlined'
            color='warning'
            onClick={handleLogOut}
            sx={{
              marginY: 2,
            }}
          >
            Log out
          </Button>
          <Button
            variant='outlined'
            color='error'
            onClick={() => setOpenDeleteAccountDialog(true)}
            sx={{
              marginY: 2,
            }}
          >
            Delete account
          </Button>
        </Box>

        <ConfirmationDialog
          title='Your account is about to be deleted'
          description={`We would love to hear your feedback at ${settings.defaultEmailAddress}`}
          open={openDeleteAccountDialog}
          handleConfirm={handleDeleteAccount}
          handleClose={() => setOpenDeleteAccountDialog(false)}
        />
      </Box>
    </Container>
  );
}
