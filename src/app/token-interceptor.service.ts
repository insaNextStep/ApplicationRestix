import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {AuthService} from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
// format standart
export class TokenInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tokenReq = req.clone({
      setHeaders : {
        Authorization : `Bearer ${this._auth.getToken()}`
      }
    });
    return next.handle(tokenReq);
  }
  constructor(private _auth: AuthService) { }
}
