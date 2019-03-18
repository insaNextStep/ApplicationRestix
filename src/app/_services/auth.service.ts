import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmploye } from '../_models/employe.interface';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EmployeService } from './employe.service';
import { IEntreprise } from '../_models/entreprise.interface';
import { EntrepriseService } from './entreprise.service';
import { map } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { IUser } from '../_models/user';
import { ICommercant } from '../_models/commercant.interface';
import { CommercantService } from './commercant.service';
// import { AppComponent } from '../app.component';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // déclaration des chemins d'accès
  private _UrlEmploye = 'https://restix.herokuapp.com/employes';
  private _UrlEntreprise = 'https://restix.herokuapp.com/entreprises';
  private _UrlCommercant = 'https://restix.herokuapp.com/commercants';

  // private _UrlEmploye = 'http://localhost:3000/employes';
  // private _UrlEntreprise = 'http://localhost:3000/entreprises';
  // private _UrlCommercant = 'http://localhost:3000/commercants';

  private currentEmployeSubject: BehaviorSubject<IUser>;
  public currentEmploye: Observable<IUser>;
  employe: IEmploye;
  // employee = EmployeService;

  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;
  user: IUser;

  public currentEntreprise: Observable<IUser>;
  private currentEntrepriseSubject: BehaviorSubject<IUser>;
  entreprise: IEntreprise;

  public currentCommercant: Observable<IUser>;
  private currentCommercantSubject: BehaviorSubject<IUser>;
  commercant: ICommercant;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _jwtHelperService: JwtHelperService,
    private _employeService: EmployeService,
    private _entrepriseService: EntrepriseService,
    private _commercantService: CommercantService
  ) {
    // get token from local storage or state management
    // const currentUser = localStorage.getItem('currentUser');
    // console.log('token', currentUser);

    // decode token to read the payload details
    // const decodeToken = this._jwtHelperService.decodeToken(currentUser); // || {'role': '', 'token': ''};
    console.log('\n\n afficher decodeToken :');
    console.log(localStorage.getItem('currentUser'));
    // console.log(decodeToken.role);
    // if (decodeToken !== null) {
      // if (decodeToken.role === 'EMPLOYE') {
        console.log('\n\n c\'est un employé');
        this.currentUserSubject = new BehaviorSubject<IUser>(
          JSON.parse(localStorage.getItem('currentUser'))
        );
        this.currentUser = this.currentUserSubject.asObservable();
      // }

      // if (decodeToken.role === 'ENTREPRISE') {
      //   console.log('\n\n c\'est une entreprise');
      //   this.currentEntrepriseSubject = new BehaviorSubject<IEntreprise>(
      //     JSON.parse(localStorage.getItem('currentUser'))
      //   );
      //   this.currentEntreprise = this.currentEntrepriseSubject.asObservable();
      // }
    // }
  }

  isAuthorized(allowedRoles: string[]): boolean {
    console.log('roles :', allowedRoles);
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      console.log('isAutho OK');
      return true;
    }

    // get token from local storage or state management
    const token = localStorage.getItem('currentUser');

    // decode token to read the payload details
    const decodeToken = this._jwtHelperService.decodeToken(token);
    console.log('\n\n\n afficher decodeToken :');
    console.log(decodeToken);

    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!decodeToken) {
      console.log('Invalid token');
      return false;
    }
    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    return allowedRoles.includes(this.getRole());
  }

  public get currentEmployeValue(): any {
    console.log('\n\n ********************* currentEmployeValue');
    console.log('current employe subject', this.currentUserSubject);
    return this.currentUserSubject.value;
  }

  public get currentCommercantValue(): any {
    console.log('\n\n ********************* currentCommercantValue');
    console.log('current Commercant subject', this.currentUserSubject);
    return this.currentUserSubject.value;
  }

  public get currentEntrepriseValue(): any {
    return this.currentUserSubject.value;
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }


  registerEmploye(employe) {
    return this._employeService.addNewEmploye(employe);
    // return this._httpClient.post<IEmploye>(`${this._UrlEmploye}/addEmploye`, employe);
  }

  registerEntreprise(entreprise) {
    return this._entrepriseService.addEntreprise(entreprise);
    // return this._httpClient.post<IEntreprise>(`${this._UrlEntreprise}/addEntreprise`, entreprise);
  }

  registerCommercant(commercant) {
    return this._commercantService.addCommercant(commercant);
    // return this._httpClient.post<IEntreprise>(`${this._UrlEntreprise}/addEntreprise`, entreprise);
  }

  loginEmploye(employe) {
    console.log('loginEmploye');
    return this._httpClient
      .post<any>(`${this._UrlEmploye}/loginEmploye`, employe)
      .pipe(
        map(user => {
          console.log('\n\n\n *************************** loginEmploye');
          console.log(user);
          console.log(user.token);
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  loginEntreprise(entreprise) {
    console.log('loginEntreprise');
    return this._httpClient
      .post<any>(`${this._UrlEntreprise}/loginEntreprise`, entreprise)
      .pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  loginCommercant(commercant) {
    console.log('loginCommercant');
    return this._httpClient
      .post<any>(`${this._UrlCommercant}/loginCommercant`, commercant)
      .pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  loggedIn() {
    // !! permet de convertir un retour en boolean au lieu de sa valeur physique
    return !!localStorage.getItem('currentUser');
  }

  logout() {
    console.log('logout');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this._router.navigate(['home']);
    // this._appComponent.isAuth = true;
    // this._appComponent.isAuth = false;
  }

  getToken() {
    console.log('getToken');
    // return this.currentUserValue['token'];
    if (!!this.currentUserValue) {
      return this.currentUserValue['token'];
    } else {
      return false;
    }
    // return localStorage.getItem('currentUser');
  }

  getRole() {
    console.log('GetRole');
    if (!!this.currentUserValue) {
      return this.currentUserValue['role'];
    } else {
      return false;
    }
  }

  statusAdmin() {
    if (this.getRole() === 'ADMIN' && this.loggedIn()) {
      return true;
    } else {
      return false;
    }
  }
}
