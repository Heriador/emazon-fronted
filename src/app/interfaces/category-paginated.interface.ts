import { Category } from "./category.interface";

export interface CategoryPaginated {
    content: Category[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}
