import { Backdrop, CircularProgress } from '@mui/material';
import { FC } from 'react';

type Props = {
  isLoading: boolean;
};

export const OverlayLoadingSpinner: FC<Props> = ({ isLoading }) => (
  <Backdrop
    sx={{
      position: 'absolute',
      zIndex: (theme) => theme.zIndex.appBar - 1,
      bgcolor: 'rgba(0, 0, 0, 0.1)',
      userSelect: 'none',
    }}
    open={isLoading}
  >
    <CircularProgress />
  </Backdrop>
);
