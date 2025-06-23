import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Button from "../components/ui/Button";
import { useCart } from "../contexts/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { authData } from "../redux/slices/auth";
import {
  deleteFromCart,
  fetchUserCart,
  selectCart,
} from "../redux/slices/sneaker";
import { AppDispatch } from "../redux/store";

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const dataAuth = useSelector(authData);
  const cart = useSelector(selectCart);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchUserCart(dataAuth?._id));
  }, []);

  const remove = (sneakerId: string) => {
    dispatch(deleteFromCart({ id: dataAuth?._id, sneakerId }));
    // @ts-ignore
    dispatch(fetchUserCart(dataAuth?._id));
  };

  if (cart.length === 0) {
    return (
      <div className="bg-dark min-h-screen py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8">Корзина</h1>
          <div className="flex flex-col items-center">
            <ShoppingBag className="w-16 h-16 text-primary" />
            <p className="text-lg text-white mt-4">Ваша корзина пуста</p>
            <p className="text-light-muted mt-2">
              Похоже, вы еще не добавили ни одного товара в корзину
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/products")}
            >
              Перейти в магазин
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Корзина</h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-dark-card rounded-lg overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-dark-border text-sm font-medium text-light-muted">
                  <div className="col-span-6">Продукт</div>
                  <div className="col-span-2 text-center">Цена</div>
                  <div className="col-span-2 text-center">Количество</div>
                  <div className="col-span-2 text-center">Итоговая цена</div>
                </div>

                <div className="divide-y divide-dark-border">
                  {cart.map((item) => (
                    <div key={item.sneaker._id} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Product */}
                        <div className="col-span-6 flex items-center">
                          <div className="w-20 h-20 bg-dark-surface rounded overflow-hidden flex-shrink-0">
                            <img
                              src={item.sneaker.image}
                              alt={item.sneaker.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <Link
                              to={`/products/${item.sneaker._id}`}
                              className="text-white hover:text-primary font-medium"
                            >
                              {item.sneaker.name}
                            </Link>
                            <div className="text-sm text-light-muted mt-1 space-y-1">
                              {item.sneaker.size && (
                                <p>Size: {item.sneaker.size}</p>
                              )}
                              {item.sneaker.color && (
                                <p>Color: {item.sneaker.color}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                          <span className="md:hidden text-light-muted">
                            Price:
                          </span>
                          <span className="text-white">
                            {item.sneaker.price} ₽
                          </span>
                        </div>

                        {/* Quantity */}
                        <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                          <span className="md:hidden text-light-muted">
                            Quantity:
                          </span>
                          <div className="flex items-center">
                            <button
                              className="w-8 h-8 bg-dark-surface text-light-muted rounded-l-md flex items-center justify-center hover:bg-dark-border"
                              // onClick={() =>
                              //   updateQuantity(
                              //     item.sneaker.product.id,
                              //     Math.max(1, item.sneaker.quantity - 1)
                              //   )
                              // }
                            >
                              -
                            </button>
                            <div className="w-10 h-8 bg-dark flex items-center justify-center text-white">
                              {item.sneaker.quantity}
                            </div>
                            <button
                              className="w-8 h-8 bg-dark-surface text-light-muted rounded-r-md flex items-center justify-center hover:bg-dark-border"
                              // onClick={() =>
                              //   updateQuantity(
                              //     item.sneaker.product.id,
                              //     item.sneaker.quantity + 1
                              //   )
                              // }
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                          <span className="md:hidden text-light-muted">
                            Subtotal:
                          </span>
                          <span className="text-white font-medium">
                            {item.sneaker.price * item.sneaker.quantity} ₽
                          </span>
                        </div>

                        {/* Remove button */}
                        <div className="col-span-1 flex justify-end">
                          <button
                            // @ts-ignore
                            onClick={() => remove(item._id)}
                            className="text-light-muted hover:text-red-500 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-dark-card rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Сведения о заказе
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-light-muted">
                    <span>Итого</span>
                    <span>{total.toLocaleString("ru-RU")} ₽</span>
                  </div>
                  <div className="flex justify-between text-light-muted">
                    <span>Доставка</span>
                    <span>Рассчитывается при оформлении</span>
                  </div>
                  <div className="flex justify-between text-light-muted">
                    <span>Налог</span>
                    <span>Рассчитывается при оформлении</span>
                  </div>
                  <div className="border-t border-dark-border pt-3 flex justify-between font-semibold text-white">
                    <span>Общая стоимость</span>
                    <span>{total.toLocaleString("ru-RU")} ₽</span>
                  </div>
                </div>

                <NavLink to="/checkout">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    // onClick={handleCheckout}
                    icon={<ArrowRight size={18} />}
                    iconPosition="right"
                  >
                    Перейти к оформлению заказа
                  </Button>
                </NavLink>

                <div className="mt-6 text-center text-sm text-light-muted">
                  <p>
                    Мы принимаем оплату кредитной картой и банковским переводом.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-dark-card rounded-lg p-12 text-center">
            <ShoppingBag size={64} className="mx-auto text-light-muted mb-4" />
            <h2 className="text-2xl font-medium text-white mb-2">
              Ваша корзина пуста
            </h2>
            <p className="text-light-muted mb-8">
              Похоже, вы еще не добавили ни одного товара в корзину
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/products")}
            >
              Перейти в магазин
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
