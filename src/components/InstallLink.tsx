import React from 'react';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition, faChrome, faEdge, faOpera,
} from '@fortawesome/free-brands-svg-icons';

import BaseTile from './BaseTile';

type CompatibleBrowser = 'Chrome' | 'Microsoft Edge' | 'Opera' | 'Brave' | 'Vivaldi';

interface InstallLinkProps {
  link: string;
  browser: CompatibleBrowser;
  isSoon?: boolean;
}

function getBroswerIcon(browser: CompatibleBrowser): IconDefinition | null {
  switch (browser) {
    case 'Chrome':
      return faChrome;
    case 'Microsoft Edge':
      return faEdge;
    case 'Opera':
      return faOpera;
    case 'Brave':
      // Until this gets accepted https://github.com/FortAwesome/Font-Awesome/issues/12201
      return null;
    case 'Vivaldi':
      // Until this gets accepted https://github.com/FortAwesome/Font-Awesome/issues/7343
      return null;
    default:
      return null;
  }
}

export default function InstallLink({ link, browser, isSoon = false }: InstallLinkProps) {
  const icon = getBroswerIcon(browser);
  return (
    <Link href={link} target='_blank' rel='noopener' color='inherit' underline='hover'>
      <BaseTile>
        {
          icon && <FontAwesomeIcon icon={icon} size='5x' />
        }
        <Typography variant='h5' textAlign='center' sx={{ mx: 2 }}>{browser}</Typography>
        <Chip label={isSoon ? 'Available soon' : 'Available now'} size='small' />
      </BaseTile>
    </Link>
  );
}
