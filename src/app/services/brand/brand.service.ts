import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand, BrandResponse } from 'src/app/interfaces/brand.interface';
import { environment } from '../../../environments/environment';
import { Pagination } from 'src/app/interfaces/paginated.interface';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private readonly apiUrl = environment.stock_service_url+"/brand/";
  private readonly token = environment.auth_token;

  constructor(private readonly http: HttpClient) { }

  createBrand(brand: Brand): Observable<HttpResponse<Brand>>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.post<Brand>(this.apiUrl, brand,
      {
        observe: 'response',
        headers
      });

  }

  getBrands(page: number, size: number, ord: boolean): Observable<Pagination<BrandResponse>>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('ord', ord.toString());

    return this.http.get<Pagination<BrandResponse>>(this.apiUrl, {headers, params});
  }
  
}
