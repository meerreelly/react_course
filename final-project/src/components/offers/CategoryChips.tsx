import { Box, Chip } from '@mui/material';

interface CategoryChipsProps {
  categoryNames: string[];
}

const CategoryChips = ({ categoryNames }: CategoryChipsProps) => {
  if (categoryNames.length === 0) return null;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {categoryNames.map((name, index) => (
        <Chip
          key={index}
          label={name}
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
      ))}
    </Box>
  );
};

export default CategoryChips;
