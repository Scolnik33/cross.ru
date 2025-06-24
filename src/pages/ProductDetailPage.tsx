import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Share2,
  ChevronRight,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import Button from "../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  addSneakerToCart,
  fetchOneSneaker,
  selectSneakers,
} from "../redux/slices/sneaker";
import { authData } from "../redux/slices/auth";

const ProductDetailPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sneakers = useSelector(selectSneakers);
  const dataAuth = useSelector(authData);
  const { id } = useParams<{ id: string }>();
  const itemsSneakers = sneakers.itemsSneakers[0];

  console.log(itemsSneakers)

  useEffect(() => {
    dispatch(fetchOneSneaker(id || ""));
  }, []);

  const handleAddToCart = () => {
    dispatch(addSneakerToCart({ userId: dataAuth?._id, sneakerId: id || "" }));
    navigate('/')
  };

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // if (!itemsSneakers) {
  //   return (
  //     <div className="container mx-auto px-4 py-12 text-center">
  //       <h1 className="text-2xl font-bold text-white mb-4">Товар не найден</h1>
  //       <p className="text-light-muted mb-6">
  //         Продукт, который вы ищете, не существует или был удален.
  //       </p>
  //       <Button variant="primary" onClick={() => navigate("/products")}>
  //         Обратно к товарам
  //       </Button>
  //     </div>
  //   );
  // }
  
  if (!itemsSneakers) {
  return (
    <div className="text-white text-center py-20">
      Загрузка товара...
    </div>
  );
}

  return (
    <div className="bg-dark min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-light-muted mb-6">
          <button onClick={() => navigate("/")} className="hover:text-primary">
            Домашняя страница
          </button>
          <ChevronRight size={16} className="mx-2" />
          <button
            onClick={() => navigate("/products")}
            className="hover:text-primary"
          >
            Продукты
          </button>
          <ChevronRight size={16} className="mx-2" />
          <button
            onClick={() =>
              navigate(`/products?category=${itemsSneakers.category}`)
            }
            className="hover:text-primary"
          >
            {itemsSneakers.category}
          </button>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-light">{itemsSneakers.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-dark-card rounded-lg overflow-hidden mb-4 aspect-square">
              <img
                src={itemsSneakers.image}
                alt={itemsSneakers.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* <div className="grid grid-cols-4 gap-2">
              {itemsSneakers.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div> */}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-white mb-2">
                {itemsSneakers.name}
              </h1>

              <div className="flex items-baseline mb-6">
                <span className="text-2xl font-bold text-white">
                  ₽
                  {Math.round(itemsSneakers.price)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                </span>
                {/* {itemsSneakers.originalPrice && (
                  <>
                    <span className="ml-2 text-light-muted line-through">
                      ₽
                      {Math.round(itemsSneakers.originalPrice)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                    </span>
                    <span className="ml-2 text-sm font-medium text-secondary">
                      {Math.round(
                        ((itemsSneakers.originalPrice - itemsSneakers.price) /
                          itemsSneakers.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  </>
                )} */}
              </div>

              {/* Features */}
              {/* {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-2">
                    Характеристики
                  </h3>
                  <ul className="list-disc list-inside text-light-muted space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )} */}

              {/* Sizes */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <h3 className="text-white font-semibold">Выберите размер</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {/* {itemsSneakers.size.map((size) => ( */}
                  <button
                    key={itemsSneakers.size}
                    className={`
                        w-12 h-12 rounded-md flex items-center justify-center text-sm font-medium
                        ${
                          itemsSneakers.size === selectedSize
                            ? "bg-primary text-white"
                            : "bg-dark-card text-light-muted hover:bg-dark-border"
                        }
                      `}
                    onClick={() => setSelectedSize(itemsSneakers.size)}
                  >
                    {itemsSneakers.size}
                  </button>
                  {/* ))} */}
                </div>
              </div>

              {/* Colors */}
              <h3 className="text-white font-semibold mb-2">Выберите цвет</h3>
              {/* {product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => ( */}
              <button
                key={itemsSneakers.color}
                className={`
                          px-4 py-2 rounded-md text-sm font-medium mb-5
                          ${
                            itemsSneakers.color === selectedColor
                              ? "bg-primary text-white"
                              : "bg-dark-card text-light-muted hover:bg-dark-border"
                          }
                        `}
                onClick={() => setSelectedColor(itemsSneakers.color)}
              >
                {itemsSneakers.color}
              </button>
              {/* ))}
                  </div>
                </div>
              )} */}

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2">Количество</h3>
                <div className="flex items-center">
                  <button
                    className="w-10 h-10 bg-dark-card text-light-muted rounded-l-md flex items-center justify-center hover:bg-dark-border"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <div className="w-16 h-10 bg-dark-surface flex items-center justify-center text-white">
                    {quantity}
                  </div>
                  <button
                    className="w-10 h-10 bg-dark-card text-light-muted rounded-r-md flex items-center justify-center hover:bg-dark-border"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<ShoppingBag size={18} />}
                  onClick={handleAddToCart}
                >
                  В корзину
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  className="sm:w-auto"
                  icon={<Share2 size={18} />}
                >
                  Поделиться
                </Button>
              </div>

              {/* Additional Info */}
              <div className="space-y-4 border-t border-dark-border pt-6">
                <div className="flex items-start">
                  <Truck
                    className="text-primary mr-3 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h4 className="text-white font-medium">
                      Бесплатная доставка
                    </h4>
                    <p className="text-sm text-light-muted">
                      Бесплатная доставка для заказов больше 5000₽»
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <RotateCcw
                    className="text-primary mr-3 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h4 className="text-white font-medium">Простой возврат</h4>
                    <p className="text-sm text-light-muted">
                      Возврат или обмен в течение 30 дней
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Shield
                    className="text-primary mr-3 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h4 className="text-white font-medium">
                      Безопасная оплата
                    </h4>
                    <p className="text-sm text-light-muted">
                      Ваша платежная информация обрабатывается безопасно
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              Вам также может понравиться
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ProductDetailPage;
