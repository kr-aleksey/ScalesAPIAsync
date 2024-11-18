import { Skeleton, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useScalesWeight } from '../api/endpoints/scales';

type Props = {
  scalesId: string;
};

export const ScalesData: FC<Props> = ({ scalesId }) => {
  const scalesWeightQuery = useScalesWeight({ scalesId });

  return (
    <Stack flex="1 1 0" mr={3}>
      <Stack
        direction="row"
        alignItems="baseline"
        justifyContent="flex-end"
        spacing={2}
      >
        <Typography variant="h3">вес:</Typography>
        {scalesWeightQuery.isFetching ? (
          <Skeleton width="140px" variant="rounded" animation="pulse" />
        ) : (
          <Typography variant="h4" fontWeight="300" width="140px">
            {scalesWeightQuery.data?.weight || '—'}
          </Typography>
        )}
      </Stack>
      <Stack
        direction="row"
        alignItems="baseline"
        justifyContent="flex-end"
        spacing={2}
      >
        <Typography variant="h3">статус:</Typography>
        {scalesWeightQuery.isFetching ? (
          <Skeleton variant="rounded" animation="pulse" width="97px" />
        ) : (
          <Typography variant="h4" fontWeight="300" width="97px">
            {scalesWeightQuery.data?.status || '—'}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
