import { supabase } from '../lib/supabase';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category: {
    id: string;
    name: string;
  };
  brand: {
    id: string;
    name: string;
  };
  features?: string[];
  images: Array<{
    id: string;
    image_url: string;
    alt_text?: string;
    sort_order: number;
  }>;
  variants: Array<{
    id: string;
    size: string;
    color: string;
    stock_quantity: number;
    sku?: string;
  }>;
  rating: number;
  review_count: number;
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductFilter {
  category_ids?: string[];
  brand_ids?: string[];
  price_min?: number;
  price_max?: number;
  sizes?: string[];
  colors?: string[];
  is_featured?: boolean;
  is_new?: boolean;
  search?: string;
}

export const productService = {
  // Get all products with filters
  async getProducts(filters?: ProductFilter): Promise<Product[]> {
    let query = supabase
      .from('products')
      .select(`
        *,
        categories!inner(id, name),
        brands!inner(id, name),
        product_images(id, image_url, alt_text, sort_order),
        product_variants(id, size, color, stock_quantity, sku)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters) {
      if (filters.category_ids?.length) {
        query = query.in('category_id', filters.category_ids);
      }
      if (filters.brand_ids?.length) {
        query = query.in('brand_id', filters.brand_ids);
      }
      if (filters.price_min !== undefined) {
        query = query.gte('price', filters.price_min);
      }
      if (filters.price_max !== undefined) {
        query = query.lte('price', filters.price_max);
      }
      if (filters.is_featured !== undefined) {
        query = query.eq('is_featured', filters.is_featured);
      }
      if (filters.is_new !== undefined) {
        query = query.eq('is_new', filters.is_new);
      }
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }
    }

    const { data, error } = await query;
    if (error) throw error;

    return data.map(product => ({
      ...product,
      category: product.categories,
      brand: product.brands,
      images: product.product_images.sort((a, b) => a.sort_order - b.sort_order),
      variants: product.product_variants,
    }));
  },

  // Get single product by ID
  async getProduct(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories!inner(id, name),
        brands!inner(id, name),
        product_images(id, image_url, alt_text, sort_order),
        product_variants(id, size, color, stock_quantity, sku)
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return {
      ...data,
      category: data.categories,
      brand: data.brands,
      images: data.product_images.sort((a, b) => a.sort_order - b.sort_order),
      variants: data.product_variants,
    };
  },

  // Get featured products
  async getFeaturedProducts(limit = 8): Promise<Product[]> {
    return this.getProducts({ is_featured: true });
  },

  // Get new arrivals
  async getNewArrivals(limit = 8): Promise<Product[]> {
    return this.getProducts({ is_new: true });
  },

  // Get related products
  async getRelatedProducts(productId: string, categoryId: string, limit = 4): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories!inner(id, name),
        brands!inner(id, name),
        product_images(id, image_url, alt_text, sort_order),
        product_variants(id, size, color, stock_quantity, sku)
      `)
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .neq('id', productId)
      .limit(limit);

    if (error) throw error;

    return data.map(product => ({
      ...product,
      category: product.categories,
      brand: product.brands,
      images: product.product_images.sort((a, b) => a.sort_order - b.sort_order),
      variants: product.product_variants,
    }));
  },

  // Search products
  async searchProducts(query: string): Promise<Product[]> {
    return this.getProducts({ search: query });
  },
};