import React, { useState } from "react";
import {
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Button from "../../components/ui/Button";
import { products } from "../../data/products";
import { Product } from "../../types/product";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSneakers } from "../../redux/slices/sneaker";

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [sortField, setSortField] = useState<keyof Product>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const dispatch = useDispatch();
  const { itemsSneakers } = useSelector(selectSneakers);

  console.log(itemsSneakers)

  const itemsPerPage = 10;

  // Фильтрация продуктов по поиску
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Сортировка продуктов
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortField === "price" || sortField === "rating") {
      return sortDirection === "asc"
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    }

    // Для строковых полей
    return sortDirection === "asc"
      ? String(a[sortField]).localeCompare(String(b[sortField]))
      : String(b[sortField]).localeCompare(String(a[sortField]));
  });

  // Пагинация
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const displayedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Обработка сортировки по полю
  const handleSort = (field: keyof Product) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Здесь можно вызвать API для удаления продукта
    console.log(`Удаление продукта: ${productToDelete?.id}`);
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  // Функция форматирования цены в рублях с пробелами и без десятичных
  const formatPriceRub = (price: number) => {
    return (
      Math.round(price)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽"
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Товары</h1>

        <NavLink to={'/create'}>
          <Button variant="primary" size="md" icon={<PlusCircle size={18} />}>
            Добавить товар
          </Button>
        </NavLink>
      </div>

      {/* Фильтры и поиск */}
      <div className="bg-dark-card rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark border border-dark-border rounded-md py-2 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Таблица товаров */}
      <div className="bg-dark-card rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-dark-border">
            <thead>
              <tr className="bg-dark-surface">
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-light-muted uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Товар
                    {sortField === "name" && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-light-muted uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("category")}
                >
                  <div className="flex items-center">
                    Категория
                    {sortField === "category" && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-light-muted uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex items-center">
                    Цена
                    {sortField === "price" && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-light-muted uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("inStock")}
                >
                  <div className="flex items-center">
                    Статус
                    {sortField === "inStock" && (
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
              {itemsSneakers.map((product) => (
                <tr key={product._id} className="hover:bg-dark-surface">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded bg-dark-surface overflow-hidden">
                        <img
                          className="h-10 w-10 object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {product.name}
                        </div>
                        <div className="text-sm text-light-muted">
                          {product.brand}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-dark-surface text-light-muted">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {formatPriceRub(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                    >
                      В наличии
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        className="text-light-muted hover:text-white transition-colors"
                        aria-label="Посмотреть товар"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Модальное окно подтверждения удаления */}
      {isDeleteModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
              onClick={() => setIsDeleteModalOpen(false)}
            ></div>

            <div className="inline-block align-bottom bg-dark-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-4">
                  Удалить товар
                </h3>
                <p className="text-light-muted mb-6">
                  Вы уверены, что хотите удалить «{productToDelete?.name}»? Это
                  действие нельзя будет отменить.
                </p>

                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    Отмена
                  </Button>

                  <Button variant="danger" size="md" onClick={confirmDelete}>
                    Удалить
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
