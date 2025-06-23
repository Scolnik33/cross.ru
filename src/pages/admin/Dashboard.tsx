import React from 'react';
import { ShoppingBag, DollarSign, Users, TrendingUp, CreditCard, Package, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../../data/orders';
import { products } from '../../data/products';

const Dashboard: React.FC = () => {
  const orders = getAllOrders();
  
  // Calculate basic analytics
  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const totalProducts = products.length;
  const lowStockProducts = products.filter(product => !product.inStock).length;
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-dark-card rounded-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-primary" />
            </div>
            <div className="ml-4">
              <h3 className="text-light-muted text-sm">Total Sales</h3>
              <p className="text-white text-2xl font-bold">${totalSales.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp size={16} className="text-green-500" />
            <span className="text-green-500 text-xs ml-1">+12.5% from last week</span>
          </div>
        </div>
        
        <div className="bg-dark-card rounded-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <CreditCard size={24} className="text-secondary" />
            </div>
            <div className="ml-4">
              <h3 className="text-light-muted text-sm">Orders</h3>
              <p className="text-white text-2xl font-bold">{orders.length}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp size={16} className="text-green-500" />
            <span className="text-green-500 text-xs ml-1">+5.7% from last week</span>
          </div>
        </div>
        
        <div className="bg-dark-card rounded-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <ShoppingBag size={24} className="text-purple-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-light-muted text-sm">Products</h3>
              <p className="text-white text-2xl font-bold">{totalProducts}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-light-muted text-xs">{lowStockProducts} out of stock</span>
          </div>
        </div>
        
        <div className="bg-dark-card rounded-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Users size={24} className="text-yellow-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-light-muted text-sm">Customers</h3>
              <p className="text-white text-2xl font-bold">24</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp size={16} className="text-green-500" />
            <span className="text-green-500 text-xs ml-1">+3.2% from last week</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-dark-card rounded-lg overflow-hidden">
            <div className="p-6 border-b border-dark-border">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Recent Orders</h2>
                <Link to="/admin/orders" className="text-primary text-sm hover:underline">
                  View All
                </Link>
              </div>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-light-muted text-sm">
                      <th className="pb-3 font-medium">Order ID</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border">
                    {orders.slice(0, 5).map(order => (
                      <tr key={order.id} className="text-sm">
                        <td className="py-3 text-white font-medium">{order.id}</td>
                        <td className="py-3 text-light-muted">{order.shippingAddress.fullName}</td>
                        <td className="py-3 text-light-muted">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-light-muted">${order.totalAmount.toFixed(2)}</td>
                        <td className="py-3">
                          <span className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                            ${order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : ''}
                            ${order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${order.status === 'pending' ? 'bg-gray-100 text-gray-800' : ''}
                            ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                          `}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Status */}
        <div className="lg:col-span-1">
          <div className="bg-dark-card rounded-lg overflow-hidden">
            <div className="p-6 border-b border-dark-border">
              <h2 className="text-xl font-bold text-white">Order Status</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Package size={18} className="text-primary mr-2" />
                      <span className="text-light-muted">Processing</span>
                    </div>
                    <span className="text-white font-medium">3</span>
                  </div>
                  <div className="w-full bg-dark-border rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Clock size={18} className="text-yellow-500 mr-2" />
                      <span className="text-light-muted">Pending</span>
                    </div>
                    <span className="text-white font-medium">{pendingOrders}</span>
                  </div>
                  <div className="w-full bg-dark-border rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <TrendingUp size={18} className="text-blue-500 mr-2" />
                      <span className="text-light-muted">Shipped</span>
                    </div>
                    <span className="text-white font-medium">1</span>
                  </div>
                  <div className="w-full bg-dark-border rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <ShoppingBag size={18} className="text-green-500 mr-2" />
                      <span className="text-light-muted">Delivered</span>
                    </div>
                    <span className="text-white font-medium">2</span>
                  </div>
                  <div className="w-full bg-dark-border rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;