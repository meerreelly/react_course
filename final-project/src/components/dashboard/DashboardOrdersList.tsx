import { Box } from '@mui/material';
import OrderItem from './OrderItem';
import type { OrderDto } from '../../types';

interface DashboardOrdersListProps {
  orders: OrderDto[];
  limit?: number;
}

const DashboardOrdersList = ({ orders, limit = 5 }: DashboardOrdersListProps) => {
  const displayOrders = limit ? orders.slice(0, limit) : orders;

  return (
    <Box className="space-y-1">
      {displayOrders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </Box>
  );
};

export default DashboardOrdersList;
