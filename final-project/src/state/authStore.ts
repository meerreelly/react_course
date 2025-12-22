import { create } from 'zustand';
import type { UserDto } from '../types';

interface AuthState {
  token: string | null;
  user: UserDto | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: UserDto | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  updateBalance: (balance: number) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  setToken: (token) => set({ token, isAuthenticated: !!token }),
  setUser: (user) => set({ user }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  updateBalance: (balance) => set((state) => ({
    user: state.user ? { ...state.user, balance } : null
  })),
  clearAuth: () => set({ token: null, user: null, isAuthenticated: false, isAdmin: false }),
}));
