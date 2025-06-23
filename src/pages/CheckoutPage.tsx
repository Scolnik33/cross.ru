import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, CreditCard, Lock } from "lucide-react";
import Button from "../components/ui/Button";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { Address, PaymentMethod } from "../types/auth";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchCreateOrder } from "../redux/slices/order";
import { authData } from "../redux/slices/auth";

const CheckoutPage: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const dataAuth = useSelector(authData);

  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<Address>({
    fullName: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: "",
  });

  const [billingAddress, setBillingAddress] = useState<Address>({
    fullName: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);

  /* -------------------- handlers -------------------- */
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentMethod((prev) => ({ ...prev, [name]: value }));
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSameAsShippingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSameAsShipping(e.target.checked);
    if (e.target.checked) {
      setBillingAddress(shippingAddress);
    }
  };

  /* -------------------- валидация -------------------- */
  const validateShippingForm = () => {
    const required = [
      "fullName",
      "addressLine1",
      "city",
      "state",
      "postalCode",
      "country",
      "phone",
    ];
    return required.every((f) => shippingAddress[f as keyof Address]);
  };

  const validatePaymentForm = () => {
    const required = ["cardNumber", "nameOnCard", "expiryDate", "cvv"];
    const paymentValid = required.every(
      (f) => paymentMethod[f as keyof PaymentMethod]
    );

    if (!sameAsShipping) {
      const billingReq = [
        "fullName",
        "addressLine1",
        "city",
        "state",
        "postalCode",
        "country",
        "phone",
      ];
      return (
        paymentValid &&
        billingReq.every((f) => billingAddress[f as keyof Address])
      );
    }
    return paymentValid;
  };

  /* -------------------- действия -------------------- */
  const handleNextStep = () => {
    if (step === 1 && validateShippingForm()) {
      setStep(2);
    } else if (step === 1) {
      toast.error("Пожалуйста, заполните все обязательные поля");
    }
  };

  const handlePrevStep = () => setStep(1);

  const dispatch = useDispatch<AppDispatch>();

  const handlePlaceOrder = () => {
    if (!validatePaymentForm()) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }
    if (!dataAuth) {
      toast.error("Пожалуйста, войдите в систему, чтобы оформить заказ");
      return;
    }

    dispatch(fetchCreateOrder(shippingAddress));

    navigate(`/orders/${dataAuth._id}`);
  };

  /* ================================================== */
  return (
    <div className="bg-dark min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">
          Оформление заказа
        </h1>

        {/* Шаги */}
        <div className="flex justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-dark-border -translate-y-1/2 z-0" />
          {/* Шаг 1 */}
          <div className="flex flex-col items-center relative z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1
                  ? "bg-primary text-white"
                  : "bg-dark-card text-light-muted"
              }`}
            >
              {step > 1 ? <Check size={20} /> : 1}
            </div>
            <span className="mt-2 text-sm font-medium text-white">
              Доставка
            </span>
          </div>
          {/* Шаг 2 */}
          <div className="flex flex-col items-center relative z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2
                  ? "bg-primary text-white"
                  : "bg-dark-card text-light-muted"
              }`}
            >
              {step > 2 ? <Check size={20} /> : 2}
            </div>
            <span className="mt-2 text-sm font-medium text-white">Оплата</span>
          </div>
          {/* Шаг 3 */}
          <div className="flex flex-col items-center relative z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3
                  ? "bg-primary text-white"
                  : "bg-dark-card text-light-muted"
              }`}
            >
              3
            </div>
            <span className="mt-2 text-sm font-medium text-white">
              Подтверждение
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ===== левая часть: формы ===== */}
          <div className="lg:col-span-2">
            <div className="bg-dark-card rounded-lg overflow-hidden">
              {/* ---------- Шаг 1: адрес доставки ---------- */}
              {step === 1 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6">
                    Информация о доставке
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Полное имя */}
                    <div className="col-span-2">
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-light-muted mb-1"
                      >
                        Полное имя *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={shippingAddress.fullName}
                        onChange={handleShippingChange}
                        className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>

                    {/* Адрес 1 */}
                    <div className="col-span-2">
                      <label
                        htmlFor="addressLine1"
                        className="block text-sm font-medium text-light-muted mb-1"
                      >
                        Адрес (строка 1) *
                      </label>
                      <input
                        type="text"
                        id="addressLine1"
                        name="addressLine1"
                        value={shippingAddress.addressLine1}
                        onChange={handleShippingChange}
                        className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>

                    {/* Адрес 2 */}
                    <div className="col-span-2">
                      <label
                        htmlFor="addressLine2"
                        className="block text-sm font-medium text-light-muted mb-1"
                      >
                        Адрес (строка 2) — необязательное поле
                      </label>
                      <input
                        type="text"
                        id="addressLine2"
                        name="addressLine2"
                        value={shippingAddress.addressLine2 || ""}
                        onChange={handleShippingChange}
                        className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    {/* Город */}
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-light-muted mb-1"
                      >
                        Город *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleShippingChange}
                        className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>

                    {/* Область */}
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-light-muted mb-1"
                      >
                        Область / регион *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingAddress.state}
                        onChange={handleShippingChange}
                        className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>

                    {/* Индекс */}
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-light-muted mb-1"
                      >
                        Почтовый индекс *
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        id="postalCode"
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleShippingChange}
                        className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>

                    {/* Страна */}
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-light-muted mb-1"
                      >
                        Страна *
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={shippingAddress.country}
                        onChange={handleShippingChange}
                        className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>

                    {/* Телефон */}
                    <div className="col-span-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-light-muted mb-1"
                      >
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10,15}"
                        id="phone"
                        name="phone"
                        value={shippingAddress.phone}
                        onChange={handleShippingChange}
                        className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Перейти к оплате
                    </Button>
                  </div>
                </div>
              )}

              {/* ---------- Шаг 2: оплата ---------- */}
              {step === 2 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-6">
                    Информация об оплате
                  </h2>

                  {/* способ оплаты */}
                  <div className="mb-6">
                    <div className="p-4 bg-dark-surface rounded-lg mb-4 flex items-center">
                      <input
                        type="radio"
                        id="creditCard"
                        name="paymentType"
                        checked
                        readOnly
                        className="mr-2"
                      />
                      <label
                        htmlFor="creditCard"
                        className="flex items-center text-white"
                      >
                        <CreditCard size={20} className="mr-2 text-primary" />
                        Банковская карта
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* номер карты */}
                      <div className="col-span-2">
                        <label
                          htmlFor="cardNumber"
                          className="block text-sm font-medium text-light-muted mb-1"
                        >
                          Номер карты *
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]{13,19}"
                          maxLength={19}
                          id="cardNumber"
                          name="cardNumber"
                          value={paymentMethod.cardNumber}
                          onChange={handlePaymentChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          required
                        />
                      </div>

                      {/* имя на карте */}
                      <div className="col-span-2">
                        <label
                          htmlFor="nameOnCard"
                          className="block text-sm font-medium text-light-muted mb-1"
                        >
                          Имя на карте *
                        </label>
                        <input
                          type="text"
                          id="nameOnCard"
                          name="nameOnCard"
                          value={paymentMethod.nameOnCard}
                          onChange={handlePaymentChange}
                          className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          required
                        />
                      </div>

                      {/* срок действия */}
                      <div>
                        <label
                          htmlFor="expiryDate"
                          className="block text-sm font-medium text-light-muted mb-1"
                        >
                          Срок действия (ММ/ГГ) *
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={paymentMethod.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          pattern="\d{2}/\d{2}"
                          className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          required
                        />
                      </div>

                      {/* CVV */}
                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-sm font-medium text-light-muted mb-1"
                        >
                          CVV *
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]{3,4}"
                          maxLength={4}
                          id="cvv"
                          name="cvv"
                          value={paymentMethod.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* платёжный адрес */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Платёжный адрес
                    </h3>

                    <div className="mb-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={sameAsShipping}
                          onChange={handleSameAsShippingChange}
                          className="mr-2"
                        />
                        <span className="text-light-muted">
                          Совпадает с адресом доставки
                        </span>
                      </label>
                    </div>

                    {!sameAsShipping && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* имя */}
                        <div className="col-span-2">
                          <label
                            htmlFor="billingFullName"
                            className="block text-sm font-medium text-light-muted mb-1"
                          >
                            Полное имя *
                          </label>
                          <input
                            type="text"
                            id="billingFullName"
                            name="fullName"
                            value={billingAddress.fullName}
                            onChange={handleBillingChange}
                            className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>

                        {/* адрес */}
                        <div className="col-span-2">
                          <label
                            htmlFor="billingAddressLine1"
                            className="block text-sm font-medium text-light-muted mb-1"
                          >
                            Адрес (строка 1) *
                          </label>
                          <input
                            type="text"
                            id="billingAddressLine1"
                            name="addressLine1"
                            value={billingAddress.addressLine1}
                            onChange={handleBillingChange}
                            className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>

                        {/* город */}
                        <div>
                          <label
                            htmlFor="billingCity"
                            className="block text-sm font-medium text-light-muted mb-1"
                          >
                            Город *
                          </label>
                          <input
                            type="text"
                            id="billingCity"
                            name="city"
                            value={billingAddress.city}
                            onChange={handleBillingChange}
                            className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>

                        {/* область */}
                        <div>
                          <label
                            htmlFor="billingState"
                            className="block text-sm font-medium text-light-muted mb-1"
                          >
                            Область / регион *
                          </label>
                          <input
                            type="text"
                            id="billingState"
                            name="state"
                            value={billingAddress.state}
                            onChange={handleBillingChange}
                            className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>

                        {/* индекс */}
                        <div>
                          <label
                            htmlFor="billingPostalCode"
                            className="block text-sm font-medium text-light-muted mb-1"
                          >
                            Почтовый индекс *
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            id="billingPostalCode"
                            name="postalCode"
                            value={billingAddress.postalCode}
                            onChange={handleBillingChange}
                            className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>

                        {/* страна */}
                        <div>
                          <label
                            htmlFor="billingCountry"
                            className="block text-sm font-medium text-light-muted mb-1"
                          >
                            Страна *
                          </label>
                          <input
                            type="text"
                            id="billingCountry"
                            name="country"
                            value={billingAddress.country}
                            onChange={handleBillingChange}
                            className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>

                        {/* телефон */}
                        <div className="col-span-2">
                          <label
                            htmlFor="billingPhone"
                            className="block text-sm font-medium text-light-muted mb-1"
                          >
                            Телефон *
                          </label>
                          <input
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]{10,15}"
                            id="billingPhone"
                            name="phone"
                            value={billingAddress.phone}
                            onChange={handleBillingChange}
                            className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handlePrevStep}
                    >
                      Назад к доставке
                    </Button>

                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handlePlaceOrder}
                      icon={<Lock size={18} />}
                    >
                      Разместить заказ
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ===== правая часть: итог ===== */}
          <div className="lg:col-span-1">
            <div className="bg-dark-card rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-4">
                Сведения о заказе
              </h2>

              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-start">
                    <div className="w-16 h-16 bg-dark-surface rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-grow">
                      <h4 className="text-white font-medium text-sm">
                        {item.product.name}
                      </h4>
                      <div className="flex justify-between text-light-muted text-sm mt-1">
                        <span>Кол-во: {item.quantity}</span>
                        <span>
                          {(item.product.price * item.quantity).toLocaleString(
                            "ru-RU"
                          )}{" "}
                          ₽
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-dark-border pt-4 space-y-3">
                <div className="flex justify-between text-light-muted">
                  <span>Промежуточный итог</span>
                  <span>{total.toLocaleString("ru-RU")} ₽</span>
                </div>
                <div className="flex justify-between text-light-muted">
                  <span>Доставка</span>
                  <span>Бесплатно</span>
                </div>
                <div className="border-t border-dark-border pt-3 flex justify-between font-semibold text-white">
                  <span>Общая стоимость</span>
                  <span>{total.toLocaleString("ru-RU")} ₽</span>
                </div>
              </div>

              <div className="mt-6 text-center flex items-center justify-center text-sm text-light-muted">
                <Lock size={16} className="mr-2 text-primary" />
                <span>Безопасная оплата</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
