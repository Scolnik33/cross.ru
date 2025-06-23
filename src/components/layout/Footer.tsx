import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
      <footer className="bg-dark-surface pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Бренд и описание */}
            <div>
              <Link to="/" className="text-2xl font-bold text-white flex items-center mb-4">
                <span className="text-primary mr-1">CROSS</span>.RU
              </Link>
              <p className="text-light-muted mb-6">
                Откройте для себя обувь премиум-класса, созданную для стиля, комфорта и производительности. Ваша идеальная пара ждет вас.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-light-muted hover:text-primary transition-colors" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-light-muted hover:text-primary transition-colors" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-light-muted hover:text-primary transition-colors" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-light-muted hover:text-primary transition-colors" aria-label="Youtube">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Ссылки магазина */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Магазин</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/products" className="text-light-muted hover:text-primary transition-colors">
                    Все товары
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Беговые" className="text-light-muted hover:text-primary transition-colors">
                    Беговая обувь
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Баскетбольные" className="text-light-muted hover:text-primary transition-colors">
                    Баскетбольная обувь
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Официальные" className="text-light-muted hover:text-primary transition-colors">
                    Официальная обувь
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Спортивные" className="text-light-muted hover:text-primary transition-colors">
                    Спортивная обувь
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Сандали" className="text-light-muted hover:text-primary transition-colors">
                    Сандали
                  </Link>
                </li>
              </ul>
            </div>

            {/* Ссылки аккаунта */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Аккаунт</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/login" className="text-light-muted hover:text-primary transition-colors">
                    Войти
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-light-muted hover:text-primary transition-colors">
                    Регистрация
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-light-muted hover:text-primary transition-colors">
                    Корзина
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="text-light-muted hover:text-primary transition-colors">
                    Отследить заказ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Контакты */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Контакты</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
                  <span className="text-light-muted">г. Москва, ул. Тверская, д. 12, офис 34</span>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="text-primary mr-2 flex-shrink-0" />
                  <span className="text-light-muted">+7 (495) 123-45-67</span>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className="text-primary mr-2 flex-shrink-0" />
                  <span className="text-light-muted">contact@crossru.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-dark-border mt-10 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-light-muted text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} CROSS.RU. Все права защищены.
              </p>
              <div className="flex space-x-6">
                <Link to="#" className="text-light-muted hover:text-primary text-sm transition-colors">
                  Политика конфиденциальности
                </Link>
                <Link to="#" className="text-light-muted hover:text-primary text-sm transition-colors">
                  Условия использования
                </Link>
                <Link to="#" className="text-light-muted hover:text-primary text-sm transition-colors">
                  Возвраты и возмещения
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
