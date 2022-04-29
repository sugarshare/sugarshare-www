import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import Logo from 'components/Logo';

export default function BaseAuthentication({
  children, handleSubmit,
}: { children: React.ReactNode, handleSubmit: React.FormEventHandler }) {
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
        component='form'
        autoComplete='on'
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: 'white',
          padding: 4,
          marginBottom: 4,
          minWidth: '15rem',
          width: { xs: '80vw', md: '27rem' },
          minHeight: '30rem',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'no-wrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          border: '1px solid grey',
          borderRadius: 2,
        }}
      >
        {children}
      </Box>
    </Container>
  );
}
