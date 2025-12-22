import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/userService';
import { useUserStore } from '../state/userStore';

export const useDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { dashboard, setDashboard, setActiveOrders } = useUserStore();

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getDashboard();
      setDashboard(data);
      const activeOrders = data.orders.filter(
        (order) => order.status === 'Pending' || order.status === 'InProgress'
      );
      setActiveOrders(activeOrders);
    } catch (err) {
      setError('Failed to fetch dashboard');
    } finally {
      setLoading(false);
    }
  }, [setDashboard, setActiveOrders]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    loading,
    error,
    refetch: fetchDashboard,
  };
};
