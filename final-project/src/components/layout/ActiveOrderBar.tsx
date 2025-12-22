import { Box, Alert, Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../state/userStore';
import { useAuthStore } from '../../state/authStore';

const ActiveOrderBar = () => {
  const navigate = useNavigate();
  const { activeOrders } = useUserStore();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated || activeOrders.length === 0) {
    return null;
  }

  return (
    <Box className="sticky top-16 z-40">
      <Alert
        severity="info"
        icon={<ShoppingCart />}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => navigate(`/orders/${activeOrders[0].id}`)}
          >
            View Order
          </Button>
        }
      >
        You have {activeOrders.length} active order{activeOrders.length > 1 ? 's' : ''}
      </Alert>
    </Box>
  );
};

export default ActiveOrderBar;
