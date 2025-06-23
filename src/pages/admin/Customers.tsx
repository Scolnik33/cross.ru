import React, { useState } from 'react';
import {
  Search, Filter, Mail, ArrowUpDown,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import Button from '../../components/ui/Button';

interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  createdAt: string;
}

// Пример данных клиентов
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Джон Смит',
    email: 'john.smith@example.com',
    orders: 5,
    totalSpent: 789.50,
    lastOrder: '2023-05-15',
    createdAt: '2023-01-10'
  },
  {
    id: '2',
    name: 'Сара Джонсон',
    email: 'sarah.johnson@example.com',
    orders: 3,
    totalSpent: 456.75,
    lastOrder: '2023-05-10',
    createdAt: '2023-02-18'
  },
  {
    id: '3',
    name: 'Майкл Браун',
    email: 'michael.brown@example.com',
    orders: 1,
    totalSpent: 119.99,
    lastOrder: '2023-05-15',
    createdAt: '2023-05-01'
  },
  {
    id: '4',
    name: 'Эмма Вильсон',
    email: 'emma.wilson@example.com',
    orders: 2,
    totalSpent: 234.50,
    lastOrder: '2023-04-28',
    createdAt: '2023-03-15'
  },
  {
    id: '5',
    name: 'Джеймс Тейлор',
    email: 'james.taylor@example.com',
    orders: 4,
    totalSpent: 567.25,
    lastOrder: '2023-05-12',
    createdAt: '2023-02-05'
  },
  {
    id: '6',
    name: 'Оливия Мартинес',
    email: 'olivia.martinez@example.com',
    orders: 2,
    totalSpent: 289.98,
    lastOrder: '2023-05-08',
    createdAt: '2023-04-02'
  },
  {
    id: '7',
    name: 'Дэвид Миллер',
    email: 'david.miller@example.com',
    orders: 1,
    totalSpent: 149.99,
    lastOrder: '2023-05-03',
    createdAt: '2023-04-25'
  },
  {
    id: '8',
    name: 'София Уильямс',
    email: 'sophia.williams@example.com',
    orders: 3,
    totalSpent: 399.97,
    lastOrder: '2023-04-30',
    createdAt: '2023-03-10'
  }
];

// Функция форматирования цены
function formatPrice(value: number): string {
  const rounded = Math.round(value);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const CustomersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Customer>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const itemsPerPage = 10;

  // Фильтрация клиентов по поиску
  const filteredCustomers = mockCustomers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Сортировка клиентов
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortField === 'orders' || sortField === 'totalSpent') {
      return sortDirection === 'asc'
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
    }

    // Для полей с датами
    if (sortField === 'lastOrder' || sortField === 'createdAt') {
      return sortDirection === 'asc'
          ? new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime()
          : new Date(b[sortField]).getTime() - new Date(a[sortField]).getTime();
    }

    // Для строковых полей
    return sortDirection === 'asc'
        ? String(a[sortField]).localeCompare(String(b[sortField]))
        : String(b[sortField]).localeCompare(String(a[sortField]));
  });

  // Пагинация
  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);
  const displayedCustomers = sortedCustomers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  const handleSort = (field: keyof Customer) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-8">Клиенты</h1>

        {/* Таблица клиентов */}
        <div className="bg-dark-card rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-dark-border">
              <thead>
              <tr className="bg-dark-surface">
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-light-muted uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Клиент
                    {sortField === 'name' && (
                        <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-light-muted uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('email')}
                >
                  <div className="flex items-center">
                    Email
                    {sortField === 'email' && (
                        <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-light-muted uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('orders')}
                >
                  <div className="flex items-center">
                    Заказы
                    {sortField === 'orders' && (
                        <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-light-muted uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('totalSpent')}
                >
                  <div className="flex items-center">
                    Потрачено
                    {sortField === 'totalSpent' && (
                        <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-light-muted uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('lastOrder')}
                >
                  <div className="flex items-center">
                    Последний заказ
                    {sortField === 'lastOrder' && (
                        <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-light-muted uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center">
                    Зарегистрирован
                    {sortField === 'createdAt' && (
                        <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-light-muted uppercase tracking-wider">
                  Действия
                </th>
              </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
              {displayedCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-dark-surface">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-medium">
                            {customer.name.charAt(0) + customer.name.split(' ')[1]?.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">
                            {customer.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {customer.orders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {formatPrice(customer.totalSpent)} ₽
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {customer.lastOrder}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {customer.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                          className="text-primary hover:underline"
                          onClick={() => alert(`Редактировать ${customer.name}`)}
                      >
                        Редактировать
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>

          {/* Пагинация */}
          <div className="px-6 py-3 bg-dark-surface flex justify-between items-center">
            <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            <div className="text-white">
              Страница {currentPage} из {totalPages}
            </div>
            <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
  );
};

export default CustomersPage;
