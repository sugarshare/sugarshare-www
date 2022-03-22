import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
  return (
    <>
      <Divider variant='middle' />
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-end',
        my: 8,
        typography: 'body2',
        '& > :not(style) + :not(style)': {
          ml: { xs: 2, sm: 3, md: 4 },
        },
      }}
      >
        <span>
          &copy;&nbsp;
          {`SugarShare, ${new Date().getFullYear()}`}
        </span>
        <Link href='/terms' underline='hover' color='inherit' aria-label='go to terms and conditions'>Terms</Link>
        <Link href='/privacy' underline='hover' color='inherit' aria-label='go to privacy policy'>Privacy</Link>
        <Link href='#contact' underline='hover' color='inherit' aria-label='go to contact'>Contact</Link>
        <Link href='https://github.com/sugarshare' target='_blank' underline='hover' color='inherit' aria-label='go to github'>
          <GitHubIcon fontSize='small' />
          &nbsp;GitHub
        </Link>
      </Box>
    </>
  );
}
