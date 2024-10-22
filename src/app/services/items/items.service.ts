import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Item, ItemResponse } from 'src/app/interfaces/item.interface';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/interfaces/paginated.interface';

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

  getItems(page: number, size: number, sortParam: string ,isAsc: boolean): Observable<Pagination<ItemResponse>>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortParam', sortParam)
      .set('isAsc', isAsc.toString());


    return this.http.get<Pagination<ItemResponse>>(this.apiUrl, {headers, params});
  }

}
