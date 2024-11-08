import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly apiUrl = environment.auth_service_url+"/users/";
  private readonly token = environment.auth_token;

  constructor(
    private readonly http: HttpClient
  ) { }

  createWarehouseAssis(user: User): Observable<HttpResponse<User>>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.post<User>(this.apiUrl+"warehouse-assistant", user,{
      observe: 'response',
      headers
    })
  }
}
