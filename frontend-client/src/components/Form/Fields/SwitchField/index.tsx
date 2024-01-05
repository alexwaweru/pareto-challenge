import { Controller } from 'react-hook-form';
import { Box, Switch, Typography } from '@mui/material';

import { FormFieldProps } from "../../interface";

const SwitchField: React.FC<FormFieldProps> = ({
  name,
  control,
  label,
  required,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Box
          sx={{
            mt: 3,
            bgcolor: 'transparent',
            p: 1,
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Graphik-Regular',
                fontSize: '16px',
                fontWeight: 400,
                color: 'white',
              }}
            >
              {label}
              {required && <sup style={{ color: '#5B9AF8' }}>*</sup>}
            </Typography>
            <Switch
              checked={value}
              onChange={onChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Box>
        </Box>
      )}
    />
  );
};

export default SwitchField;
