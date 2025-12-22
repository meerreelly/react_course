import { useOfferStore } from '../../state/offerStore';
import { useOffersQuery } from '../../hooks/useOffersQuery';
import { Loading } from '../common';
import HomeHeader from './HomeHeader';
import HomeFilters from './HomeFilters';
import HomeContent from './HomeContent';

export const HomeContainer = () => {
  const { loading } = useOffersQuery();
  const categories = useOfferStore((s) => s.categories);

  if (loading) return <Loading />;

  return (
    <>
      <HomeHeader />
      <HomeFilters categories={categories} />
      <HomeContent categories={categories} />
    </>
  );
};
