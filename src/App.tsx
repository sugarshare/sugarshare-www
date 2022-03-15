import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <Container maxWidth={false} disableGutters>
      <Navigation />
      <Box sx={{ my: 2 }}>
        {[...new Array(100)]
          .map(
            () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
          )
          .join('\n')}
      </Box>
      <Footer />
    </Container>
  );
}

export default App;
