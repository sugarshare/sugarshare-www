import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Landing() {
  return (
    <Box sx={{
      width: '100%',
      backgroundColor: 'honey.main',
      paddingY: { xs: 4, sm: 10, lg: 10 },
      paddingX: { xs: 2, sm: 5, lg: 20 },
    }}
    >
      <Container maxWidth='xl'>
        <Typography
          variant='h1'
          fontWeight='bold'
          sx={{
            lineHeight: { sm: 1.2, lg: 1.5 },
          }}
        >
          SugarShare is
          <br />
          file sharing
          <br />
          made easy.
          <br />
        </Typography>
      </Container>
    </Box>
  );
}
