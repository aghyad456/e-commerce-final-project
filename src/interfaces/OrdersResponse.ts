import { Product } from "./product";
import { AddressResponse } from "./AddressResponse";


export interface Order {
  _id: string;
  products: Product[];
  address: AddressResponse;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  results: number;
  metadata: { currentPage: number; numberOfPages: number; limit: number; nextPage?: number };
  data: Order[];
}

