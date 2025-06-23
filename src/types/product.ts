export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features?: string[];
  images: string[];
  category: string;
  brand: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface ProductFilter {
  category?: string[];
  brand?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  sizes?: string[];
  colors?: string[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
}