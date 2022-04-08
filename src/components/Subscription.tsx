import React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import settings from '../settings';

export enum SubscriptionLevel {
  FREE = 'Free',
  STANDARD = 'Standard',
  PREMIUM = 'Premium',
}

interface SubscriptionProps {
  level: SubscriptionLevel;
  benefits: string[];
  price?: string;
  priceId?: string;
}

export default function Subscription({
  level, benefits, price, priceId,
}: SubscriptionProps) {
  return (
    <Box
      component='form'
      action={`https://${settings.apiDomainName}/subscription/create-checkout-session`}
      method='POST'
      sx={{
        backgroundColor: 'white',
        margin: 2,
        paddingX: 4,
        minWidth: '15rem',
        width: { xs: '80vw', md: '20rem' },
        height: '40rem',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'no-wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        border: '1px solid grey',
        borderRadius: 2,
      }}
    >
      <Typography variant='h3' fontWeight='bold'>{level}</Typography>
      <Box sx={{ minHeight: '20rem' }}>
        {
          benefits.map((benefit) => (
            <Typography variant='body1'>
              <FontAwesomeIcon icon={faCheck} />
              &nbsp;&nbsp;&nbsp;
              {benefit}
            </Typography>
          ))
        }
      </Box>
      {priceId && <Divider variant='middle' flexItem />}
      <Typography variant='h5' fontWeight='bold'>{price}</Typography>
      <Input type='hidden' name='priceId' value={priceId} />
      <Button
        type='submit'
        variant='contained'
        color='secondary'
        fullWidth
        sx={{
          fontWeight: 'bold',
        }}
      >
        {priceId ? 'Sign up' : 'Create account'}
      </Button>
    </Box>
  );
}
