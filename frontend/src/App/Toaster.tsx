import {
  Alert,
  AlertTitle,
  Slide,
  SlideProps,
  Snackbar,
  SnackbarCloseReason,
} from '@mui/material';
import { FC, ReactNode } from 'react';
import { useToaster, useToasterDispatch } from '../contexts/ToasterContext';

type TransitionProps = Omit<SlideProps, 'direction'>;

const TransitionLeft = (props: TransitionProps): ReactNode => {
  return <Slide {...props} direction="left" />;
};

export const Toaster: FC = () => {
  const toaster = useToaster();
  const dispatch = useToasterDispatch();

  return (
    <Snackbar
      key={toaster?.errorCode ?? 'empty'}
      open={!!toaster}
      autoHideDuration={toaster && toaster.disableAutoHide ? null : 7000}
      TransitionComponent={TransitionLeft}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      onClose={(_e, reason: SnackbarCloseReason) => {
        if (reason !== 'clickaway') dispatch({ type: 'close' });
      }}
      sx={{
        top: { xs: '80px' },
        maxWidth: { xs: '95%', sm: '60%', md: '30%' },
        '& .MuiAlert-action > button': {
          border: 'none',
          backgroundColor: 'transparent',
        },
      }}
    >
      <Alert
        variant="standard"
        onClose={() => dispatch({ type: 'close' })}
        severity="error"
        sx={{ width: '100%' }}
      >
        <AlertTitle>Ошибка {toaster?.errorCode}</AlertTitle>
        {toaster && toaster.message}
      </Alert>
    </Snackbar>
  );
};
