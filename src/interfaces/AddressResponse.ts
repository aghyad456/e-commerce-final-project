// src/types/AddresResponse.ts

export interface AddressResponse {
  results: number;
  status: string;
  data: Addres[];
}
export interface Addres {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
  
}
