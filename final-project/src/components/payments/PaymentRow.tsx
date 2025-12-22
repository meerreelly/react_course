import { Box, Chip, Typography, useTheme } from '@mui/material';
import { TrendingUp, TrendingDown, AccountBalance } from '@mui/icons-material';
import type { PaymentDto } from '../../types';

interface PaymentTypeBadgeProps {
  type: string;
}

export const PaymentTypeBadge = ({ type }: PaymentTypeBadgeProps) => {
  const getConfig = () => {
    switch (type) {
      case 'Deposit':
        return { color: 'primary' as const, icon: <TrendingUp fontSize="small" /> };
      case 'OrderPayment':
        return { color: 'secondary' as const, icon: <TrendingDown fontSize="small" /> };
      case 'Refund':
        return { color: 'info' as const, icon: <AccountBalance fontSize="small" /> };
      default:
        return { color: 'default' as const, icon: null };
    }
  };

  const config = getConfig();

  return (
    <Chip
      label={type}
      size="small"
      color={config.color}
      icon={config.icon || undefined}
    />
  );
};

interface PaymentStatusBadgeProps {
  status: string;
}

export const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
  const getColor = () => {
    switch (status) {
      case 'Completed':
        return 'success' as const;
      case 'Pending':
        return 'warning' as const;
      case 'Failed':
        return 'error' as const;
      default:
        return 'default' as const;
    }
  };

  return <Chip label={status} size="small" color={getColor()} />;
};

interface PaymentAmountProps {
  amount: number;
  paymentType: string;
}

export const PaymentAmount = ({ amount, paymentType }: PaymentAmountProps) => {
  const theme = useTheme();

  const getColor = () => {
    if (paymentType === 'Refund' || paymentType === 'Deposit') {
      return theme.palette.success.main;
    }
    if (paymentType === 'OrderPayment') {
      return theme.palette.error.main;
    }
    return theme.palette.text.primary;
  };

  const prefix = paymentType === 'OrderPayment' ? '-' : '+';

  return (
    <Typography
      fontWeight={600}
      sx={{ color: getColor() }}
    >
      {prefix}${amount.toFixed(2)}
    </Typography>
  );
};

interface PaymentRowProps {
  payment: PaymentDto;
}

const PaymentRow = ({ payment }: PaymentRowProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderRadius: 2,
        transition: 'all 0.2s',
        '&:hover': {
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {new Date(payment.createdAt).toLocaleDateString()}
          </Typography>
          <PaymentTypeBadge type={payment.paymentType} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <PaymentAmount amount={payment.amount} paymentType={payment.paymentType} />
        <Typography variant="body2" color="text.secondary" sx={{ minWidth: 50 }}>
          {payment.currency}
        </Typography>
        <PaymentStatusBadge status={payment.paymentStatus} />
      </Box>
    </Box>
  );
};

export default PaymentRow;
