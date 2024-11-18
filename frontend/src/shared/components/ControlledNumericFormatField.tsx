import get from 'lodash.get';
import { ReactElement } from 'react';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';
import {
  NumericFormatField,
  NumericFormatFieldProps,
} from './NumericFormatField';

type Props<FormValues extends FieldValues> = UseControllerProps<FormValues> & {
  numericFormatFieldProps?: Omit<
    NumericFormatFieldProps,
    'value' | 'onValueChange' | 'onBlur' | 'error'
  >;
};

export const ControlledNumericFormatField = <FormValues extends FieldValues>({
  numericFormatFieldProps,
  ...controllerProps
}: Props<FormValues>): ReactElement | null => {
  const {
    field: { onChange, onBlur, name, value, ref },
    formState: { errors },
  } = useController<FormValues>(controllerProps);

  const errorMessage = get(errors, `${name}.message`);
  const helperText =
    typeof errorMessage === 'string' ? errorMessage : undefined;

  return (
    <NumericFormatField
      {...numericFormatFieldProps}
      inputRef={ref}
      value={value}
      onValueChange={
        numericFormatFieldProps?.valueIsNumericString
          ? ({ value: inputValue }) => onChange(inputValue)
          : ({ floatValue }) => onChange(floatValue ?? '')
      }
      onBlur={onBlur}
      error={!!helperText}
      helperText={helperText || numericFormatFieldProps?.helperText || ' '}
    />
  );
};
