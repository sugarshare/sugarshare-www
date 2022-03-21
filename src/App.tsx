import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import InstallLink from './components/InstallLink';

function App() {
  return (
    <Container maxWidth={false} disableGutters>
      <Navigation />
      <Container maxWidth='lg'>

        <Box sx={{ my: 10 }}>
          <Typography variant='h2' fontWeight='bold' sx={{ my: 10 }}>Download</Typography>
          <Grid container spacing={2} sx={{ my: 4 }}>
            <Grid item xs='auto'>
              <InstallLink link='/' browser='Chrome' />
            </Grid>
            <Grid item xs='auto'>
              <InstallLink link='/' browser='Firefox' isSoon />
            </Grid>
            <Grid item xs='auto'>
              <InstallLink link='/' browser='Microsoft Edge' isSoon />
            </Grid>
            <Grid item xs='auto'>
              <InstallLink link='/' browser='Opera' isSoon />
            </Grid>
          </Grid>
        </Box>

      </Container>
      <Footer />
    </Container>
  );
}

export default App;
