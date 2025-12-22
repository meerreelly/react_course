import { memo, useMemo } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  OutlinedInput,
  Typography,
} from '@mui/material';
import type { CategoryDto } from '../../types';

interface CategorySelectProps {
  categories: CategoryDto[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  error?: boolean;
  helperText?: string;
}

const CategorySelect = memo(({
  categories,
  selectedIds,
  onChange,
  error,
  helperText,
}: CategorySelectProps) => {
  const categoryNameById = useMemo(() => {
    const map = new Map<string, string>();
    for (const category of categories) map.set(category.id, category.name);
    return map;
  }, [categories]);

  return (
    <FormControl fullWidth error={error}>
      <InputLabel>Categories</InputLabel>
      <Select
        multiple
        value={selectedIds}
        onChange={(e) => onChange(e.target.value as string[])}
        input={<OutlinedInput label="Categories" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((id) => {
              return (
                <Chip
                  key={id}
                  label={categoryNameById.get(id) || id}
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
              );
            })}
          </Box>
        )}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <Typography
          variant="caption"
          color={error ? 'error' : 'text.secondary'}
          sx={{ mt: 0.5, ml: 1.5 }}
        >
          {helperText}
        </Typography>
      )}
    </FormControl>
  );
});

export default CategorySelect;
