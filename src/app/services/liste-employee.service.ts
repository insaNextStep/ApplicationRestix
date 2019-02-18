import { Injectable } from '@angular/core';
// importer les fonctionnalité de HTTP pour travailler avec les méthode réposne/header
// import { Http, Response, Headers } from '@angular/http';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { IEmployee } from '../schemas/schemaEmployee';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private uri = 'http://localhost:3000/employees';
  // création d'un instance avec http
  constructor(private http: HttpClient) {}

  // private handleError(error: any): Promise<any> {
  //   console.error('Une erreur est survenue : ', error);
  //   return Promise.reject(error.message || error);
  // }
  // const headers = new Headers({'Content-Type': 'application/json'});
  // const options = new RequestOptions({ headers: headers });

  getListEmployees(): Observable<IEmployee[]> {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this.http.get<IEmployee[]>(this.uri + '/'); // .pipe(map(res => res));
  }

  getEmployee(id): Observable<IEmployee[]> {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this.http.get<IEmployee[]>(this.uri + '/' + id); // .pipe(map(res => res));
  }

  addNewEmployee(newEmployee) {
    // implémentation de la route (repris de node js dans l'onglet route)
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.uri + '/add/', newEmployee); // , { headers: this.headers }).pipe(map(res => res));
  }

  deleteEmployee(id: string) {
    return this.http.get(this.uri + '/delete/' + id); // .pipe(map(res => res));
  }

  DissocierEmployee(id: string): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.uri + '/dissocierEmploye/' + id); // .pipe(map(res => res));
  }

  editEmployee(id: string) {
    return this.http.get(this.uri + '/edit/' + id).pipe(map(res => res));
  }
}
