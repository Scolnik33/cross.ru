export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface Address {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface PaymentMethod {
  cardNumber: string;
  nameOnCard: string;
  expiryDate: string;
  cvv: string;
}