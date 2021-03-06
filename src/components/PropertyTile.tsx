import React from 'react';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

import BaseTile from 'components/BaseTile';

interface PropertyTileProps {
  icon: FontAwesomeIconProps['icon'],
  primaryText: string;
  secondaryText: string;
}

export default function PropertyTile({ icon, primaryText, secondaryText }: PropertyTileProps) {
  return (
    <BaseTile>
      <FontAwesomeIcon icon={icon} size='3x' />
      <Typography variant='h5' fontWeight='bold' textAlign='center' sx={{ mx: 2 }}>{primaryText}</Typography>
      <Typography variant='body2' textAlign='center' sx={{ mx: 2 }}>{secondaryText}</Typography>
    </BaseTile>
  );
}
