import { OrdersType } from "./OrdersType";
import { SneakersType } from "./SneakersType";

export type AuthType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  order: OrdersType[];
  wish: SneakersType[];
  cart: SneakersType[];
  createdAt: string;
  updatedAt: string;
} 
