import api from "./api";
import type { OrderDto, CreateOrderDto, UpdateOrderDto } from "../types";

export const orderService = {
  getAll: () => api.get<OrderDto[]>("/Order").then((res) => res.data),

  getById: (id: string) =>
    api.get<OrderDto>(`/Order/${id}`).then((res) => res.data),

  create: (data: CreateOrderDto) =>
    api.post<OrderDto>("/Order", data).then((res) => res.data),

  update: (id: string, data: UpdateOrderDto) =>
    api.put<OrderDto>(`/Order/${id}`, data).then((res) => res.data),

  complete: (id: string) =>
    api.patch<OrderDto>(`/Order/${id}/complete`).then((res) => res.data),

  cancel: (id: string) =>
    api.patch<OrderDto>(`/Order/${id}/cancel`).then((res) => res.data),

  start: (id: string) =>
    api.patch<OrderDto>(`/Order/${id}/start`).then((res) => res.data),
};
