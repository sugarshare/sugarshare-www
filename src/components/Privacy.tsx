import React from 'react';
import Container from '@mui/material/Container';

export default function Terms() {
  return (
    <Container maxWidth='lg'>
      <iframe
        src='privacy.html'
        title='Privacy'
        width='100%'
        height={`${Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)}px`}
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
