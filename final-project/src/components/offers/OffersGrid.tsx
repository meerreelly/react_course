import { memo } from 'react';
import { Grid, Typography } from '@mui/material';
import OfferCard from './OfferCard';
import type { OfferDto, CategoryDto } from '../../types';

interface OffersGridProps {
  offers: OfferDto[];
  categories: CategoryDto[];
}

const OffersGrid = memo(({ offers, categories }: OffersGridProps) => {
  if (offers.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
        No offers available
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {offers.map((offer) => (
        <Grid key={offer.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <OfferCard offer={offer} categories={categories} />
        </Grid>
      ))}
    </Grid>
  );
});

OffersGrid.displayName = 'OffersGrid';

export default OffersGrid;
