import { Box, Button, useTheme } from '@mui/material';
import { PlayArrow, CheckCircle, Cancel } from '@mui/icons-material';

interface OrderActionsProps {
  status: string;
  isBuyer: boolean;
  isProvider: boolean;
  onStart?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
  onReview?: () => void;
  loading?: boolean;
}

const OrderActions = ({
  status,
  isBuyer,
  isProvider,
  onStart,
  onComplete,
  onCancel,
  onReview,
  loading = false,
}: OrderActionsProps) => {
  const theme = useTheme();

  const showStart = isProvider && status === 'Pending';
  const showComplete = isProvider && status === 'InProgress';
  const showCancel = (isBuyer || isProvider) && (status === 'Pending' || status === 'InProgress');
  const showReview = isBuyer && status === 'Completed';

  if (!showStart && !showComplete && !showCancel && !showReview) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3 }}>
      {showStart && onStart && (
        <Button
          variant="contained"
          startIcon={<PlayArrow />}
          onClick={onStart}
          disabled={loading}
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
          }}
        >
          Start Order
        </Button>
      )}

      {showComplete && onComplete && (
        <Button
          variant="contained"
          startIcon={<CheckCircle />}
          onClick={onComplete}
          disabled={loading}
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
          }}
        >
          Mark Complete
        </Button>
      )}

      {showReview && onReview && (
        <Button
          variant="contained"
          onClick={onReview}
          disabled={loading}
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          }}
        >
          Leave Review
        </Button>
      )}

      {showCancel && onCancel && (
        <Button
          variant="outlined"
          color="error"
          startIcon={<Cancel />}
          onClick={onCancel}
          disabled={loading}
        >
          Cancel Order
        </Button>
      )}
    </Box>
  );
};

export default OrderActions;
