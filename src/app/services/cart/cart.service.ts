import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartRequest } from 'src/app/shared/interfaces/cart.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly apiUrl = environment.cart_service_url

  constructor(
    private readonly http: HttpClient
  ) { }

  addItemToCart(cartRequest: CartRequest){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return this.http.post(`${this.apiUrl}/add-product`, cartRequest, {
      headers,
      observe: 'response'
    });
  }
}
