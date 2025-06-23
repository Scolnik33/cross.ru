import React, { ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-dark min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-16 left-0 right-0 bg-dark-card p-4 z-20 flex justify-between items-center">
        <h1 className="text-white font-bold text-lg">Админ</h1>
        <button
          onClick={toggleSidebar}
          className="text-light-muted hover:text-white p-1"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 lg:top-16 pt-24 lg:pt-8 left-0 h-full bg-dark-card w-64 z-10 transform transition-transform duration-300 ease-in-out 
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="p-4">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-2">Aдмин-панель</h2>
          </div>

          <nav className="space-y-1">
            <NavLink
              to="/admin/products"
              className={({ isActive }) => `
                flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-light-muted hover:text-white hover:bg-dark-border"
                }
              `}
              onClick={() => setIsSidebarOpen(false)}
            >
              <ShoppingBag size={18} className="mr-3" />
              Товары
            </NavLink>

            <NavLink
              to="/admin/orders"
              className={({ isActive }) => `
                flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-light-muted hover:text-white hover:bg-dark-border"
                }
              `}
              onClick={() => setIsSidebarOpen(false)}
            >
              <ClipboardList size={18} className="mr-3" />
              Заказы
            </NavLink>

            <NavLink
              to="/admin/customers"
              className={({ isActive }) => `
                flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-light-muted hover:text-white hover:bg-dark-border"
                }
              `}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Users size={18} className="mr-3" />
              Клиенты
            </NavLink>
          </nav>

          <div className="absolute bottom-8 left-0 right-0 px-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-light-muted hover:text-white hover:bg-dark-border rounded-md transition-colors"
            >
              <LogOut size={18} className="mr-3" />
              Выйти
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 pt-32 lg:pt-16">
        <main className="px-4 py-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
