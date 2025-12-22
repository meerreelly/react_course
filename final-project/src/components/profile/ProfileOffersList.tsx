import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { OfferDto } from '../../types';

interface ProfileOfferItemProps {
  offer: OfferDto;
  onClick: (id: string) => void;
}

const ProfileOfferItem = ({ offer, onClick }: ProfileOfferItemProps) => {
  return (
    <Box
      onClick={() => onClick(offer.id)}
      sx={{
        p: 2,
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          bgcolor: 'action.hover',
          transform: 'translateX(4px)',
        },
      }}
    >
      <Typography variant="body1" fontWeight={500}>
        {offer.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        ${offer.pricePerHour}/hr
      </Typography>
    </Box>
  );
};

interface ProfileOffersListProps {
  offers: OfferDto[];
}

const ProfileOffersList = ({ offers }: ProfileOffersListProps) => {
  const navigate = useNavigate();

  if (offers.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
        No offers yet
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {offers.map((offer) => (
        <ProfileOfferItem
          key={offer.id}
          offer={offer}
          onClick={(id) => navigate(`/offer/${id}`)}
        />
      ))}
    </Box>
  );
};

export default ProfileOffersList;
