import { useMemo } from 'react';
import { useOfferStore } from '../state/offerStore';


export const useOffersView = () => {
  const offers = useOfferStore((s) => s.offers);
  const searchTerm = useOfferStore((s) => s.searchTerm);
  const selectedCategory = useOfferStore((s) => s.selectedCategory);
  const sortBy = useOfferStore((s) => s.sortBy);
  const sortOrder = useOfferStore((s) => s.sortOrder);
  const currentPage = useOfferStore((s) => s.currentPage);
  const itemsPerPage = useOfferStore((s) => s.itemsPerPage);

  const filteredAndSortedOffers = useMemo(() => {
    let result = [...offers];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (offer) =>
          offer.title.toLowerCase().includes(term) ||
          offer.description.toLowerCase().includes(term)
      );
    }

    if (selectedCategory) {
      result = result.filter((offer) => offer.categoryIds.includes(selectedCategory));
    }

    if (sortBy) {
      result.sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'price') {
          comparison = a.pricePerHour - b.pricePerHour;
        } else if (sortBy === 'date') {
          comparison = new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime();
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [offers, searchTerm, selectedCategory, sortBy, sortOrder]);

  const paginatedOffers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedOffers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedOffers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedOffers.length / itemsPerPage);

  return {
    offers: paginatedOffers,
    totalPages,
    currentPage,
  };
};
