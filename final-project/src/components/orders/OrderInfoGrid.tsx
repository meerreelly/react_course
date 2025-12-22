import { Box, Grid, Typography, useTheme } from '@mui/material';
import type { ReactNode } from 'react';

export interface OrderInfoFieldProps {
  label: string;
  value: string | React.ReactNode;
  fullWidth?: boolean;
}

const OrderInfoField = ({ label, value }: OrderInfoFieldProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
      }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={500} sx={{ mt: 0.5 }}>
        {value}
      </Typography>
    </Box>
  );
};

export interface OrderInfoGridProps {
  children: ReactNode;
}

const OrderInfoGrid = ({ children }: OrderInfoGridProps) => {
  return (
    <Grid container spacing={2}>
      {children}
    </Grid>
  );
};

export { OrderInfoField, OrderInfoGrid };
export default OrderInfoGrid;
