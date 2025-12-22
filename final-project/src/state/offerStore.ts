import { create } from 'zustand';
import type { OfferDto, CategoryDto } from '../types';

interface OfferState {
  offers: OfferDto[];
  categories: CategoryDto[];
  searchTerm: string;
  selectedCategory: string | null;
  sortBy: 'price' | 'date' | null;
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  itemsPerPage: number;
  setOffers: (offers: OfferDto[]) => void;
  setCategories: (categories: CategoryDto[]) => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  setSortBy: (sortBy: 'price' | 'date' | null) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
}

export const useOfferStore = create<OfferState>((set) => ({
  offers: [],
  categories: [],
  searchTerm: '',
  selectedCategory: null,
  sortBy: null,
  sortOrder: 'asc',
  currentPage: 1,
  itemsPerPage: 10,
  setOffers: (offers) => set({ offers }),
  setCategories: (categories) => set({ categories }),
  setSearchTerm: (searchTerm) => set({ searchTerm, currentPage: 1 }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory, currentPage: 1 }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setItemsPerPage: (itemsPerPage) => set({ itemsPerPage, currentPage: 1 }),
}));
