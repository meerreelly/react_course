import { memo } from 'react';
import { EmptyState } from '../../offers';

const HomeEmptyState = memo(() => {
  return (
    <EmptyState
      title="No offers found"
      message="Try adjusting your search or filters to find what you're looking for"
    />
  );
});

export default HomeEmptyState;
