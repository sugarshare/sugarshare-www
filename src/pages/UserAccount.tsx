import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

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

function CustomerPortalButton({ email }: { email: UserAccountState['email'] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [href, setHref] = useState<string | null>(null);

  useEffect(
    () => {
      AuthenticationClient.getIdToken()
        .catch((error) => console.error(error))
        .then((idToken) => {
          fetch(`https://${settings.apiDomainName}/subscription/customer-portal`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${idToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              returnUrl: window.location.href,
            }),
          })
            .then(async (response) => ({
              statusCode: response.status,
              body: await response.json(),
            }))
            .then(({ statusCode, body }) => {
              if (statusCode === 200) {
                setHref(body.customerPortalUrl);
              } else if (statusCode === 204) {
                setHref(null);
              } else {
                setHref(null);
                throw new Error(`${statusCode}: ${body.error}`);
              }
            })
            .then((error) => console.error(error));
        });
    },
    [
      email,
    ],
  );

  if (!href) {
    return (
      <Typography variant='body1' sx={{ marginY: 4 }}>
        Want more storage and better features?&nbsp;
        <Link href='/#pricing' color='inherit' title='Subscription plans'>Consider upgrading to a subscription plan</Link>
        .
      </Typography>
    );
  }

  return (
    <Box sx={{
      border: 'solid',
      borderRadius: 2,
      padding: 2,
      marginY: 2,
    }}
    >
      <Typography variant='body1'>
        View your invoices, change or cancel subscription, and update subscription details:
      </Typography>

      <LoadingButton
        variant='contained'
        loading={isLoading}
        endIcon={<LocalGroceryStoreIcon />}
        href={href}
        onClick={() => setIsLoading(true)}
        fullWidth
        sx={{ marginY: 2 }}
      >
        Subscription Portal
      </LoadingButton>
    </Box>
  );
}

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

          <CustomerPortalButton email={state.email} />

          <Box sx={{
            border: 'dashed #d32f2f',
            borderRadius: 2,
            color: '#d32f2f',
            padding: 2,
            marginY: 2,
          }}
          >
            <Typography variant='body1'>Danger zone</Typography>
            <Typography variant='subtitle2'>Any action in this zone is definitive.</Typography>
            <Button
              variant='outlined'
              color='error'
              onClick={() => setOpenDeleteAccountDialog(true)}
              fullWidth
              sx={{ marginY: 2 }}
            >
              Delete account
            </Button>
          </Box>
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
