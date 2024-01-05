import { Controller } from 'react-hook-form';
import { Box } from '@mui/material';

import RichTextEditor from './components/RichTextEditor';
import FieldError from '../../FieldError';
import FieldLabel from '../../FieldLabel';
import { FormFieldProps } from "../../interface";

const RichTextField: React.FC<FormFieldProps> = ({
  name,
  control,
  label,
  required,
  placeholder,
  helperText,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box sx={{ mt: 3 }}>
          <FieldLabel label={label} required={required} />
          <RichTextEditor
            content={value}
            setContent={onChange}
            placeholder={placeholder}
            hasError={Boolean(error)}
          />
          <FieldError
            error={error ? `${helperText ? helperText : error.message}` : null}
          />
        </Box>
      )}
    />
  );
};

export default RichTextField;
