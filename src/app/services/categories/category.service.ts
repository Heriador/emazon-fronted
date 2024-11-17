import { Injectable } from '@angular/core';
import { Category, CategoryResponse } from '../../shared/interfaces/category.interface';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/shared/interfaces/paginated.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiUrl = environment.stock_service_url+"/category/";


  constructor(private readonly http: HttpClient) { }

  createCategory(category: Category): Observable<HttpResponse<Category>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return this.http.post<Category>(this.apiUrl, category, 
      {
        observe: 'response', 
        headers
      });
  }

  getCategories(page: number, size: number, ord: boolean): Observable<Pagination<CategoryResponse>> {
  

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('ord', ord.toString());

    return this.http.get<Pagination<CategoryResponse>>(this.apiUrl,{params});
  }

}
