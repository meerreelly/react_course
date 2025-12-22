import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Button, CircularProgress } from '@mui/material';
import {
  AccountBalance,
  LocalOffer,
  ShoppingCart,
  Star,
  Add,
  Payment,
} from '@mui/icons-material';
import { useDashboard } from '../../hooks/useDashboard';
import { Loading, ErrorMessage } from '../common';
import {
  StatCard,
  TransactionsTable,
  ActiveOrdersBanner,
  DashboardSection,
  DashboardOffersList,
  DashboardOrdersList,
  DashboardReviewsGrid,
} from '../dashboard';
import { userService } from '../../services';
import type { PaymentDto } from '../../types';

export const DashboardContainer = () => {
  const navigate = useNavigate();
  const { dashboard, loading, error } = useDashboard();
  const [transactions, setTransactions] = useState<PaymentDto[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await userService.getPayments();
        setTransactions(data);
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      } finally {
        setTransactionsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!dashboard) return <ErrorMessage message="Failed to load dashboard" />;

  const activeOrders = dashboard.orders.filter(
    (o) => o.status === 'Pending' || o.status === 'InProgress'
  );

  return (
    <Box>
      {/* Header */}
      <Box className="flex justify-between items-center mb-6">
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back! Here's your overview.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/offers/create')}
          sx={{
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          }}
        >
          Create Offer
        </Button>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={AccountBalance}
            label="Balance"
            value={`$${dashboard.balance.toFixed(2)}`}
            color="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={LocalOffer}
            label="My Offers"
            value={dashboard.offers.length}
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={ShoppingCart}
            label="My Orders"
            value={dashboard.orders.length}
            color="info"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={Star}
            label="Reviews"
            value={dashboard.reviews.length}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Active Orders Banner */}
      <ActiveOrdersBanner orders={activeOrders} />

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* My Offers */}
        <Grid size={{ xs: 12, md: 6 }}>
          <DashboardSection
            title="My Offers"
            actionLabel="Create New"
            actionPath="/offers/create"
            isEmpty={dashboard.offers.length === 0}
            emptyMessage="No offers yet. Create your first offer!"
          >
            <DashboardOffersList offers={dashboard.offers} limit={5} />
          </DashboardSection>
        </Grid>

        {/* Recent Orders */}
        <Grid size={{ xs: 12, md: 6 }}>
          <DashboardSection
            title="Recent Orders"
            actionLabel="View All"
            actionPath="/payments"
            isEmpty={dashboard.orders.length === 0}
            emptyMessage="No orders yet"
          >
            <DashboardOrdersList orders={dashboard.orders} limit={5} />
          </DashboardSection>
        </Grid>

        {/* My Reviews */}
        <Grid size={{ xs: 12 }}>
          <DashboardSection
            title="My Reviews"
            icon={<Star color="primary" />}
            isEmpty={dashboard.reviews.length === 0}
            emptyMessage="No reviews yet"
          >
            <DashboardReviewsGrid reviews={dashboard.reviews} limit={6} />
          </DashboardSection>
        </Grid>

        {/* Transactions */}
        <Grid size={{ xs: 12 }}>
          <DashboardSection
            title="Recent Transactions"
            icon={<Payment color="primary" />}
            actionLabel="View All"
            actionPath="/payments"
            isEmpty={!transactionsLoading && transactions.length === 0}
            emptyMessage="No transactions yet"
          >
            {transactionsLoading ? (
              <Box className="flex justify-center py-4">
                <CircularProgress size={24} />
              </Box>
            ) : (
              <TransactionsTable transactions={transactions} limit={10} />
            )}
          </DashboardSection>
        </Grid>
      </Grid>
    </Box>
  );
};
