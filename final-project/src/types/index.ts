export interface UserDto {
  id: string;
  username: string;
  email: string;
  balance: number;
  clerkId: string;
  createdAt: string;
  modifiedAt: string | null;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
}

export interface UserDashboard {
  id: string;
  username: string;
  email: string;
  balance: number;
  createdAt: string;
  modifiedAt: string | null;
  offers: OfferDto[];
  orders: OrderDto[];
  reviews: ReviewDto[];
}

export interface DepositDto {
  amount: number;
  cardNumber: string;
  cardExpiry: string;
  cardSecret: string;
}

export interface SlotDto {
  id: string;
  offerId: string;
  createdAt: string;
  modifiedAt: string | null;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface CreateSlotDto {
  startTime: string;
  endTime: string;
}

export interface UpdateSlotDto {
  startTime: string;
  endTime: string;
}

export interface ReviewDto {
  id: string;
  reviewerId: string;
  orderId: string | null;
  comment: string;
  rating: number;
  createdOn: string;
  modifiedOn: string | null;
}

export interface CreateReviewDto {
  orderId: string;
  rating: number;
  comment: string;
}

export type PaymentType = 'Deposit' | 'OrderPayment' | 'Refund';
export type PaymentStatus = 'Pending' | 'Completed' | 'Failed';

export interface PaymentDto {
  id: string;
  amount: number;
  currency: string;
  paymentType: PaymentType;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export type OrderStatus = 'Pending' | 'InProgress' | 'Completed' | 'Cancelled';

export interface OrderDto {
  id: string;
  offerId: string;
  buyerId: string;
  slotId: string;
  status: OrderStatus;
  notes: string | null;
  createdAt: string;
  modifiedAt: string | null;
  completedDate: string | null;
}

export interface CreateOrderDto {
  offerId: string;
  slotId: string;
  notes?: string;
}

export interface UpdateOrderDto {
  notes?: string;
}

export interface CategoryDto {
  id: string;
  name: string;
}

export interface CreateCategoryDto {
  name: string;
}

export interface UpdateCategoryDto {
  name: string;
}

export type OfferStatus = 'Active' | 'Inactive' | 'Suspended';

export interface OfferDto {
  id: string;
  providerId: string;
  title: string;
  description: string;
  pricePerHour: number;
  status: string;
  createdOn: string;
  modifiedOn: string | null;
  categoryIds: string[];
}

export interface CreateOfferDto {
  title: string;
  description: string;
  pricePerHour: number;
  categoryIds: string[];
}

export interface UpdateOfferDto {
  title: string;
  description: string;
  pricePerHour: number;
  categoryIds: string[];
}

export interface UpdateOfferStatusDto {
  status: OfferStatus;
}
