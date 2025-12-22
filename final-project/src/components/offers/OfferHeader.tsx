import { Box, Typography, Chip, Rating, useTheme } from '@mui/material';

interface OfferHeaderProps {
  title: string;
  averageRating: number;
  reviewCount: number;
  status: string;
}

const OfferHeader = ({ title, averageRating, reviewCount, status }: OfferHeaderProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.text.secondary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </Typography>
        <Chip
          label={status}
          size="small"
          color={status === 'Active' ? 'success' : 'default'}
          sx={{ fontWeight: 500 }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Rating value={averageRating} precision={0.5} readOnly size="small" />
        <Typography variant="body2" color="text.secondary">
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </Typography>
      </Box>
    </Box>
  );
};

export default OfferHeader;
