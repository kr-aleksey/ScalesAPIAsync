import { TextField, type TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { NumericFormat, type NumericFormatProps } from 'react-number-format';

export const numericFormatLocaleMap = {
  en: undefined,
  ru: {
    thousandSeparator: ' ',
    decimalSeparator: ',',
  },
};

export type NumericFormatFieldProps = NumericFormatProps & TextFieldProps;

export const NumericFormatField: FC<NumericFormatFieldProps> = ({
  ref,
  ...restProps
}) => {
  return (
    <NumericFormat
      {...numericFormatLocaleMap.ru}
      {...restProps}
      customInput={TextField}
    />
  );
};
