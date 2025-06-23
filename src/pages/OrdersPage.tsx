import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getOrdersByUser } from '../data/orders';

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const orders = user ? getOrdersByUser(user.id) : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Доставлен';
      case 'shipped':
        return 'Отправлен';
      case 'processing':
        return 'В обработке';
      case 'pending':
        return 'Ожидает';
      case 'cancelled':
        return 'Отменён';
      default:
        return status;
    }
  };

  const translatePaymentStatus = (paymentStatus: string) => {
    switch (paymentStatus) {
      case 'paid':
        return 'Оплачен';
      case 'pending':
        return 'Ожидает оплаты';
      default:
        return paymentStatus;
    }
  };

  return (
      <div className="bg-dark min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-light-muted mb-6">
            <Link to="/" className="hover:text-primary">Главная</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-white">Мои заказы</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-8">Мои заказы</h1>

          {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order.id} className="bg-dark-card rounded-lg overflow-hidden">
                      <div className="p-6 border-b border-dark-border">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <div className="flex items-center gap-2 text-light-muted text-sm mb-2">
                              <span>Заказ #{order.id}</span>
                              <span>•</span>
                              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {translateStatus(order.status)}
                        </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                          {translatePaymentStatus(order.paymentStatus)}
                        </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-white font-medium">{order.totalAmount.toLocaleString('ru-RU')} ₽</span>
                            <Link
                                to={`/orders/${order.id}`}
                                className="flex items-center gap-2 text-primary hover:text-primary-light"
                            >
                              <Eye size={18} />
                              <span>Посмотреть детали</span>
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {order.items.map((item) => (
                              <div key={item.product.id} className="flex items-start gap-4">
                                <div className="w-20 h-20 bg-dark-surface rounded overflow-hidden flex-shrink-0">
                                  <img
                                      src={item.product.images[0]}
                                      alt={item.product.name}
                                      className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <Link
                                      to={`/products/${item.product.id}`}
                                      className="text-white hover:text-primary font-medium line-clamp-2"
                                  >
                                    {item.product.name}
                                  </Link>
                                  <div className="text-sm text-light-muted mt-1">
                                    <p>Количество: {item.quantity}</p>
                                    {item.size && <p>Размер: {item.size}</p>}
                                    {item.color && <p>Цвет: {item.color}</p>}
                                  </div>
                                </div>
                              </div>
                          ))}
                        </div>
                      </div>
                    </div>
                ))}
              </div>
          ) : (
              <div className="bg-dark-card rounded-lg p-12 text-center">
                <Package size={64} className="mx-auto text-light-muted mb-4" />
                <h2 className="text-2xl font-medium text-white mb-2">Пока нет заказов</h2>
                <p className="text-light-muted mb-8">
                  Вы ещё не сделали ни одного заказа. Начните покупки, чтобы увидеть свои заказы здесь.
                </p>
                <Link
                    to="/products"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-light"
                >
                  Начать покупки
                </Link>
              </div>
          )}
        </div>
      </div>
  );
};

export default OrdersPage;

