import { memo } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Paper,
  useTheme,
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import type { CategoryDto } from '../../types';

interface SearchFiltersProps {
  searchTerm: string;
  selectedCategory: string | null;
  sortBy: 'price' | 'date' | null;
  sortOrder: 'asc' | 'desc';
  categories: CategoryDto[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string | null) => void;
  onSortByChange: (value: 'price' | 'date' | null) => void;
  onSortOrderChange: (value: 'asc' | 'desc') => void;
}

const SearchFilters = memo(({
  searchTerm,
  selectedCategory,
  sortBy,
  sortOrder,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortByChange,
  onSortOrderChange,
}: SearchFiltersProps) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 4,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(59, 130, 246, 0.04)' : 'rgba(96, 165, 250, 0.08)',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 3,
      }}
    >
      <TextField
        placeholder="Search services..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ flex: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
        }}
      />

      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            Category
          </Box>
        </InputLabel>
        <Select
          value={selectedCategory || ''}
          onChange={(e) => onCategoryChange(e.target.value || null)}
          label="Category"
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 140 }}>
        <InputLabel>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <FilterList sx={{ fontSize: 18 }} />
            Sort By
          </Box>
        </InputLabel>
        <Select
          value={sortBy || ''}
          onChange={(e) => onSortByChange(e.target.value as 'price' | 'date' | null)}
          label="Sort By..."
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="date">Date</MenuItem>
        </Select>
      </FormControl>

      {sortBy && (
        <FormControl sx={{ minWidth: 130 }}>
          <InputLabel>Order</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value as 'asc' | 'desc')}
            label="Order"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      )}
    </Paper>
  );
});

SearchFilters.displayName = 'SearchFilters';

export default SearchFilters;
