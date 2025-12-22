import { memo } from 'react';
import { Paper, useTheme } from '@mui/material';
import type { CategoryDto } from '../../types';
import {
  CategoryFilter,
  SearchTermInput,
  SortByFilter,
  SortOrderFilter,
} from './filters';

interface HomeFiltersProps {
  categories: CategoryDto[];
}

const HomeFilters = memo(({ categories }: HomeFiltersProps) => {
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
      <SearchTermInput />
      <CategoryFilter categories={categories} />
      <SortByFilter />
      <SortOrderFilter />
    </Paper>
  );
});


export default HomeFilters;
