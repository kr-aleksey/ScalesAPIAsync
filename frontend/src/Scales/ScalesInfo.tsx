import { Typography } from '@mui/material';
import { FC } from 'react';
import { useScalesInfo } from '../api/endpoints/scales';

type Props = {
  scalesId: string;
};

export const ScalesInfo: FC<Props> = ({ scalesId }) => {
  const scalesInfoQuery = useScalesInfo(
    { scalesId: scalesId || '' },
    { enabled: !!scalesId },
  );

  return (
    <Typography
      sx={{
        color: (t) => t.palette.grey.A700,
        mb: 4,
        width: '50%',
        minHeight: '45px',
      }}
    >
      {scalesInfoQuery.data?.info ? scalesInfoQuery.data.info : ' '}
    </Typography>
  );
};
