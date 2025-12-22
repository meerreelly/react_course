import { useNavigate } from 'react-router-dom';
import { Box, Typography, Chip, useTheme } from '@mui/material';
import type { OfferDto } from '../../types';

interface OfferItemProps {
  offer: OfferDto;
}

const OfferItem = ({ offer }: OfferItemProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      onClick={() => navigate(`/offer/${offer.id}`)}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1.5,
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
        },
      }}
    >
      <Box>
        <Typography variant="body1" fontWeight={500}>
          {offer.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${offer.pricePerHour}/hr
        </Typography>
      </Box>
      <Chip
        label={offer.status}
        size="small"
        color={offer.status === 'Active' ? 'success' : 'default'}
        sx={{ fontWeight: 500 }}
      />
    </Box>
  );
};

export default OfferItem;
