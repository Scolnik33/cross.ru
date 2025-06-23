import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  ChevronDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Button from "../../components/ui/Button";
import { getAllOrders } from "../../data/orders";
import { Order } from "../../types/product";
import { useDispatch, useSelector } from "react-redux";
import { fethcAllOrders, selectOrders } from "../../redux/slices/order";
import { AppDispatch } from "../../redux/store";

const OrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Order>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const orders = getAllOrders();
  const itemsPerPage = 10;

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Ожидает";
      case "processing":
        return "В обработке";
      case "shipped":
        return "Отправлен";
      case "delivered":
        return "Доставлен";
      case "cancelled":
        return "Отменён";
      default:
        return status;
    }
  };

  const getPaymentStatusLabel = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "paid":
        return "Оплачен";
      case "pending":
        return "Ожидает оплаты";
      case "failed":
        return "Не оплачен";
      default:
        return paymentStatus;
    }
  };

  // Форматирование цены в рублях с пробелами, без запятых и точек
  const formatPriceRUB = (amount: number) => {
    return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
  };

  // Фильтрация заказов по поиску и статусу
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? order.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  // Сортировка заказов
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortField === "totalAmount") {
      return sortDirection === "asc"
        ? a.totalAmount - b.totalAmount
        : b.totalAmount - a.totalAmount;
    }

    if (sortField === "createdAt" || sortField === "updatedAt") {
      return sortDirection === "asc"
        ? new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime()
        : new Date(b[sortField]).getTime() - new Date(a[sortField]).getTime();
    }

    return sortDirection === "asc"
      ? String(a[sortField]).localeCompare(String(b[sortField]))
      : String(b[sortField]).localeCompare(String(a[sortField]));
  });

  // Пагинация
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const displayedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: keyof Order) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusFilterChange = (status: string | null) => {
    setStatusFilter(status);
    setIsStatusDropdownOpen(false);
  };

  const { itemsOrders } = useSelector(selectOrders);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fethcAllOrders());
  }, []);

  console.log(itemsOrders);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Заказы</h1>

      {/* Фильтры и поиск */}
      <div className="bg-dark-card rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Поиск заказов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark border border-dark-border rounded-md py-2 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="relative">
            {isStatusDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-dark-card rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-light-muted hover:bg-dark-border hover:text-white"
                    onClick={() => handleStatusFilterChange(null)}
                  >
                    Все статусы
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-light-muted hover:bg-dark-border hover:text-white"
                    onClick={() => handleStatusFilterChange("pending")}
                  >
                    Ожидает
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-light-muted hover:bg-dark-border hover:text-white"
                    onClick={() => handleStatusFilterChange("processing")}
                  >
                    В обработке
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-light-muted hover:bg-dark-border hover:text-white"
                    onClick={() => handleStatusFilterChange("shipped")}
                  >
                    Отправлен
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-light-muted hover:bg-dark-border hover:text-white"
                    onClick={() => handleStatusFilterChange("delivered")}
                  >
                    Доставлен
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-light-muted hover:bg-dark-border hover:text-white"
                    onClick={() => handleStatusFilterChange("cancelled")}
                  >
                    Отменён
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Таблица заказов */}
      <div className="bg-dark-card rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-dark-border">
            <thead>
              <tr className="bg-dark-surface">
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-light-muted uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    Номер заказа
                    {sortField === "id" && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-light-muted uppercase tracking-wider"
                >
                  Клиент
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-light-muted uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center">
                    Дата
                    {sortField === "createdAt" && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-light-muted uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Статус
                    {sortField === "status" && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-light-muted uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("paymentStatus")}
                >
                  <div className="flex items-center">
                    Оплата
                    {sortField === "paymentStatus" && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-light-muted uppercase tracking-wider"
                >
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {itemsOrders.map((order) => (
                <tr key={order._id} className="hover:bg-dark-surface">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {order._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-light-muted">
                    {order.fullname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-light-muted">
                    {order.createdAt &&
                      new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "pending"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${"bg-green-100 text-green-800"}`}
                    >
                      Оплачено
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-light-muted hover:text-white transition-colors"
                      aria-label="View order"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Пагинация */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-dark-border">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Назад
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Вперёд
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-dark-border bg-dark-surface text-sm font-medium ${
                    currentPage <= 1
                      ? "text-gray-500 cursor-not-allowed"
                      : "text-light-muted hover:bg-dark-border"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft size={18} />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-dark-border text-sm font-medium ${
                      currentPage === i + 1
                        ? "z-10 bg-primary text-white"
                        : "text-light-muted hover:bg-dark-border"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-dark-border bg-dark-surface text-sm font-medium ${
                    currentPage >= totalPages
                      ? "text-gray-500 cursor-not-allowed"
                      : "text-light-muted hover:bg-dark-border"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight size={18} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
