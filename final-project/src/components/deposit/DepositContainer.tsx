import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  InputAdornment,
  Alert,
  Chip,
  useTheme,
} from '@mui/material';
import { CreditCard, Lock, CalendarMonth, Wallet, CheckCircle } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userService } from '../../services/userService';
import { useAuthStore } from '../../state/authStore';

const QUICK_AMOUNTS = [10, 25, 50, 100, 250, 500];

const validationSchema = Yup.object({
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be greater than 0'),
  cardNumber: Yup.string()
    .required('Card number is required')
    .length(18, 'Card number must be exactly 18 characters'),
  cardExpiry: Yup.date()
    .required('Expiry date is required')
    .min(new Date(), 'Card expiry must be in the future'),
  cardSecret: Yup.string()
    .required('CVV is required')
    .length(3, 'CVV must be exactly 3 characters'),
});

export const DepositContainer = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, setUser } = useAuthStore();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      amount: 0,
      cardNumber: '',
      cardExpiry: '',
      cardSecret: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      setError(null);
      try {
        const updatedUser = await userService.deposit({
          amount: values.amount,
          cardNumber: values.cardNumber,
          cardExpiry: values.cardExpiry,
          cardSecret: values.cardSecret,
        });
        setUser(updatedUser);
        setSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } catch {
        setError('Failed to process deposit. Please check your card details.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box
          sx={{
            display: 'inline-flex',
            p: 2,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, ${theme.palette.secondary.main}20 100%)`,
            mb: 2,
          }}
        >
          <Wallet sx={{ fontSize: 40, color: theme.palette.primary.main }} />
        </Box>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Top Up Balance
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Current balance:{' '}
          <Typography component="span" color="primary" fontWeight={600}>
            ${user?.balance?.toFixed(2) || '0.00'}
          </Typography>
        </Typography>
      </Box>

      {success && (
        <Alert
          severity="success"
          icon={<CheckCircle />}
          sx={{ mb: 3, borderRadius: 2 }}
        >
          Deposit successful! Redirecting to dashboard...
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent sx={{ p: 3 }}>
          <form onSubmit={formik.handleSubmit}>
            {/* Quick Amount Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
                Quick Select
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {QUICK_AMOUNTS.map((amount) => (
                  <Chip
                    key={amount}
                    label={`$${amount}`}
                    onClick={() => formik.setFieldValue('amount', amount)}
                    variant={formik.values.amount === amount ? 'filled' : 'outlined'}
                    color={formik.values.amount === amount ? 'primary' : 'default'}
                    sx={{
                      fontWeight: 600,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: formik.values.amount === amount
                          ? theme.palette.primary.main
                          : theme.palette.mode === 'light'
                            ? 'rgba(59, 130, 246, 0.1)'
                            : 'rgba(96, 165, 250, 0.1)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                fullWidth
                type="number"
                label="Amount"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />

              <TextField
                fullWidth
                label="Card Number"
                name="cardNumber"
                value={formik.values.cardNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                helperText={
                  (formik.touched.cardNumber && formik.errors.cardNumber) ||
                  'Must be exactly 18 characters'
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCard color="action" />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ maxLength: 18 }}
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Card Expiry"
                  name="cardExpiry"
                  value={formik.values.cardExpiry}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cardExpiry && Boolean(formik.errors.cardExpiry)}
                  helperText={formik.touched.cardExpiry && formik.errors.cardExpiry}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonth color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="CVV"
                  name="cardSecret"
                  value={formik.values.cardSecret}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cardSecret && Boolean(formik.errors.cardSecret)}
                  helperText={
                    (formik.touched.cardSecret && formik.errors.cardSecret) ||
                    '3 digits'
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ maxLength: 3 }}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitting || success}
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                    },
                  }}
                >
                  {submitting ? 'Processing...' : `Deposit $${formik.values.amount || 0}`}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/dashboard')}
                  size="large"
                  sx={{ px: 4 }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          backgroundColor: theme.palette.mode === 'light' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(96, 165, 250, 0.05)',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Lock sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            Your payment information is secure and encrypted
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
