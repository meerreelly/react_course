import { Card, CardContent, Rating, Typography, useTheme } from '@mui/material';
import type { ReviewDto } from '../../types';

interface ReviewItemProps {
  review: ReviewDto;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent>
        <Rating value={review.rating} readOnly size="small" />
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            color: theme.palette.text.primary,
          }}
        >
          {review.comment}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {new Date(review.createdOn).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewItem;
