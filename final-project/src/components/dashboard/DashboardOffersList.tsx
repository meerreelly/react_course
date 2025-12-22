import { Box } from '@mui/material';
import OfferItem from './OfferItem';
import type { OfferDto } from '../../types';

interface DashboardOffersListProps {
  offers: OfferDto[];
  limit?: number;
}

const DashboardOffersList = ({ offers, limit = 5 }: DashboardOffersListProps) => {
  const displayOffers = limit ? offers.slice(0, limit) : offers;

  return (
    <Box className="space-y-1">
      {displayOffers.map((offer) => (
        <OfferItem key={offer.id} offer={offer} />
      ))}
    </Box>
  );
};

export default DashboardOffersList;
