import { BrandResponse } from "./brand.interface";
import { CategoryResponse } from "./category.interface";

export interface Item {
    name: string;
    description: string;
    price: number;
    stock: number;
    brandId: number;
    categories: number[];
}

export interface ItemView {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    brand: string;
    categories: string;
}

export interface ItemResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    brand: BrandResponse;
    categories: CategoryResponse[];
}
