import { Controller } from 'react-hook-form';
import {
  Box,
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

import FieldError from '../../FieldError';
import FieldLabel from '../../FieldLabel';
import { FormFieldProps, SelectOption } from "../../interface";

const SelectField: React.FC<FormFieldProps> = ({
  name,
  control,
  label,
  required,
  multiple,
  options = [],
}) => {
  const generateSingleOptions = (selectedValues: string[]) => {
    return options.map((option: SelectOption) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {multiple && (
            <Checkbox checked={selectedValues.indexOf(option.value) > -1} />
          )}
          <ListItemText primary={option.label} />
        </MenuItem>
      );
    });
  };

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
          {multiple ? (
            <Select
              error={!!error}
              multiple
              value={value}
              onChange={onChange}
              input={<OutlinedInput fullWidth error={!!error} />}
              renderValue={(selectedValues) => {
                const findValue = (val: string) =>
                  options.find((option) => option.value === val);
                const selectedOptions = selectedValues.map((val: string) =>
                  findValue(val)
                );
                return selectedOptions
                  .map((option: SelectOption) => (option ? option.label : ''))
                  .join(', ');
              }}
            >
              {generateSingleOptions(value)}
            </Select>
          ) : (
            <Select value={value} onChange={onChange} fullWidth>
              {generateSingleOptions(value)}
            </Select>
          )}
          <FieldError error={error ? error.message : null} />
        </Box>
      )}
    />
  );
};

export default SelectField;
