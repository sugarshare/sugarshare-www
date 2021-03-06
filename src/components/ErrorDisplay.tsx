import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import Logo from 'components/Logo';
import settings from 'settings';

interface ErrorDisplayProps {
  codeOrText: string;
}

function getMessage(codeOrText: ErrorDisplayProps['codeOrText']) {
  switch (codeOrText) {
    case '404':
      return 'It seems like this link is broken, or the file you are looking for has expired.';
    default:
      return 'Something is broken. We are working on it.';
  }
}

export default function ErrorDisplay({ codeOrText }: ErrorDisplayProps) {
  return (
    <Box sx={{
      bgcolor: 'honey.main',
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
    }}
    >
      <Box sx={{ marginY: 4 }}>
        <Logo width='50%' />
      </Box>

      <Typography
        variant='h1'
        sx={{ marginX: 4, marginY: 1, fontWeight: 'bold' }}
      >
        {codeOrText}
      </Typography>

      <Typography
        variant='h5'
        sx={{ marginX: 4, marginY: 1 }}
      >
        {getMessage(codeOrText)}
      </Typography>

      <Typography variant='body1' sx={{ marginY: 8 }}>
        &#8617; Go back to&nbsp;
        <Link href='/' variant='body1' color='inherit' title={settings.siteDomainName}>main site</Link>
        .
      </Typography>
    </Box>
  );
}
