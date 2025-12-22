import { create } from 'zustand';
import type { UserDashboard, OrderDto } from '../types';

interface UserState {
  dashboard: UserDashboard | null;
  activeOrders: OrderDto[];
  setDashboard: (dashboard: UserDashboard | null) => void;
  setActiveOrders: (orders: OrderDto[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  dashboard: null,
  activeOrders: [],
  setDashboard: (dashboard) => set({ dashboard }),
  setActiveOrders: (orders) => set({ activeOrders: orders }),
}));
