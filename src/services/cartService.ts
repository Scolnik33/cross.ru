import { supabase } from '../lib/supabase';

export interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    images: Array<{ image_url: string; alt_text?: string }>;
  };
  variant: {
    id: string;
    size: string;
    color: string;
    stock_quantity: number;
  };
  quantity: number;
  created_at: string;
  updated_at: string;
}

export const cartService = {
  // Get user's cart items
  async getCartItems(userId: string): Promise<CartItem[]> {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products!inner(id, name, price),
        product_variants!inner(id, size, color, stock_quantity),
        product_images!inner(image_url, alt_text)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(item => ({
      id: item.id,
      product: {
        id: item.products.id,
        name: item.products.name,
        price: item.products.price,
        images: item.product_images,
      },
      variant: {
        id: item.product_variants.id,
        size: item.product_variants.size,
        color: item.product_variants.color,
        stock_quantity: item.product_variants.stock_quantity,
      },
      quantity: item.quantity,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  },

  // Add item to cart
  async addToCart(userId: string, productId: string, variantId: string, quantity: number): Promise<CartItem> {
    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('variant_id', variantId)
      .single();

    if (existingItem) {
      // Update quantity
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)
        .select(`
          *,
          products!inner(id, name, price),
          product_variants!inner(id, size, color, stock_quantity),
          product_images!inner(image_url, alt_text)
        `)
        .single();

      if (error) throw error;

      return {
        id: data.id,
        product: {
          id: data.products.id,
          name: data.products.name,
          price: data.products.price,
          images: data.product_images,
        },
        variant: {
          id: data.product_variants.id,
          size: data.product_variants.size,
          color: data.product_variants.color,
          stock_quantity: data.product_variants.stock_quantity,
        },
        quantity: data.quantity,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } else {
      // Create new cart item
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          user_id: userId,
          product_id: productId,
          variant_id: variantId,
          quantity,
        })
        .select(`
          *,
          products!inner(id, name, price),
          product_variants!inner(id, size, color, stock_quantity),
          product_images!inner(image_url, alt_text)
        `)
        .single();

      if (error) throw error;

      return {
        id: data.id,
        product: {
          id: data.products.id,
          name: data.products.name,
          price: data.products.price,
          images: data.product_images,
        },
        variant: {
          id: data.product_variants.id,
          size: data.product_variants.size,
          color: data.product_variants.color,
          stock_quantity: data.product_variants.stock_quantity,
        },
        quantity: data.quantity,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    }
  },

  // Update cart item quantity
  async updateCartItem(cartItemId: string, quantity: number): Promise<void> {
    if (quantity <= 0) {
      await this.removeFromCart(cartItemId);
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId);

    if (error) throw error;
  },

  // Remove item from cart
  async removeFromCart(cartItemId: string): Promise<void> {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId);

    if (error) throw error;
  },

  // Clear user's cart
  async clearCart(userId: string): Promise<void> {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
  },

  // Get cart item count
  async getCartItemCount(userId: string): Promise<number> {
    const { data, error } = await supabase
      .from('cart_items')
      .select('quantity')
      .eq('user_id', userId);

    if (error) throw error;

    return data.reduce((total, item) => total + item.quantity, 0);
  },
};