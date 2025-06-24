import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateSneaker } from "../redux/slices/sneaker";
import { SneakersType } from "../types/SneakersType";
import { AppDispatch } from "../redux/store";
import { authData } from "../redux/slices/auth";

const CreateSneakerPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const data = useSelector(authData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SneakersType>({
    mode: "onSubmit",
  });

  const onSubmit = async (values: any) => {
    // @ts-ignore
    values.user = data?._id;
    const data = await dispatch(fetchCreateSneaker(values));
    const payload = data.payload;

    if (!payload) {
      return alert("Не удалось создать кроссовок.");
    }

    alert("Кроссовок успешно создан!");
    navigate("/");
  };

  return (
    <div className="bg-dark min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-dark-card rounded-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-white text-center mb-6">
              Создать карточку кроссовка
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Название */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-light-muted mb-1"
                >
                  Название
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Обязательное поле" })}
                  className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="Название кроссовка"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Описание */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-light-muted mb-1"
                >
                  Описание
                </label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Обязательное поле",
                  })}
                  className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="Описание кроссовка"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Категория */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-light-muted mb-1"
                >
                  Категория
                </label>
                <input
                  type="text"
                  id="category"
                  {...register("category", { required: "Обязательное поле" })}
                  className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="Спортивные, Повседневные и т.п."
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Бренд */}
              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-light-muted mb-1"
                >
                  Бренд
                </label>
                <input
                  type="text"
                  id="brand"
                  {...register("brand", { required: "Обязательное поле" })}
                  className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="Бренд"
                />
                {errors.brand && (
                  <p className="text-red-500 text-sm">{errors.brand.message}</p>
                )}
              </div>

              {/* Цена */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-light-muted mb-1"
                >
                  Цена
                </label>
                <input
                  type="number"
                  id="price"
                  {...register("price", {
                    required: "Обязательное поле",
                    valueAsNumber: true,
                  })}
                  className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="Цена"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>

              {/* Изображение */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-light-muted mb-1"
                >
                  URL изображения
                </label>
                <input
                  type="text"
                  id="image"
                  {...register("image", { required: "Обязательное поле" })}
                  className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="https://..."
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
              </div>

              {/* Размер */}
              <div>
                <label
                  htmlFor="size"
                  className="block text-sm font-medium text-light-muted mb-1"
                >
                  Размер
                </label>
                <input
                  type="text"
                  id="size"
                  {...register("size", { required: "Обязательное поле" })}
                  className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="например, 42, 9US"
                />
                {errors.size && (
                  <p className="text-red-500 text-sm">{errors.size.message}</p>
                )}
              </div>

              {/* Цвет */}
              <div>
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-light-muted mb-1"
                >
                  Цвет
                </label>
                <input
                  type="text"
                  id="color"
                  {...register("color", { required: "Обязательное поле" })}
                  className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="Цвет"
                />
                {errors.color && (
                  <p className="text-red-500 text-sm">{errors.color.message}</p>
                )}
              </div>

              {/* Количество */}
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-light-muted mb-1"
                >
                  Количество
                </label>
                <input
                  type="number"
                  id="quantity"
                  {...register("quantity", {
                    required: "Обязательное поле",
                    valueAsNumber: true,
                  })}
                  className="w-full bg-dark border border-dark-border rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="Количество"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              {/* Кнопка */}
              <Button type="submit" variant="primary" size="lg" fullWidth>
                Создать кроссовок
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSneakerPage;
