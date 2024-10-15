import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/interfaces/brand.interface';
import { environment } from '../../../environments/environment';

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

}
