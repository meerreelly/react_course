import api from './api';
import type { UserDto, UpdateUserDto, UserDashboard, DepositDto, PaymentDto, OfferDto, OrderDto, ReviewDto } from '../types';

export const userService = {
  getAll: () => api.get<UserDto[]>('/User').then(res => res.data),

  getMe: () => api.get<UserDto>('/User/me').then(res => res.data),

  getById: (id: string) => api.get<UserDto>(`/User/${id}`).then(res => res.data),

  update: (id: string, data: UpdateUserDto) => api.put<UserDto>(`/User/${id}`, data).then(res => res.data),

  getOffers: (id: string) => api.get<OfferDto[]>(`/User/${id}/offers`).then(res => res.data),

  getOrders: (id: string) => api.get<OrderDto[]>(`/User/${id}/orders`).then(res => res.data),

  getReviewsAbout: (id: string) => api.get<ReviewDto[]>(`/User/${id}/review-about`).then(res => res.data),

  getDashboard: () => api.get<UserDashboard>('/User/dashboard').then(res => res.data),

  deposit: (data: DepositDto) => api.post<UserDto>('/User/deposit', data).then(res => res.data),

  getPayments: () => api.get<PaymentDto[]>('/User/payments').then(res => res.data),
};
