import React from 'react';
import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import InstallLink from './components/InstallLink';

function App() {
  return (
    <Container maxWidth={false} disableGutters>
      <Navigation />
      <Container maxWidth='lg'>
        <Typography variant='h3'>Download</Typography>
        <Stack
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent='center'
          sx={{ my: 4 }}
        >
          <InstallLink link='/' browser='Chrome' />
          <InstallLink link='/' browser='Microsoft Edge' isSoon />
          <InstallLink link='/' browser='Opera' isSoon />
        </Stack>
        {/* <Box sx={{ my: 2 }}>
          {[...new Array(100)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
  Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
  Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
        </Box> */}
      </Container>
      <Footer />
    </Container>
  );
}

export default App;
