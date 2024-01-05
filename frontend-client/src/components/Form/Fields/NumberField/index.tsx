import { Controller } from 'react-hook-form';
import { Box, TextField } from '@mui/material';

import FieldLabel from '../../FieldLabel';
import { FormFieldProps } from "../../interface";

const NumberField:  React.FC<FormFieldProps> = ({
  name,
  control,
  label,
  required,
  placeholder,
  multiline,
  rows,
  min,
  max,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box
          sx={{
            mt: 3,
            bgcolor: 'transparent',
          }}
        >
          <FieldLabel label={label} required={required} />
          <TextField
            InputProps={{ inputProps: { min, max } }}
            helperText={error ? error.message : null}
            required={required}
            placeholder={placeholder || ''}
            error={!!error}
            onChange={(event) => {
              if (event.target.value) {
                onChange(parseInt(event.target.value));
              } else {
                onChange(event.target.value);
              }
            }}
            value={value}
            fullWidth
            type="number"
            multiline={multiline}
            rows={rows}
          />
        </Box>
      )}
    />
  );
};

export default NumberField;
