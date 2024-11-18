import { Stack, styled } from '@mui/material';
import MuiCard from '@mui/material/Card';
import { FC } from 'react';
import { ScalesPicker } from './ScalesPicker';
import { useTypedRouteParams } from '../shared/hooks/useTypedParams';
import { ScalesData } from './ScalesData';
import { CreateWeightForm } from './CreateWeightForm';
import { FAKE_SCALES_ID } from '../shared/constants';
import { ScalesInfo } from './ScalesInfo';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '800px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const ScalesDataContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export const Scales: FC = () => {
  const { scalesId } = useTypedRouteParams();

  return (
    <ScalesDataContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <ScalesPicker />
            {scalesId && <ScalesData scalesId={scalesId} />}
          </Stack>
          {scalesId && <ScalesInfo scalesId={scalesId} />}
          {scalesId === FAKE_SCALES_ID && (
            <CreateWeightForm scalesId={scalesId} />
          )}
        </Stack>
      </Card>
    </ScalesDataContainer>
  );
};
