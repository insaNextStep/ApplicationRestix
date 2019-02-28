import { Injectable } from '@angular/core';
// importer les fonctionnalité de HTTP pour travailler avec les méthode réposne/header
// import { Http, Response, Headers } from '@angular/http';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { IEmployee } from '../_models/employee.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private uri = 'http://localhost:3000/employees';
  // création d'un instance avec http
  constructor(private http: HttpClient) {}

  getListEmployees(): Observable<IEmployee[]> {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this.http.get<IEmployee[]>(this.uri + '/list').pipe(map(res => res));
  }

  getEmployee(id: string): Observable<IEmployee[]> {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this.http.get<IEmployee[]>(this.uri + '/' + id).pipe(map(res => res));
  }

  addNewEmployee(newEmployee) {
    // implémentation de la route (repris de node js dans l'onglet route)
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.uri + '/add/', newEmployee); // , { headers: this.headers }).pipe(map(res => res));
  }

  deleteEmployee(id: string) {
    return this.http.get(this.uri + '/delete/' + id).pipe(map(res => res));
  }

  DissocierEmployee(id: string): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.uri + '/dissocierEmploye/' + id); // .pipe(map(res => res));
  }

  editEmployee(id: string): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.uri + '/edit/' + id).pipe(map(res => res));
  }

  emailExist(email: string): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.uri + '/email/' + email).pipe(map(res => res));
  }

}
