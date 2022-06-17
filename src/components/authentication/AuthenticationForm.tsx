import React from 'react';
import Box from '@mui/material/Box';
import AuthenticationBase from 'components/authentication/AuthenticationBase';

export default function AuthenticationForm({
  children, handleSubmit,
}: { children: React.ReactNode, handleSubmit: React.FormEventHandler }) {
  return (
    <AuthenticationBase>
      <Box
        component='form'
        autoComplete='on'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'no-wrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </AuthenticationBase>
  );
}
