import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../schemas/schemaEmployee';

@Injectable({ providedIn: 'root' })

export class AuthService {
  private _addUrl = 'http://localhost:3000/employees/add';
  private _loginUrl = 'http://localhost:3000/employees/login';

  employe: IEmployee;
  constructor(private http: HttpClient) { }

  registerEmployee(employe) {
    return this.http.post<IEmployee>(this._addUrl, employe);
  }

  LoginEmployee(employe) {
    console.log(employe);
    return this.http.post<any>(this._loginUrl, employe);
  }

  loggin() {
    // !! permet de convertir un retour en boolean au lieu de sa valeur physique
    const localBoolean = !!localStorage.getItem('token');
    console.log('valeur de localBoolean : ' + localBoolean);
    return localBoolean;
  }

  getToken() {
    const tokenData = localStorage.getItem('token');
    return tokenData;
  }

}
