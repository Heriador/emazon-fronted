import { Injectable } from '@angular/core';
import { Category, CategoryResponse } from '../../interfaces/category.interface';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/interfaces/paginated.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiUrl = environment.stock_service_url+"/category/";
  private readonly token = environment.auth_token;


  constructor(private readonly http: HttpClient) { }

  createCategory(category: Category): Observable<HttpResponse<Category>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.post<Category>(this.apiUrl, category, 
      {
        observe: 'response', 
        headers
      });
  }

  getCategories(page: number, size: number, ord: boolean): Observable<Pagination<CategoryResponse>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('ord', ord.toString());

    return this.http.get<Pagination<CategoryResponse>>(this.apiUrl, {headers, params});
  }

}
