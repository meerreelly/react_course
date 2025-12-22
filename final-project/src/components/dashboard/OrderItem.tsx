import { useNavigate } from 'react-router-dom';
import { Box, Typography, Chip, useTheme } from '@mui/material';
import type { OrderDto } from '../../types';

interface OrderItemProps {
  order: OrderDto;
  showDate?: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'warning';
    case 'InProgress':
      return 'info';
    case 'Completed':
      return 'success';
    case 'Cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const OrderItem = ({ order, showDate = true }: OrderItemProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      onClick={() => navigate(`/orders/${order.id}`)}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1.5,
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
        },
      }}
    >
      <Box>
        <Typography variant="body1" fontWeight={500}>
          Order #{order.id.slice(0, 8)}
        </Typography>
        {showDate && (
          <Typography variant="body2" color="text.secondary">
            {new Date(order.createdAt).toLocaleDateString()}
          </Typography>
        )}
      </Box>
      <Chip
        label={order.status}
        size="small"
        color={getStatusColor(order.status) as any}
        sx={{ fontWeight: 500 }}
      />
    </Box>
  );
};

export default OrderItem;
