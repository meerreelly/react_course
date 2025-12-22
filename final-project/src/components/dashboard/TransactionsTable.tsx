import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  useTheme,
} from '@mui/material';
import type { PaymentDto } from '../../types';

interface TransactionsTableProps {
  transactions: PaymentDto[];
  limit?: number;
}

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Failed':
      return 'error';
    default:
      return 'default';
  }
};

const getPaymentTypeColor = (type: string) => {
  switch (type) {
    case 'Deposit':
      return 'success';
    case 'Withdrawal':
      return 'error';
    case 'Payment':
      return 'info';
    case 'Refund':
      return 'warning';
    default:
      return 'default';
  }
};

const TransactionsTable = ({ transactions, limit }: TransactionsTableProps) => {
  const theme = useTheme();
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions;

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Type</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayTransactions.map((transaction) => {
            const isPositive = transaction.paymentType === 'Deposit' || transaction.paymentType === 'Refund';
            return (
              <TableRow
                key={transaction.id}
                hover
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell>
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={transaction.paymentType}
                    size="small"
                    color={getPaymentTypeColor(transaction.paymentType) as any}
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: isPositive ? theme.palette.success.main : theme.palette.error.main,
                    }}
                  >
                    {isPositive ? '+' : '-'}
                    {transaction.amount.toFixed(2)} {transaction.currency}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={transaction.paymentStatus}
                    size="small"
                    color={getPaymentStatusColor(transaction.paymentStatus) as any}
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
