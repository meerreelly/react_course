import api from "./api";
import type {
  OfferDto,
  CreateOfferDto,
  UpdateOfferDto,
  UpdateOfferStatusDto,
  SlotDto,
  CreateSlotDto,
  ReviewDto,
} from "../types";

export const offerService = {
  getAll: () => api.get<OfferDto[]>("/Offer").then((res) => res.data),

  getById: (id: string) =>
    api.get<OfferDto>(`/Offer/${id}`).then((res) => res.data),

  create: (data: CreateOfferDto) =>
    api.post<OfferDto>("/Offer", data).then((res) => res.data),

  update: (id: string, data: UpdateOfferDto) =>
    api.put<OfferDto>(`/Offer/${id}`, data).then((res) => res.data),

  delete: (id: string) =>
    api.delete<OfferDto>(`/Offer/${id}`).then((res) => res.data),

  updateStatus: (id: string, data: UpdateOfferStatusDto) =>
    api.patch<OfferDto>(`/Offer/${id}/status`, data).then((res) => res.data),

  getSlots: (id: string) =>
    api.get<SlotDto[]>(`/Offer/${id}/slots`).then((res) => res.data),

  createSlot: (id: string, data: CreateSlotDto) =>
    api.post<SlotDto>(`/Offer/${id}/slots`, data).then((res) => res.data),

  getReviews: (id: string) =>
    api.get<ReviewDto[]>(`/Offer/${id}/reviews`).then((res) => res.data),
};
