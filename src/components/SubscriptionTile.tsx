import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SubscriptionTier } from 'libs/subscription';

interface SubscriptionProps {
  tier: SubscriptionTier;
  benefits: string[];
  price: string | null;
  isYearly: boolean;
}

interface SubscriptionUrlParams {
  tier: SubscriptionTier;
  yearly: boolean;
}

/**
 * Generate subscription URL
 */
const SUBSCRIPTION_URL = (params: SubscriptionUrlParams) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => value && searchParams.set(key, value));

  return `/signup?${searchParams.toString()}`;
};

export default function SubscriptionTile({
  tier, benefits, price, isYearly,
}: SubscriptionProps) {
  const sx = {
    backgroundColor: 'white',
    margin: 2,
    padding: 4,
    minWidth: '15rem',
    width: { xs: '80vw', md: '25rem' },
    height: '40rem',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'no-wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    border: '1px solid grey',
    borderRadius: 2,
  };

  const content = (
    <>
      <Typography variant='h3' fontWeight='bold'>{tier}</Typography>
      <Box sx={{ minHeight: '20rem', marginY: 4 }}>
        {
          benefits.map((benefit, index) => (
            <Typography
              variant='body1'
              sx={{ lineHeight: 2 }}
              key={`benefit-item-${index}`}
            >
              <FontAwesomeIcon icon={faCheck} />
              &nbsp;&nbsp;&nbsp;
              {benefit}
            </Typography>
          ))
        }
      </Box>
    </>
  );

  return (
    <Box sx={sx}>
      {content}

      {
        price && (
          <>
            <Divider variant='middle' flexItem sx={{ marginTop: 'auto' }} />
            <Typography variant='h5' fontWeight='bold' sx={{ marginY: 2 }}>{price}</Typography>
          </>
        )
      }

      <Button
        href={SUBSCRIPTION_URL({ tier, yearly: isYearly })}
        variant='contained'
        size='large'
        color='secondary'
        fullWidth
        sx={{
          fontWeight: 'bold',
          marginTop: 'auto',
        }}
      >
        {price ? 'Join' : 'Create account'}
      </Button>
    </Box>
  );
}
