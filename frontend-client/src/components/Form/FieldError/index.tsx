import { Typography } from '@mui/material';

import { FieldErrorProps } from './interface';

const FieldError: React.FC<FieldErrorProps> = ({ error }) =>
  error ? (
    <Typography
      sx={{
        color: '#F44635',
        width: '100%',
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.66,
        textAlign: 'left',
        mt: '3px',
        mr: '14px',
        mb: 0,
        ml: '14px',
      }}
    >
      {error}
    </Typography>
  ) : null;

export default FieldError;
