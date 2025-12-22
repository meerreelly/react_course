import api from './api';
import type { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../types';

export const categoryService = {
  getAll: () => api.get<CategoryDto[]>('/categories').then(res => res.data),
  
  getById: (id: string) => api.get<CategoryDto>(`/categories/${id}`).then(res => res.data),
  
  create: (data: CreateCategoryDto) => api.post<CategoryDto>('/categories', data).then(res => res.data),
  
  update: (id: string, data: UpdateCategoryDto) => api.put<CategoryDto>(`/categories/${id}`, data).then(res => res.data),
  
  delete: (id: string) => api.delete<CategoryDto>(`/categories/${id}`).then(res => res.data),
};
