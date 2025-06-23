import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User } from "lucide-react";
import Button from "../components/ui/Button";
import { FormRegisterValues } from "../types/FormType";
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchUserRegister, selectIsAuth } from "../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";

const RegisterPage: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterValues>({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FormRegisterValues> = async (values) => {
    if (values.email === "admin@example.com") {
      values.role = "admin";
    } else {
      values.role = "customer";
    }

    const data = await dispatch(fetchUserRegister(values));
    const payload = data.payload;

    if (!payload) {
      return alert("Не удалось зарегистрироваться.");
    }

    if (payload && typeof payload === "object" && "token" in payload) {
      const token = (payload as { token: string }).token;
      window.localStorage.setItem("token", token);
    }
  };

  if (isAuth) {
    navigate("/");
  }

  return (
    <div className="bg-dark min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-dark-card rounded-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-white text-center mb-6">
              Создать аккаунт
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-light-muted mb-1"
                >
                  Имя
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "Обязательное поле" })}
                    className="w-full bg-dark border border-dark-border rounded-md py-2 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="Джон"
                  />
                </div>
                {errors.name && (
                  <div className="w-100">
                    <ul className="alert alert-danger">
                      <li className="text-red-500">{errors.name.message}</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-light-muted mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    {...register("email", { required: "Обязательное поле" })}
                    className="w-full bg-dark border border-dark-border rounded-md py-2 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="Email"
                  />
                </div>
                {errors.email && (
                  <div className="w-100">
                    <ul className="alert alert-danger">
                      <li className="text-red-500">{errors.email.message}</li>
                    </ul>
                  </div>
                )}
              </div>

              <input type="hidden" {...register("role")} />

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-light-muted mb-1"
                >
                  Пароль
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    {...register("password", { required: "Обязательное поле" })}
                    className="w-full bg-dark border border-dark-border rounded-md py-2 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <div className="w-100">
                    <ul className="alert alert-danger">
                      <li className="text-red-500">
                        {errors.password.message}
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth>
                Зарегистрироваться
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-light-muted">
                Уже есть аккаунт?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary-light font-medium"
                >
                  Войти
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
