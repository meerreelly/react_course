import { memo, useCallback } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useOfferStore } from '../../../state/offerStore';
import type { CategoryDto } from '../../../types';

interface CategoryFilterProps {
  categories: CategoryDto[];
}

const CategoryFilter = memo(({ categories }: CategoryFilterProps) => {
  const selectedCategory = useOfferStore((s) => s.selectedCategory);
  const setSelectedCategory = useOfferStore((s) => s.setSelectedCategory);

  const handleCategoryChange = useCallback(
    (e: { target: { value: string } }) => {
      setSelectedCategory(e.target.value || null);
    },
    [setSelectedCategory]
  );

  return (
    <FormControl sx={{ minWidth: 180 }}>
      <InputLabel>Category</InputLabel>
      <Select value={selectedCategory || ''} onChange={handleCategoryChange} label="Category">
        <MenuItem value="">All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default CategoryFilter;
