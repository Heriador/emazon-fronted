import { BrandResponse } from "./brand.interface";
import { CategoryResponse } from "./category.interface";

export interface CartRequest {
    itemId: number;
    quantity: number;
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    stock: number;
    brand: BrandResponse;
    categories: CategoryResponse[];
    nextSupplyDate: string;
    cartQuantity: number;
    cartPrice: number;
}

export interface CartResponse {
    content: CartItem[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
    totalPrice: number;
}

export interface CartItemsRequest {
    page: number;
    size: number;
    order: boolean;
    filterByCategoryName: string;
    filterByBrandName: string;
}