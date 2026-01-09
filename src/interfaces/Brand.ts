import { Metadata } from "./shared";

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface BrandsResponse {
  results: number;
  metadata: Metadata;
  data: Brand[];
}
