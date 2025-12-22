import { useClerkAuth } from '../../hooks/useClerkAuth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  useClerkAuth();
  return <>{children}</>;
};
