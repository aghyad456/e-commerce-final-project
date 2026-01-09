        import { Metadata } from "./shared";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CategoriesResponse {
  results: number;
  metadata: Metadata;
  data: Category[];
}
