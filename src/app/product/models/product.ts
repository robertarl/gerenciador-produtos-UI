import { Category } from "src/app/category/models/category";

export interface Product {
  id?: string;
  name: string;
  category: Category;
  price: number;
  quantity: number;
  description: string;
}
