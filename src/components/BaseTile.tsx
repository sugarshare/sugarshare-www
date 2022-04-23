import React from 'react';
import Box from '@mui/material/Box';

export default function BaseTile({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        backgroundColor: 'honey.main',
        marginY: 1,
        padding: 2,
        minWidth: { xs: '80vw', md: null },
        width: { xs: '80vw', md: '16rem' },
        height: '22rem',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'space-evenly',
        alignContent: 'space-around',
        alignItems: 'center',
        border: '1px solid grey',
        borderRadius: 2,
        '&:hover': {
          opacity: [0.9, 0.9, 0.9],
        },
      }}
    >
      {children}
    </Box>
  );
}
