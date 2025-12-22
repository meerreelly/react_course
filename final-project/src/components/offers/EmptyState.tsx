import { memo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { SearchOff } from '@mui/icons-material';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

const EmptyState = memo(({
  title = 'No results found',
  message = 'Try adjusting your search or filters',
  icon,
}: EmptyStateProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        px: 4,
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          p: 3,
          borderRadius: '50%',
          backgroundColor: theme.palette.mode === 'light' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(96, 165, 250, 0.1)',
          mb: 3,
        }}
      >
        {icon || <SearchOff sx={{ fontSize: 48, color: 'text.secondary' }} />}
      </Box>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
});

EmptyState.displayName = 'EmptyState';

export default EmptyState;
