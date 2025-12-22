import api from './api';
import type { ReviewDto, CreateReviewDto } from '../types';

export const reviewService = {
  getAll: () => api.get<ReviewDto[]>('/Review').then(res => res.data),
  
  getById: (id: string) => api.get<ReviewDto>(`/Review/${id}`).then(res => res.data),
  
  create: (data: CreateReviewDto) => api.post<ReviewDto>('/Review', data).then(res => res.data),
  
  delete: (id: string) => api.delete<ReviewDto>(`/Review/${id}`).then(res => res.data),
};
