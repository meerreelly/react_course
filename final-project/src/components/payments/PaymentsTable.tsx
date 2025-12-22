import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from '@mui/material';
import type { PaymentDto } from '../../types';
import { PaymentTypeBadge, PaymentStatusBadge, PaymentAmount } from './PaymentRow';

interface PaymentsTableProps {
  payments: PaymentDto[];
}

const PaymentsTable = ({ payments }: PaymentsTableProps) => {
  const theme = useTheme();

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 20px rgba(0,0,0,0.3)'
          : '0 4px 20px rgba(0,0,0,0.08)',
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
            }}
          >
            <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Currency</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment) => (
            <TableRow
              key={payment.id}
              sx={{
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.03)'
                    : 'rgba(0,0,0,0.02)',
                },
              }}
            >
              <TableCell>
                {new Date(payment.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <PaymentTypeBadge type={payment.paymentType} />
              </TableCell>
              <TableCell align="right">
                <PaymentAmount amount={payment.amount} paymentType={payment.paymentType} />
              </TableCell>
              <TableCell>{payment.currency}</TableCell>
              <TableCell>
                <PaymentStatusBadge status={payment.paymentStatus} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentsTable;
