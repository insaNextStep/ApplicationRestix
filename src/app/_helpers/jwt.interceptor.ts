import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    console.log('JwtInterceptor');
    const currentEmploye = this._authService.currentEmployeValue;
    if (currentEmploye && currentEmploye._id) {
      console.log('employé id :' + currentEmploye);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer  ${this._authService.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
