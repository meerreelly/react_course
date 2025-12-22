import { Box, Divider, Typography, Rating } from '@mui/material';
import type { ReviewDto } from '../../types';

interface ProfileReviewItemProps {
  review: ReviewDto;
}

const ProfileReviewItem = ({ review }: ProfileReviewItemProps) => {
  return (
    <Box>
      <Rating value={review.rating} size="small" readOnly />
      <Typography variant="body2" sx={{ mt: 0.5 }}>
        {review.comment}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(review.createdOn).toLocaleDateString()}
      </Typography>
    </Box>
  );
};

interface ProfileReviewsListProps {
  reviews: ReviewDto[];
}

const ProfileReviewsList = ({ reviews }: ProfileReviewsListProps) => {
  if (reviews.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
        No reviews yet
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {reviews.map((review, index) => (
        <Box key={review.id}>
          <ProfileReviewItem review={review} />
          {index < reviews.length - 1 && <Divider sx={{ mt: 2 }} />}
        </Box>
      ))}
    </Box>
  );
};

export default ProfileReviewsList;
