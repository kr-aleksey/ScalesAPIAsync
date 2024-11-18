import { Box, Button, FormControl, FormLabel, MenuItem } from '@mui/material';
import { FC } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isAxiosError } from 'axios';
import { useCreateWeight, useScalesWeight } from '../api/endpoints/scales';
import {
  createScalesWeightDTO,
  CreateScalesWeightDTO,
} from '../api/endpoints/types';
import { ControlledTextField } from '../shared/components/ControlledTextField';
import { useToasterDispatch } from '../contexts/ToasterContext';
import { ControlledNumericFormatField } from '../shared/components/ControlledNumericFormatField';

type Props = {
  scalesId: string;
};

const errorSchemeDTO = z.object({
  detail: z.array(
    z.object({ loc: z.array(z.string()), msg: z.string(), type: z.string() }),
  ),
});

export const CreateWeightForm: FC<Props> = ({ scalesId }) => {
  const dispatch = useToasterDispatch();

  const createWeightMutation = useCreateWeight({ scalesId });
  const scalesWeightQuery = useScalesWeight({ scalesId });

  const { control, handleSubmit, reset, setError } =
    useForm<CreateScalesWeightDTO>({
      resolver: zodResolver(createScalesWeightDTO),
      defaultValues: {
        weight: '',
        status: 'stable',
      },
      values: {
        weight: scalesWeightQuery.data?.weight || '',
        status: scalesWeightQuery.data?.status || 'stable',
      },
    });

  const { weight: currentFormWeight, status: currentFormStatus } = useWatch({
    control,
  });

  const onSubmit = (formValues: CreateScalesWeightDTO): void => {
    createWeightMutation.mutate(formValues, {
      onSuccess: () => reset(),
      onError: (err) => {
        if (isAxiosError(err) && err.response?.status === 422) {
          const validatedError = errorSchemeDTO.safeParse(err.response.data);

          let isErrorHandled = false;

          if (validatedError.success) {
            const weightError = validatedError.data.detail.find((item) =>
              item.loc.some((loc) => loc === 'weight'),
            )?.msg;
            const statusError = validatedError.data.detail.find((item) =>
              item.loc.some((loc) => loc === 'status'),
            )?.msg;

            if (weightError) {
              setError('weight', { message: weightError });
              isErrorHandled = true;
            }

            if (statusError) {
              setError('status', { message: statusError });
              isErrorHandled = true;
            }

            if (!isErrorHandled)
              dispatch({
                type: 'open',
                payload: { errorCode: '422', message: 'Неизвестная ошибка' },
              });
          }
        }
      },
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      // visibility={isHidden ? 'hidden' : 'visible'}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: 2,
      }}
    >
      <FormControl sx={{ width: '25%' }}>
        <FormLabel htmlFor="weight">Вес</FormLabel>
        <ControlledNumericFormatField
          name="weight"
          control={control}
          numericFormatFieldProps={{
            decimalScale: 4,
            valueIsNumericString: true,
          }}
        />
      </FormControl>
      <FormControl sx={{ width: '25%' }}>
        <FormLabel htmlFor="status">Статус</FormLabel>
        <ControlledTextField
          control={control}
          name="status"
          textFieldProps={{
            fullWidth: true,
            select: true,
          }}
        >
          <MenuItem key="scales_floor" value="stable">
            stable
          </MenuItem>
          <MenuItem key="scales_hanging" value="unstable">
            unstable
          </MenuItem>
          <MenuItem key="scales_hanging" value="overload">
            overload
          </MenuItem>
        </ControlledTextField>
      </FormControl>
      <Button
        type="submit"
        variant="outlined"
        disabled={
          (currentFormWeight === scalesWeightQuery.data?.weight &&
            currentFormStatus === scalesWeightQuery.data?.status) ||
          createWeightMutation.isPending ||
          scalesWeightQuery.isFetching
        }
      >
        {createWeightMutation.isPending || scalesWeightQuery.isFetching
          ? 'Загрузка...'
          : 'Сохранить'}
      </Button>
    </Box>
  );
};
