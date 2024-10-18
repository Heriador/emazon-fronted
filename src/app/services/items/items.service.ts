import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Item } from 'src/app/interfaces/item.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private readonly apiUrl = environment.stock_service_url+"/item/";
  private readonly token = environment.auth_token;

  constructor(private readonly http: HttpClient) { }

  createItem(item: Item): Observable<HttpResponse<Item>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.post<Item>(this.apiUrl, item, 
      {
        observe: 'response', 
        headers
      });
  }

}
