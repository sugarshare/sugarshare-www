import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function Footer() {
  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      my: 4,
      typography: 'body2',
      '& > :not(style) + :not(style)': {
        ml: 2,
      },
    }}
    >

      <span>
        &copy;
        {`SugarShare, ${new Date().getFullYear()}`}
      </span>
      <Link href='/terms.html' underline='hover' aria-label='go to terms and conditions'>Terms</Link>
      <Link href='/privacy.html' underline='hover' aria-label='go to privacy policy'>Privacy</Link>
      <Link href='/' underline='hover' aria-label='go to contact'>TODO Contact</Link>
    </Box>
  );
}
