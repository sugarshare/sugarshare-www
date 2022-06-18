/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { SxProps, Theme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import AuthenticationClient from 'libs/authentication';

import theme from 'theme';
import Logo from 'components/Logo';

interface NavigationInput {
  sx?: SxProps<Theme>;
}

interface NavigationState {
  email: string;
}

const pages = {
  Install: {
    href: '/#install',
  },
  Pricing: {
    href: '/#pricing',
  },
  About: {
    href: '/#about',
  },
  Contact: {
    href: '/#contact',
  },
};

// Change primary color to white because MUI buttons only take a preset color
const customTheme = {
  ...theme,
  palette: {
    ...theme.palette,
    primary: {
      main: '#FFF',
    },
  },
};

const buttonSx = {
  marginY: 2, marginX: 1, fontWeight: 'bold', fontSize: '1em',
};

const INITIAL_STATE: NavigationState = {
  email: '',
};

function ElevationScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Navigation({ sx }: NavigationInput) {
  const [state, setState] = useState<NavigationState>(INITIAL_STATE);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorElNav(event.currentTarget); };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => { setAnchorElUser(event.currentTarget); };

  const handleCloseNavMenu = () => { setAnchorElNav(null); };
  const handleCloseUserMenu = () => { setAnchorElUser(null); };

  const handleLogOut = async () => {
    try {
      await AuthenticationClient.signOut();
      setState((prevState) => ({
        ...prevState,
        email: '',
      }));
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
          // Noop
        });
    },
    [],
  );

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <ElevationScroll>
        <AppBar color='secondary' sx={{ ...sx }}>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>

              {/* Start - Small devices */}
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <Logo width='200px' />
              </Box>

              <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size='large'
                  aria-label='pages of website'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleOpenNavMenu}
                  color='inherit'
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  keepMounted
                  id='menu-appbar'
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {Object.entries(pages).map(([page, { href }]) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Link variant='body1' href={href} textAlign='center' color='inherit' underline='none'>{page}</Link>
                    </MenuItem>
                  ))}

                  <Divider />

                  {
                    state.email && ([
                      (
                        <MenuItem key='account' onClick={handleCloseNavMenu}>
                          <Link variant='body1' href='/account' textAlign='center' color='inherit' underline='none'>My Account</Link>
                        </MenuItem>
                      ),
                      (
                        <MenuItem key='logout' onClick={handleCloseNavMenu}>
                          <Link variant='body1' onClick={handleLogOut} textAlign='center' color='inherit' underline='none'>Log out</Link>
                        </MenuItem>
                      ),
                    ])
                  }
                  {
                    !state.email && ([
                      (
                        <MenuItem key='account' onClick={handleCloseNavMenu}>
                          <Link variant='body1' href='/account' textAlign='center' color='inherit' underline='none'>My Account</Link>
                        </MenuItem>

                      ),
                      (
                        <MenuItem key='signup' onClick={handleCloseNavMenu}>
                          <Link variant='body1' href='/signup' textAlign='center' color='inherit' underline='none'>Join</Link>
                        </MenuItem>
                      ),
                    ])
                  }

                  {/* {Object.entries(actions).map(([page, { href }]) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Link variant='body1' href={href} textAlign='center' color='inherit' underline='none'>{page}</Link>
                    </MenuItem>
                  ))} */}
                </Menu>
              </Box>
              {/* End - Small devices */}

              {/* Start - Medium to large devices */}
              <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                <Logo width='200px' />
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {Object.entries(pages).map(([page, { href }]) => (
                  <Button
                    key={page}
                    href={href}
                    onClick={handleCloseNavMenu}
                    sx={buttonSx}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                {
                  state.email && (
                    <>
                      <Tooltip title={state.email}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ padding: 0 }}>
                          <Avatar sx={{ backgroundColor: '#1976d2' }}>{state.email[0].toUpperCase()}</Avatar>
                        </IconButton>
                      </Tooltip>
                      <Menu
                        keepMounted
                        id='menu-user'
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Link variant='body1' href='/account' textAlign='center' color='inherit' underline='none'>My Account</Link>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Link variant='body1' onClick={handleLogOut} textAlign='center' color='inherit' underline='none'>Log out</Link>
                        </MenuItem>
                      </Menu>
                    </>
                  )
                }
                {
                  !state.email && ([
                    (
                      <Button key='signup' href='/signup' variant='outlined' sx={buttonSx}>
                        Join
                      </Button>
                    ),
                    (
                      <Button key='account' href='/account' variant='text' sx={buttonSx}>
                        My Account
                      </Button>
                    ),
                  ])
                }
              </Box>
              {/* End - Medium to large devices */}
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      {/* Insert an empty toolbar to offset for fixed placement
      Reference: https://mui.com/components/app-bar/#fixed-placement */}
      <Toolbar />
    </ThemeProvider>
  );
}
