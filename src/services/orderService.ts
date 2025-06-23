import { supabase } from '../lib/supabase';

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method?: string;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  total_amount: number;
  shipping_address: {
    full_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone?: string;
  };
  billing_address?: {
    full_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone?: string;
  };
  items: Array<{
    id: string;
    product_id: string;
    product_name: string;
    product_image?: string;
    size: string;
    color: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderData {
  user_id: string;
  payment_method: string;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  total_amount: number;
  shipping_address: {
    full_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone?: string;
  };
  billing_address?: {
    full_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone?: string;
  };
  items: Array<{
    product_id: string;
    variant_id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    product_name: string;
    product_image?: string;
    size: string;
    color: string;
  }>;
  notes?: string;
}

export const orderService = {
  // Create new order
  async createOrder(orderData: CreateOrderData): Promise<Order> {
    // Create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: orderData.user_id,
        status: 'processing',
        payment_status: 'paid',
        payment_method: orderData.payment_method,
        subtotal: orderData.subtotal,
        tax_amount: orderData.tax_amount,
        shipping_amount: orderData.shipping_amount,
        total_amount: orderData.total_amount,
        shipping_full_name: orderData.shipping_address.full_name,
        shipping_address_line1: orderData.shipping_address.address_line1,
        shipping_address_line2: orderData.shipping_address.address_line2,
        shipping_city: orderData.shipping_address.city,
        shipping_state: orderData.shipping_address.state,
        shipping_postal_code: orderData.shipping_address.postal_code,
        shipping_country: orderData.shipping_address.country,
        shipping_phone: orderData.shipping_address.phone,
        billing_full_name: orderData.billing_address?.full_name,
        billing_address_line1: orderData.billing_address?.address_line1,
        billing_address_line2: orderData.billing_address?.address_line2,
        billing_city: orderData.billing_address?.city,
        billing_state: orderData.billing_address?.state,
        billing_postal_code: orderData.billing_address?.postal_code,
        billing_country: orderData.billing_address?.country,
        billing_phone: orderData.billing_address?.phone,
        notes: orderData.notes,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      variant_id: item.variant_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.total_price,
      product_name: item.product_name,
      product_image: item.product_image,
      size: item.size,
      color: item.color,
    }));

    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select();

    if (itemsError) throw itemsError;

    return {
      ...order,
      shipping_address: {
        full_name: order.shipping_full_name,
        address_line1: order.shipping_address_line1,
        address_line2: order.shipping_address_line2,
        city: order.shipping_city,
        state: order.shipping_state,
        postal_code: order.shipping_postal_code,
        country: order.shipping_country,
        phone: order.shipping_phone,
      },
      billing_address: order.billing_full_name ? {
        full_name: order.billing_full_name,
        address_line1: order.billing_address_line1!,
        address_line2: order.billing_address_line2,
        city: order.billing_city!,
        state: order.billing_state!,
        postal_code: order.billing_postal_code!,
        country: order.billing_country!,
        phone: order.billing_phone,
      } : undefined,
      items: items.map(item => ({
        id: item.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_image: item.product_image,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
      })),
    };
  },

  // Get user's orders
  async getUserOrders(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(order => ({
      ...order,
      shipping_address: {
        full_name: order.shipping_full_name,
        address_line1: order.shipping_address_line1,
        address_line2: order.shipping_address_line2,
        city: order.shipping_city,
        state: order.shipping_state,
        postal_code: order.shipping_postal_code,
        country: order.shipping_country,
        phone: order.shipping_phone,
      },
      billing_address: order.billing_full_name ? {
        full_name: order.billing_full_name,
        address_line1: order.billing_address_line1!,
        address_line2: order.billing_address_line2,
        city: order.billing_city!,
        state: order.billing_state!,
        postal_code: order.billing_postal_code!,
        country: order.billing_country!,
        phone: order.billing_phone,
      } : undefined,
      items: order.order_items.map(item => ({
        id: item.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_image: item.product_image,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
      })),
    }));
  },

  // Get single order
  async getOrder(orderId: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return {
      ...data,
      shipping_address: {
        full_name: data.shipping_full_name,
        address_line1: data.shipping_address_line1,
        address_line2: data.shipping_address_line2,
        city: data.shipping_city,
        state: data.shipping_state,
        postal_code: data.shipping_postal_code,
        country: data.shipping_country,
        phone: data.shipping_phone,
      },
      billing_address: data.billing_full_name ? {
        full_name: data.billing_full_name,
        address_line1: data.billing_address_line1!,
        address_line2: data.billing_address_line2,
        city: data.billing_city!,
        state: data.billing_state!,
        postal_code: data.billing_postal_code!,
        country: data.billing_country!,
        phone: data.billing_phone,
      } : undefined,
      items: data.order_items.map(item => ({
        id: item.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_image: item.product_image,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
      })),
    };
  },

  // Get all orders (admin)
  async getAllOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*),
        profiles!inner(full_name, email)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(order => ({
      ...order,
      shipping_address: {
        full_name: order.shipping_full_name,
        address_line1: order.shipping_address_line1,
        address_line2: order.shipping_address_line2,
        city: order.shipping_city,
        state: order.shipping_state,
        postal_code: order.shipping_postal_code,
        country: order.shipping_country,
        phone: order.shipping_phone,
      },
      billing_address: order.billing_full_name ? {
        full_name: order.billing_full_name,
        address_line1: order.billing_address_line1!,
        address_line2: order.billing_address_line2,
        city: order.billing_city!,
        state: order.billing_state!,
        postal_code: order.billing_postal_code!,
        country: order.billing_country!,
        phone: order.billing_phone,
      } : undefined,
      items: order.order_items.map(item => ({
        id: item.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_image: item.product_image,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
      })),
    }));
  },

  // Update order status (admin)
  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;
  },

  // Update payment status (admin)
  async updatePaymentStatus(orderId: string, paymentStatus: Order['payment_status']): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ payment_status: paymentStatus })
      .eq('id', orderId);

    if (error) throw error;
  },
};