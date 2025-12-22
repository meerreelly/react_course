import { memo } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';

interface FormActionsProps {
  onSubmit?: () => void;
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  submitIcon?: React.ReactNode;
}

const FormActions = memo(({ 
  onSubmit,
  onCancel,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  loading = false,
  submitIcon,
}: FormActionsProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
      <Button
        type={onSubmit ? 'button' : 'submit'}
        variant="contained"
        onClick={onSubmit}
        disabled={loading}
        startIcon={submitIcon || <Save />}
        fullWidth
        sx={{
          py: 1.5,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
          },
        }}
      >
        {loading ? 'Processing...' : submitLabel}
      </Button>
      <Button
        variant="outlined"
        onClick={onCancel}
        startIcon={<Cancel />}
        fullWidth
        sx={{ py: 1.5 }}
      >
        {cancelLabel}
      </Button>
    </Box>
  );
});

export default FormActions;
