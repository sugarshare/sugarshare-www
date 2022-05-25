import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmationDialogInput {
  title: string;
  description: string;
  agreeText?: string;
  disagreeText?: string;
  open: boolean;
  handleConfirm: React.MouseEventHandler<HTMLButtonElement>;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ConfirmationDialog({
  title,
  description,
  agreeText = 'Confirm',
  disagreeText = 'Cancel',
  open,
  handleConfirm,
  handleClose,
}: ConfirmationDialogInput) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{disagreeText}</Button>
          <Button onClick={handleConfirm} autoFocus>
            {agreeText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
