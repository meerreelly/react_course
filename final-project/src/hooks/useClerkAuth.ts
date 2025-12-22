import { useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useAuthStore } from '../state/authStore';
import { userService } from '../services/userService';

export const useClerkAuth = () => {
  const { isSignedIn, getToken, signOut } = useAuth();
  const { setToken, setUser, clearAuth, isAuthenticated, user } = useAuthStore();

  const fetchToken = useCallback(async () => {
    if (isSignedIn) {
      try {
        const token = await getToken();
        setToken(token);
        const userData = await userService.getMe();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch token or user:', error);
        clearAuth();
      }
    } else {
      clearAuth();
    }
  }, [isSignedIn, getToken, setToken, setUser, clearAuth]);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    clearAuth();
  }, [signOut, clearAuth]);

  return {
    isAuthenticated,
    user,
    signOut: handleSignOut,
    refreshToken: fetchToken,
  };
};
