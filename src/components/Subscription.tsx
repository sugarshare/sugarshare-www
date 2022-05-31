import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import SubscriptionTile from 'components/SubscriptionTile';
import { SubscriptionTier } from 'libs/subscription';

export const SUBSCRIPTIONS = {
  [SubscriptionTier.FREE]: {
    price: null,
    benefits: [
      'Send up to 3 GB per file',
      'Unlimited number of files',
      'Links valid for 24 hours',
      'No payment method required',
    ],
  },
  [SubscriptionTier.STANDARD]: {
    price: {
      monthly: 6,
      yearly: 5,
    },
    benefits: [
      'Coming soon!',
    ],
  },
  [SubscriptionTier.PREMIUM]: {
    price: {
      monthly: 10,
      yearly: 9,
    },
    benefits: [
      'Coming soon!',
    ],
  },
};

export default function Subscription() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <>
      <FormGroup sx={{ display: 'inline-flex' }}>
        <FormControlLabel
          control={
            <Switch checked={isYearly} onChange={() => setIsYearly((y) => !y)} color='secondary' inputProps={{ 'aria-label': 'select yearly subscription' }} />
          }
          label='Billed annually'
          sx={{ color: 'white' }}
        />
      </FormGroup>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          flexWrap: 'no-wrap',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {
          Object.entries(SUBSCRIPTIONS).map(([tier, { price, benefits }]) => (
            <SubscriptionTile
              tier={tier as SubscriptionTier}
              benefits={benefits}
              price={price && `${isYearly ? price.yearly : price.monthly}$ / month`}
              isYearly={isYearly}
            />
          ))
        }
      </Box>
    </>
  );
}
