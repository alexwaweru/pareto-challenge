import { memo } from 'react';

import {
  DateField,
  NumberField,
  RichTextField,
  SelectField,
  SwitchField,
  TextField,
} from '../Fields';
import { FormInputProps } from './interface';

const FormInput: React.FC<FormInputProps> = ({ type, inputProps }) => {
  if (type === 'text') {
    return <TextField {...inputProps} />;
  }
  if (type === 'date') {
    return <DateField {...inputProps} />;
  }
  if (type === 'number') {
    return <NumberField {...inputProps} />;
  }
  if (type === 'rich-text') {
    return <RichTextField {...inputProps} />;
  }
  if (type === 'select') {
    return <SelectField {...inputProps} />;
  }
  if (type === 'switch') {
    return <SwitchField {...inputProps} />;
  }
  return null;
};

export default memo(FormInput);
