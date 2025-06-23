import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import Button from "../components/ui/Button";
import { AppDispatch } from "../redux/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchUserLogin, selectIsAuth } from "../redux/slices/auth";
import { FormLoginValues } from "../types/FormType";
import { useDispatch, useSelector } from "react-redux";

const LoginPage: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginValues>({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FormLoginValues> = async (values) => {
    const data = await dispatch(fetchUserLogin(values));
    const payload = data.payload;

    if (!data.payload) {
      return alert("Не удалось авторизоваться.");
    }

    if (payload && typeof payload === "object" && "token" in payload) {
      const token = (payload as { token: string }).token;
      window.localStorage.setItem("token", token);
    }

    window.localStorage.setItem("toast", "signIn");
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
              Авторизация
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
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

              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-light-muted"
                  >
                    Пароль
                  </label>
                  <Link
                    to="#"
                    className="text-xs text-primary hover:text-primary-light"
                  >
                    Забыли пароль?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="w-full bg-dark border border-dark-border rounded-md py-2 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder="••••••••"
                    {...register("password", { required: "Обязательное поле" })}
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
                Войти
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-light-muted">
                Нету аккаунта?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary-light font-medium"
                >
                  Зарегистрироваться
                </Link>
              </p>
            </div>

            <div className="mt-8 p-4 bg-dark-surface rounded-lg">
              <h3 className="text-white font-medium mb-2">Демо аккаунты</h3>
              <div className="space-y-2 text-sm text-light-muted">
                <p>
                  <strong>Пользователь:</strong> user@example.com / user123
                </p>
                <p>
                  <strong>Админ:</strong> admin@example.com / admin123
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
