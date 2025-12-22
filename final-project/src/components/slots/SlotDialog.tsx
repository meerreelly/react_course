import { memo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  useTheme,
} from '@mui/material';

interface SlotDialogProps {
  open: boolean;
  onClose: () => void;
  isEditing: boolean;
  startTime: string;
  endTime: string;
  onStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors?: {
    startTime?: string;
    endTime?: string;
  };
  touched?: {
    startTime?: boolean;
    endTime?: boolean;
  };
  loading: boolean;
}

interface DateTimeFieldProps {
  label: string;
  name: 'startTime' | 'endTime';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
}

const DateTimeField = memo(
  ({ label, name, value, onChange, error, touched }: DateTimeFieldProps) => {
    return (
      <TextField
        fullWidth
        type="datetime-local"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        error={Boolean(touched && error)}
        helperText={touched ? error : undefined}
        InputLabelProps={{ shrink: true }}
      />
    );
  }
);

interface SlotDialogActionsProps {
  isEditing: boolean;
  loading: boolean;
  onClose: () => void;
}

const SlotDialogActions = memo(({ isEditing, loading, onClose }: SlotDialogActionsProps) => {
  const theme = useTheme();

  return (
    <DialogActions sx={{ p: 2.5, pt: 0 }}>
      <Button onClick={onClose} variant="outlined">
        Cancel
      </Button>
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        }}
      >
        {loading ? 'Saving...' : isEditing ? 'Update' : 'Create'}
      </Button>
    </DialogActions>
  );
});

const SlotDialog = memo(({
  open,
  onClose,
  isEditing,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  onSubmit,
  errors,
  touched,
  loading,
}: SlotDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={onSubmit}>
        <DialogTitle sx={{ fontWeight: 600 }}>
          {isEditing ? 'Edit Slot' : 'Create New Slot'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 2 }}>
            <DateTimeField
              label="Start Time"
              name="startTime"
              value={startTime}
              onChange={onStartTimeChange}
              error={errors?.startTime}
              touched={touched?.startTime}
            />
            <DateTimeField
              label="End Time"
              name="endTime"
              value={endTime}
              onChange={onEndTimeChange}
              error={errors?.endTime}
              touched={touched?.endTime}
            />
          </Box>
        </DialogContent>
        <SlotDialogActions isEditing={isEditing} loading={loading} onClose={onClose} />
      </form>
    </Dialog>
  );
});

export default SlotDialog;
