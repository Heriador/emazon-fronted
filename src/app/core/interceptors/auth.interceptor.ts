import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const token = localStorage.getItem('token');

    if(!token){
     return next.handle(request);
    }

    if(this.isTokenExpired(token)){
      this.authService.logout();
      this.router.navigate(['/login']);
      return throwError(() => new Error('Token expired'));
    }

    request = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401){
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    )
    
    
  }

  private isTokenExpired(token: string): boolean{
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    const expiry = decodedPayload.exp;
    const now = Date.now() / 1000;

    return now > expiry;;
  }
}
