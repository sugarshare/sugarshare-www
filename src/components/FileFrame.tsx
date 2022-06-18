import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import ErrorDisplay from 'components/ErrorDisplay';
import settings from 'settings';

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/g;
const isUUID = (maybeUUID?: string): boolean => !!maybeUUID && UUID_REGEX.test(maybeUUID);

export default function FileFrame() {
  const { fileId } = useParams();

  // TODO add check if file exists 404

  if (!isUUID(fileId)) {
    return (
      <ErrorDisplay codeOrText='404' />
    );
  }

  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{
        p: 4,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
      }}
      >
        <Button
          href={`/${settings.sharedBucketPrefix}/${fileId}`}
          component='a'
          variant='contained'
          download
        >
          Download
        </Button>
        <Typography variant='h6' sx={{ paddingTop: 2 }}>
          Powered by&nbsp;
          <Link href='/' target='_blank' color='inherit'>SugarShare</Link>
        </Typography>
      </Box>
      <iframe
        src={`https://${settings.siteDomainName}/${settings.sharedBucketPrefix}/${fileId}`}
        title='Shared file'
        height={`${Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)}px`}
        width='100%'
        allow='fullscreen'
        // allow='layout-animations 'none'; unoptimized-images 'none'; oversized-images 'none'; sync-script 'none'; sync-xhr 'none'; unsized-media 'none';'
        referrerPolicy='strict-origin-when-cross-origin'
        style={{
          border: 'none',
        }}
      />
    </Container>
  );
}
