import { memo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg';
}

const Modal = memo(({
  open,
  onClose,
  title,
  subtitle,
  icon,
  children,
  actions,
  maxWidth = 'sm',
}: ModalProps) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          pb: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {icon && (
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main + '15',
                borderRadius: 1.5,
                p: 1,
                display: 'flex',
                color: theme.palette.primary.main,
              }}
            >
              {icon}
            </Box>
          )}
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: theme.palette.error.main + '10',
              color: theme.palette.error.main,
            },
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        {children}
      </DialogContent>

      {actions && (
        <DialogActions sx={{ p: 2, gap: 1 }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
});

Modal.displayName = 'Modal';

export default Modal;
