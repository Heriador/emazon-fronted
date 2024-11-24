import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartRequest, CartResponse } from 'src/app/shared/interfaces/cart.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly apiUrl = environment.cart_service_url

  constructor(
    private readonly http: HttpClient
  ) { }

  addItemToCart(cartRequest: CartRequest): Observable<HttpResponse<CartRequest>>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return this.http.post<CartRequest>(`${this.apiUrl}/add-product`, cartRequest, {
      headers,
      observe: 'response'
    });
  }

  deleteItemFromCart(itemId: number): Observable<HttpResponse<any>>{

    return this.http.delete(`${this.apiUrl}/delete-item/${itemId}`, {
      observe: 'response'
    });
  }

  getCartItems(
    page: number, 
    size: number, 
    order: boolean, 
    categoryName: string, 
    brandName: string): Observable<HttpResponse<CartResponse>>{

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('order', order.toString())
    
    if(categoryName !== ''){
      params = params.set('filterByCategoryName', categoryName);
    }

    if(brandName !== ''){
      params = params.set('filterByBrandName', brandName);
    }

    return this.http.get<CartResponse>(`${this.apiUrl}/get-cart`, {
      params,
      observe: 'response'
    });



  }

}
