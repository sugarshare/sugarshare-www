import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import BaseAuthentication from 'components/authentication/BaseAuthentication';
import { SUBSCRIPTIONS } from 'components/Subscription';
// TODO replace this
import { SubscriptionLevel } from 'components/SubscriptionTile';

export default function SignUp() {
  const [subscription, setSubscription] = useState(SubscriptionLevel.STANDARD);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // TODO validation
    event.preventDefault();
    console.log(event);
  };

  const handleSelectPlan = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSubscription(event.target.value as SubscriptionLevel);
  };

  return (
    <BaseAuthentication handleSubmit={handleSubmit}>
      <TextField
        select
        id='plan'
        label='Plan'
        value={subscription}
        onChange={handleSelectPlan}
        margin='normal'
        fullWidth
      >
        {
          Object.keys(SUBSCRIPTIONS).map((plan) => (
            <MenuItem key={plan} value={plan}>{plan}</MenuItem>
          ))
        }
      </TextField>
      <TextField
        variant='outlined'
        id='email'
        type='email'
        label='Email'
        margin='normal'
        fullWidth
      />
      <TextField
        variant='outlined'
        id='username'
        type='text'
        label='Name (optional)'
        margin='normal'
        fullWidth
      />
      <TextField
        variant='outlined'
        id='password'
        type='password'
        label='Password'
        helperText='Must be 8 characters long at least'
        margin='normal'
        fullWidth
      />

      <Typography variant='caption' sx={{ marginY: 2 }}>
        By creating an account, you agree to our&nbsp;
        <Link href='/terms' target='_blank' color='inherit' title='Terms of Service' aria-label='go to terms of service'>Terms</Link>
        &nbsp;and&nbsp;
        <Link href='/privacy' target='_blank' color='inherit' title='Privacy policy' aria-label='go to privacy policy'>Privacy Policy</Link>
        .
      </Typography>

      <Button
        variant='contained'
        type='submit'
        size='large'
        fullWidth
        sx={{
          marginY: 2,
          marginTop: 'auto',
          borderRadius: 2,
        }}
      >
        Sign up
      </Button>

      <Typography variant='caption'>
        Already have an account?&nbsp;
        <Link href='/login' color='inherit' title='Log in'>Log in</Link>
        .
      </Typography>
    </BaseAuthentication>
  );
}
