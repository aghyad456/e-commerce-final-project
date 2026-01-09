import { CartData } from "./CartData";

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}
