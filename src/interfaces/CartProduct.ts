import { Product } from "./product";

export interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: Product;
}
