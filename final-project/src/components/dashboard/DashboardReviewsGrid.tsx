import { Grid } from '@mui/material';
import ReviewItem from './ReviewItem';
import type { ReviewDto } from '../../types';

interface DashboardReviewsGridProps {
  reviews: ReviewDto[];
  limit?: number;
}

const DashboardReviewsGrid = ({ reviews, limit = 6 }: DashboardReviewsGridProps) => {
  const displayReviews = limit ? reviews.slice(0, limit) : reviews;

  return (
    <Grid container spacing={2}>
      {displayReviews.map((review) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={review.id}>
          <ReviewItem review={review} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardReviewsGrid;
