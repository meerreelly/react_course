import { useCallback, useEffect, useState } from 'react';
import { offerService } from '../services/offerService';
import { categoryService } from '../services/categoryService';
import { useOfferStore } from '../state/offerStore';


export const useOffersQuery = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setOffers = useOfferStore((s) => s.setOffers);
  const setCategories = useOfferStore((s) => s.setCategories);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [offersData, categoriesData] = await Promise.all([
        offerService.getAll(),
        categoryService.getAll(),
      ]);
      setOffers(offersData);
      setCategories(categoriesData);
    } catch {
      setError('Failed to fetch offers');
    } finally {
      setLoading(false);
    }
  }, [setOffers, setCategories]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { loading, error, refetch };
};
