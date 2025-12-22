import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';
import { SignIn, SignUp } from '@clerk/clerk-react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'sign-in' | 'sign-up';
  onSwitchMode: () => void;
}

const AuthModal = ({ open, onClose, mode, onSwitchMode }: AuthModalProps) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: theme.palette.background.paper,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight={600}>
          {mode === 'sign-in' ? 'Sign In' : 'Create Account'}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: theme.palette.grey[500] }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {mode === 'sign-in' ? (
            <SignIn
              routing="virtual"
              signUpUrl="#"
              afterSignInUrl="/"
              appearance={{
                elements: {
                  rootBox: { width: '100%' },
                  card: { boxShadow: 'none', border: 'none' },
                },
              }}
            />
          ) : (
            <SignUp
              routing="virtual"
              signInUrl="#"
              afterSignUpUrl="/"
              appearance={{
                elements: {
                  rootBox: { width: '100%' },
                  card: { boxShadow: 'none', border: 'none' },
                },
              }}
            />
          )}
        </Box>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {mode === 'sign-in' ? "Don't have an account? " : 'Already have an account? '}
            <Typography
              component="span"
              variant="body2"
              color="primary"
              sx={{ cursor: 'pointer', fontWeight: 600 }}
              onClick={onSwitchMode}
            >
              {mode === 'sign-in' ? 'Sign Up' : 'Sign In'}
            </Typography>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
