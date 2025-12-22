import { Box, Typography, Rating, Divider, useTheme } from '@mui/material';
import type { ReviewDto } from '../../types';

interface ReviewListProps {
  reviews: ReviewDto[];
  emptyMessage?: string;
}

const ReviewList = ({ reviews, emptyMessage = 'No reviews yet' }: ReviewListProps) => {
  const theme = useTheme();

  if (reviews.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 2 }}>
        {emptyMessage}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {reviews.map((review, index) => (
        <Box key={review.id}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Rating value={review.rating} size="small" readOnly />
            <Typography variant="caption" color="text.secondary">
              {new Date(review.createdOn).toLocaleDateString()}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
            {review.comment}
          </Typography>
          {index < reviews.length - 1 && <Divider sx={{ mt: 2 }} />}
        </Box>
      ))}
    </Box>
  );
};

export default ReviewList;
