import { memo } from 'react';
import { Box, Pagination, useTheme } from '@mui/material';

interface HomePaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const HomePagination = memo(
  ({ totalPages, currentPage, onPageChange }: HomePaginationProps) => {
    const theme = useTheme();

    if (totalPages <= 1) return null;

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
          pt: 4,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={onPageChange}
          color="primary"
          size="large"
          sx={{
            '& .MuiPaginationItem-root': {
              fontWeight: 500,
            },
          }}
        />
      </Box>
    );
  }
);

export default HomePagination;
