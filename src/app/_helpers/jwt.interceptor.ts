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
    // console.log('JwtInterceptor');
    const currentUser = this._authService.currentUserValue;
    // console.log('currentUser');
    // console.log(currentUser);
    // const currentUser = JSON.parse(localStorage.getItem('currentUser')); // à voir comment l'initialiser
    if (currentUser && currentUser.token) { // revoir pour ce test
    // if (currentUser && currentUser._id) {
      // console.log('employé id :' + currentUser);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer  ${this._authService.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
