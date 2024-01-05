import { Typography } from '@mui/material';

import { FieldLabelProps } from './interface';

const FieldLabel: React.FC<FieldLabelProps> = ({ label, required }) => {
  const labelUI = (
    <Typography
      sx={{
        fontFamily: 'Graphik-Regular',
        fontSize: '16px',
        fontWeight: 400,
        color: 'white',
        mb: 2,
      }}
    >
      {label}
      {required && <sup style={{ color: '#5B9AF8' }}>*</sup>}
    </Typography>
  );
  return label ? labelUI : null;
};

export default FieldLabel;
