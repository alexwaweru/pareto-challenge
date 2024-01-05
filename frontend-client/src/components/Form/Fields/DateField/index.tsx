import dayjs from 'dayjs';

import { Box } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from 'react-hook-form';

import FieldLabel from '../../FieldLabel';
import { FormFieldProps } from "../../interface";

const DateField: React.FC<FormFieldProps> = ({
  name,
  control,
  label,
  required,
  disableFuture = false,
  disablePast = false,
  shouldDisableDate = undefined,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Box sx={{ mt: 3, bgcolor: 'transparent'}}>
            <FieldLabel label={label} required={required} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                sx={{
                  width: '100%',
                  backgroundColor: '#6C6F78',
                }}
                value={dayjs(value)}
                onChange={(newDate) => {
                  if (newDate) {
                    onChange(newDate?.toISOString());
                  }
                }}
                disableFuture={disableFuture}
                disablePast={disablePast}
                shouldDisableDate={shouldDisableDate}
              />
            </LocalizationProvider>
          </Box>
        )}
      />
    </LocalizationProvider>
  );
};

export default DateField;
