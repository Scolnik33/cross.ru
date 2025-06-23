import { Order } from '../types/product';

// Storage key for orders
const ORDERS_STORAGE_KEY = 'luxestep_orders';

// Load orders from localStorage
const loadOrdersFromStorage = (): Order[] => {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading orders from storage:', error);
    return [];
  }
};

// Save orders to localStorage
const saveOrdersToStorage = (orders: Order[]): void => {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving orders to storage:', error);
  }
};

// Initialize orders from localStorage or use default mock data
let orders: Order[] = loadOrdersFromStorage();

// If no orders in storage, initialize with mock data
if (orders.length === 0) {
  orders = [
    {
      id: 'ORD-001',
      userId: '2',
      items: [
        {
          product: {
            id: '1',
            name: 'Eclipse Runner',
            price: 129.99,
            description: 'Running shoes with advanced cushioning',
            images: ['https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'],
            category: 'Running',
            brand: 'StrideTech',
            colors: ['Black', 'Blue', 'Red'],
            sizes: ['7', '8', '9', '10', '11', '12'],
            rating: 4.8,
            reviewCount: 124,
            inStock: true,
            createdAt: '2023-01-15T12:00:00Z'
          },
          quantity: 1,
          size: '10',
          color: 'Black'
        },
        {
          product: {
            id: '3',
            name: 'Summit Hiker',
            price: 159.99,
            description: 'Rugged hiking boots for all terrains',
            images: ['https://images.pexels.com/photos/1904769/pexels-photo-1904769.jpeg'],
            category: 'Hiking',
            brand: 'TrailMaster',
            colors: ['Brown', 'Black', 'Green'],
            sizes: ['8', '9', '10', '11', '12', '13'],
            rating: 4.9,
            reviewCount: 76,
            inStock: true,
            createdAt: '2023-03-05T09:15:00Z'
          },
          quantity: 1,
          size: '9',
          color: 'Brown'
        }
      ],
      totalAmount: 289.98,
      status: 'delivered',
      shippingAddress: {
        fullName: 'Иван Иванов',
        street: 'Русская, 1',
        city: 'Тюмень',
        state: 'MA',
        postalCode: '02108',
        country: 'Россия'
      },
      paymentMethod: 'Credit Card',
      paymentStatus: 'paid',
      createdAt: '2023-04-15T10:30:00Z',
      updatedAt: '2023-04-18T14:20:00Z'
    },
    {
      id: 'ORD-002',
      userId: '2',
      items: [
        {
          product: {
            id: '2',
            name: 'Urban Drift',
            price: 89.99,
            description: 'Casual sneakers for everyday wear',
            images: ['https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg'],
            category: 'Casual',
            brand: 'UrbanEdge',
            colors: ['White', 'Black', 'Gray'],
            sizes: ['6', '7', '8', '9', '10', '11', '12'],
            rating: 4.5,
            reviewCount: 98,
            inStock: true,
            createdAt: '2023-02-10T14:30:00Z'
          },
          quantity: 1,
          size: '8',
          color: 'White'
        }
      ],
      totalAmount: 89.99,
      status: 'shipped',
      shippingAddress: {
        fullName: 'Анастасия Ивановна',
        street: 'Москвская, 1',
        city: 'Москва',
        state: 'MA',
        postalCode: '02108',
        country: 'Россия'
      },
      paymentMethod: 'PayPal',
      paymentStatus: 'paid',
      createdAt: '2023-05-02T16:45:00Z',
      updatedAt: '2023-05-03T09:10:00Z'
    }
  ];
  saveOrdersToStorage(orders);
}

export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};

export const getOrdersByUser = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId);
};

export const getAllOrders = (): Order[] => {
  return [...orders];
};

// Function to create a new order
export const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order => {
  // Generate unique order ID
  const existingIds = orders.map(order => {
    const match = order.id.match(/ORD-(\d+)/);
    return match ? parseInt(match[1]) : 0;
  });
  const nextId = Math.max(...existingIds, 0) + 1;
  
  const newOrder: Order = {
    ...orderData,
    id: `ORD-${String(nextId).padStart(3, '0')}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  orders.push(newOrder);
  saveOrdersToStorage(orders);
  return newOrder;
};

// Function to update order status
export const updateOrderStatus = (orderId: string, status: Order['status']): Order | null => {
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex === -1) return null;
  
  orders[orderIndex] = {
    ...orders[orderIndex],
    status,
    updatedAt: new Date().toISOString()
  };
  
  saveOrdersToStorage(orders);
  return orders[orderIndex];
};

// Function to clear all orders (for testing purposes)
export const clearAllOrders = (): void => {
  orders = [];
  saveOrdersToStorage(orders);
};

// Function to get orders count for a user
export const getUserOrdersCount = (userId: string): number => {
  return orders.filter(order => order.userId === userId).length;
};