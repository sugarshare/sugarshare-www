import React from 'react';
import Link from '@mui/material/Link';

import settings from '../settings';

export default function Logo() {
  return (
    <Link href='/'>
      <img
        src='/images/banner-v3.png'
        title={settings.siteDomainName}
        alt={`${settings.projectName} logo`}
        aria-label={`${settings.projectName} logo`}
        style={{
          width: '200px',
        }}
      />
    </Link>
  );
}
