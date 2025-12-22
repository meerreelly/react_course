import { Button, Tooltip } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import { SignInButton } from '@clerk/clerk-react';
import { useAuthStore } from '../../state/authStore';

interface AuthButtonProps extends ButtonProps {
  tooltipText?: string;
}

const AuthButton = ({ 
  children, 
  tooltipText = 'You must sign in to order',
  ...props 
}: AuthButtonProps) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <Tooltip title={tooltipText} arrow>
        <span>
          <SignInButton mode="modal">
            <Button {...props} disabled>
              {children}
            </Button>
          </SignInButton>
        </span>
      </Tooltip>
    );
  }

  return <Button {...props}>{children}</Button>;
};

export default AuthButton;
