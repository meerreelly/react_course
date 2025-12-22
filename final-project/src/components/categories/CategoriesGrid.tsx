import { Grid, Typography } from '@mui/material';
import CategoryCard from './CategoryCard';
import type { CategoryDto } from '../../types';

interface CategoriesGridProps {
  categories: CategoryDto[];
  isAdmin: boolean;
  onEdit: (category: CategoryDto) => void;
  onDelete: (id: string) => void;
}

const CategoriesGrid = ({
  categories,
  isAdmin,
  onEdit,
  onDelete,
}: CategoriesGridProps) => {
  if (categories.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
        No categories yet
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid key={category.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <CategoryCard
            category={category}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoriesGrid;
