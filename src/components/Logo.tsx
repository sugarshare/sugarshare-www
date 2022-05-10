import React from 'react';
import Link from '@mui/material/Link';

import settings from 'settings';

interface LogoProps {
  width: string | number;
}

export default function Logo({ width }: LogoProps) {
  return (
    <Link href='/'>
      <img
        src='/images/banner-v3.png'
        title={settings.siteDomainName}
        alt={`${settings.projectName} logo`}
        aria-label={`${settings.projectName} logo`}
        style={{
          width,
        }}
      />
    </Link>
  );
}
