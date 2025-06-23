import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  LogOut,
  Package,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import SearchBar from "../ui/SearchBar";
import { authData, logout, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuth();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatch>();
  const dataAuth = useSelector(authData);
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const exit = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-dark-surface shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-white flex items-center"
          >
            <span className="text-primary mr-1">CROSS</span>.RU
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium hover:text-primary transition-colors ${
                  isActive ? "text-primary" : "text-light-muted"
                }`
              }
            >
              Главная страница
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-sm font-medium hover:text-primary transition-colors ${
                  isActive ? "text-primary" : "text-light-muted"
                }`
              }
            >
              Магазин
            </NavLink>
            {dataAuth?.role == "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `text-sm font-medium hover:text-primary transition-colors ${
                    isActive ? "text-primary" : "text-light-muted"
                  }`
                }
              >
                Админ
              </NavLink>
            )}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="text-light-muted hover:text-primary transition-colors p-1"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <Link
              to="/cart"
              className="text-light-muted hover:text-primary transition-colors p-1 relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <div className="relative">
              <button
                onClick={toggleProfile}
                className="text-light-muted hover:text-primary transition-colors p-1"
                aria-label="User account"
              >
                <User size={20} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-dark-card rounded-md shadow-lg py-1 z-10 animate-fade-in">
                  {isAuth ? (
                    <>
                      <div className="px-4 py-2 border-b border-dark-border">
                        <p className="text-white font-medium">{user?.name}</p>
                        <p className="text-sm text-light-muted">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to={`/orders/${dataAuth?._id}`}
                        className="flex items-center px-4 py-2 text-sm text-light-muted hover:bg-dark-border hover:text-white"
                      >
                        <Package size={16} className="mr-2" />
                        Мои заказы
                      </Link>
                      {dataAuth?.role == "admin" && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-light-muted hover:bg-dark-border hover:text-white"
                        >
                          Админ-панель
                        </Link>
                      )}
                      <button
                        onClick={exit}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-light-muted hover:bg-dark-border hover:text-white"
                      >
                        <LogOut size={16} className="mr-2" />
                        Выйти
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-light-muted hover:bg-dark-border hover:text-white"
                      >
                        Войти
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-light-muted hover:bg-dark-border hover:text-white"
                      >
                        Регистрация
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-light-muted hover:text-primary transition-colors p-1"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-dark-surface mt-2 py-4 rounded-md animate-slide-down">
            <nav className="flex flex-col space-y-4 px-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium hover:text-primary transition-colors ${
                    isActive ? "text-primary" : "text-light-muted"
                  }`
                }
              >
                Главная страница
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `text-sm font-medium hover:text-primary transition-colors ${
                    isActive ? "text-primary" : "text-light-muted"
                  }`
                }
              >
                Магазин
              </NavLink>
              {dataAuth?.role == "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `text-sm font-medium hover:text-primary transition-colors ${
                      isActive ? "text-primary" : "text-light-muted"
                    }`
                  }
                >
                  Админ
                </NavLink>
              )}
            </nav>
          </div>
        )}

        {/* Search Panel */}
        {isSearchOpen && (
          <div className="absolute left-0 right-0 top-full bg-dark-surface px-4 py-4 shadow-lg animate-slide-down">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
