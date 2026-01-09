import { Brand } from "./Brand";
import { Category } from "./category";
import { SubCategory } from "./subCategory";

export interface Product {
    sold: number;
    images: string[];
    subcategory: SubCategory[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
    id: string;
}

