import { Controller } from 'react-hook-form';
import { Box, TextField as BaseTextField} from '@mui/material';

import FieldLabel from '../../FieldLabel';
import { FormFieldProps } from "../../interface";

const TextField: React.FC<FormFieldProps> = ({
  name,
  control,
  label,
  required,
  placeholder,
  type = 'text',
  multiline,
  rows,
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
          <BaseTextField
            helperText={error ? error.message : null}
            required={required}
            placeholder={placeholder || ''}
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            type={type}
            multiline={multiline}
            rows={rows}
          />
        </Box>
      )}
    />
  );
};

export default TextField;
