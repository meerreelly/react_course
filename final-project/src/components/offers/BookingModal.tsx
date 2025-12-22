import { memo } from 'react';
import { Box, Typography, Button, TextField, useTheme } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import type { SlotDto, OfferDto } from '../../types';
import Modal from '../common/Modal';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  offer: OfferDto | null;
  slot: SlotDto | null;
  notes: string;
  onNotesChange: (notes: string) => void;
  onConfirm: () => void;
  loading: boolean;
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

const BookingModal = memo(({
  open,
  onClose,
  offer,
  slot,
  notes,
  onNotesChange,
  onConfirm,
  loading,
}: BookingModalProps) => {
  const theme = useTheme();

  if (!offer || !slot) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Confirm Booking"
      subtitle="Review your booking details"
      icon={<ShoppingCart />}
      maxWidth="sm"
      actions={
        <>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onConfirm}
            disabled={loading}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            }}
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(96, 165, 250, 0.05)',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Service
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {offer.title}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === 'light' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(96, 165, 250, 0.05)',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Time Slot
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {formatDateTime(slot.startTime)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            to {formatDateTime(slot.endTime)}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.success.main}10 0%, ${theme.palette.success.light}05 100%)`,
            border: `1px solid ${theme.palette.success.main}30`,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Price
          </Typography>
          <Typography variant="h5" fontWeight={700} color="success.main">
            ${offer.pricePerHour.toFixed(2)}/hr
          </Typography>
        </Box>

        <TextField
          multiline
          rows={3}
          placeholder="Add notes for the service provider (optional)"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          fullWidth
        />
      </Box>
    </Modal>
  );
});

BookingModal.displayName = 'BookingModal';

export default BookingModal;
