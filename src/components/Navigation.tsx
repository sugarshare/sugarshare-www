import React from 'react';
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
import useScrollTrigger from '@mui/material/useScrollTrigger';

import Logo from './Logo';

const pages = {
  Products: {
    href: '#products',
  },
  Pricing: {
    href: '#pricing',
  },
  About: {
    href: '#about',
  },
  Contact: {
    href: '#contact',
  },
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

export default function Navigation() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <CssBaseline />
      <ElevationScroll>
        <AppBar color='secondary'>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>

              {/* Logo on medium to large displays */}
              <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                <Logo width='200px' />
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                  id='menu-appbar'
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
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
                </Menu>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <Logo width='200px' />
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {Object.entries(pages).map(([page, { href }]) => (
                  <Button
                    key={page}
                    href={href}
                    onClick={handleCloseNavMenu}
                    sx={{
                      marginY: 2, marginX: 1, color: 'white', display: 'block', fontWeight: 'bold', fontSize: '1em',
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      {/* Insert an empty toolbar to offset for fixed placement
      Reference: https://mui.com/components/app-bar/#fixed-placement */}
      <Toolbar />
    </>
  );
}
