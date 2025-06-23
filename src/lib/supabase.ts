import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: 'customer' | 'admin';
          avatar_url: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: 'customer' | 'admin';
          avatar_url?: string | null;
          phone?: string | null;
        };
        Update: {
          email?: string;
          full_name?: string;
          role?: 'customer' | 'admin';
          avatar_url?: string | null;
          phone?: string | null;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          image_url: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          name: string;
          description?: string | null;
          image_url?: string | null;
          is_active?: boolean;
        };
        Update: {
          name?: string;
          description?: string | null;
          image_url?: string | null;
          is_active?: boolean;
        };
      };
      brands: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          logo_url: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          name: string;
          description?: string | null;
          logo_url?: string | null;
          is_active?: boolean;
        };
        Update: {
          name?: string;
          description?: string | null;
          logo_url?: string | null;
          is_active?: boolean;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          original_price: number | null;
          category_id: string | null;
          brand_id: string | null;
          features: string[] | null;
          rating: number;
          review_count: number;
          is_active: boolean;
          is_featured: boolean;
          is_new: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          description: string;
          price: number;
          original_price?: number | null;
          category_id?: string | null;
          brand_id?: string | null;
          features?: string[] | null;
          rating?: number;
          review_count?: number;
          is_active?: boolean;
          is_featured?: boolean;
          is_new?: boolean;
        };
        Update: {
          name?: string;
          description?: string;
          price?: number;
          original_price?: number | null;
          category_id?: string | null;
          brand_id?: string | null;
          features?: string[] | null;
          rating?: number;
          review_count?: number;
          is_active?: boolean;
          is_featured?: boolean;
          is_new?: boolean;
        };
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          image_url: string;
          alt_text: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          product_id: string;
          image_url: string;
          alt_text?: string | null;
          sort_order?: number;
        };
        Update: {
          image_url?: string;
          alt_text?: string | null;
          sort_order?: number;
        };
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          size: string;
          color: string;
          stock_quantity: number;
          sku: string | null;
          created_at: string;
        };
        Insert: {
          product_id: string;
          size: string;
          color: string;
          stock_quantity?: number;
          sku?: string | null;
        };
        Update: {
          size?: string;
          color?: string;
          stock_quantity?: number;
          sku?: string | null;
        };
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          variant_id: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          product_id: string;
          variant_id: string;
          quantity: number;
        };
        Update: {
          quantity?: number;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string;
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
          payment_method: string | null;
          subtotal: number;
          tax_amount: number;
          shipping_amount: number;
          total_amount: number;
          shipping_full_name: string;
          shipping_address_line1: string;
          shipping_address_line2: string | null;
          shipping_city: string;
          shipping_state: string;
          shipping_postal_code: string;
          shipping_country: string;
          shipping_phone: string | null;
          billing_full_name: string | null;
          billing_address_line1: string | null;
          billing_address_line2: string | null;
          billing_city: string | null;
          billing_state: string | null;
          billing_postal_code: string | null;
          billing_country: string | null;
          billing_phone: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
          payment_method?: string | null;
          subtotal: number;
          tax_amount?: number;
          shipping_amount?: number;
          total_amount: number;
          shipping_full_name: string;
          shipping_address_line1: string;
          shipping_address_line2?: string | null;
          shipping_city: string;
          shipping_state: string;
          shipping_postal_code: string;
          shipping_country: string;
          shipping_phone?: string | null;
          billing_full_name?: string | null;
          billing_address_line1?: string | null;
          billing_address_line2?: string | null;
          billing_city?: string | null;
          billing_state?: string | null;
          billing_postal_code?: string | null;
          billing_country?: string | null;
          billing_phone?: string | null;
          notes?: string | null;
        };
        Update: {
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
          payment_method?: string | null;
          notes?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          variant_id: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          product_name: string;
          product_image: string | null;
          size: string;
          color: string;
          created_at: string;
        };
        Insert: {
          order_id: string;
          product_id: string;
          variant_id: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          product_name: string;
          product_image?: string | null;
          size: string;
          color: string;
        };
        Update: {
          quantity?: number;
          unit_price?: number;
          total_price?: number;
        };
      };
      admin_settings: {
        Row: {
          id: string;
          key: string;
          value: any;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: any;
          description?: string | null;
        };
        Update: {
          value?: any;
          description?: string | null;
        };
      };
    };
  };
}