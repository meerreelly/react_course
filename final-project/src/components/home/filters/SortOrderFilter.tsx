import { memo, useCallback } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useOfferStore } from '../../../state/offerStore';

const SortOrderFilter = memo(() => {
  const sortBy = useOfferStore((s) => s.sortBy);
  const sortOrder = useOfferStore((s) => s.sortOrder);
  const setSortOrder = useOfferStore((s) => s.setSortOrder);

  const handleSortOrderChange = useCallback(
    (e: { target: { value: string } }) => {
      setSortOrder(e.target.value as 'asc' | 'desc');
    },
    [setSortOrder]
  );

  if (!sortBy) return null;

  return (
    <FormControl sx={{ minWidth: 130 }}>
      <InputLabel>Order</InputLabel>
      <Select value={sortOrder} onChange={handleSortOrderChange} label="Order">
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>
    </FormControl>
  );
});

export default SortOrderFilter;
