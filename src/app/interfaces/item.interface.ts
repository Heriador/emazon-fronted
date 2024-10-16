import { Brand } from "./brand.interface";
import { Category } from "./category.interface";

export interface Item {
    name: string;
    description: string;
    price: number;
    stock: number;
    brand: Brand;
    categories: Category[];
}
