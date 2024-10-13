import { Injectable } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly apiUrl = environment.stock_service_url+"/category/";
  private readonly token = environment.auth_token;


  constructor(private readonly http: HttpClient) { }

  createCategory(category: Category): Observable<HttpResponse<Category>> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }

    return this.http.post<Category>(this.apiUrl, category, 
      {
        observe: 'response', 
        headers
      });
  }

}
