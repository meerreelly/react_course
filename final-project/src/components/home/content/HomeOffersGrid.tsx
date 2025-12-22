import { memo } from 'react';
import type { CategoryDto, OfferDto } from '../../../types';
import { OffersGrid } from '../../offers';

interface HomeOffersGridProps {
  offers: OfferDto[];
  categories: CategoryDto[];
}

const HomeOffersGrid = memo(({ offers, categories }: HomeOffersGridProps) => {
  return <OffersGrid offers={offers} categories={categories} />;
});

export default HomeOffersGrid;
