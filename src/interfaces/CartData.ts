import { CartProduct } from "./CartProduct";

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  totalCartPrice: number;
}
