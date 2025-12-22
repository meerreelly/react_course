import { memo, useCallback } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { useOfferStore } from '../../../state/offerStore';

const SortByFilter = memo(() => {
  const sortBy = useOfferStore((s) => s.sortBy);
  const setSortBy = useOfferStore((s) => s.setSortBy);

  const handleSortByChange = useCallback(
    (e: { target: { value: string } }) => {
      setSortBy((e.target.value as 'price' | 'date' | null) || null);
    },
    [setSortBy]
  );

  return (
    <FormControl sx={{ minWidth: 140 }}>
      <InputLabel>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <FilterList sx={{ fontSize: 18 }} />
          Sort By
        </Box>
      </InputLabel>
      <Select value={sortBy || ''} onChange={handleSortByChange} label="Sort By...">
        <MenuItem value="">None</MenuItem>
        <MenuItem value="price">Price</MenuItem>
        <MenuItem value="date">Date</MenuItem>
      </Select>
    </FormControl>
  );
});

export default SortByFilter;
