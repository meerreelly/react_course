import { memo } from 'react';
import { Alert, Box } from '@mui/material';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = memo(({ message }: ErrorMessageProps) => {
  return (
    <Box className="p-4">
      <Alert severity="error">{message}</Alert>
    </Box>
  );
});

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
