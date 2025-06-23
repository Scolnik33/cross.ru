import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import ProductCard from "../components/ui/ProductCard";
import Button from "../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchSneakers, selectSneakers } from "../redux/slices/sneaker";
import { AppDispatch } from "../redux/store";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sneakers = useSelector(selectSneakers);

  useEffect(() => {
    dispatch(fetchSneakers());
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://sun9-6.userapi.com/impg/Y7OXeUXcR8QYTh6Ko2t6ykHX6sHbfc1Txgx-dA/bAxtbwkH6m0.jpg?size=950x950&quality=95&sign=171daacc0878eab6d15fa5dd81b3d4e2&type=album)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
              Основа твоего <span className="text-primary">Образа</span>
            </h1>
            <p className="text-xl text-light-muted mb-8 animate-fade-in delay-100">
              Откройте для себя обувь премиум-класса, созданную для стиля,
              комфорта и производительности. Ваша идеальная пара ждет вас.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-200">
              <NavLink to={"/products"}>
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ShoppingBag size={20} />}
                >
                  Купить сейчас
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-white">Рекомендации</h2>
            <Link
              to="/products"
              className="text-primary flex items-center hover:underline"
            >
              Смотреть все <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sneakers.itemsSneakers.map((item) => (
              <ProductCard key={item._id} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-dark-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Почему выбирают нас
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-dark-card p-6 rounded-lg text-center transition-transform hover:transform hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Отвечаем за качество
              </h3>
              <p className="text-light-muted">
                Наша обувь изготовлена из лучших материалов, обеспечивающих
                долговечность и комфорт.
              </p>
            </div>

            <div className="bg-dark-card p-6 rounded-lg text-center transition-transform hover:transform hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Быстрая доставка
              </h3>
              <p className="text-light-muted">
                Быстрая доставка позволит вам получить новую обувь как можно
                скорее.
              </p>
            </div>

            <div className="bg-dark-card p-6 rounded-lg text-center transition-transform hover:transform hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Безопасная оплата
              </h3>
              <p className="text-light-muted">
                Множество вариантов оплаты и защита вашей личной информации.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Будьте в курсе событий
            </h2>
            <p className="text-light-muted mb-8">
              Подпишитесь на нашу рассылку, чтобы получать эксклюзивные
              предложения, новые поступления и скидки.
            </p>

            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Ваша почта"
                className="flex-grow px-4 py-3 rounded-md bg-dark-card border border-dark-border text-light-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                required
              />
              <Button variant="primary" size="lg" type="submit">
                Подписаться
              </Button>
            </form>

            <p className="text-sm text-light-muted mt-4">
              Подписываясь, вы соглашаетесь с нашей Политикой конфиденциальности
              и даете согласие на получение обновлений от CROSS.RU.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
