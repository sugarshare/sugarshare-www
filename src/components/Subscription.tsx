import React from 'react';
import Box from '@mui/material/Box';

import SubscriptionTile, { SubscriptionLevel } from './SubscriptionTile';

export default function Subscription() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        flexWrap: 'no-wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <SubscriptionTile
        level={SubscriptionLevel.FREE}
        benefits={[
          'Send 2 GB per file',
          'Set expiry up to 7 days',
          'Encrypted storage',
          'Fast global network',
        ]}
      />
      <SubscriptionTile
        level={SubscriptionLevel.STANDARD}
        price='6$ / month'
        priceId='price_xxx'
        benefits={[
          'Send 15 GB per file',
          'Set expiry up to 30 days',
        ]}
      />
      <SubscriptionTile
        level={SubscriptionLevel.PREMIUM}
        price='11$ / month'
        priceId='price_xxx'
        benefits={[
          'Lorem ipsum',
          'Lorem ipsum',
          'Lorem ipsum',
        ]}
      />
    </Box>
  );
}
