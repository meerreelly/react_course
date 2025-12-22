import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { AccountBalanceWallet, ReceiptLong } from '@mui/icons-material';
import { userService } from '../../services/userService';
import { Loading, ErrorMessage, PageHeader, InfoCard, AlertMessage } from '../common';
import { PaymentsTable } from '../payments';
import type { PaymentDto } from '../../types';

export const PaymentsContainer = () => {
  const [payments, setPayments] = useState<PaymentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await userService.getPayments();
        setPayments(data);
      } catch {
        setError('Failed to load payments');
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) return <Loading />;
  if (error && payments.length === 0) return <ErrorMessage message={error} />;

  return (
    <Box>
      <AlertMessage
        open={!!error}
        message={error || ''}
        severity="error"
        onClose={() => setError(null)}
      />

      <PageHeader
        title="Payment History"
        subtitle="View all your transactions and payment activity"
        icon={<AccountBalanceWallet sx={{ fontSize: 32 }} />}
      />

      {payments.length === 0 ? (
        <InfoCard title="No Payments" icon={<ReceiptLong />}>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No payments yet
            </Typography>
            <Typography color="text.secondary">
              Your payment history will appear here once you make transactions
            </Typography>
          </Box>
        </InfoCard>
      ) : (
        <PaymentsTable payments={payments} />
      )}
    </Box>
  );
};
