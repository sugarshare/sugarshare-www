import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => (<MuiAlert elevation={6} ref={ref} variant='filled' {...props} />));

interface NotificationSnackbarInput {
  message: string;
}

export default function NotificationSnackbar({ message }: NotificationSnackbarInput) {
  const [open, setOpen] = useState(true);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      action={(
        <IconButton
          size='small'
          aria-label='close'
          color='inherit'
          onClick={handleClose}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      )}
    >
      <Alert
        severity='info'
        onClose={handleClose}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
