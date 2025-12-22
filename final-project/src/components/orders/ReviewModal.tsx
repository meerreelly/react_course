import { memo } from 'react';
import { Box, Button, TextField, Rating, Typography, useTheme } from '@mui/material';
import { Star } from '@mui/icons-material';
import Modal from '../common/Modal';

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  rating: number;
  comment: string;
  onRatingChange: (rating: number) => void;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
  loading: boolean;
  errors?: {
    rating?: string;
    comment?: string;
  };
}

const ReviewModal = memo(({
  open,
  onClose,
  rating,
  comment,
  onRatingChange,
  onCommentChange,
  onSubmit,
  loading,
  errors,
}: ReviewModalProps) => {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Leave a Review"
      subtitle="Share your experience with this service"
      icon={<Star />}
      maxWidth="sm"
      actions={
        <>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onSubmit}
            disabled={loading}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            }}
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Rating
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              borderRadius: 2,
              backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
            }}
          >
            <Rating
              value={rating}
              onChange={(_, newValue) => onRatingChange(newValue || 0)}
              size="large"
              sx={{
                '& .MuiRating-iconFilled': {
                  color: theme.palette.warning.main,
                },
              }}
            />
            <Typography variant="body1" fontWeight={500}>
              {rating} / 5
            </Typography>
          </Box>
          {errors?.rating && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
              {errors.rating}
            </Typography>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Your Review
          </Typography>
          <TextField
            multiline
            rows={4}
            placeholder="Tell others about your experience..."
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            fullWidth
            error={!!errors?.comment}
            helperText={errors?.comment}
          />
        </Box>
      </Box>
    </Modal>
  );
});

ReviewModal.displayName = 'ReviewModal';

export default ReviewModal;
