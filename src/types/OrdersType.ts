import { SneakersType } from "./SneakersType";

export interface OrdersType {
  fullname: string;
  address: string;
  city: string;
  state: string;
  code: string;
  country: string;
  phone: string;
  status: string;
  payment: string;
  sneakers: SneakersType[];
  createdAt?: Date;
  updatedAt?: Date;
}
