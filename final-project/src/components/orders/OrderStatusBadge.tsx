import { Chip } from '@mui/material';

interface OrderStatusBadgeProps {
  status: string;
  size?: 'small' | 'medium';
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

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'InProgress':
      return 'In Progress';
    default:
      return status;
  }
};

const OrderStatusBadge = ({ status, size = 'medium' }: OrderStatusBadgeProps) => {
  return (
    <Chip
      label={getStatusLabel(status)}
      color={getStatusColor(status) as any}
      size={size}
      sx={{ fontWeight: 600 }}
    />
  );
};

export default OrderStatusBadge;
