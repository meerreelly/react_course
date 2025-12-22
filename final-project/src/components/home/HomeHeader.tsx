import { memo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Explore } from '@mui/icons-material';

const HomeHeader = memo(() => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            borderRadius: 2,
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Explore sx={{ color: 'white', fontSize: 28 }} />
        </Box>
        <Typography variant="h4" fontWeight={700}>
          Browse Services
        </Typography>
      </Box>
      <Typography variant="body1" color="text.secondary">
        Discover amazing services from talented professionals
      </Typography>
    </Box>
  );
});


export default HomeHeader;
