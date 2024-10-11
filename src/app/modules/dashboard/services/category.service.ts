import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category.interface';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CategoryPaginated } from '../interfaces/category-paginated.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiUrl = environment.stock_service_url+"/category/";
  private readonly token = environment.auth_token;


  constructor(private readonly http: HttpClient) { }

  category: Category = {name: '', description: ''};
  categoryList: Category[] = [];

  createCategory(category: Category): Observable<HttpResponse<Category>> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }
    this.categoryList.push(category);

    return this.http.post<Category>(this.apiUrl, category, {observe: 'response', headers});
  }

  getCategories(): Observable<HttpResponse<CategoryPaginated>> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }

    let params = new HttpParams();
    return this.http.get<CategoryPaginated>(this.apiUrl, {observe: 'response', headers});
  }

}
