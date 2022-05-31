import React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
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
  priceId: string | null;
}

const PAID_SUBSCRIBE_URL = () => `https://${settings.apiDomainName}/subscription/create-checkout-session`;

const FREE_SUBSCRIBE_URL = () => {
  const params = {
    client_id: authenticationSettings.userPoolWebClientId,
    response_type: 'code',
    scope: ['openid', 'email', 'profile'].join(' '),
    redirect_uri: `https://${settings.siteDomainName}/get`,
  };

  const cognitoHostedUIUrl = new URL('signup', `https://${settings.authDomainName}`);
  Object.entries(params).forEach(([key, value]) => cognitoHostedUIUrl.searchParams.set(key, value));

  return cognitoHostedUIUrl.href;
};

export default function Subscription({
  tier, benefits, price, priceId,
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
          benefits.map((benefit) => (
            <Typography variant='body1' sx={{ lineHeight: 2 }}>
              <FontAwesomeIcon icon={faCheck} />
              &nbsp;&nbsp;&nbsp;
              {benefit}
            </Typography>
          ))
        }
      </Box>
    </>
  );

  if (price && priceId) {
    return (
      <Box
        component='form'
        action={PAID_SUBSCRIBE_URL()}
        method='POST'
        sx={sx}
      >
        {content}
        <Divider variant='middle' flexItem sx={{ marginTop: 'auto' }} />
        <Typography variant='h5' fontWeight='bold' sx={{ marginY: 2 }}>{price}</Typography>

        <Input type='hidden' name='priceId' value={priceId} />
        <Button
          disabled // TODO remove once subscription is available
          type='submit'
          variant='contained'
          size='large'
          color='secondary'
          fullWidth
          sx={{
            fontWeight: 'bold',
            marginTop: 'auto',
          }}
        >
          Join
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={sx}>
      {content}
      <Button
        href={FREE_SUBSCRIBE_URL()}
        variant='contained'
        size='large'
        color='secondary'
        fullWidth
        sx={{
          fontWeight: 'bold',
          marginTop: 'auto',
        }}
      >
        Create account
      </Button>
    </Box>
  );
}
