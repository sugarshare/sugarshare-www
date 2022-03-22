import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Landing() {
  return (
    <Box sx={{
      width: '100%',
      backgroundColor: 'honey.main',
      py: { sm: 5, lg: 10 },
      px: { sm: 10, lg: 20 },
    }}
    >
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
    </Box>
  );
}
