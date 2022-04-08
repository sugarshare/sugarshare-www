import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import SubscriptionTile, { SubscriptionLevel } from './SubscriptionTile';

const SUBSCRIPTIONS = {
  [SubscriptionLevel.FREE]: {
    price: null,
    priceId: null,
    benefits: [
      'Lorem ipsum',
      'Lorem ipsum',
      'Lorem ipsum',
    ],
  },
  [SubscriptionLevel.STANDARD]: {
    price: {
      monthly: 6,
      yearly: 5,
    },
    priceId: {
      monthly: 'price_1KmD1lFJFAGDCGYEbWBkY4hc',
      yearly: 'price_1KmD1HFJFAGDCGYEFWTjIuIG',
    },
    benefits: [
      'Lorem ipsum',
      'Lorem ipsum',
      'Lorem ipsum',
    ],
  },
  [SubscriptionLevel.PREMIUM]: {
    price: {
      monthly: 10,
      yearly: 9,
    },
    priceId: {
      monthly: 'price_1KmDFiFJFAGDCGYEpyo3kTjC',
      yearly: 'price_1KmDDdFJFAGDCGYEsP4hBTO5',
    },
    benefits: [
      'Lorem ipsum',
      'Lorem ipsum',
      'Lorem ipsum',
    ],
  },
};

export default function Subscription() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <>
      <FormGroup>
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
          flexDirection: { xs: 'column', md: 'row' },
          flexWrap: 'no-wrap',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {
          Object.entries(SUBSCRIPTIONS).map(([level, { price, priceId, benefits }]) => (
            <SubscriptionTile
              level={level as SubscriptionLevel}
              price={price && `${isYearly ? price.yearly : price.monthly}$ / month`}
              priceId={priceId && (isYearly ? priceId.yearly : priceId.monthly)}
              benefits={benefits}
            />
          ))
        }
      </Box>
    </>
  );
}
