import React from 'react';
import Box from '@mui/material/Box';

export default function BaseTile({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        width: '15rem',
        height: '20rem',
        backgroundColor: 'honey.main',
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
