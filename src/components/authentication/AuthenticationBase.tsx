import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Logo from 'components/Logo';

export default function AuthenticationBase({ children }: { children: React.ReactNode }) {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundColor: 'honey.main',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'no-wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Box sx={{ marginY: 4 }}>
        <Logo width='35vh' />
      </Box>

      <Box
        sx={{
          backgroundColor: 'white',
          padding: 4,
          marginBottom: 4,
          minWidth: '15rem',
          width: { xs: '80vw', md: '27rem' },
          minHeight: '10rem',
          border: '1px solid grey',
          borderRadius: 2,
        }}
      >
        {children}
      </Box>
    </Container>
  );
}
