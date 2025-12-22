import { memo, useCallback } from 'react';
import { useOfferStore } from '../../state/offerStore';
import { useOffersView } from '../../hooks/useOffersView';
import type { CategoryDto } from '../../types';
import { HomeEmptyState, HomeOffersGrid, HomePagination } from './content';

interface HomeContentProps {
  categories: CategoryDto[];
}

const HomeContent = memo(({ categories }: HomeContentProps) => {
  const { offers, totalPages, currentPage } = useOffersView();
  const setCurrentPage = useOfferStore((state) => state.setCurrentPage);

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  if (offers.length === 0) {
    return <HomeEmptyState />;
  }

  return (
    <>
      <HomeOffersGrid offers={offers} categories={categories} />
      <HomePagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
});

export default HomeContent;
