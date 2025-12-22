import { Alert, Snackbar } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';

interface AlertMessageProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  autoHideDuration?: number;
}

const AlertMessage = ({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 5000,
}: AlertMessageProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        icon={severity === 'success' ? <CheckCircle /> : severity === 'error' ? <Error /> : undefined}
        sx={{ borderRadius: 2 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
