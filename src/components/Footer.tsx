import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

export default function Footer() {
  return (
    <>
      <Divider variant='middle' />
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        my: 8,
        typography: 'body2',
        '& > :not(style) + :not(style)': {
          ml: 2,
        },
      }}
      >
        <span>
          &copy;&nbsp;
          {`SugarShare, ${new Date().getFullYear()}`}
        </span>
        <Link href='/terms' underline='hover' color='inherit' aria-label='go to terms and conditions'>Terms</Link>
        <Link href='/privacy' underline='hover' color='inherit' aria-label='go to privacy policy'>Privacy</Link>
        <Link href='/' underline='hover' color='inherit' aria-label='go to contact'>TODO Contact</Link>
        <Link href='/' underline='hover' color='inherit' aria-label='go to contact'>TODO Report a technical issue</Link>
        <Link href='/' underline='hover' color='inherit' aria-label='go to contact'>TODO GitHub</Link>
      </Box>
    </>
  );
}
