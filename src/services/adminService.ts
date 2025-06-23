import { supabase } from '../lib/supabase';

export interface AdminStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  pendingOrders: number;
  lowStockProducts: number;
  recentOrders: Array<{
    id: string;
    order_number: string;
    customer_name: string;
    total_amount: number;
    status: string;
    created_at: string;
  }>;
}

export interface Customer {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  orders_count: number;
  total_spent: number;
  last_order_date?: string;
  created_at: string;
}

export const adminService = {
  // Get dashboard statistics
  async getDashboardStats(): Promise<AdminStats> {
    // Get total sales and orders
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('total_amount, status, created_at, order_number, shipping_full_name')
      .order('created_at', { ascending: false });

    if (ordersError) throw ordersError;

    const totalSales = ordersData.reduce((sum, order) => sum + order.total_amount, 0);
    const totalOrders = ordersData.length;
    const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
    const recentOrders = ordersData.slice(0, 5).map(order => ({
      id: order.id,
      order_number: order.order_number,
      customer_name: order.shipping_full_name,
      total_amount: order.total_amount,
      status: order.status,
      created_at: order.created_at,
    }));

    // Get total products
    const { count: totalProducts, error: productsError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    if (productsError) throw productsError;

    // Get low stock products
    const { data: variantsData, error: variantsError } = await supabase
      .from('product_variants')
      .select('stock_quantity')
      .lt('stock_quantity', 5);

    if (variantsError) throw variantsError;

    const lowStockProducts = variantsData.length;

    // Get total customers
    const { count: totalCustomers, error: customersError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'customer');

    if (customersError) throw customersError;

    return {
      totalSales,
      totalOrders,
      totalProducts: totalProducts || 0,
      totalCustomers: totalCustomers || 0,
      pendingOrders,
      lowStockProducts,
      recentOrders,
    };
  },

  // Get all customers with order statistics
  async getCustomers(): Promise<Customer[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        orders(total_amount, created_at)
      `)
      .eq('role', 'customer')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(customer => {
      const orders = customer.orders || [];
      const totalSpent = orders.reduce((sum, order) => sum + order.total_amount, 0);
      const lastOrderDate = orders.length > 0 
        ? Math.max(...orders.map(order => new Date(order.created_at).getTime()))
        : null;

      return {
        id: customer.id,
        full_name: customer.full_name,
        email: customer.email,
        phone: customer.phone,
        orders_count: orders.length,
        total_spent: totalSpent,
        last_order_date: lastOrderDate ? new Date(lastOrderDate).toISOString() : undefined,
        created_at: customer.created_at,
      };
    });
  },

  // Get admin settings
  async getSettings(): Promise<Record<string, any>> {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('key, value');

    if (error) throw error;

    return data.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, any>);
  },

  // Update admin setting
  async updateSetting(key: string, value: any): Promise<void> {
    const { error } = await supabase
      .from('admin_settings')
      .upsert({ key, value })
      .eq('key', key);

    if (error) throw error;
  },

  // Get categories for admin
  async getCategories(): Promise<Array<{ id: string; name: string; description?: string; is_active: boolean }>> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  },

  // Get brands for admin
  async getBrands(): Promise<Array<{ id: string; name: string; description?: string; is_active: boolean }>> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  },
};