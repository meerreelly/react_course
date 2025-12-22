import { Box, Typography, Card, CardContent, Chip, useTheme } from '@mui/material';
import type { OrderDto } from '../../types';
import OrderItem from './OrderItem';

interface ActiveOrdersBannerProps {
  orders: OrderDto[];
}

const ActiveOrdersBanner = ({ orders }: ActiveOrdersBannerProps) => {
  const theme = useTheme();

  if (orders.length === 0) return null;

  return (
    <Card
      sx={{
        mb: 3,
        borderLeft: `4px solid ${theme.palette.warning.main}`,
        background: `linear-gradient(135deg, ${theme.palette.warning.main}08 0%, ${theme.palette.warning.light}05 100%)`,
      }}
    >
      <CardContent>
        <Box className="flex items-center gap-2 mb-3">
          <Typography variant="h6" fontWeight={600}>
            Active Orders
          </Typography>
          <Chip
            label={orders.length}
            size="small"
            color="warning"
            sx={{ fontWeight: 600 }}
          />
        </Box>
        <Box className="space-y-1">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActiveOrdersBanner;
