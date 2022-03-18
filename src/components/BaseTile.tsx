import React from 'react';
import Box from '@mui/material/Box';

export default function BaseTile({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 250,
        height: 250,
        backgroundColor: 'honey.main',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignContent: 'space-around',
        alignItems: 'center',
        border: '1px solid grey',
        borderRadius: 2,
        '&:hover': {
          // backgroundColor: 'honey.main',
          opacity: [0.9, 0.9, 0.9],
        },
      }}
    >
      {children}
    </Box>
  );
}
