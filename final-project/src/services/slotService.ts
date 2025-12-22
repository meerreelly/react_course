import api from './api';
import type { SlotDto, UpdateSlotDto } from '../types';

export const slotService = {
  getById: (id: string) => api.get<SlotDto>(`/Slot/${id}`).then(res => res.data),
  
  update: (id: string, data: UpdateSlotDto) => api.put<SlotDto>(`/Slot/${id}`, data).then(res => res.data),
  
  delete: (id: string) => api.delete<SlotDto>(`/Slot/${id}`).then(res => res.data),
};
