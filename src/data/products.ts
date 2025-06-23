import { Product } from '../types/product';

export const PREDEFINED_CATEGORIES: string[] = [
  'Беговые',
  'Повседневные',
  'Баскетбольные',
  'Официальные',
  'Спортивные',
  'Сандали'
];

export const PREDEFINED_BRANDS: string[] = [
  'Nike',
  'Adidas',
  'New Balance',
  'Asics',
  'Puma',
  'Kappa',
];
export const products: Product[] = [
  {
    id: '1',
    name: 'Мужские сандали Nike Clam Mule',
    price: 13999,
    originalPrice: 14999,
    description: 'The Eclipse Runner features our breakthrough cushioning technology for unparalleled comfort during your runs. The lightweight mesh upper provides breathability while the responsive midsole returns energy with every step.',
    features: [
      'Прочная резиновая подошва',
      'Удобство'
    ],
    images: [
      'https://cdn1.ozone.ru/s3/multimedia-1-6/c600/7070253882.jpg'
    ],
    category: 'Сандали',
    brand: 'Nike',
    colors: ['Черный'],
    sizes: ['35','36','37','38', '39', '40', '41', '42', '43', '44'],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    isNew: true,
    isFeatured: true,
    createdAt: '2023-01-15T12:00:00Z'
  },
  {
    id: '2',
    name: 'Женские сандали Nike Clam Mule',
    price: 13999,
    description: 'Street-ready style meets all-day comfort in the Urban Drift. These versatile sneakers feature premium materials and a sleek silhouette that pairs perfectly with any casual outfit.',
    images: [
      'https://static.street-beat.ru/upload/resize_cache/iblock/d37/666_666_1/l69xo2mp033gi9lttgrhe9bym63jmecs.JPG'
    ],
    category: 'Сандали',
    brand: 'Nike',
    colors: ['Розовый'],
    sizes: ['35','36','37','38', '39', '40', '41', '42', '43', '44'],
    rating: 4.5,
    reviewCount: 98,
    inStock: true,
    isFeatured: true,
    createdAt: '2023-02-10T14:30:00Z'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, limit);
};

export const getFeaturedProducts = (limit: number = 4): Product[] => {
  return products
    .filter(p => p.isFeatured)
    .slice(0, limit);
};

export const getNewArrivals = (limit: number = 4): Product[] => {
  return products
    .filter(p => p.isNew)
    .slice(0, limit);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getProductsByBrand = (brand: string): Product[] => {
  return products.filter(p => p.brand === brand);
};

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return products.filter(
    p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.description.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
  );
};

export const getAllCategories = (): string[] => {
  return Array.from(
      new Set([
        ...PREDEFINED_CATEGORIES,
        ...products.map(p => p.category)
      ])
  );
};

export const getAllBrands = (): string[] => {
  return Array.from(
      new Set([
        ...PREDEFINED_BRANDS,
        ...products.map(p => p.brand)
      ])
  );
};