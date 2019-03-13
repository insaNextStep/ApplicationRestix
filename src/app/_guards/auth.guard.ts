import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data.allowedRoles;
    console.log('AuthGuard - allowedRoles : ' + allowedRoles);
    const isAuthorized = this._authService.isAuthorized(allowedRoles);
    console.log('autorisation :', isAuthorized);
    if (!isAuthorized) {
      if (this._authService.loggedIn()) {
        this._router.navigate(['accessdenied']);
      } else {
        this._router.navigate(['login']);
      }
    }

    return isAuthorized;
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   console.log('authGuard');
  //   // obtenir les rôles autorisés pour cette route:
  //   const allowedRoles = route.data.allowedRoles;
  //   console.log('authguard : \nallowedRoles :');
  //   console.log(allowedRoles);
  //   const isAuthorized = this._authService.isAuthorized(allowedRoles);
  //   console.log('authguard : \nisAuthorized :');
  //   console.log(isAuthorized);
  //   // if (!isAuthorized) {
  //   //   // si non autorisé, redirection vers la page acces refusé
  //   //   this._router.navigate(['/accessdenied']);
  //   // }
  //   //     return true; // isAuthorized;

  //   if (this._authService.loggedIn()) {
  //     return true;
  //   } else {
  //     this._router.navigate(['home']);
  //     return false;
  //   }
  // }
}
