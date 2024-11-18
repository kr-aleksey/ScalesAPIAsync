import {
  FormControl,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScalesList } from '../api/endpoints/scales';
import { useTypedRouteParams } from '../shared/hooks/useTypedParams';
import { FAKE_SCALES_ID } from '../shared/constants';
import { useToasterDispatch } from '../contexts/ToasterContext';

export const ScalesPicker: FC = () => {
  const navigate = useNavigate();

  const dispatch = useToasterDispatch();

  const { scalesId } = useTypedRouteParams();

  const scalesListQuery = useScalesList();

  if (scalesListQuery.data?.length === 0)
    dispatch({
      type: 'open',
      payload: {
        errorCode: '',
        message: 'Получен пустой список весов',
        disableAutoHide: true,
      },
    });

  if (!scalesId && scalesListQuery.isSuccess) {
    if (scalesListQuery.data.find((scales) => scales.id === FAKE_SCALES_ID)) {
      navigate(`/${FAKE_SCALES_ID}`);
    } else navigate(`/${scalesListQuery.data[0]?.id}`);
  }

  return (
    <Stack sx={{ minWidth: 120 }} flex="1 1 0">
      <Typography variant="h4" mb={1}>
        Весы{' '}
      </Typography>
      <FormControl sx={{ mb: 1, width: '90%' }}>
        {scalesListQuery.isFetching ? (
          <Skeleton variant="rounded" animation="pulse" height="40px" />
        ) : (
          scalesId && (
            <Select value={scalesId}>
              {scalesListQuery.data &&
                scalesListQuery.data.map((item) => {
                  return (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                      onClick={() => navigate(`/${item.id}`)}
                    >
                      {item.name}
                    </MenuItem>
                  );
                })}
            </Select>
          )
        )}
      </FormControl>
    </Stack>
  );
};
