import { body } from "express-validator";

export const loginValidation = [
  body("email", "Введите email").isEmail(),
  body("password", "Пароль должен содержать не менее 8 символов").isLength({
    min: 8,
  }),
];

export const registerValidation = [
  body("name", "Введите имя").isString(),
  body("email", "Введите email").isEmail(),
  body("password", "Пароль должен содержать не менее 8 символов").isLength({
    min: 8,
  }),
];

export const createOrder = [
  body("fullname", "Введите имя").isLength({ min: 1 }).isString(),
  body("address", "Введите адрес").isLength({ min: 1 }).isString(),
  body("city", "Введите город").isLength({ min: 1 }).isString(),
  body("state", "Введите штат или провинцию").isLength({ min: 1 }).isString(),
  body("code", "Введите код").isLength({ min: 1 }).isString(),
  body("country", "Введите страну").isLength({ min: 1 }).isString(),
  body("phone", "Введите номер телефона").isLength({ min: 1 }).isString(),
];
