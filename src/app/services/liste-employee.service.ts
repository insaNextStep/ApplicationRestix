import { Injectable } from '@angular/core';
// importer les fonctionnalité de HTTP pour travailler avec les méthode réposne/header
// import { Http, Response, Headers } from '@angular/http';
import {
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { employee } from '../schemas/schemaEmployee';
import { map } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';
// ajout de l'opérateur 'map'

// import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  uri = 'http://localhost:3000/employees';
  // création d'un instance avec http
  constructor(private http: HttpClient) {}

  // private handleError(error: any): Promise<any> {
  //   console.error('Une erreur est survenue : ', error);
  //   return Promise.reject(error.message || error);
  // }
  // const headers = new Headers({'Content-Type': 'application/json'});
  // const options = new RequestOptions({ headers: headers });

  getListEmployees() {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this.http.get(this.uri + '/'); // .pipe(map(res => res));
  }

  getEmployee(id) {
    // implémentation de la route (repris de node js dans l'onglet route)
    return this.http.get(this.uri + '/' + id); // .pipe(map(res => res));
  }

  addNewEmployee(newEmployee) {
    // implémentation de la route (repris de node js dans l'onglet route)
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.uri + '/add/', newEmployee); // , { headers: this.headers })
    // .pipe(map(res => res));
  }

  deleteEmployee(id: string) {
    return this.http.get(this.uri + '/delete/' + id);
  }

  editEmployee(id: string) {
    return this.http.get(this.uri + '/edit/' + id);
  }
}
