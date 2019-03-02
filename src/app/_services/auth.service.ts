import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../_models/employee.interface';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EmployeeService } from '../_services/employee.service';
import { map } from 'rxjs/operators';
import { ICompany } from '../_models/company.interface';
import { AppComponent } from '../app.component';

@Injectable({ providedIn: 'root' })

export class AuthService {
  // déclaration des chemins d'accès
  private _addUrl = 'http://localhost:3000/employees/add';
  private _loginUrl = 'http://localhost:3000/employees/login';

  private currentEmployeSubject: BehaviorSubject<IEmployee>;
  public currentEmploye: Observable<IEmployee>;
  employe: IEmployee;
  employee = EmployeeService;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _jwtHelperService: JwtHelperService,
    private _appComponent: AppComponent
  ) {
    this.currentEmployeSubject = new BehaviorSubject<IEmployee>(
      JSON.parse(localStorage.getItem('currentEmploye'))
    );
    this.currentEmploye = this.currentEmployeSubject.asObservable();
  }

  private uri = 'http://localhost:3000/employees';

  isAuthorized(allowedRoles: string[]): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      console.log('isAutho OK');
      return true;
    }

    // get token from local storage or state management
    const token = localStorage.getItem('token');

    // decode token to read the payload details
    const decodeToken = this._jwtHelperService.decodeToken(token);

    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!decodeToken) {
      console.log('Invalid token');
      return false;
    }
    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    return allowedRoles.includes(this.getRole());
  }

  public get currentEmployeValue(): any {
    return this.currentEmployeSubject.value;
  }

  registerEmployee(employe) {
    return this._httpClient.post<IEmployee>(this._addUrl, employe);
  }

  registerEntreprise(entreprise) {
    return this._httpClient.post<ICompany>(this._addUrl, entreprise);
  }

  loginEmployee(employe) {
    return this._httpClient.post<any>(this._loginUrl, employe);
  }

  loginEntreprise(entreprise) {
    return this._httpClient.post<any>(this._loginUrl, entreprise);
  }

  loggedIn() {
    // !! permet de convertir un retour en boolean au lieu de sa valeur physique
    return !!localStorage.getItem('token');
  }

  logout() {
    console.log('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.currentEmployeSubject.next(null);
    this._router.navigate(['home']);
    this._appComponent.isAuth = false;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('role');
  }

}
