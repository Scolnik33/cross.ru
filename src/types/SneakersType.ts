export interface SneakersType {
  _id?: string; 
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}
