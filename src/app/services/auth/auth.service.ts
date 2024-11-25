import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { TokenPayload, UserLogin, UserLoginResponse } from 'src/app/shared/interfaces/user.interface';
import { Roles } from 'src/app/shared/constants/roles';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = environment.auth_service_url+"/auth";
  private userRole: Roles | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }

  login(user: UserLogin): Observable<UserLoginResponse>{
    return this.http.post<UserLoginResponse>(`${this.apiUrl}/authenticate`, user
    ).pipe(
      tap(response => {
        console.log(response);
        if(response.jwt){
          localStorage.setItem('token', response.jwt);
          this.userRole = this.decodeToken(response.jwt).authorities;
        }
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  logout(): void{
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  getUserRole(): Roles | null{
    if(!this.userRole){
      const token = localStorage.getItem('token');
      if(token){
        this.userRole = this.decodeToken(token).authorities;
      }
    }
    return this.userRole;
  }

  private decodeToken(token: string): TokenPayload{
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }


}
