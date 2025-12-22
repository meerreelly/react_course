import { memo, useCallback } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useOfferStore } from '../../../state/offerStore';

const SearchTermInput = memo(() => {
  const searchTerm = useOfferStore((s) => s.searchTerm);
  const setSearchTerm = useOfferStore((s) => s.setSearchTerm);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm]
  );

  return (
    <TextField
      placeholder="Search services..."
      value={searchTerm}
      onChange={handleSearchChange}
      sx={{ flex: 1 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
});

export default SearchTermInput;
