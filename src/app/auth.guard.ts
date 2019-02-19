import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; // version d'origine
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
  constructor(private _auth: AuthService, private _route: Router) { }

  canActivate(): boolean {
    if (this._auth.loggin()) {
      return true;
    } else {
      this._route.navigate(['/login']);
      return false;
    }
  }

}
